import { ZodError } from 'zod';
import { coursesCollection } from '../../firebase/collections';
import { Course, CourseValidationSchema } from '../../types/course';
import { ApiError } from '../../utils/ApiError';
import { fromDocument, handleFirestoreError, toDocument } from '../../utils/firestore';
import * as admin from 'firebase-admin';

/**
 * Formats Zod validation errors into a human-readable comma-separated string.
 */
const formatZodError = (err: ZodError): string => {
  return err.errors.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
};

export class CourseService {
  private collection = coursesCollection;

  /**
   * Helper to look up a course by its slug.
   */
  async getCourseBySlug(slug: string): Promise<Course | null> {
    try {
      const snapshot = await this.collection().where('slug', '==', slug).limit(1).get();
      if (snapshot.empty) return null;
      return fromDocument<Course>(snapshot.docs[0]);
    } catch (error) {
      return null;
    }
  }

  /**
   * Creates a new course in the Firestore database.
   * Validates structure, checks for duplicate slug.
   */
  async createCourse(data: any): Promise<Course> {
    try {
      // 1. Zod Validation
      const parsedData = CourseValidationSchema.parse(data);

      // 2. Prevent duplicate slugs
      const existing = await this.getCourseBySlug(parsedData.slug);
      if (existing) {
        throw new ApiError(400, `A course with slug '${parsedData.slug}' already exists.`);
      }

      // 3. Prepare document
      const docRef = this.collection().doc(); // Generate auto ID
      const courseDoc: Course = {
        ...parsedData,
        id: docRef.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // 4. Save to Firestore
      await docRef.set(toDocument(courseDoc));

      return courseDoc;
    } catch (error: any) {
      if (error instanceof ZodError) {
        throw new ApiError(400, `Validation Error: ${formatZodError(error)}`);
      }
      return handleFirestoreError(error, 'createCourse');
    }
  }

  /**
   * Updates an existing course in the database.
   * Validates changes and checks for duplicate slugs.
   */
  async updateCourse(id: string, data: any): Promise<Course> {
    try {
      // 1. Check if course exists
      const docRef = this.collection().doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new ApiError(404, `Course with ID '${id}' not found.`);
      }

      const existingCourse = fromDocument<Course>(docSnap);

      // 2. Validate partial updates
      const partialSchema = CourseValidationSchema.partial();
      const parsedData = partialSchema.parse(data);

      // 3. Prevent duplicate slugs (if slug is updated)
      if (parsedData.slug && parsedData.slug !== existingCourse.slug) {
        const slugExists = await this.getCourseBySlug(parsedData.slug);
        if (slugExists && slugExists.id !== id) {
          throw new ApiError(400, `A course with slug '${parsedData.slug}' already exists.`);
        }
      }

      // 4. Update the document fields and updatedAt timestamp
      const updatedCourse: Course = {
        ...existingCourse,
        ...parsedData,
        updatedAt: new Date(),
      };

      // 5. Update only the changed fields in Firestore
      await docRef.update({
        ...toDocument(parsedData),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return updatedCourse;
    } catch (error: any) {
      if (error instanceof ZodError) {
        throw new ApiError(400, `Validation Error: ${formatZodError(error)}`);
      }
      return handleFirestoreError(error, 'updateCourse');
    }
  }

  /**
   * Deletes a course from Firestore.
   */
  async deleteCourse(id: string): Promise<boolean> {
    try {
      const docRef = this.collection().doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        throw new ApiError(404, `Course with ID '${id}' not found.`);
      }
      await docRef.delete();
      return true;
    } catch (error) {
      return handleFirestoreError(error, 'deleteCourse');
    }
  }

  /**
   * Retrieves a course by its unique document ID.
   */
  async getCourseById(id: string): Promise<Course | null> {
    try {
      const docRef = this.collection().doc(id);
      const docSnap = await docRef.get();
      if (!docSnap.exists) {
        return null;
      }
      return fromDocument<Course>(docSnap);
    } catch (error) {
      return handleFirestoreError(error, 'getCourseById');
    }
  }

  /**
   * Retrieves all courses in the database.
   */
  async getCourses(): Promise<Course[]> {
    try {
      const snapshot = await this.collection().orderBy('createdAt', 'desc').get();
      const courses: Course[] = [];
      snapshot.forEach((doc) => {
        courses.push(fromDocument<Course>(doc));
      });
      return courses;
    } catch (error) {
      return handleFirestoreError(error, 'getCourses');
    }
  }

  /**
   * Retrieves published courses.
   */
  async getPublishedCourses(): Promise<Course[]> {
    try {
      const snapshot = await this.collection()
        .where('status', '==', 'published')
        .orderBy('createdAt', 'desc')
        .get();
      const courses: Course[] = [];
      snapshot.forEach((doc) => {
        courses.push(fromDocument<Course>(doc));
      });
      return courses;
    } catch (error) {
      return handleFirestoreError(error, 'getPublishedCourses');
    }
  }

  /**
   * Searches published courses.
   * Performs substring searches on title, tags, description, or category.
   */
  async searchCourses(query: string): Promise<Course[]> {
    try {
      const term = query.toLowerCase().trim();
      const allPublished = await this.getPublishedCourses();
      
      if (!term) return allPublished;

      return allPublished.filter((course) => {
        const matchTitle = course.title?.toLowerCase().includes(term);
        const matchDesc = course.description?.toLowerCase().includes(term);
        const matchCategory = course.category?.toLowerCase().includes(term);
        const matchTags = course.tags?.some((tag) => tag.toLowerCase().includes(term));
        return matchTitle || matchDesc || matchCategory || matchTags;
      });
    } catch (error) {
      return handleFirestoreError(error, 'searchCourses');
    }
  }

  /**
   * Filters courses by category, level, status, or language.
   */
  async filterCourses(filters: {
    category?: string;
    level?: string;
    language?: string;
    status?: string;
  }): Promise<Course[]> {
    try {
      let queryRef: admin.firestore.Query = this.collection();

      if (filters.category) {
        queryRef = queryRef.where('category', '==', filters.category);
      }
      if (filters.level) {
        queryRef = queryRef.where('level', '==', filters.level);
      }
      if (filters.language) {
        queryRef = queryRef.where('language', '==', filters.language);
      }
      if (filters.status) {
        queryRef = queryRef.where('status', '==', filters.status);
      }

      const snapshot = await queryRef.orderBy('createdAt', 'desc').get();
      const courses: Course[] = [];
      snapshot.forEach((doc) => {
        courses.push(fromDocument<Course>(doc));
      });
      return courses;
    } catch (error) {
      return handleFirestoreError(error, 'filterCourses');
    }
  }

  /**
   * Gets featured published courses.
   */
  async getFeaturedCourses(): Promise<Course[]> {
    try {
      const snapshot = await this.collection()
        .where('featured', '==', true)
        .where('status', '==', 'published')
        .orderBy('createdAt', 'desc')
        .get();
      const courses: Course[] = [];
      snapshot.forEach((doc) => {
        courses.push(fromDocument<Course>(doc));
      });
      return courses;
    } catch (error) {
      return handleFirestoreError(error, 'getFeaturedCourses');
    }
  }

  /**
   * Automatically seeds Firestore with sample courses if empty.
   */
  async seedSampleCourses(): Promise<void> {
    try {
      const { isFirestoreInitialized } = await import('../../firebase/collections');
      if (!isFirestoreInitialized()) {
        console.warn('Firebase / Firestore is not configured. Skipping seeding.');
        return;
      }

      const snapshot = await this.collection().limit(1).get();
      if (!snapshot.empty) {
        return; // Collection is not empty, skip seeding
      }

      const sampleCourses: any[] = [
        {
          title: 'Linux Essentials',
          slug: 'linux-essentials',
          description: 'Learn the fundamentals of Linux operating system, command line interface, filesystem structure, and shell scripting.',
          shortDescription: 'Master the command line and basic Linux administration.',
          category: 'Linux',
          subcategory: 'Administration',
          level: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
          duration: '10 hours',
          price: 0,
          currency: 'INR',
          status: 'published',
          language: 'English',
          instructor: {
            uid: 'instructor-1',
            name: 'Shaivika AI Team',
          },
          lessonsCount: 12,
          modulesCount: 3,
          studentsEnrolled: 420,
          rating: 4.8,
          totalRatings: 85,
          tags: ['linux', 'bash', 'cli', 'sysadmin'],
          prerequisites: ['None'],
          learningOutcomes: ['Understand Linux directory structure', 'Confidently run shell commands', 'Write basic bash scripts'],
          certificate: true,
          featured: true,
          createdBy: 'seeder',
        },
        {
          title: 'Git & GitHub Masterclass',
          slug: 'git-github-masterclass',
          description: 'Complete guide to version control with Git and online collaboration on GitHub. Covers commits, branching, merging, rebasing, and pull requests.',
          shortDescription: 'Master version control and team collaboration.',
          category: 'Git & GitHub',
          subcategory: 'Version Control',
          level: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=1200&q=80',
          duration: '8 hours',
          price: 299,
          currency: 'INR',
          status: 'published',
          language: 'English',
          instructor: {
            uid: 'instructor-1',
            name: 'Shaivika AI Team',
          },
          lessonsCount: 15,
          modulesCount: 4,
          studentsEnrolled: 310,
          rating: 4.9,
          totalRatings: 44,
          tags: ['git', 'github', 'version-control', 'devops'],
          prerequisites: ['Basic computer knowledge'],
          learningOutcomes: ['Create and manage Git repositories', 'Solve merge conflicts', 'Collaborate via Pull Requests'],
          certificate: true,
          featured: true,
          createdBy: 'seeder',
        },
        {
          title: 'React from Zero to Hero',
          slug: 'react-from-zero-to-hero',
          description: 'Dive deep into React.js including Hooks, Context API, Redux Toolkit, React Router, Custom Hooks, and API integrations with state of the art performance.',
          shortDescription: 'Build modern dynamic web applications with React.',
          category: 'Web Development',
          subcategory: 'Frontend Development',
          level: 'Intermediate',
          thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1200&q=80',
          duration: '24 hours',
          price: 499,
          currency: 'INR',
          status: 'published',
          language: 'Telugu',
          instructor: {
            uid: 'instructor-2',
            name: 'Anil Kumar',
          },
          lessonsCount: 32,
          modulesCount: 6,
          studentsEnrolled: 890,
          rating: 4.7,
          totalRatings: 112,
          tags: ['react', 'javascript', 'frontend', 'web-dev'],
          prerequisites: ['HTML, CSS, and basic JavaScript'],
          learningOutcomes: ['Build reusable UI components', 'Manage state with Context/Redux', 'Consume RESTful APIs'],
          certificate: true,
          featured: false,
          createdBy: 'seeder',
        },
        {
          title: 'Node.js Backend Development',
          slug: 'nodejs-backend-development',
          description: 'Learn to build scalable and robust backend architectures using Node.js, Express, and Firestore database. Covers REST APIs, Authentication, Middleware, and Testing.',
          shortDescription: 'Build fast backend APIs with Node.js and Express.',
          category: 'Web Development',
          subcategory: 'Backend Development',
          level: 'Intermediate',
          thumbnail: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1200&q=80',
          duration: '18 hours',
          price: 599,
          currency: 'INR',
          status: 'published',
          language: 'English',
          instructor: {
            uid: 'instructor-1',
            name: 'Shaivika AI Team',
          },
          lessonsCount: 22,
          modulesCount: 5,
          studentsEnrolled: 540,
          rating: 4.6,
          totalRatings: 67,
          tags: ['node', 'express', 'backend', 'api'],
          prerequisites: ['Intermediate JavaScript'],
          learningOutcomes: ['Develop secure RESTful services', 'Implement JWT/Firebase Auth', 'Connect to databases'],
          certificate: true,
          featured: false,
          createdBy: 'seeder',
        },
        {
          title: 'AI Fundamentals',
          slug: 'ai-fundamentals',
          description: 'Explore the principles of Artificial Intelligence, including Machine Learning, Deep Learning, Natural Language Processing, and Computer Vision.',
          shortDescription: 'Your gateway to the world of Artificial Intelligence.',
          category: 'Artificial Intelligence',
          subcategory: 'AI Core',
          level: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80',
          duration: '12 hours',
          price: 0,
          currency: 'INR',
          status: 'published',
          language: 'Hindi',
          instructor: {
            uid: 'instructor-3',
            name: 'Priya Sharma',
          },
          lessonsCount: 10,
          modulesCount: 3,
          studentsEnrolled: 1200,
          rating: 4.8,
          totalRatings: 320,
          tags: ['ai', 'machine-learning', 'nlp', 'data-science'],
          prerequisites: ['Basic math, no coding background required'],
          learningOutcomes: ['Understand AI terminologies', 'Identify use cases for AI', 'Analyze ethical aspects of AI'],
          certificate: true,
          featured: true,
          createdBy: 'seeder',
        },
        {
          title: 'Prompt Engineering',
          slug: 'prompt-engineering',
          description: 'Master the art of writing highly effective prompts for Large Language Models like GPT-4, Gemini, and Claude. Covers zero-shot, few-shot, chain-of-thought, and system prompts.',
          shortDescription: 'Unlock the full potential of Generative AI.',
          category: 'Artificial Intelligence',
          subcategory: 'Generative AI',
          level: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
          duration: '6 hours',
          price: 199,
          currency: 'INR',
          status: 'published',
          language: 'English',
          instructor: {
            uid: 'instructor-1',
            name: 'Shaivika AI Team',
          },
          lessonsCount: 8,
          modulesCount: 2,
          studentsEnrolled: 2500,
          rating: 4.9,
          totalRatings: 610,
          tags: ['prompt-engineering', 'chatgpt', 'gemini', 'gen-ai'],
          prerequisites: ['None'],
          learningOutcomes: ['Design precise instructions for LLMs', 'Reduce model hallucinations', 'Automate workflows with prompts'],
          certificate: true,
          featured: true,
          createdBy: 'seeder',
        },
        {
          title: 'Python Programming',
          slug: 'python-programming',
          description: 'Comprehensive guide to Python. Learn data structures, OOP, file handling, libraries like Pandas & NumPy, and script automation from scratch.',
          shortDescription: 'Learn Python programming language from the ground up.',
          category: 'Programming',
          subcategory: 'Python',
          level: 'Beginner',
          thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1200&q=80',
          duration: '16 hours',
          price: 399,
          currency: 'INR',
          status: 'draft',
          language: 'English',
          instructor: {
            uid: 'instructor-1',
            name: 'Shaivika AI Team',
          },
          lessonsCount: 20,
          modulesCount: 4,
          studentsEnrolled: 0,
          rating: 0,
          totalRatings: 0,
          tags: ['python', 'programming', 'basics', 'data-structures'],
          prerequisites: ['Basic math skills'],
          learningOutcomes: ['Write standard Python scripts', 'Understand Object-Oriented programming', 'Build basic data pipelines'],
          certificate: true,
          featured: false,
          createdBy: 'seeder',
        },
        {
          title: 'Docker & Kubernetes',
          slug: 'docker-kubernetes',
          description: 'Learn containerization with Docker and container orchestration with Kubernetes. Deploy and scale microservices apps in production environments.',
          shortDescription: 'Master containerization and cluster orchestration.',
          category: 'DevOps',
          subcategory: 'Containers',
          level: 'Advanced',
          thumbnail: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=600&q=80',
          bannerImage: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=1200&q=80',
          duration: '15 hours',
          price: 699,
          currency: 'INR',
          status: 'published',
          language: 'English',
          instructor: {
            uid: 'instructor-1',
            name: 'Shaivika AI Team',
          },
          lessonsCount: 18,
          modulesCount: 4,
          studentsEnrolled: 150,
          rating: 4.9,
          totalRatings: 18,
          tags: ['docker', 'kubernetes', 'containers', 'devops', 'microservices'],
          prerequisites: ['Basic Linux command line knowledge'],
          learningOutcomes: ['Write Dockerfiles and compose files', 'Deploy multi-container apps on K8s', 'Manage cluster resources & scaling'],
          certificate: true,
          featured: false,
          createdBy: 'seeder',
        },
      ];

      console.log('Seeding sample courses into Firestore...');
      const batch = this.collection().firestore.batch();

      for (const courseData of sampleCourses) {
        const docRef = this.collection().doc();
        const course: Course = {
          ...courseData,
          id: docRef.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        batch.set(docRef, toDocument(course));
      }

      await batch.commit();
      console.log(`Successfully seeded ${sampleCourses.length} sample courses into the courses collection.`);
    } catch (error) {
      console.error('Error seeding sample courses:', error);
    }
  }
}
export default CourseService;

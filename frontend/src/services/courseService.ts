import { db } from '@/firebase';
import { doc, setDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { ICourse, CreateCourseDTO, UpdateCourseDTO, CourseFilterOptions, CoursePaginationResult } from '../../../shared/types/course';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const DEFAULT_COURSES: ICourse[] = [
  {
    id: 'course_linux_101',
    title: 'Linux Systems & Administration Mastery',
    slug: 'linux-systems-administration-mastery',
    shortDescription: 'Enterprise curriculum covering Linux Architecture, Kernel Mechanics, Permissions, Systemd, Bash Scripting, and SSH Security.',
    description: `Welcome to Linux Systems & Administration Mastery! Linux powers modern cloud infrastructure, supercomputers, and enterprise AI clusters. In this comprehensive production-ready track, you will explore Linux Kernel mechanics, master file system hierarchy standards (FHS), manage systemd background daemons, automate workflows via Bash scripts, and harden network security using SSH and host firewalls.`,
    thumbnail: '/assets/images/linux_course_thumbnail.png',
    banner: '/assets/images/linux_os_architecture.png',
    category: 'Linux & Systems',
    level: 'all_levels',
    duration: '32 hrs',
    language: 'English',
    price: 0,
    instructor: {
      id: 'inst_bhanu',
      name: 'Bhanu Prakash Achari',
      role: 'Linux Systems Architect & LMS Specialist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    skills: ['Linux CLI', 'Kernel Mechanics', 'Systemd Services', 'POSIX & ACL Permissions', 'Bash Automation', 'SSH & Firewall Security'],
    prerequisites: ['Basic computer literacy', 'Terminal awareness is helpful but not required'],
    learningOutcomes: [
      'Understand Monolithic Kernel architecture, LKMs, and System Call execution',
      'Manage User & Group security permissions using octal notation and ACLs',
      'Control system daemons using systemctl and inspect binary logs with journalctl',
      'Write modular Bash automation scripts with control loops and position arguments',
      'Harden remote SSH daemons and configure UFW firewall rules',
    ],
    status: 'published',
    visibility: 'public',
    featured: true,
    tags: ['linux', 'sysadmin', 'bash', 'kernel', 'devops', 'security'],
    enrollmentCount: 28900,
    rating: 4.9,
    ratingCount: 1450,
    syllabus: [
      {
        id: 'm1',
        title: '🟢 Module 1: Linux Architecture, Kernel & CLI Fundamentals',
        description: 'OS Fundamentals, Kernel Mechanics (LKMs, Syscalls), Directory Navigation, Text Editors (Vim/Nano), and I/O Pipelines.',
        duration: '6 hrs 30 mins',
        lessonsCount: 5,
      },
      {
        id: 'm2',
        title: '🟡 Module 2: File System Hierarchy, Permissions & Ownership',
        description: 'Filesystem Hierarchy Standard (FHS), User & Group Administration, Octal Permission Matrix, and ACL Security.',
        duration: '8 hrs 15 mins',
        lessonsCount: 4,
      },
      {
        id: 'm3',
        title: '🔵 Module 3: Process Management, Systemd Services & Cron Jobs',
        description: 'Process Lifecycles (PID, htop), Termination Signals (SIGKILL), Systemctl Daemons, and Crontab Task Automation.',
        duration: '9 hrs 45 mins',
        lessonsCount: 4,
      },
      {
        id: 'm4',
        title: '🔴 Module 4: Bash Scripting, Networking & Security Hardening',
        description: 'Bash Script Control Structures, IP Networking Diagnostics, SSH Cryptographic Keys, and Host Firewall Hardening.',
        duration: '7 hrs 30 mins',
        lessonsCount: 4,
      },
    ],
    createdAt: new Date('2026-01-15').toISOString(),
    updatedAt: new Date('2026-02-10').toISOString(),
  },
  {
    id: 'course_ai_llm_202',
    title: 'Enterprise AI & LLM Infrastructure Engineering',
    slug: 'enterprise-ai-llm-infrastructure-engineering',
    shortDescription: 'Deploy, fine-tune, and scale open-source Large Language Models with PyTorch, vLLM, and Docker.',
    description: `Deep dive into the architecture of modern AI models. Learn prompt engineering, RAG (Retrieval Augmented Generation), vector database integration, parameter-efficient fine-tuning (LoRA), and high-performance vLLM deployment on cloud GPUs.`,
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&auto=format&fit=crop&q=80',
    category: 'AI & Data',
    level: 'advanced',
    duration: '45 hrs',
    language: 'English',
    price: 0,
    instructor: {
      id: 'inst_bhanu',
      name: 'Bhanu Prakash Achari',
      role: 'Principal AI Engineer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    skills: ['PyTorch', 'vLLM', 'RAG', 'Vector Databases', 'LangChain', 'Fine-Tuning'],
    prerequisites: ['Python proficiency', 'Linear Algebra basics'],
    learningOutcomes: [
      'Architect scalable RAG systems with Pinecone & Qdrant',
      'Optimize GPU memory usage for 70B parameter models using Quantization (AWQ/GPTQ)',
      'Build real-time AI agents with tool use and streaming responses',
    ],
    status: 'published',
    visibility: 'public',
    featured: true,
    tags: ['ai', 'llm', 'pytorch', 'rag', 'python'],
    enrollmentCount: 14200,
    rating: 4.95,
    ratingCount: 890,
    syllabus: [
      { id: 'm1', title: 'Module 1: LLM Fundamentals & Transformer Architecture', duration: '10 hrs 00 mins', lessonsCount: 10 },
      { id: 'm2', title: 'Module 2: RAG Systems & Vector Database Engineering', duration: '12 hrs 30 mins', lessonsCount: 14 },
      { id: 'm3', title: 'Module 3: Fine-Tuning & Quantization (QLoRA)', duration: '13 hrs 15 mins', lessonsCount: 15 },
      { id: 'm4', title: 'Module 4: Enterprise Production Deployment with vLLM', duration: '9 hrs 15 mins', lessonsCount: 10 },
    ],
    createdAt: new Date('2026-02-01').toISOString(),
    updatedAt: new Date('2026-03-01').toISOString(),
  },
  {
    id: 'course_devops_303',
    title: 'Cloud-Native Kubernetes & DevOps Masterclass',
    slug: 'cloud-native-kubernetes-devops-masterclass',
    shortDescription: 'Master Containerization with Docker, Kubernetes Cluster Administration, Helm, and GitOps CI/CD pipelines.',
    description: `Learn how to containerize microservices, deploy multi-node Kubernetes clusters, orchestrate Helm releases, configure ingress controllers, and implement automated GitOps workflows with ArgoCD and GitHub Actions.`,
    thumbnail: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&auto=format&fit=crop&q=80',
    banner: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    category: 'DevOps',
    level: 'intermediate',
    duration: '40 hrs',
    language: 'English',
    price: 0,
    instructor: {
      id: 'inst_bhanu',
      name: 'Bhanu Prakash Achari',
      role: 'DevOps Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    skills: ['Docker', 'Kubernetes', 'Helm', 'ArgoCD', 'CI/CD', 'Prometheus'],
    prerequisites: ['Linux terminal basics', 'Basic understanding of HTTP & microservices'],
    learningOutcomes: [
      'Write production Dockerfiles and optimize container image size',
      'Manage Kubernetes Deployments, StatefulSets, Services, and Ingress',
      'Implement zero-downtime rolling upgrades and automated canary deployments',
    ],
    status: 'published',
    visibility: 'public',
    featured: false,
    tags: ['devops', 'kubernetes', 'docker', 'cloud'],
    enrollmentCount: 9800,
    rating: 4.88,
    ratingCount: 620,
    syllabus: [
      { id: 'm1', title: 'Module 1: Docker Deep Dive & Multistage Builds', duration: '8 hrs 30 mins', lessonsCount: 8 },
      { id: 'm2', title: 'Module 2: Kubernetes Primitives & Architecture', duration: '12 hrs 15 mins', lessonsCount: 12 },
      { id: 'm3', title: 'Module 3: Helm Package Manager & Ingress Control', duration: '10 hrs 00 mins', lessonsCount: 10 },
      { id: 'm4', title: 'Module 4: GitOps with ArgoCD & Monitoring', duration: '9 hrs 15 mins', lessonsCount: 10 },
    ],
    createdAt: new Date('2026-02-20').toISOString(),
    updatedAt: new Date('2026-03-05').toISOString(),
  },
];

export interface EnrollmentRecord {
  courseId: string;
  progress: number;
  enrolledAt: string;
}

class CourseService {
  private localCacheKey = 'shaivika_enterprise_courses';
  private enrollmentsKey = 'shaivika_user_enrollments';
  private pointsKey = 'shaivika_user_xp_points';

  private getStoredCourses(): ICourse[] {
    const data = localStorage.getItem(this.localCacheKey);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.warn('Error parsing cached course data:', e);
      }
    }
    localStorage.setItem(this.localCacheKey, JSON.stringify(DEFAULT_COURSES));
    return DEFAULT_COURSES;
  }

  private saveStoredCourses(courses: ICourse[]): void {
    localStorage.setItem(this.localCacheKey, JSON.stringify(courses));
  }

  private getStoredEnrollments(): Record<string, EnrollmentRecord[]> {
    const data = localStorage.getItem(this.enrollmentsKey);
    if (data) {
      try {
        return JSON.parse(data);
      } catch (e) {}
    }
    const defaultEnrollments: Record<string, EnrollmentRecord[]> = {
      default_student: [
        { courseId: 'course_linux_101', progress: 25, enrolledAt: new Date().toISOString() },
        { courseId: 'course_ai_llm_202', progress: 10, enrolledAt: new Date().toISOString() },
      ],
    };
    localStorage.setItem(this.enrollmentsKey, JSON.stringify(defaultEnrollments));
    return defaultEnrollments;
  }

  private saveStoredEnrollments(records: Record<string, EnrollmentRecord[]>): void {
    localStorage.setItem(this.enrollmentsKey, JSON.stringify(records));
  }

  getUserXPPoints(userId = 'default_student'): number {
    const pts = localStorage.getItem(`${this.pointsKey}_${userId}`);
    return pts ? parseInt(pts, 10) : 150;
  }

  addXPPoints(points: number, userId = 'default_student'): number {
    const current = this.getUserXPPoints(userId);
    const updated = current + points;
    localStorage.setItem(`${this.pointsKey}_${userId}`, String(updated));
    return updated;
  }

  async getCourses(options: CourseFilterOptions = {}): Promise<CoursePaginationResult> {
    try {
      const params = new URLSearchParams();
      if (options.search) params.append('search', options.search);
      if (options.category) params.append('category', options.category);
      if (options.level) params.append('level', options.level);
      if (options.status) params.append('status', options.status);
      if (options.page) params.append('page', String(options.page));
      if (options.limit) params.append('limit', String(options.limit));

      const res = await fetch(`${API_BASE_URL}/courses?${params.toString()}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          return json.data;
        }
      }
    } catch (err) {}

    let list = this.getStoredCourses();

    if (options.status && options.status !== 'all') {
      list = list.filter((c) => c.status === options.status);
    }
    if (options.category && options.category !== 'All') {
      list = list.filter((c) => c.category === options.category);
    }
    if (options.level && options.level !== 'all') {
      list = list.filter((c) => c.level === options.level);
    }
    if (options.search) {
      const term = options.search.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(term) ||
          c.shortDescription.toLowerCase().includes(term) ||
          c.category.toLowerCase().includes(term) ||
          c.skills.some((s) => s.toLowerCase().includes(term))
      );
    }

    const page = options.page || 1;
    const limit = options.limit || 10;
    const total = list.length;
    const totalPages = Math.ceil(total / limit);
    const paginated = list.slice((page - 1) * limit, page * limit);

    return {
      courses: paginated,
      total,
      page,
      limit,
      totalPages,
    };
  }

  async getCourseBySlugOrId(idOrSlug: string): Promise<ICourse | null> {
    try {
      const res = await fetch(`${API_BASE_URL}/courses/${idOrSlug}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) return json.data;
      }
    } catch (e) {}

    const list = this.getStoredCourses();
    return list.find((c) => c.id === idOrSlug || c.slug === idOrSlug) || null;
  }

  async createCourse(dto: CreateCourseDTO): Promise<ICourse> {
    try {
      const token = localStorage.getItem('shaivika_auth_token');
      const res = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...dto, price: 0 }),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch (e) {}

    const list = this.getStoredCourses();
    const id = `course_${Date.now()}`;
    const slug = dto.slug || dto.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const now = new Date().toISOString();

    const created: ICourse = {
      ...dto,
      id,
      slug,
      price: 0,
      banner: dto.banner || '',
      enrollmentCount: 0,
      rating: 5.0,
      ratingCount: 0,
      skills: dto.skills || [],
      prerequisites: dto.prerequisites || [],
      learningOutcomes: dto.learningOutcomes || [],
      syllabus: dto.syllabus || [],
      tags: dto.tags || [],
      createdAt: now,
      updatedAt: now,
    };

    const updatedList = [created, ...list];
    this.saveStoredCourses(updatedList);

    if (db) {
      try {
        await setDoc(doc(db, 'courses', id), created);
      } catch (err) {}
    }

    return created;
  }

  async updateCourse(id: string, updates: UpdateCourseDTO): Promise<ICourse | null> {
    try {
      const token = localStorage.getItem('shaivika_auth_token');
      const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (res.ok) {
        const json = await res.json();
        if (json.success) return json.data;
      }
    } catch (e) {}

    const list = this.getStoredCourses();
    const index = list.findIndex((c) => c.id === id);
    if (index === -1) return null;

    const existing = list[index];
    const updated: ICourse = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    list[index] = updated;
    this.saveStoredCourses(list);

    if (db) {
      try {
        await updateDoc(doc(db, 'courses', id), updated as any);
      } catch (err) {}
    }

    return updated;
  }

  async deleteCourse(id: string): Promise<boolean> {
    try {
      const token = localStorage.getItem('shaivika_auth_token');
      const res = await fetch(`${API_BASE_URL}/courses/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) return true;
    } catch (e) {}

    const list = this.getStoredCourses();
    const filtered = list.filter((c) => c.id !== id);
    this.saveStoredCourses(filtered);

    if (db) {
      try {
        await deleteDoc(doc(db, 'courses', id));
      } catch (err) {}
    }

    return true;
  }

  async publishCourse(id: string): Promise<ICourse | null> {
    return this.updateCourse(id, { status: 'published' });
  }

  async unpublishCourse(id: string): Promise<ICourse | null> {
    return this.updateCourse(id, { status: 'draft' });
  }

  async archiveCourse(id: string): Promise<ICourse | null> {
    return this.updateCourse(id, { status: 'archived' });
  }

  async duplicateCourse(id: string): Promise<ICourse | null> {
    const existing = await this.getCourseBySlugOrId(id);
    if (!existing) return null;

    const dto: CreateCourseDTO = {
      title: `${existing.title} (Copy)`,
      slug: `${existing.slug}-copy-${Date.now().toString().slice(-4)}`,
      shortDescription: existing.shortDescription,
      description: existing.description,
      thumbnail: existing.thumbnail,
      banner: existing.banner,
      category: existing.category,
      level: existing.level,
      duration: existing.duration,
      language: existing.language,
      price: 0,
      instructor: existing.instructor,
      skills: existing.skills,
      prerequisites: existing.prerequisites,
      learningOutcomes: existing.learningOutcomes,
      status: 'draft',
      visibility: existing.visibility,
      featured: false,
      tags: existing.tags,
      syllabus: existing.syllabus,
    };

    return this.createCourse(dto);
  }

  // --- Dynamic Enrollment & Completion Methods ---

  isCourseEnrolled(courseId: string, userId = 'default_student'): boolean {
    const all = this.getStoredEnrollments();
    const userRecords = all[userId] || [];
    return userRecords.some((r) => r.courseId === courseId);
  }

  async enrollCourse(courseId: string, userId = 'default_student'): Promise<{ success: boolean; message: string; isEnrolled: boolean }> {
    const all = this.getStoredEnrollments();
    const userRecords = all[userId] || [];

    const existingIndex = userRecords.findIndex((r) => r.courseId === courseId);
    if (existingIndex !== -1) {
      return {
        success: true,
        message: 'You are already enrolled in this course track!',
        isEnrolled: true,
      };
    }

    const newRecord: EnrollmentRecord = {
      courseId,
      progress: 10,
      enrolledAt: new Date().toISOString(),
    };

    all[userId] = [newRecord, ...userRecords];
    this.saveStoredEnrollments(all);

    const courses = this.getStoredCourses();
    const target = courses.find((c) => c.id === courseId);
    if (target) {
      target.enrollmentCount = (target.enrollmentCount || 0) + 1;
      this.saveStoredCourses(courses);
    }

    return {
      success: true,
      message: 'Enrolled successfully! You now have full access to this course.',
      isEnrolled: true,
    };
  }

  async getEnrolledCourses(userId = 'default_student'): Promise<ICourse[]> {
    const allEnrollments = this.getStoredEnrollments();
    const userRecords = allEnrollments[userId] || [];

    const courses = this.getStoredCourses();
    const enrolledList: ICourse[] = [];

    for (const record of userRecords) {
      const course = courses.find((c) => c.id === record.courseId);
      if (course) {
        enrolledList.push({
          ...course,
          progress: record.progress,
          isEnrolled: true,
        });
      }
    }

    return enrolledList;
  }

  async updateCourseProgress(courseId: string, progress: number, userId = 'default_student'): Promise<void> {
    const all = this.getStoredEnrollments();
    const userRecords = all[userId] || [];
    const index = userRecords.findIndex((r) => r.courseId === courseId);
    if (index !== -1) {
      userRecords[index].progress = Math.min(100, Math.max(0, progress));
      all[userId] = userRecords;
      this.saveStoredEnrollments(all);
    }
  }

  async bookmarkCourse(courseId: string, userId = 'default_student'): Promise<{ bookmarked: boolean }> {
    const key = `bookmark_${userId}_${courseId}`;
    const current = localStorage.getItem(key) === 'true';
    localStorage.setItem(key, String(!current));
    return { bookmarked: !current };
  }
}

export const courseService = new CourseService();

import { z } from 'zod';

export type CourseStatus = 'draft' | 'published' | 'archived';
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type CourseLanguage = 'English' | 'Telugu' | 'Hindi';

export type CourseCategory = 
  | 'Programming'
  | 'Artificial Intelligence'
  | 'Machine Learning'
  | 'Cloud Computing'
  | 'Cyber Security'
  | 'Linux'
  | 'DevOps'
  | 'Git & GitHub'
  | 'Web Development'
  | 'Data Structures';

export interface Instructor {
  uid: string;
  name: string;
  avatar?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: CourseCategory | string;
  subcategory: string;
  level: CourseLevel;
  thumbnail: string;
  bannerImage?: string;
  duration: string;
  price: number;
  currency: string;
  status: CourseStatus;
  language: CourseLanguage;
  instructor: Instructor;
  lessonsCount: number;
  modulesCount: number;
  studentsEnrolled: number;
  rating: number;
  totalRatings: number;
  tags: string[];
  prerequisites: string[];
  learningOutcomes: string[];
  certificate: boolean;
  featured: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Zod schemas for validation
export const CourseStatusSchema = z.enum(['draft', 'published', 'archived']);
export const CourseLevelSchema = z.enum(['Beginner', 'Intermediate', 'Advanced']);
export const CourseLanguageSchema = z.enum(['English', 'Telugu', 'Hindi']);

export const CourseValidationSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  })
    .min(3, 'Title must be at least 3 characters long')
    .max(100, 'Title cannot exceed 100 characters'),

  slug: z.string({
    required_error: 'Slug is required',
  })
    .min(3, 'Slug must be at least 3 characters long')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens (e.g., react-from-zero-to-hero)'),

  description: z.string({
    required_error: 'Description is required',
  })
    .min(10, 'Description must be at least 10 characters long'),

  shortDescription: z.string().max(250, 'Short description cannot exceed 250 characters').default(''),

  category: z.string({
    required_error: 'Category is required',
  })
    .min(1, 'Category cannot be empty'),

  subcategory: z.string().default(''),

  level: CourseLevelSchema,

  thumbnail: z.string({
    required_error: 'Thumbnail URL is required',
  })
    .url('Thumbnail must be a valid URL'),

  bannerImage: z.string().url('Banner image must be a valid URL').optional().or(z.literal('')),

  duration: z.string({
    required_error: 'Duration is required',
  })
    .min(1, 'Duration is required'),

  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  })
    .min(0, 'Price must be a non-negative number'),

  currency: z.string().default('INR'),

  status: CourseStatusSchema.default('draft'),

  language: CourseLanguageSchema.default('English'),

  instructor: z.object({
    uid: z.string().min(1, 'Instructor UID is required'),
    name: z.string().min(1, 'Instructor name is required'),
    avatar: z.string().url().optional(),
  }),

  lessonsCount: z.number().int().nonnegative().default(0),
  modulesCount: z.number().int().nonnegative().default(0),
  studentsEnrolled: z.number().int().nonnegative().default(0),
  rating: z.number().min(0).max(5).default(0),
  totalRatings: z.number().int().nonnegative().default(0),
  tags: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  learningOutcomes: z.array(z.string()).default([]),
  certificate: z.boolean().default(false),
  featured: z.boolean().default(false),
  createdBy: z.string().min(1, 'CreatedBy UID is required'),
});

export type CreateCourseInput = z.infer<typeof CourseValidationSchema>;
export type UpdateCourseInput = Partial<CreateCourseInput>;

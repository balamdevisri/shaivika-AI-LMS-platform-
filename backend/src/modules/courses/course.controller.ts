import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { formatResponse } from '../../utils/responseFormatter';
import { CourseService } from './course.service';

export class CourseController {
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  createCourse = asyncHandler(async (req: Request, res: Response) => {
    const createdBy = (req as any).user?.uid || 'anonymous';
    const courseData = { ...req.body, createdBy };
    const course = await this.courseService.createCourse(courseData);
    res.status(201).json(formatResponse(true, course, 'Course created successfully'));
  });

  updateCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await this.courseService.updateCourse(id as string, req.body);
    res.status(200).json(formatResponse(true, course, 'Course updated successfully'));
  });

  deleteCourse = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.courseService.deleteCourse(id as string);
    res.status(200).json(formatResponse(true, null, 'Course deleted successfully'));
  });

  getCourseById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const course = await this.courseService.getCourseById(id as string);
    if (!course) {
      res.status(404).json(formatResponse(false, null, 'Course not found'));
      return;
    }

    const user = (req as any).user;
    if (course.status !== 'published' && (!user || user.role !== 'admin')) {
      res.status(403).json(formatResponse(false, null, 'Forbidden: Course is not published'));
      return;
    }

    res.status(200).json(formatResponse(true, course, 'Course retrieved successfully'));
  });

  getCourses = asyncHandler(async (req: Request, res: Response) => {
    const user = (req as any).user;
    let courses;
    if (user && user.role === 'admin') {
      courses = await this.courseService.getCourses();
    } else {
      courses = await this.courseService.getPublishedCourses();
    }
    res.status(200).json(formatResponse(true, courses, 'Courses retrieved successfully'));
  });

  getPublishedCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await this.courseService.getPublishedCourses();
    res.status(200).json(formatResponse(true, courses, 'Published courses retrieved successfully'));
  });

  searchCourses = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;
    const queryStr = typeof q === 'string' ? q : '';
    const courses = await this.courseService.searchCourses(queryStr);
    res.status(200).json(formatResponse(true, courses, 'Search results retrieved successfully'));
  });

  filterCourses = asyncHandler(async (req: Request, res: Response) => {
    const { category, level, language, status } = req.query;
    const filters: any = {};
    if (category) filters.category = category as string;
    if (level) filters.level = level as string;
    if (language) filters.language = language as string;

    const user = (req as any).user;
    if (status && user && user.role === 'admin') {
      filters.status = status as string;
    } else {
      filters.status = 'published';
    }

    const courses = await this.courseService.filterCourses(filters);
    res.status(200).json(formatResponse(true, courses, 'Filtered courses retrieved successfully'));
  });

  getFeaturedCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await this.courseService.getFeaturedCourses();
    res.status(200).json(formatResponse(true, courses, 'Featured courses retrieved successfully'));
  });
}

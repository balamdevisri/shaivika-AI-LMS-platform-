import { CourseService as ModularCourseService } from '../../services/course/CourseService';
import { Course } from '../../types/course';

export class CourseService {
  private modularService: ModularCourseService;

  constructor() {
    this.modularService = new ModularCourseService();
  }

  async getCourseBySlug(slug: string): Promise<Course | null> {
    return this.modularService.getCourseBySlug(slug);
  }

  async createCourse(data: any): Promise<Course> {
    return this.modularService.createCourse(data);
  }

  async updateCourse(id: string, data: any): Promise<Course> {
    return this.modularService.updateCourse(id, data);
  }

  async deleteCourse(id: string): Promise<boolean> {
    return this.modularService.deleteCourse(id);
  }

  async getCourseById(id: string): Promise<Course | null> {
    return this.modularService.getCourseById(id);
  }

  async getCourses(): Promise<Course[]> {
    return this.modularService.getCourses();
  }

  async getPublishedCourses(): Promise<Course[]> {
    return this.modularService.getPublishedCourses();
  }

  async searchCourses(query: string): Promise<Course[]> {
    return this.modularService.searchCourses(query);
  }

  async filterCourses(filters: {
    category?: string;
    level?: string;
    language?: string;
    status?: string;
  }): Promise<Course[]> {
    return this.modularService.filterCourses(filters);
  }

  async getFeaturedCourses(): Promise<Course[]> {
    return this.modularService.getFeaturedCourses();
  }

  async seedSampleCourses(): Promise<void> {
    return this.modularService.seedSampleCourses();
  }
}

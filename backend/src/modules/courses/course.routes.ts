import { Router } from 'express';
import { CourseController } from './course.controller';
import { verifyFirebaseToken, requireRole } from '../../middleware/auth.middleware';

const router = Router();
const controller = new CourseController();

// Student / general authenticated read endpoints
router.get('/published', verifyFirebaseToken, controller.getPublishedCourses);
router.get('/featured', verifyFirebaseToken, controller.getFeaturedCourses);
router.get('/search', verifyFirebaseToken, controller.searchCourses);
router.get('/filter', verifyFirebaseToken, controller.filterCourses);
router.get('/:id', verifyFirebaseToken, controller.getCourseById);
router.get('/', verifyFirebaseToken, controller.getCourses);

// Admin only write endpoints
router.post('/', verifyFirebaseToken, requireRole('admin'), controller.createCourse);
router.put('/:id', verifyFirebaseToken, requireRole('admin'), controller.updateCourse);
router.delete('/:id', verifyFirebaseToken, requireRole('admin'), controller.deleteCourse);

export default router;

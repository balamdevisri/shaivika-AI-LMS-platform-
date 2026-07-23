import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { DashboardLayout } from '@/layouts/DashboardLayout';

import { LandingPage } from '@/pages/LandingPage';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { VerifyEmail } from '@/pages/auth/VerifyEmail';
import { Unauthorized } from '@/pages/auth/Unauthorized';

import { Dashboard } from '@/pages/dashboard/Dashboard';
import { Profile } from '@/pages/dashboard/Profile';

// Course Pages
import { CoursesList } from '@/pages/courses/CoursesList';
import { CourseView } from '@/pages/courses/CourseView';

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminCourses } from '@/pages/admin/AdminCourses';
import { AdminCourseCreate } from '@/pages/admin/AdminCourseCreate';
import { AdminCourseEdit } from '@/pages/admin/AdminCourseEdit';
import { AdminStudents } from '@/pages/admin/AdminStudents';
import { AdminInstructors } from '@/pages/admin/AdminInstructors';

import { StudentRoute } from '@/components/auth/StudentRoute';
import { AdminRoute } from '@/components/auth/AdminRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'courses', element: <CoursesList /> },
      { path: 'course/:slug', element: <CourseView /> },
      { path: 'courses/:courseId', element: <CourseView /> },
      { path: 'unauthorized', element: <Unauthorized /> },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'verify-email', element: <VerifyEmail /> },
    ],
  },
  // Student Protected Routes
  {
    path: '/',
    element: (
      <StudentRoute>
        <DashboardLayout />
      </StudentRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'dashboard/courses', element: <CoursesList /> },
      { path: 'dashboard/course/:slug', element: <CourseView /> },
      { path: 'dashboard/courses/:courseId', element: <CourseView /> },
      { path: 'profile', element: <Profile /> },
    ],
  },
  // Admin Protected Routes
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      { path: 'dashboard', element: <AdminDashboard /> },
      { path: 'courses', element: <AdminCourses /> },
      { path: 'courses/create', element: <AdminCourseCreate /> },
      { path: 'courses/edit/:id', element: <AdminCourseEdit /> },
      { path: 'students', element: <AdminStudents /> },
      { path: 'instructors', element: <AdminInstructors /> },
    ],
  },
  // Fallback 404
  {
    path: '*',
    element: <Unauthorized />,
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;

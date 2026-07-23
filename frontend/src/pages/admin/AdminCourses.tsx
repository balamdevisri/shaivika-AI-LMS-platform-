import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import type { ICourse, CourseStatus } from '../../../../shared/types/course';
import { courseService } from '../../services/courseService';
import { CourseHeader } from '../../components/courses/CourseHeader';
import { CourseTable } from '../../components/courses/CourseTable';
import { SearchBar } from '../../components/courses/SearchBar';
import { CategoryFilter } from '../../components/courses/CategoryFilter';
import { Pagination } from '../../components/courses/Pagination';
import { EmptyState } from '../../components/courses/EmptyState';
import { LoadingSkeleton } from '../../components/courses/LoadingSkeleton';
import { Plus, BookOpen, CheckCircle2, Archive, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

export const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<CourseStatus | 'all'>('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const categories = ['All', 'Linux & Systems', 'AI & Data', 'DevOps', 'Development', 'Cybersecurity'];

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const result = await courseService.getCourses({
        search,
        category: selectedCategory,
        status: selectedStatus,
        page,
        limit: 8,
      });

      setCourses(result.courses);
      setTotalPages(result.totalPages);
      setTotalCount(result.total);
    } catch (err: any) {
      toast.error('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, selectedStatus, page]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handlePublish = async (id: string) => {
    try {
      await courseService.publishCourse(id);
      toast.success('Course published successfully!');
      fetchCourses();
    } catch (e) {
      toast.error('Failed to publish course.');
    }
  };

  const handleUnpublish = async (id: string) => {
    try {
      await courseService.unpublishCourse(id);
      toast.success('Course status changed to draft.');
      fetchCourses();
    } catch (e) {
      toast.error('Failed to unpublish course.');
    }
  };

  const handleArchive = async (id: string) => {
    try {
      await courseService.archiveCourse(id);
      toast.success('Course archived.');
      fetchCourses();
    } catch (e) {
      toast.error('Failed to archive course.');
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      const copy = await courseService.duplicateCourse(id);
      if (copy) {
        toast.success(`Duplicated "${copy.title}" as draft!`);
        fetchCourses();
      }
    } catch (e) {
      toast.error('Failed to duplicate course.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this course permanently?')) return;
    try {
      await courseService.deleteCourse(id);
      toast.success('Course deleted.');
      fetchCourses();
    } catch (e) {
      toast.error('Failed to delete course.');
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedStatus('all');
    setPage(1);
  };

  return (
    <div className="space-y-8 font-['Sora'] text-slate-100 max-w-7xl mx-auto pb-16">
      <CourseHeader
        title="Admin Curriculum & Course Management"
        description="Create, publish, edit, archive, and manage technical courses and AI evaluation rubrics."
        badgeText="Admin Management Portal"
        breadcrumbs={[{ label: 'Admin', path: '/admin/dashboard' }, { label: 'Course Management' }]}
        action={
          <Link
            to="/admin/courses/create"
            className="py-3 px-5 rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-xl shadow-indigo-500/25 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Course</span>
          </Link>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Courses</span>
            <h4 className="font-heading font-extrabold text-2xl text-white">{totalCount}</h4>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Published Tracks</span>
            <h4 className="font-heading font-extrabold text-2xl text-white">
              {courses.filter((c) => c.status === 'published').length}
            </h4>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Archive className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs text-slate-400 font-semibold uppercase">Drafts & Archived</span>
            <h4 className="font-heading font-extrabold text-2xl text-white">
              {courses.filter((c) => c.status !== 'published').length}
            </h4>
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-96">
            <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => { setSelectedStatus(e.target.value as any); setPage(1); }}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none font-medium cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>

            <button
              onClick={fetchCourses}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => { setSelectedCategory(cat); setPage(1); }}
        />
      </div>

      {loading ? (
        <LoadingSkeleton count={4} variant="card" />
      ) : courses.length === 0 ? (
        <EmptyState onReset={handleResetFilters} />
      ) : (
        <div className="space-y-6">
          <CourseTable
            courses={courses}
            onPublish={handlePublish}
            onUnpublish={handleUnpublish}
            onArchive={handleArchive}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default AdminCourses;

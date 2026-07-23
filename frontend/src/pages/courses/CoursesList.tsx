import React, { useState, useEffect, useCallback } from 'react';
import type { ICourse, CourseLevel } from '../../../../shared/types/course';
import { courseService } from '../../services/courseService';
import { CourseHeader } from '../../components/courses/CourseHeader';
import { CourseGrid } from '../../components/courses/CourseGrid';
import { CourseList } from '../../components/courses/CourseList';
import { CategoryFilter } from '../../components/courses/CategoryFilter';
import { LevelFilter } from '../../components/courses/LevelFilter';
import { SearchBar } from '../../components/courses/SearchBar';
import { Pagination } from '../../components/courses/Pagination';
import { EmptyState } from '../../components/courses/EmptyState';
import { LoadingSkeleton } from '../../components/courses/LoadingSkeleton';
import { LayoutGrid, List as ListIcon } from 'lucide-react';
import { toast } from 'sonner';

export const CoursesList: React.FC = () => {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['All', 'Linux & Systems', 'AI & Data', 'DevOps', 'Development', 'Cybersecurity'];

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    try {
      const result = await courseService.getCourses({
        search,
        category: selectedCategory,
        level: selectedLevel,
        status: 'published',
        page,
        limit: 6,
      });

      setCourses(result.courses);
      setTotalPages(result.totalPages);
    } catch (err) {
      toast.error('Failed to load course catalog.');
    } finally {
      setLoading(false);
    }
  }, [search, selectedCategory, selectedLevel, page]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleReset = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedLevel('all');
    setPage(1);
  };

  return (
    <div className="space-y-8 font-['Sora'] text-slate-100 max-w-7xl mx-auto pb-16">
      <CourseHeader
        title="Enterprise AI Technical Course Catalog"
        description="Explore hands-on technical tracks powered by live interactive Linux terminals and automated AI feedback."
        badgeText="Shaivika Course Tracks"
        breadcrumbs={[{ label: 'Home', path: '/' }, { label: 'Course Catalog' }]}
      />

      <div className="space-y-4 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl shadow-xl">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-96">
            <SearchBar value={search} onChange={(val) => { setSearch(val); setPage(1); }} />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <LevelFilter selectedLevel={selectedLevel} onSelectLevel={(lvl) => { setSelectedLevel(lvl); setPage(1); }} />

            <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="List View"
              >
                <ListIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => { setSelectedCategory(cat); setPage(1); }}
        />
      </div>

      {loading ? (
        <LoadingSkeleton count={6} variant={viewMode === 'grid' ? 'card' : 'list'} />
      ) : courses.length === 0 ? (
        <EmptyState onReset={handleReset} />
      ) : (
        <div className="space-y-6">
          {viewMode === 'grid' ? (
            <CourseGrid courses={courses} />
          ) : (
            <CourseList courses={courses} />
          )}

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
};

export default CoursesList;

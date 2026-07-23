import React from 'react';
import type { CourseLevel } from '../../../../shared/types/course';

interface LevelFilterProps {
  selectedLevel: CourseLevel | 'all';
  onSelectLevel: (level: CourseLevel | 'all') => void;
}

export const LevelFilter: React.FC<LevelFilterProps> = ({ selectedLevel, onSelectLevel }) => {
  const levels: { label: string; value: CourseLevel | 'all' }[] = [
    { label: 'All Levels', value: 'all' },
    { label: 'Beginner', value: 'beginner' },
    { label: 'Intermediate', value: 'intermediate' },
    { label: 'Advanced', value: 'advanced' },
  ];

  return (
    <select
      value={selectedLevel}
      onChange={(e) => onSelectLevel(e.target.value as any)}
      className="bg-slate-900/80 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none font-['Sora'] font-medium cursor-pointer"
    >
      {levels.map((lvl) => (
        <option key={lvl.value} value={lvl.value} className="bg-slate-900 text-slate-200">
          {lvl.label}
        </option>
      ))}
    </select>
  );
};

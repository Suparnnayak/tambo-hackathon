'use client';

import { Trophy } from 'lucide-react';

interface SkillProgressProps {
  completed: number;
  total: number;
}

export default function SkillProgress({ completed, total }: SkillProgressProps) {
  const percentage = (completed / total) * 100;

  return (
    <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl border border-purple-500/30 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-purple-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Skills Mastered</h3>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-bold text-purple-400">
          {completed}/{total}
        </p>
        <p className="text-xs text-purple-300">{percentage.toFixed(0)}% Complete</p>
      </div>

      <div className="space-y-2">
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden border border-purple-500/30">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-xs text-purple-200 text-center">
          {total - completed} skills remaining
        </p>
      </div>
    </div>
  );
}

'use client';

import { CheckCircle2, Circle } from 'lucide-react';

interface Quest {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'not-started';
  progress: number;
  total: number;
}

interface DailyQuestsProps {
  quests: Quest[];
}

export default function DailyQuests({ quests }: DailyQuestsProps) {
  return (
    <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl border border-purple-500/20 p-8 mb-8">
      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
        <span>📋</span>
        Daily Quests
      </h3>

      <div className="space-y-4">
        {quests.map((quest) => {
          const progressPercent = (quest.progress / quest.total) * 100;
          const isCompleted = quest.status === 'completed';

          return (
            <div
              key={quest.id}
              className={`rounded-xl p-4 border transition-all ${
                isCompleted
                  ? 'bg-green-600/10 border-green-500/30'
                  : 'bg-slate-700/30 border-purple-500/20 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="text-green-400" size={24} />
                  ) : (
                    <Circle className="text-purple-400" size={24} />
                  )}
                </div>

                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 ${isCompleted ? 'text-green-300 line-through' : 'text-white'}`}>
                    {quest.title}
                  </h4>

                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          isCompleted
                            ? 'bg-green-500'
                            : 'bg-gradient-to-r from-purple-500 to-pink-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <span className={`text-sm font-semibold whitespace-nowrap ${isCompleted ? 'text-green-300' : 'text-purple-300'}`}>
                      {Math.round(progressPercent)}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2">
                    {quest.progress} / {quest.total} {quest.total === 1 ? 'task' : 'tasks'}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

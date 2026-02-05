'use client';

import { Flame } from 'lucide-react';

interface StreakCalendarProps {
  streak: number;
}

export default function StreakCalendar({ streak }: StreakCalendarProps) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date,
      completed: i < 5,
      today: i === 6
    };
  });

  return (
    <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-2xl border border-orange-500/30 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Flame className="text-orange-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Streak</h3>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-bold text-orange-400">{streak}</p>
        <p className="text-xs text-orange-300">days in a row</p>
      </div>

      <div className="space-y-2">
        <p className="text-xs text-orange-300 font-semibold mb-3">This Week</p>
        <div className="grid grid-cols-7 gap-2">
          {days.map((day, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${
                day.completed
                  ? 'bg-orange-500/40 text-orange-100 border border-orange-500/60'
                  : day.today
                  ? 'bg-orange-400/20 text-orange-200 border border-orange-400/50 scale-110'
                  : 'bg-slate-700/30 text-slate-400 border border-slate-600/40'
              }`}
            >
              {day.completed ? '✓' : day.today ? '→' : '○'}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

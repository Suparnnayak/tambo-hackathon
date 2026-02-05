'use client';

import { Zap } from 'lucide-react';

interface FocusMeterProps {
  value: number;
}

export default function FocusMeter({ value }: FocusMeterProps) {
  return (
    <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl border border-blue-500/30 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-blue-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Focus Meter</h3>
      </div>
      
      <div className="relative h-40 rounded-xl overflow-hidden bg-slate-800/50 border border-blue-500/30 mb-4">
        <div
          className="absolute inset-0 bg-gradient-to-t from-blue-500 to-cyan-400 transition-all duration-300"
          style={{ height: `${value}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl font-bold text-white drop-shadow-lg">{value}%</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-xs text-blue-300">
          <span>Low Focus</span>
          <span>Peak Focus</span>
        </div>
        <p className="text-xs text-blue-200 text-center">
          Keep studying to maintain focus
        </p>
      </div>
    </div>
  );
}

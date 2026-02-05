'use client';

import { Crown } from 'lucide-react';

interface BossUnlockTimerProps {
  hoursRemaining: number;
}

export default function BossUnlockTimer({ hoursRemaining }: BossUnlockTimerProps) {
  return (
    <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-2xl border border-yellow-500/30 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Crown className="text-yellow-400" size={20} />
        <h3 className="text-lg font-semibold text-white">Boss Unlock</h3>
      </div>

      <div className="mb-6">
        <p className="text-4xl font-bold text-yellow-400">
          {hoursRemaining}h
        </p>
        <p className="text-xs text-yellow-300">Until boss battle</p>
      </div>

      <div className="space-y-3">
        <p className="text-xs text-yellow-200 text-center">
          👑 Interview Round Unlocks
        </p>
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden border border-yellow-500/30">
          <div
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500"
            style={{ width: `${((24 - hoursRemaining) / 24) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

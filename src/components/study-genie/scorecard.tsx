'use client';

import { useState } from 'react';
import { Copy, Download, Share2 } from 'lucide-react';

interface ScoreCardProps {
  xpEarned: number;
  focusTime: number;
  weakAreas: string[];
  interviewReadiness: number;
  sessionDate: Date;
  onClose?: () => void;
}

export default function ScoreCard({
  xpEarned,
  focusTime,
  weakAreas,
  interviewReadiness,
  sessionDate,
  onClose
}: ScoreCardProps) {
  const [copied, setCopied] = useState(false);

  const formatFocusTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const handleShare = () => {
    const text = `I just earned ${xpEarned} XP and achieved ${interviewReadiness}% interview readiness on StudyGenie! 🎮📚`;
    if (navigator.share) {
      navigator.share({
        title: 'StudyGenie Session',
        text: text
      });
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-purple-500/40 max-w-2xl w-full overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-b border-purple-500/30 px-8 py-12 text-center relative">
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-slate-800/80 hover:bg-slate-700 rounded-full transition-all text-white text-xl font-bold border-2 border-white/20 hover:border-white/40 shadow-lg z-10"
              aria-label="Close"
            >
              ✕
            </button>
          )}
          <p className="text-5xl mb-4">🏆</p>
          <h2 className="text-3xl font-bold text-white mb-2">Session Complete!</h2>
          <p className="text-purple-200">{sessionDate.toLocaleDateString()}</p>
        </div>

        {/* Stats Grid */}
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* XP Earned */}
            <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6">
              <p className="text-purple-300 text-sm font-semibold mb-2">⭐ XP EARNED</p>
              <p className="text-4xl font-bold text-purple-400">{xpEarned}</p>
              <p className="text-xs text-purple-300 mt-2">+15 Level Progress</p>
            </div>

            {/* Focus Time */}
            <div className="bg-blue-600/20 border border-blue-500/30 rounded-xl p-6">
              <p className="text-blue-300 text-sm font-semibold mb-2">⏱️ FOCUS TIME</p>
              <p className="text-4xl font-bold text-blue-400">{formatFocusTime(focusTime)}</p>
              <p className="text-xs text-blue-300 mt-2">+2 Streak Days</p>
            </div>

            {/* Interview Readiness */}
            <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6">
              <p className="text-green-300 text-sm font-semibold mb-2">🎯 INTERVIEW READY</p>
              <p className="text-4xl font-bold text-green-400">{interviewReadiness}%</p>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${interviewReadiness}%` }}
                />
              </div>
            </div>

            {/* Streak */}
            <div className="bg-orange-600/20 border border-orange-500/30 rounded-xl p-6">
              <p className="text-orange-300 text-sm font-semibold mb-2">🔥 CURRENT STREAK</p>
              <p className="text-4xl font-bold text-orange-400">13</p>
              <p className="text-xs text-orange-300 mt-2">Days in a row</p>
            </div>
          </div>

          {/* Weak Areas */}
          {weakAreas.length > 0 && (
            <div className="bg-red-600/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>⚠️</span>
                Areas to Improve
              </h3>
              <div className="flex flex-wrap gap-2">
                {weakAreas.map((area, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-red-500/20 border border-red-500/40 rounded-lg text-red-200 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-purple-600/10 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">📝 Revision ETA</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-purple-200">Binary Trees</span>
                <span className="text-sm text-purple-400">2 days</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                <span className="text-purple-200">Graph Algorithms</span>
                <span className="text-sm text-purple-400">3 days</span>
              </div>
            </div>
          </div>

          {/* Spotify-style Share */}
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Share Your Achievement</h3>
            <p className="text-purple-200 text-sm mb-4">
              📤 "I just earned {xpEarned} XP and achieved {interviewReadiness}% interview readiness on StudyGenie! 🎮📚"
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-all"
              >
                <Share2 size={18} />
                {copied ? 'Copied!' : 'Share'}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-semibold transition-all">
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-700/50 p-6 flex justify-between">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-all">
            ← Back to Dashboard
          </button>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all transform hover:scale-105">
            Next Battle →
          </button>
        </div>
      </div>
    </div>
  );
}

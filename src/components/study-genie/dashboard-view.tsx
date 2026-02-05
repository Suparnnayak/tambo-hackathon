'use client';

import { useState } from 'react';
import FocusMeter from './widgets/focus-meter';
import StreakCalendar from './widgets/streak-calendar';
import SkillProgress from './widgets/skill-progress';
import DailyQuests from './widgets/daily-quests';
import BossUnlockTimer from './widgets/boss-unlock-timer';
import { Zap, Flame, Shield, Crown } from 'lucide-react';

interface DashboardViewProps {
  syllabus: any;
  onNavigate: (view: string) => void;
}

export default function DashboardView({ syllabus, onNavigate }: DashboardViewProps) {
  const [playerStats] = useState({
    level: 5,
    xp: 2340,
    totalXP: 5000,
    health: 85,
    focus: 65,
    streak: 12,
    skillsCompleted: 8,
    totalSkills: 18
  });

  return (
    <div className="w-full h-full overflow-y-auto">
      {/* Header with Player Stats - Enhanced */}
      <div className="bg-gradient-to-r from-purple-900/40 via-slate-900/40 to-pink-900/40 border-b border-purple-500/30 backdrop-blur-sm px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex-1">
              <p className="text-purple-300 text-sm font-semibold uppercase tracking-wider mb-2">
                📚 Current Course
              </p>
              <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-2">
                {syllabus.title}
              </h2>
              <p className="text-purple-200 text-sm">
                <span className="text-purple-300 font-semibold">ID:</span> {syllabus.course_id} • 
                <span className="text-purple-300 font-semibold ml-2">Units:</span> {syllabus.units.length} • 
                <span className="text-purple-300 font-semibold ml-2">Topics:</span> {syllabus.units.reduce((sum: number, u: any) => sum + u.topics.length, 0)}
              </p>
            </div>
            <div className="flex gap-12">
              <div className="text-right">
                <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">⭐ Level</p>
                <div className="flex items-end gap-2">
                  <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                    {playerStats.level}
                  </p>
                  <p className="text-xs text-orange-300 mb-1">{playerStats.level === 5 ? 'Novice' : 'Scholar'}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider mb-2">⚡ XP Progress</p>
                <p className="text-2xl font-bold text-pink-400">
                  {playerStats.xp} / {playerStats.totalXP}
                </p>
                <p className="text-xs text-pink-300 mt-1">
                  {Math.round((playerStats.xp / playerStats.totalXP) * 100)}% to next level
                </p>
              </div>
            </div>
          </div>

          {/* XP Progress Bar - Enhanced */}
          <div className="space-y-2">
            <div className="w-full bg-slate-700/40 rounded-full h-4 overflow-hidden border border-purple-500/20">
              <div
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-lg shadow-purple-500/50 transition-all duration-500"
                style={{ width: `${(playerStats.xp / playerStats.totalXP) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Focus Meter */}
          <div className="lg:col-span-1">
            <FocusMeter value={playerStats.focus} />
          </div>

          {/* Streak Calendar */}
          <div className="lg:col-span-1">
            <StreakCalendar streak={playerStats.streak} />
          </div>

          {/* Skill Progress */}
          <div className="lg:col-span-1">
            <SkillProgress
              completed={playerStats.skillsCompleted}
              total={playerStats.totalSkills}
            />
          </div>

          {/* Boss Unlock Timer */}
          <div className="lg:col-span-1">
            <BossUnlockTimer hoursRemaining={23} />
          </div>
        </div>

        {/* Main Actions - Enhanced */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Enter Cozy Room */}
          <button
            onClick={() => onNavigate('cozyRoom')}
            className="relative overflow-hidden group rounded-2xl p-8 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-2 border-blue-500/30 hover:border-blue-500/70 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/20 group-hover:to-cyan-600/20 transition-all" />
            <div className="relative z-10 text-center">
              <p className="text-5xl mb-4 group-hover:animate-bounce transition-all">🏠</p>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">
                Cozy Study Room
              </h3>
              <p className="text-sm text-blue-200 mb-4">Focus with lo-fi vibes & immersive ambiance</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">🎵 Music</span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">🌧️ Rain</span>
                <span className="px-2 py-1 bg-blue-500/20 rounded text-xs text-blue-300">⏱️ Timer</span>
              </div>
            </div>
          </button>

          {/* Skill Tree */}
          <button
            onClick={() => onNavigate('skillTree')}
            className="relative overflow-hidden group rounded-2xl p-8 bg-gradient-to-br from-green-600/20 to-emerald-600/20 border-2 border-green-500/30 hover:border-green-500/70 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/0 to-emerald-600/0 group-hover:from-green-600/20 group-hover:to-emerald-600/20 transition-all" />
            <div className="relative z-10 text-center">
              <p className="text-5xl mb-4 group-hover:animate-bounce transition-all">🌳</p>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-200 transition-colors">
                Skill Tree
              </h3>
              <p className="text-sm text-green-200 mb-4">Explore your learning path with prerequisites</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">📊 Progress</span>
                <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">🎯 Goals</span>
                <span className="px-2 py-1 bg-green-500/20 rounded text-xs text-green-300">🔓 Unlocks</span>
              </div>
            </div>
          </button>

          {/* Combat Mode */}
          <button
            onClick={() => onNavigate('combat')}
            className="relative overflow-hidden group rounded-2xl p-8 bg-gradient-to-br from-red-600/20 to-orange-600/20 border-2 border-red-500/30 hover:border-red-500/70 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/0 to-orange-600/0 group-hover:from-red-600/20 group-hover:to-orange-600/20 transition-all" />
            <div className="relative z-10 text-center">
              <p className="text-5xl mb-4 group-hover:animate-bounce transition-all">⚔️</p>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-200 transition-colors">
                Combat Mode
              </h3>
              <p className="text-sm text-red-200 mb-4">Battle monsters with epic quiz challenges</p>
              <div className="flex flex-wrap gap-2 justify-center">
                <span className="px-2 py-1 bg-red-500/20 rounded text-xs text-red-300">❤️ Health</span>
                <span className="px-2 py-1 bg-red-500/20 rounded text-xs text-red-300">✨ Streak</span>
                <span className="px-2 py-1 bg-red-500/20 rounded text-xs text-red-300">🏆 Rewards</span>
              </div>
            </div>
          </button>
        </div>

        {/* Daily Quests */}
        <DailyQuests quests={[
          { id: '1', title: 'Complete 3 quizzes', status: 'in-progress', progress: 2, total: 3 },
          { id: '2', title: 'Achieve 2-hour focus streak', status: 'in-progress', progress: 1.5, total: 2 },
          { id: '3', title: 'Master Arrays & Linked Lists', status: 'not-started', progress: 0, total: 1 },
          { id: '4', title: 'Practice coding problems', status: 'not-started', progress: 0, total: 5 }
        ]} />

        {/* Course Units Overview - Enhanced */}
        <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-2xl border border-purple-500/20 p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              📖 Course Curriculum
            </h3>
            <span className="px-3 py-1 bg-purple-500/20 rounded-full text-xs text-purple-300 font-semibold">
              {syllabus.units.length} Units • {syllabus.units.reduce((sum: number, u: any) => sum + u.topics.length, 0)} Topics
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {syllabus.units.map((unit: any, idx: number) => (
              <div
                key={unit.id}
                className="bg-slate-700/40 hover:bg-slate-700/60 rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all cursor-pointer group backdrop-blur-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-3xl mb-2">{['📚', '🌳', '⚡'][idx % 3]}</div>
                    <h4 className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors">
                      Unit {idx + 1}: {unit.name}
                    </h4>
                  </div>
                  <span className="px-2 py-1 bg-purple-500/20 rounded text-xs text-purple-300 font-bold">
                    {unit.topics.length} topics
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="h-2 bg-slate-600/50 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                      style={{
                        width: `${(unit.topics.filter((t: any) => t.mastered).length / unit.topics.length) * 100}%`
                      }}
                    />
                  </div>
                  <p className="text-xs text-purple-300">
                    {unit.topics.filter((t: any) => t.mastered).length}/{unit.topics.length} completed
                  </p>
                </div>

                {/* Difficulty Tags */}
                <div className="flex gap-2 flex-wrap">
                  {unit.topics.slice(0, 3).map((topic: any) => (
                    <span
                      key={topic.id}
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        topic.difficulty === 'Easy'
                          ? 'bg-green-500/20 text-green-300'
                          : topic.difficulty === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {topic.difficulty}
                    </span>
                  ))}
                  {unit.topics.length > 3 && (
                    <span className="text-xs px-2 py-1 bg-slate-600/40 text-slate-300 rounded-full">
                      +{unit.topics.length - 3} more
                    </span>
                  )}
                </div>

                {/* XP Badge */}
                <div className="mt-4 pt-4 border-t border-purple-500/10">
                  <p className="text-xs text-purple-300">
                    💪 <span className="font-bold text-yellow-400">{unit.topics.reduce((sum: number, t: any) => sum + t.xp, 0)} XP</span> available
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

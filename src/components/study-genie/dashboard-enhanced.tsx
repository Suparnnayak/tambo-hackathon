'use client';

import { useState, useEffect } from 'react';
import { 
  Zap, Flame, Trophy, Target, Book, 
  Crown, Lock, AlertTriangle, Clock, 
  Calendar, TrendingUp, Shield, Heart 
} from 'lucide-react';

interface DashboardEnhancedProps {
  syllabus: any;
  onNavigate: (view: string) => void;
}

export default function DashboardEnhanced({ syllabus, onNavigate }: DashboardEnhancedProps) {
  const [playerStats, setPlayerStats] = useState({
    level: 5,
    xp: 2340,
    totalXP: 5000,
    health: 85,
    focus: 65,
    streak: 12,
    skillsCompleted: 8,
    totalSkills: 18,
    interviewReadiness: 72
  });

  const [dailyQuests, setDailyQuests] = useState([
    { id: 1, title: 'Complete 3 quiz battles', progress: 2, total: 3, xp: 150, completed: false },
    { id: 2, title: 'Practice 2 coding challenges', progress: 1, total: 2, xp: 200, completed: false },
    { id: 3, title: 'Maintain focus for 30 minutes', progress: 18, total: 30, xp: 100, completed: false },
    { id: 4, title: 'Review 5 flashcards', progress: 5, total: 5, xp: 80, completed: true }
  ]);

  // Simulate focus meter changes
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayerStats(prev => ({
        ...prev,
        focus: Math.min(100, Math.max(0, prev.focus + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Calculate stats
  const xpPercentage = (playerStats.xp / playerStats.totalXP) * 100;
  const completionPercentage = (playerStats.skillsCompleted / playerStats.totalSkills) * 100;
  const questsCompleted = dailyQuests.filter(q => q.completed).length;
  const totalDailyXP = dailyQuests.reduce((sum, q) => sum + (q.completed ? q.xp : 0), 0);

  // Focus level categories
  const getFocusLevel = (focus: number) => {
    if (focus >= 80) return { label: 'Legendary', color: 'from-yellow-400 to-orange-500', emoji: '🔥' };
    if (focus >= 60) return { label: 'Focused', color: 'from-green-400 to-emerald-500', emoji: '⚡' };
    if (focus >= 40) return { label: 'Steady', color: 'from-blue-400 to-cyan-500', emoji: '💧' };
    return { label: 'Warming Up', color: 'from-slate-400 to-gray-500', emoji: '❄️' };
  };

  const focusLevel = getFocusLevel(playerStats.focus);

  // Streak calendar data (last 7 days)
  const streakData = Array.from({ length: 7 }, (_, i) => ({
    day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
    active: i < 5 // Last 5 days active
  }));

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
      {/* Hero Section with Player Card */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 animate-gradient-x" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        
        <div className="relative px-8 py-12 max-w-7xl mx-auto">
          {/* Course Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-4xl">📚</span>
              <div>
                <p className="text-purple-300 text-xs font-semibold uppercase tracking-wider">Knowledge Dungeon</p>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {syllabus.curriculum || 'Your Learning Quest'}
                </h1>
              </div>
            </div>
          </div>

          {/* Player Stats Card */}
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Level & XP */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Crown className="text-yellow-400" size={20} />
                  <p className="text-purple-300 text-sm font-semibold">Level & XP</p>
                </div>
                <div className="flex items-end gap-3">
                  <p className="text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
                    {playerStats.level}
                  </p>
                  <div className="mb-2">
                    <p className="text-sm text-yellow-300 font-semibold">Novice Scholar</p>
                    <p className="text-xs text-purple-300">{playerStats.xp}/{playerStats.totalXP} XP</p>
                  </div>
                </div>
                <div className="w-full bg-slate-700/40 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>

              {/* Health & Focus */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="text-red-400" size={20} />
                  <p className="text-purple-300 text-sm font-semibold">Health & Energy</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-red-300">HP</p>
                      <p className="text-xs text-red-300 font-semibold">{playerStats.health}%</p>
                    </div>
                    <div className="w-full bg-slate-700/40 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-pink-500 transition-all"
                        style={{ width: `${playerStats.health}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs text-blue-300">Focus {focusLevel.emoji}</p>
                      <p className="text-xs text-blue-300 font-semibold">{playerStats.focus}%</p>
                    </div>
                    <div className="w-full bg-slate-700/40 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${focusLevel.color} transition-all duration-1000`}
                        style={{ width: `${playerStats.focus}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Streak */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Flame className="text-orange-400" size={20} />
                  <p className="text-purple-300 text-sm font-semibold">Daily Streak</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-6xl font-bold text-transparent bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text">
                    {playerStats.streak}
                  </p>
                  <div>
                    <p className="text-sm text-orange-300 font-semibold">Days</p>
                    <p className="text-xs text-purple-300">Keep it going! 🔥</p>
                  </div>
                </div>
                <div className="flex gap-1 mt-2">
                  {streakData.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className={`w-full h-8 rounded ${
                          day.active
                            ? 'bg-gradient-to-t from-orange-500 to-yellow-400'
                            : 'bg-slate-700/40'
                        } transition-all`}
                      />
                      <p className="text-xs text-purple-300">{day.day}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Progress */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="text-green-400" size={20} />
                  <p className="text-purple-300 text-sm font-semibold">Skills Mastered</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24">
                    <svg className="transform -rotate-90 w-24 h-24">
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-slate-700/40"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionPercentage / 100)}`}
                        className="text-green-400 transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <p className="text-2xl font-bold text-green-400">{Math.round(completionPercentage)}%</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-400">{playerStats.skillsCompleted}</p>
                    <p className="text-sm text-purple-300">of {playerStats.totalSkills} topics</p>
                    <p className="text-xs text-green-300 mt-1">Interview: {playerStats.interviewReadiness}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily Quests - Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Daily Quests Card */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Book className="text-purple-400" size={20} />
                  <h3 className="text-lg font-bold text-white">Daily Quests</h3>
                </div>
                <div className="text-right">
                  <p className="text-xs text-purple-300">Today's XP</p>
                  <p className="text-sm font-bold text-yellow-400">+{totalDailyXP}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {dailyQuests.map(quest => (
                  <div
                    key={quest.id}
                    className={`p-4 rounded-lg border transition-all ${
                      quest.completed
                        ? 'bg-green-600/20 border-green-500/40'
                        : 'bg-slate-700/30 border-slate-600/40 hover:border-purple-500/40'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-sm font-semibold text-white flex-1">{quest.title}</p>
                      <div className="flex items-center gap-1 text-xs font-semibold text-yellow-400">
                        <Zap size={12} />
                        {quest.xp}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-700/40 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            quest.completed
                              ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                          style={{ width: `${(quest.progress / quest.total) * 100}%` }}
                        />
                      </div>
                      <p className="text-xs text-purple-300 font-semibold">
                        {quest.progress}/{quest.total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg">
                <p className="text-xs text-purple-300 text-center">
                  {questsCompleted}/{dailyQuests.length} quests completed • {4 - questsCompleted} remaining
                </p>
              </div>
            </div>

            {/* Boss Unlock Timer */}
            <div className="bg-gradient-to-br from-red-900/40 to-orange-900/40 backdrop-blur-xl rounded-2xl border border-red-500/30 p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Crown className="text-yellow-400" size={24} />
                <h3 className="text-lg font-bold text-white">Boss Battle</h3>
              </div>
              
              <div className="text-center mb-4">
                <p className="text-4xl mb-2">🐉</p>
                <p className="text-sm text-orange-200 mb-2">Interview Boss Unlocked!</p>
                <p className="text-xs text-orange-300">Complete 5 more topics to fight</p>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 bg-slate-700/40 rounded h-2">
                  <div className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded" style={{ width: '60%' }} />
                </div>
                <p className="text-xs text-orange-300 font-semibold">60%</p>
              </div>
            </div>
          </div>

          {/* Skill Tree Navigation - Center Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => onNavigate('skillTree')}
                className="group relative overflow-hidden bg-gradient-to-br from-purple-600/30 to-pink-600/30 hover:from-purple-600/40 hover:to-pink-600/40 rounded-2xl border border-purple-500/40 p-8 transition-all hover:scale-105 shadow-xl"
              >
                <div className="relative z-10">
                  <p className="text-5xl mb-3">🗺️</p>
                  <h3 className="text-2xl font-bold text-white mb-2">Skill Tree</h3>
                  <p className="text-sm text-purple-200">Explore your learning path</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              </button>

              <button
                onClick={() => onNavigate('cozyRoom')}
                className="group relative overflow-hidden bg-gradient-to-br from-blue-600/30 to-cyan-600/30 hover:from-blue-600/40 hover:to-cyan-600/40 rounded-2xl border border-blue-500/40 p-8 transition-all hover:scale-105 shadow-xl"
              >
                <div className="relative z-10">
                  <p className="text-5xl mb-3">🏠</p>
                  <h3 className="text-2xl font-bold text-white mb-2">Cozy Room</h3>
                  <p className="text-sm text-blue-200">Focus in your study space</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
              </button>
            </div>

            {/* Units Overview */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Shield className="text-purple-400" />
                Knowledge Dungeons
              </h3>
              
              <div className="space-y-3">
                {syllabus.units?.map((unit: any, idx: number) => {
                  const unitProgress = Math.floor(Math.random() * 100);
                  const isLocked = idx > 0 && unitProgress === 0;
                  
                  return (
                    <div
                      key={unit.id}
                      className={`p-5 rounded-xl border transition-all ${
                        isLocked
                          ? 'bg-slate-800/40 border-slate-700/40 opacity-60'
                          : 'bg-gradient-to-r from-purple-600/10 to-pink-600/10 border-purple-500/30 hover:border-purple-500/50 cursor-pointer hover:scale-102'
                      }`}
                      onClick={() => !isLocked && onNavigate('skillTree')}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {isLocked ? (
                            <Lock className="text-slate-500" size={20} />
                          ) : (
                            <span className="text-2xl">{['📘', '📗', '📙'][idx % 3]}</span>
                          )}
                          <div>
                            <h4 className="text-lg font-semibold text-white">{unit.name}</h4>
                            <p className="text-xs text-purple-300">
                              {unit.topics?.length || 0} topics • {unit.weightage}% of course
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-400">{unitProgress}%</p>
                          <p className="text-xs text-purple-300">{unit.difficulty}</p>
                        </div>
                      </div>
                      
                      <div className="w-full bg-slate-700/40 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                          style={{ width: `${unitProgress}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="text-green-400" size={20} />
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-600/10 border border-green-500/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-green-600/30 flex items-center justify-center">
                    <Trophy className="text-green-400" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Defeated Binary Trees Boss!</p>
                    <p className="text-xs text-green-300">2 hours ago • +150 XP</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center">
                    <Zap className="text-blue-400" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">Completed Arrays Challenge</p>
                    <p className="text-xs text-blue-300">Yesterday • +100 XP</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

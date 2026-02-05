'use client';

import { useState } from 'react';
import { Sparkles, BookOpen, Trophy, Zap, ArrowRight, Play } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onDemo: () => void;
}

export default function LandingPage({ onStart, onDemo }: LandingPageProps) {
  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-slate-950 via-purple-950/30 to-slate-950">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center px-8">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjAzIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40" />
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 text-6xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
            📚
          </div>
          <div className="absolute top-40 right-20 text-5xl animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
            ⚔️
          </div>
          <div className="absolute bottom-40 left-20 text-5xl animate-bounce" style={{ animationDelay: '2s', animationDuration: '3.5s' }}>
            🏆
          </div>
          <div className="absolute bottom-20 right-40 text-6xl animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '4.5s' }}>
            🎮
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Logo/Badge */}
          <div className="mb-8 flex justify-center">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-2xl px-6 py-3 border border-purple-500/30">
              <p className="text-purple-300 font-semibold flex items-center gap-2">
                <Sparkles size={20} className="text-yellow-400" />
                Powered by Tambo AI
              </p>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="text-7xl md:text-8xl font-bold mb-6">
            <span className="text-white">Turn Your</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
              Syllabus Into
            </span>
            <br />
            <span className="text-white">A Dungeon 🎮</span>
          </h1>

          {/* Tagline */}
          <p className="text-2xl text-purple-200 mb-12 max-w-3xl mx-auto leading-relaxed">
            Level up your knowledge through epic quiz battles, code challenges, and AI-powered learning quests. 
            <span className="text-purple-300 font-semibold"> Make studying feel like gaming.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={onStart}
              className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl text-white font-bold text-lg transition-all transform hover:scale-105 shadow-2xl border border-purple-500/50 flex items-center gap-3"
            >
              <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              Upload Your Syllabus
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000" />
            </button>

            <button
              onClick={onDemo}
              className="px-8 py-4 bg-slate-800/50 hover:bg-slate-700/50 backdrop-blur-xl rounded-2xl text-white font-semibold text-lg transition-all border border-purple-500/30 hover:border-purple-500/60 flex items-center gap-3"
            >
              <Play size={20} />
              Try Demo
            </button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { icon: '⚔️', text: 'Combat Quiz Battles' },
              { icon: '💻', text: 'Code Challenges' },
              { icon: '🎯', text: 'Daily Quests' },
              { icon: '🔥', text: 'Streak Tracking' },
              { icon: '🏆', text: 'Boss Battles' },
              { icon: '📊', text: 'Progress Analytics' },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="px-4 py-2 bg-gradient-to-r from-slate-800/60 to-slate-700/60 backdrop-blur-xl rounded-full border border-purple-500/20 text-purple-200 text-sm font-semibold"
              >
                <span className="mr-2">{feature.icon}</span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative px-8 py-24 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Why StudyGenie?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 hover:border-purple-500/60 transition-all hover:scale-105">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-white mb-3">Gamified Learning</h3>
              <p className="text-purple-200">
                Transform boring study sessions into epic RPG adventures. Earn XP, level up, and defeat boss challenges.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 hover:border-purple-500/60 transition-all hover:scale-105">
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-white mb-3">AI-Powered</h3>
              <p className="text-purple-200">
                Tambo AI generates personalized quizzes, code challenges, and learning paths based on your syllabus.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl rounded-2xl border border-purple-500/30 p-8 hover:border-purple-500/60 transition-all hover:scale-105">
              <div className="text-5xl mb-4">📈</div>
              <h3 className="text-2xl font-bold text-white mb-3">Track Progress</h3>
              <p className="text-purple-200">
                Monitor your learning journey with detailed analytics, streak tracking, and interview readiness scores.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative px-8 py-16">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-xl rounded-3xl border border-purple-500/40 p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                10K+
              </p>
              <p className="text-purple-200">Topics Mastered</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                5K+
              </p>
              <p className="text-purple-200">Students Learning</p>
            </div>
            <div>
              <p className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text mb-2">
                95%
              </p>
              <p className="text-purple-200">Interview Success</p>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative px-8 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-purple-200 mb-8">
            Join thousands of students who are leveling up their knowledge through gamified learning.
          </p>
          <button
            onClick={onStart}
            className="group px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-2xl text-white font-bold text-xl transition-all transform hover:scale-105 shadow-2xl border border-purple-500/50 flex items-center gap-3 mx-auto"
          >
            <Sparkles size={24} />
            Get Started Free
            <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

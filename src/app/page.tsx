'use client';

import { useRouter } from 'next/navigation';
import { Sparkles, BookOpen, Target, Trophy, ArrowRight, Brain, Zap, Users, FileCheck, Flame } from 'lucide-react';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isHovering, setIsHovering] = useState(false);

  const handleGetStarted = () => {
    router.push('/study-genie');
  };

  return (
    <div className="w-full min-h-screen relative" style={{ 
      background: 'linear-gradient(135deg, #f5f5f5 0%, #fef3f1 50%, #f0fffe 100%)'
    }}>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `linear-gradient(rgba(97, 33, 15, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(97, 33, 15, 0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Gradient Orbs */}
      <div className="absolute top-20 right-20 w-96 h-96 rounded-full opacity-30 blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(63, 253, 213, 0.3) 0%, transparent 70%)'
      }} />
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full opacity-20 blur-3xl" style={{
        background: 'radial-gradient(circle, rgba(97, 33, 15, 0.2) 0%, transparent 70%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#3FDFD5]/20 bg-white/60 backdrop-blur-sm">
              <Sparkles size={16} className="text-[#3FDFD5]" />
              <span className="text-sm font-medium" style={{ color: '#61210F' }}>
                Used by thousands of students worldwide
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight" style={{ color: '#61210F' }}>
                Your syllabus,<br />
                <span className="bg-gradient-to-r from-[#3FDFD5] to-[#61210F] bg-clip-text text-transparent">
                  gamified
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                Transform any syllabus into an interactive skill tree. Master topics through quizzes, unlock achievements, and track your progress—all in one immersive learning experience.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleGetStarted}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="group relative px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-[#3FDFD5]/50"
                style={{
                  background: 'linear-gradient(135deg, #3FDFD5 0%, #61210F 100%)',
                  boxShadow: '0 10px 30px rgba(63, 253, 213, 0.3)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={20} className={isHovering ? 'animate-spin' : ''} />
                  Get Started Free
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#61210F] to-[#3FDFD5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={() => router.push('/study-genie')}
                className="px-8 py-4 rounded-2xl font-semibold border-2 border-[#61210F]/20 hover:border-[#61210F]/40 hover:bg-white/80 transition-all duration-300 backdrop-blur-sm"
                style={{ color: '#61210F', backgroundColor: 'rgba(255, 255, 255, 0.6)' }}
              >
                View Demo
              </button>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold" style={{ color: '#61210F' }}>AI-Powered</div>
                <div className="text-sm text-gray-600">Smart extraction</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: '#3FDFD5' }}>Instant</div>
                <div className="text-sm text-gray-600">Skill tree generation</div>
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: '#61210F' }}>Visual</div>
                <div className="text-sm text-gray-600">Learning paths</div>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Upload Preview */}
          <div className="relative">
            <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/50"
                 style={{ boxShadow: '0 25px 50px -12px rgba(97, 33, 15, 0.15)' }}>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-[#3FDFD5]/20 to-transparent blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-gradient-to-br from-[#61210F]/10 to-transparent blur-2xl" />
              
              <div className="relative space-y-6">
                {/* Icon */}
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center relative overflow-hidden"
                     style={{ background: 'linear-gradient(135deg, rgba(63, 253, 213, 0.1) 0%, rgba(97, 33, 15, 0.05) 100%)' }}>
                  <Brain size={40} style={{ color: '#3FDFD5' }} className="relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-br from-[#3FDFD5]/20 to-transparent animate-pulse" />
                </div>

                {/* Text */}
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold" style={{ color: '#61210F' }}>
                    Drop your syllabus here
                  </h3>
                  <p className="text-sm text-gray-600">
                    Support for PDF, TXT, MD • Up to 50MB
                  </p>
                </div>

                {/* Dashed Upload Zone */}
                <div 
                  className="border-2 border-dashed rounded-2xl p-8 transition-all duration-300 cursor-pointer hover:border-[#3FDFD5] hover:bg-[#3FDFD5]/5"
                  style={{ borderColor: 'rgba(63, 253, 213, 0.3)' }}
                  onClick={handleGetStarted}
                >
                  <div className="space-y-3 text-center">
                    <FileCheck size={32} className="mx-auto" style={{ color: '#3FDFD5' }} />
                    <p className="text-sm font-medium" style={{ color: '#61210F' }}>
                      Click to get started
                    </p>
                  </div>
                </div>

                {/* AI Processing Features */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-[#3FDFD5]/5 to-transparent">
                    <Zap size={16} style={{ color: '#3FDFD5' }} />
                    <span className="text-xs font-medium text-gray-700">Auto-extract topics</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-br from-[#61210F]/5 to-transparent">
                    <Target size={16} style={{ color: '#61210F' }} />
                    <span className="text-xs font-medium text-gray-700">Generate skill tree</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center animate-bounce" style={{ animationDuration: '3s' }}>
              <Trophy size={24} style={{ color: '#3FDFD5' }} />
            </div>
            <div className="absolute -bottom-6 -right-6 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
              <Flame size={24} style={{ color: '#61210F' }} />
            </div>
          </div>
        </div>

        {/* Feature Cards Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#61210F' }}>
              Everything you need to master any subject
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              StudyGenie combines AI-powered learning with gamification to create an engaging study experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:border-[#3FDFD5]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(63, 253, 213, 0.1) 0%, rgba(63, 253, 213, 0.2) 100%)' }}>
                <BookOpen size={28} style={{ color: '#3FDFD5' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#61210F' }}>
                Interactive Skill Trees
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Visual learning paths with topic dependencies and progression tracking. Unlock new topics as you master prerequisites.
              </p>
            </div>

            <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:border-[#61210F]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(97, 33, 15, 0.05) 0%, rgba(97, 33, 15, 0.15) 100%)' }}>
                <Target size={28} style={{ color: '#61210F' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#61210F' }}>
                Combat Mode Quizzes
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Turn studying into an adventure with gamified quiz battles. Test your knowledge and earn XP as you progress.
              </p>
            </div>

            <div className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50 hover:border-[#3FDFD5]/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                   style={{ background: 'linear-gradient(135deg, rgba(63, 253, 213, 0.1) 0%, rgba(63, 253, 213, 0.2) 100%)' }}>
                <Trophy size={28} style={{ color: '#3FDFD5' }} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: '#61210F' }}>
                Cozy Study Environment
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Focus timer with ambient aesthetics. Create the perfect study atmosphere to maximize productivity and retention.
              </p>
            </div>
          </div>
        </div>

        {/* Social Proof Section */}
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(63, 253, 213, 0.2) 0%, rgba(97, 33, 15, 0.1) 100%)' }}>
                <Users size={32} style={{ color: '#61210F' }} />
              </div>
              <div>
                <div className="text-2xl font-bold" style={{ color: '#61210F' }}>Join the learning revolution</div>
                <p className="text-gray-600">Students are already transforming their study habits</p>
              </div>
            </div>
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 whitespace-nowrap"
              style={{
                background: 'linear-gradient(135deg, #3FDFD5 0%, #61210F 100%)',
                boxShadow: '0 10px 25px rgba(63, 253, 213, 0.25)'
              }}
            >
              Start Learning Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

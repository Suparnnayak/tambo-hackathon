'use client';

import { X, BookOpen, Code, Zap } from 'lucide-react';

interface TopicModalProps {
  topic: any;
  onClose: () => void;
  onStartQuiz: () => void;
  onStartPractice?: () => void;
  onStartFlashcards?: () => void;
}

export default function TopicModal({ topic, onClose, onStartQuiz, onStartPractice, onStartFlashcards }: TopicModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-purple-500/40 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-purple-500/30 p-6 flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">{topic.name}</h2>
            <p className="text-purple-200">Difficulty: {topic.difficulty} • {topic.xp} XP</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-all"
          >
            <X className="text-white" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <BookOpen size={20} />
              Learning Objectives
            </h3>
            <div className="bg-slate-700/30 rounded-lg p-4 space-y-2 border border-purple-500/20">
              <p className="text-purple-200">
                ✓ Master the fundamental concepts of {topic.name}
              </p>
              <p className="text-purple-200">
                ✓ Solve practice problems with confidence
              </p>
              <p className="text-purple-200">
                ✓ Prepare for interview questions
              </p>
            </div>
          </div>

          {/* Action Options */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Learning Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Quiz Battle */}
              <button 
                onClick={onStartQuiz}
                className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-red-600/30 to-orange-600/30 border border-red-500/40 hover:border-red-500/60 transition-all hover:scale-105">
                <div className="relative z-10 text-center">
                  <p className="text-3xl mb-2">⚔️</p>
                  <h4 className="font-semibold text-white mb-1">Combat Mode</h4>
                  <p className="text-xs text-red-200">Battle quiz monsters</p>
                </div>
              </button>

              {/* Flashcards */}
              <button 
                onClick={onStartFlashcards}
                className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 border border-blue-500/40 hover:border-blue-500/60 transition-all hover:scale-105">
                <div className="relative z-10 text-center">
                  <p className="text-3xl mb-2">🃏</p>
                  <h4 className="font-semibold text-white mb-1">Flashcards</h4>
                  <p className="text-xs text-blue-200">Active recall practice</p>
                </div>
              </button>

              {/* Practice Coding */}
              <button 
                onClick={onStartPractice}
                className="group relative overflow-hidden rounded-xl p-6 bg-gradient-to-br from-green-600/30 to-emerald-600/30 border border-green-500/40 hover:border-green-500/60 transition-all hover:scale-105">
                <div className="relative z-10 text-center">
                  <p className="text-3xl mb-2">💻</p>
                  <h4 className="font-semibold text-white mb-1">Code Practice</h4>
                  <p className="text-xs text-green-200">Editor & runner</p>
                </div>
              </button>
            </div>
          </div>

          {/* Primary Action */}
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Zap size={20} className="text-purple-400" />
              Start Your Quest
            </h3>
            <button
              onClick={onStartQuiz}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all transform hover:scale-105"
            >
              Begin Combat Mode
            </button>
            <p className="text-center text-sm text-purple-300 mt-3">
              Earn {topic.xp} XP upon completion
            </p>
          </div>

          {/* Stats Preview */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/40">
              <p className="text-slate-400 text-sm">Difficulty</p>
              <p className="text-2xl font-bold text-white">{topic.difficulty}</p>
            </div>
            <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/40">
              <p className="text-slate-400 text-sm">XP Reward</p>
              <p className="text-2xl font-bold text-purple-400">+{topic.xp}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

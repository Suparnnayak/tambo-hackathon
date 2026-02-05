'use client';

import { useState } from 'react';
import { ChevronDown, Lock, Zap, Flame, Star } from 'lucide-react';
import TopicModal from './modals/topic-modal';

interface SkillTreeViewProps {
  syllabus: any;
  onNavigate: (view: string) => void;
  onTopicSelect?: (topic: any) => void;
}

export default function SkillTreeView({ syllabus, onNavigate, onTopicSelect }: SkillTreeViewProps) {
  const [expandedUnits, setExpandedUnits] = useState<Set<string>>(new Set(['unit-1']));
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [playerXP, setPlayerXP] = useState(2340);

  const toggleUnit = (unitId: string) => {
    const newExpanded = new Set(expandedUnits);
    if (newExpanded.has(unitId)) {
      newExpanded.delete(unitId);
    } else {
      newExpanded.add(unitId);
    }
    setExpandedUnits(newExpanded);
  };

  const isTopicLocked = (topic: any, unitIndex: number) => {
    return unitIndex > 0 && playerXP < 1000;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'from-green-600/40 to-green-700/40 border-green-500/40 hover:border-green-500/60';
      case 'Medium':
        return 'from-yellow-600/40 to-yellow-700/40 border-yellow-500/40 hover:border-yellow-500/60';
      case 'Hard':
        return 'from-red-600/40 to-red-700/40 border-red-500/40 hover:border-red-500/60';
      default:
        return 'from-purple-600/40 to-purple-700/40 border-purple-500/40';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return '🟢';
      case 'Medium':
        return '🟡';
      case 'Hard':
        return '🔴';
      default:
        return '⭐';
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Header */}
      <div className="sticky top-0 bg-slate-950/80 backdrop-blur border-b border-purple-500/30 px-8 py-6 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
              🌳 Skill Tree
            </h2>
            <p className="text-purple-300 text-sm">Master the knowledge tree to unlock your potential</p>
          </div>
          <div className="flex gap-6">
            <div className="text-right">
              <p className="text-purple-300 text-sm">TOTAL XP</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {playerXP}
              </p>
            </div>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border border-purple-500 rounded-lg text-white font-semibold transition-all"
            >
              ← Back
            </button>
          </div>
        </div>
      </div>

      {/* Skill Tree Content */}
      <div className="max-w-7xl mx-auto p-8">
        <div className="space-y-6">
          {syllabus.units.map((unit: any, unitIndex: number) => (
            <div
              key={unit.id}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all"
            >
              {/* Unit Header - Enhanced */}
              <button
                onClick={() => toggleUnit(unit.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-slate-700/30 transition-all group"
              >
                <div className="flex items-center gap-4 text-left flex-1">
                  <ChevronDown
                    size={28}
                    className={`text-purple-400 transition-transform group-hover:text-purple-300 ${
                      expandedUnits.has(unit.id) ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {unitIndex === 0 ? '📚' : unitIndex === 1 ? '🌳' : '⚡'}
                      </span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors">
                        Unit {unitIndex + 1}: {unit.name}
                      </h3>
                    </div>
                    <p className="text-purple-300 text-sm">
                      {unit.topics.length} topics • {unit.topics.reduce((sum: number, t: any) => sum + t.xp, 0)} XP
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-40 h-3 bg-slate-700 rounded-full overflow-hidden border border-purple-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 transition-all duration-500"
                      style={{
                        width: `${(unit.topics.filter((t: any) => t.mastered).length / unit.topics.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-purple-300 w-10 text-right">
                    {unit.topics.filter((t: any) => t.mastered).length}/{unit.topics.length}
                  </span>
                </div>
              </button>

              {/* Topics List - Enhanced */}
              {expandedUnits.has(unit.id) && (
                <div className="border-t border-purple-500/20 px-6 py-6 space-y-4 bg-slate-900/20">
                  {unit.topics.map((topic: any, topicIndex: number) => {
                    const isLocked = isTopicLocked(topic, unitIndex);
                    return (
                      <button
                        key={topic.id}
                        onClick={() => !isLocked && setSelectedTopic(topic)}
                        disabled={isLocked}
                        className={`w-full relative overflow-hidden group rounded-xl p-6 border-2 transition-all transform hover:scale-105 ${
                          isLocked
                            ? 'bg-slate-700/20 border-slate-600/40 opacity-50 cursor-not-allowed'
                            : `bg-gradient-to-br ${getDifficultyColor(topic.difficulty)} hover:shadow-2xl hover:shadow-purple-500/30`
                        }`}
                      >
                        <div className="relative z-10 flex items-start justify-between">
                          <div className="text-left flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              {isLocked && <Lock size={20} className="text-slate-500" />}
                              {!isLocked && <span className="text-2xl">{getDifficultyIcon(topic.difficulty)}</span>}
                              <div>
                                <h4 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">
                                  {topic.name}
                                </h4>
                                <p className="text-sm text-purple-200">
                                  Difficulty: {topic.difficulty} • {topic.xp} XP
                                </p>
                              </div>
                            </div>

                            {/* Skill indicators */}
                            {!isLocked && (
                              <div className="flex gap-2 mt-2">
                                <span className="px-2 py-1 bg-white/10 rounded text-xs text-white">
                                  ⏱️ Est. 2h
                                </span>
                                <span className="px-2 py-1 bg-white/10 rounded text-xs text-white">
                                  💪 +{topic.xp} XP
                                </span>
                              </div>
                            )}
                          </div>
                          {!isLocked && (
                            <div className="text-right">
                              <div className="text-3xl mb-1 group-hover:animate-bounce">✨</div>
                              <p className="text-xs text-purple-300 group-hover:text-purple-100">Click to learn</p>
                            </div>
                          )}
                          {isLocked && (
                            <div className="text-right">
                              <p className="text-xs text-slate-400">Unlock with 1000 XP</p>
                            </div>
                          )}
                        </div>

                        {/* Hover Effect Background */}
                        {!isLocked && (
                          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Difficulty Legend */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-600/10 to-green-700/10 border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition-all">
            <p className="text-green-400 text-lg font-bold mb-2">🟢 Easy Topics</p>
            <p className="text-white text-sm">Foundation concepts to build your understanding</p>
            <p className="text-green-300 text-xs mt-2">+100 XP per topic</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-600/10 to-yellow-700/10 border border-yellow-500/30 rounded-xl p-6 hover:border-yellow-500/50 transition-all">
            <p className="text-yellow-400 text-lg font-bold mb-2">🟡 Medium Topics</p>
            <p className="text-white text-sm">Intermediate concepts to strengthen skills</p>
            <p className="text-yellow-300 text-xs mt-2">+200-250 XP per topic</p>
          </div>
          <div className="bg-gradient-to-br from-red-600/10 to-red-700/10 border border-red-500/30 rounded-xl p-6 hover:border-red-500/50 transition-all">
            <p className="text-red-400 text-lg font-bold mb-2">🔴 Hard Topics</p>
            <p className="text-white text-sm">Advanced concepts for mastery</p>
            <p className="text-red-300 text-xs mt-2">+300-350 XP per topic</p>
          </div>
        </div>

        {/* Pro Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
            <span>💡</span> Pro Tips for Skill Tree Mastery
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <p className="text-purple-200">📈 Complete units in order - prerequisites ensure understanding</p>
            <p className="text-purple-200">⚡ Chain topics together - unlock bonus XP for completing series</p>
            <p className="text-purple-200">🔥 Maintain streak - higher focus level = faster skill unlocks</p>
          </div>
        </div>
      </div>

      {/* Topic Modal */}
      {selectedTopic && (
        <TopicModal
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
          onStartQuiz={() => {
            if (onTopicSelect) {
              onTopicSelect(selectedTopic);
            }
            onNavigate('combat');
            setSelectedTopic(null);
          }}
          onStartPractice={() => {
            if (onTopicSelect) {
              onTopicSelect(selectedTopic);
            }
            onNavigate('editor');
            setSelectedTopic(null);
          }}
        />
      )}
    </div>
  );
}

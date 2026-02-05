'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const CozyRoomEnhanced = dynamic<any>(() => import('@/components/study-genie/cozy-room-enhanced'), { ssr: false });
const SkillTreeEnhanced = dynamic<any>(() => import('@/components/study-genie/skill-tree-enhanced'), { ssr: false });
const DashboardEnhanced = dynamic<any>(() => import('@/components/study-genie/dashboard-enhanced'), { ssr: false });
const SyllabusUpload = dynamic<any>(() => import('@/components/study-genie/syllabus-upload'), { ssr: false });
const CombatMode = dynamic<any>(() => import('@/components/study-genie/combat-mode'), { ssr: false });
const ScoreCard = dynamic<any>(() => import('@/components/study-genie/scorecard'), { ssr: false });
const PracticeEditorEnhanced = dynamic<any>(() => import('@/components/study-genie/practice-editor-enhanced'), { ssr: false });
const LandingPage = dynamic<any>(() => import('@/components/study-genie/landing-page'), { ssr: false });
const FlashcardView = dynamic<any>(() => import('@/components/study-genie/flashcard-view'), { ssr: false });

type ViewType = 'landing' | 'dashboard' | 'cozyRoom' | 'skillTree' | 'upload' | 'combat' | 'editor' | 'flashcards';

export default function StudyGeniePage() {
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  const [syllabus, setSyllabus] = useState<any>(null);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [showScoreCard, setShowScoreCard] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [combatResults, setCombatResults] = useState<any>({ 
    score: 0, 
    questionsAnswered: 0, 
    correctAnswers: 0, 
    timeSpent: 0,
    weakAreas: [] as string[]
  });

  const handleSyllabusUpload = (data: any) => {
    setSyllabus(data);
    setIsDemoMode(false);
    setCurrentView('dashboard');
  };

  const handleStartDemo = () => {
    // Demo syllabus with sample data
    const demoSyllabus = {
      curriculum: 'Demo: Data Structures & Algorithms',
      units: [
        {
          id: '1',
          name: 'Arrays & Strings',
          topics: [
            { id: '1-1', name: 'Array Basics', difficulty: 'Easy', status: 'weak' },
            { id: '1-2', name: 'Two Pointer Technique', difficulty: 'Medium', status: 'learning' },
            { id: '1-3', name: 'Sliding Window', difficulty: 'Hard', status: 'boss' }
          ]
        },
        {
          id: '2',
          name: 'Trees & Graphs',
          topics: [
            { id: '2-1', name: 'Binary Trees', difficulty: 'Medium', status: 'mastered' },
            { id: '2-2', name: 'Graph Traversal', difficulty: 'Medium', status: 'learning' },
            { id: '2-3', name: 'Dynamic Programming', difficulty: 'Hard', status: 'locked' }
          ]
        }
      ]
    };
    
    setSyllabus(demoSyllabus);
    setIsDemoMode(true);
    setCurrentView('dashboard');
  };

  const handleCombatComplete = (results: any) => {
    setCombatResults({
      score: results.score || 0,
      questionsAnswered: results.questionsAnswered || 0,
      correctAnswers: results.correctAnswers || 0,
      timeSpent: results.timeSpent || 0,
      weakAreas: results.weakAreas || []
    });
    setShowScoreCard(true);
  };

  const handleNavigate = (view: string) => {
    setCurrentView(view as ViewType);
  };

  const handleTopicSelect = (topic: any) => {
    setSelectedTopic(topic);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Navigation - Hide on landing page */}
      {currentView !== 'landing' && (
        <nav className="bg-slate-800/50 backdrop-blur border-b border-purple-500/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎮</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              StudyGenie
            </h1>
            {isDemoMode && (
              <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/40 rounded-full text-yellow-300 text-sm font-semibold">
                Demo Mode
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <p className="text-purple-200 text-sm italic">"Turn your syllabus into a dungeon"</p>
            {isDemoMode && (
              <button
                onClick={() => {
                  setIsDemoMode(false);
                  setSyllabus(null);
                  setCurrentView('landing');
                }}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white text-sm transition-all"
              >
                Exit Demo
              </button>
            )}
          </div>
        </nav>
      )}

      {/* Main Content */}
      <div className={`w-full ${currentView === 'landing' ? 'h-screen' : 'h-[calc(100vh-80px)]'} overflow-hidden`}>
        {currentView === 'landing' && (
          <LandingPage 
            onStart={() => setCurrentView('upload')}
            onDemo={handleStartDemo}
          />
        )}

        {currentView === 'upload' && (
          <SyllabusUpload onUpload={handleSyllabusUpload} />
        )}

        {currentView === 'dashboard' && syllabus && (
          <DashboardEnhanced 
            syllabus={syllabus} 
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'cozyRoom' && syllabus && (
          <CozyRoomEnhanced 
            syllabus={syllabus} 
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'skillTree' && syllabus && (
          <SkillTreeEnhanced 
            syllabus={syllabus} 
            onNavigate={handleNavigate}
            onTopicSelect={handleTopicSelect}
          />
        )}

        {currentView === 'combat' && selectedTopic && (
          <CombatMode
            topic={selectedTopic}
            onComplete={handleCombatComplete}
            onNavigate={handleNavigate}
          />
        )}

        {currentView === 'editor' && selectedTopic && (
          <PracticeEditorEnhanced topic={selectedTopic.name} />
        )}

        {currentView === 'flashcards' && selectedTopic && (
          <FlashcardView
            topic={selectedTopic}
            onComplete={() => handleNavigate('skillTree')}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Score Card Modal */}
      {showScoreCard && (
        <ScoreCard
          xpEarned={combatResults.score}
          focusTime={combatResults.timeSpent}
          weakAreas={combatResults.weakAreas}
          interviewReadiness={Math.round((combatResults.correctAnswers / Math.max(combatResults.questionsAnswered, 1)) * 100)}
          sessionDate={new Date()}
          onClose={() => setShowScoreCard(false)}
        />
      )}
    </div>
  );
}

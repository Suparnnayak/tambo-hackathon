'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Send, Loader, Lightbulb, Book, ChevronDown, AlertCircle } from 'lucide-react';
import { tamboService, TamboCodeChallenge } from '@/services/tambo-service';

interface PracticeEditorEnhancedProps {
  topic: string;
}

export default function PracticeEditorEnhanced({ topic }: PracticeEditorEnhancedProps) {
  const [challenge, setChallenge] = useState<TamboCodeChallenge | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [hintLevel, setHintLevel] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [testsPassed, setTestsPassed] = useState(0);
  const [totalTests, setTotalTests] = useState(0);

  // Tiered hints system
  const hints = [
    'Start by understanding what the problem is asking',
    'Consider the time and space complexity requirements',
    'Think about edge cases: empty inputs, single elements, duplicates',
    'Try a brute force approach first, then optimize',
    'Use appropriate data structures (arrays, maps, sets, trees)',
    'Break the problem into smaller subproblems'
  ];

  // Load code challenge from Tambo
  useEffect(() => {
    async function loadChallenge() {
      setIsLoading(true);
      try {
        const codeChallenge = await tamboService.generateCodeChallenge(
          topic || 'coding-challenge',
          'Medium'
        );
        setChallenge(codeChallenge);
        setCode(codeChallenge.starterCode);
        setTotalTests(codeChallenge.testCases?.length || 0);
      } catch (error) {
        console.error('Failed to load challenge:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadChallenge();
  }, [topic]);

  const runCode = async () => {
    if (!challenge) return;
    
    setIsRunning(true);
    setOutput('🔄 Running tests...');
    
    try {
      const results = await tamboService.evaluateCode(
        code,
        'javascript',
        challenge.testCases
      );
      
      setTestsPassed(results.passed);
      
      if (results.passed === results.total) {
        setOutput(`✅ Perfect! All ${results.total} tests passed!\n\n` +
                 `⏱️  Time Complexity: O(${challenge.timeComplexity})\n` +
                 `💾 Space Complexity: O(${challenge.spaceComplexity})\n` +
                 `⭐ XP Earned: +${challenge.xpReward}`);
      } else {
        setOutput(`⚠️  ${results.passed}/${results.total} tests passed\n\n` +
                 `Still need to fix:\n${results.results.join('\n')}`);
      }
    } catch (error) {
      setOutput('❌ Error running code: ' + error);
    } finally {
      setIsRunning(false);
    }
  };

  const getNextHint = () => {
    if (hintLevel < hints.length - 1) {
      setHintLevel(hintLevel + 1);
    }
  };

  const resetChallenge = () => {
    if (challenge) {
      setCode(challenge.starterCode);
      setOutput('');
      setTestsPassed(0);
      setHintLevel(0);
    }
  };

  if (isLoading || !challenge) {
    return (
      <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950">
        <div className="bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur border-b border-purple-500/30 px-8 py-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            💻 AI Interview Arena
          </h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin text-purple-400 mx-auto mb-4">
              <Loader size={48} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Generating Challenge...</h3>
            <p className="text-purple-300">Tambo AI is crafting a coding interview for you</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900/80 to-purple-900/80 backdrop-blur border-b border-purple-500/30 px-8 py-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-1">
              💻 AI Interview Arena
            </h2>
            <p className="text-purple-300 text-sm">LeetCode-style coding challenge</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={resetChallenge}
              className="flex items-center gap-2 px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg text-white transition-all"
            >
              <RotateCcw size={18} />
              Reset
            </button>
            <button
              onClick={() => {/* Navigate back */}}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all"
            >
              Back
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex gap-6 p-6">
        {/* Problem Description - Left Panel */}
        <div className="w-1/3 overflow-y-auto bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur rounded-2xl border border-purple-500/20 p-8 space-y-6">
          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{challenge.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                challenge.difficulty === 'Easy' ? 'bg-green-600/30 text-green-300' :
                challenge.difficulty === 'Medium' ? 'bg-yellow-600/30 text-yellow-300' :
                'bg-red-600/30 text-red-300'
              }`}>
                {challenge.difficulty} • {challenge.xpReward} XP
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Book size={20} className="text-purple-400" />
              Problem
            </h4>
            <p className="text-purple-200 leading-relaxed">{challenge.description}</p>
          </div>

          {/* Test Cases */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-3">📋 Test Cases</h4>
            <div className="space-y-2">
              {challenge.testCases?.map((test, idx) => (
                <div key={idx} className="p-3 bg-slate-700/40 rounded-lg border border-slate-600/40">
                  <p className="text-xs text-purple-300 font-semibold mb-2">Case {idx + 1}</p>
                  <p className="text-sm text-purple-200 font-mono">Input: {test.input}</p>
                  <p className="text-sm text-green-300 font-mono">Output: {test.output}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Complexity Info */}
          <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-300 mb-2">💡 Complexity Targets</h4>
            <p className="text-sm text-blue-200">Time: O({challenge.timeComplexity})</p>
            <p className="text-sm text-blue-200">Space: O({challenge.spaceComplexity})</p>
          </div>

          {/* Hints Section */}
          <div className="bg-gradient-to-br from-yellow-600/10 to-orange-600/10 border border-yellow-500/30 rounded-xl p-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="w-full flex items-center justify-between mb-3 hover:opacity-80 transition"
            >
              <span className="text-lg font-semibold text-yellow-300 flex items-center gap-2">
                <Lightbulb size={18} />
                AI Hints ({hintLevel}/{hints.length})
              </span>
              <ChevronDown
                size={20}
                className={`text-yellow-300 transition-transform ${showHints ? '' : '-rotate-90'}`}
              />
            </button>
            
            {showHints && (
              <div className="space-y-3">
                {hints.map((hint, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg transition-all ${
                      idx <= hintLevel
                        ? 'bg-yellow-600/20 border border-yellow-500/40'
                        : 'bg-slate-700/20 border border-slate-600/40 opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-bold text-yellow-300 mt-1">💡</span>
                      <div>
                        <p className="text-sm text-yellow-200">{hint}</p>
                        {idx === hintLevel && idx < hints.length - 1 && (
                          <button
                            onClick={getNextHint}
                            className="text-xs text-yellow-300 hover:text-yellow-200 mt-2 underline"
                          >
                            Get next hint →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Editor & Console - Right Panel */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Editor */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur rounded-2xl border border-purple-500/20">
            <div className="px-6 py-4 border-b border-slate-700/40">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-semibold text-white">Code Editor</h4>
                <div className="flex gap-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-all"
                  >
                    {isRunning ? <Pause size={18} /> : <Play size={18} />}
                    {isRunning ? 'Running...' : 'Run Code'}
                  </button>
                </div>
              </div>
              <p className="text-xs text-purple-300">JavaScript (Node.js)</p>
            </div>
            
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 px-6 py-4 bg-slate-900/80 text-purple-100 font-mono text-sm resize-none focus:outline-none border-none"
              placeholder="Write your solution here..."
              spellCheck="false"
            />
          </div>

          {/* Console Output */}
          <div className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur rounded-2xl border border-purple-500/20">
            <div className="px-6 py-4 border-b border-slate-700/40 flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Console Output</h4>
              {totalTests > 0 && (
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all"
                      style={{ width: `${(testsPassed / totalTests) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-purple-300">
                    {testsPassed}/{totalTests}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-1 overflow-y-auto px-6 py-4 font-mono text-sm">
              {output ? (
                <pre className="text-green-300 whitespace-pre-wrap break-words">{output}</pre>
              ) : (
                <p className="text-slate-400 italic">Click "Run Code" to test your solution...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

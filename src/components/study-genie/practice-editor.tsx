'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Send, Loader } from 'lucide-react';
import { tamboService, TamboCodeChallenge } from '@/services/tambo-service';

interface PracticeEditorProps {
  topic: string;
}

export default function PracticeEditor({ topic }: PracticeEditorProps) {
  const [challenge, setChallenge] = useState<TamboCodeChallenge | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [hint, setHint] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
    setOutput('Running tests...');
    
    try {
      const results = await tamboService.evaluateCode(
        code,
        'javascript',
        challenge.testCases
      );
      
      if (results.passed === results.total) {
        setOutput(`✅ All tests passed! (${results.passed}/${results.total})\n\n` +
                 `Time: O(${challenge.timeComplexity})\n` +
                 `Space: O(${challenge.spaceComplexity})\n` +
                 `XP Earned: ${challenge.xpReward}`);
      } else {
        setOutput(`❌ ${results.passed}/${results.total} tests passed\n\n` +
                 results.results.join('\n'));
      }
    } catch (error) {
      setOutput('❌ Error running code: ' + error);
    } finally {
      setIsRunning(false);
    }
  };

  const getHint = () => {
    const defaultHints = [
      'Consider using a hash map for O(1) lookups',
      'Think about the problem from a graph perspective',
      'Start with a brute force solution first',
      'Use binary search to optimize your approach',
      'Look for patterns in the input'
    ];
    
    // Use hints from challenge if available
    const hints = challenge?.description || defaultHints.join('\n');
    setHint(hints);
  };

  if (isLoading || !challenge) {
    return (
      <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="bg-slate-800/50 border-b border-purple-500/20 px-6 py-4">
          <h2 className="text-2xl font-bold text-white">💻 Practice Editor</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader className="animate-spin text-purple-400 mx-auto mb-4" size={48} />
            <h3 className="text-xl font-bold text-white mb-2">Generating Challenge...</h3>
            <p className="text-purple-300">Tambo AI is creating a coding challenge for {topic}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-gradient-to-br from-slate-900 to-slate-800">
      {/* Header */}
      <div className="bg-slate-800/50 border-b border-purple-500/20 px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">💻 {challenge.title}</h2>
        <div className="flex gap-3">
          <span className="px-3 py-1 bg-purple-600/30 rounded-full text-sm text-purple-200 border border-purple-500/40">
            {challenge.difficulty}
          </span>
          <span className="px-3 py-1 bg-yellow-600/30 rounded-full text-sm text-yellow-200 border border-yellow-500/40">
            {challenge.xpReward} XP
          </span>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Editor */}
        <div className="flex-1 flex flex-col border-r border-purple-500/20">
          <div className="bg-slate-800/30 border-b border-purple-500/20 px-4 py-2 flex gap-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="flex items-center gap-2 px-4 py-2 bg-green-600/30 hover:bg-green-600/50 border border-green-500/40 rounded text-green-200 transition-all"
            >
              {isRunning ? <Pause size={16} /> : <Play size={16} />}
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 rounded text-blue-200 transition-all">
              <RotateCcw size={16} />
              Reset
            </button>
            <button
              onClick={getHint}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 rounded text-purple-200 transition-all ml-auto"
            >
              💡 Get Hint
            </button>
          </div>

          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 bg-slate-900/50 text-white font-mono text-sm resize-none focus:outline-none p-4 border-0"
            spellCheck="false"
          />
        </div>

        {/* Output / Hints Panel */}
        <div className="w-80 flex flex-col border-l border-purple-500/20 bg-slate-800/30">
          {/* Output */}
          <div className="flex-1 border-b border-purple-500/20 p-4">
            <h3 className="text-white font-semibold mb-3">Output</h3>
            <div className="bg-slate-900/50 rounded p-3 font-mono text-sm text-green-400 h-32 overflow-y-auto border border-slate-700">
              {output || '// Run code to see output...'}
            </div>
          </div>

          {/* Hint */}
          {hint && (
            <div className="border-b border-purple-500/20 p-4">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                💡 Hint
              </h3>
              <div className="bg-blue-600/20 border border-blue-500/30 rounded p-3 text-sm text-blue-200">
                {hint}
              </div>
            </div>
          )}

          {/* Complexity Info */}
          <div className="p-4">
            <h3 className="text-white font-semibold mb-3">Complexity</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                <span className="text-slate-300">Time:</span>
                <span className="text-purple-300">O(n log n)</span>
              </div>
              <div className="flex justify-between p-2 bg-slate-700/30 rounded">
                <span className="text-slate-300">Space:</span>
                <span className="text-purple-300">O(n)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

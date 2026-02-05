'use client';

import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Wind, Moon, Sun, Zap } from 'lucide-react';

interface CozyRoomViewProps {
  syllabus: any;
  onNavigate: (view: string) => void;
}

export default function CozyRoomView({ syllabus, onNavigate }: CozyRoomViewProps) {
  const [focusLevel, setFocusLevel] = useState(60);
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [ambiance, setAmbiance] = useState('rain');
  const [sessionTime, setSessionTime] = useState(0);
  const [lampBrightness, setLampBrightness] = useState(50);

  // Simulate session timer and focus level
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(t => t + 1);
      setFocusLevel(prev => Math.min(100, prev + 0.5));
      setLampBrightness(prev => Math.min(100, prev + 0.3));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
      {/* Animated Background - Cozy Room Scene */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main background with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-blue-900 to-slate-950" />

        {/* Animated rain/ambiance */}
        {ambiance === 'rain' && (
          <div className="absolute inset-0 opacity-20">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-4 bg-blue-300 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `fall ${2 + Math.random() * 2}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Window frame - left side */}
        <div className="absolute top-12 left-8 w-64 h-96 border-8 border-slate-700 rounded-lg bg-slate-900/30 shadow-2xl">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-6xl mb-4">🌙</p>
              <p className="text-purple-300 text-sm">Late night study vibes</p>
            </div>
          </div>
        </div>

        {/* Desk with lamp - center */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-96 bg-gradient-to-t from-amber-900/30 to-transparent rounded-full blur-3xl h-40" />

        {/* Bookshelf - right side */}
        <div className="absolute top-1/2 right-12 w-32 transform -translate-y-1/2">
          <div className="bg-slate-700/50 rounded-lg p-4 border border-purple-500/30">
            <h3 className="text-white font-semibold mb-3 text-sm">📚 Subjects</h3>
            {syllabus.units.slice(0, 3).map((unit: any, idx: number) => (
              <button
                key={unit.id}
                className="w-full text-left text-xs text-purple-200 hover:text-purple-100 py-2 px-2 rounded hover:bg-purple-500/20 transition-all"
              >
                {idx + 1}. {unit.name.slice(0, 20)}...
              </button>
            ))}
          </div>
        </div>

        {/* Center Content - Active Topic */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-7xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
              💡
            </p>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome to Your Study Space</h2>
            <p className="text-purple-300 mb-6">Focus level: {focusLevel.toFixed(0)}%</p>
            <p className="text-2xl text-purple-400 font-bold">{formatTime(sessionTime)}</p>
          </div>
        </div>
      </div>

      {/* Control Panel - Bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-8">
        <div className="max-w-6xl mx-auto">
          {/* Session Info */}
          <div className="mb-6 bg-slate-800/50 rounded-xl p-4 border border-purple-500/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-purple-300 text-xs">FOCUS LEVEL</p>
                <p className="text-2xl font-bold text-purple-400">{focusLevel.toFixed(0)}%</p>
              </div>
              <div>
                <p className="text-purple-300 text-xs">SESSION TIME</p>
                <p className="text-2xl font-bold text-pink-400">{formatTime(sessionTime)}</p>
              </div>
              <div>
                <p className="text-purple-300 text-xs">MUSIC</p>
                <p className="text-xl">{musicEnabled ? '🎵' : '🔇'}</p>
              </div>
              <div>
                <p className="text-purple-300 text-xs">AMBIANCE</p>
                <p className="text-xl">{ambiance === 'rain' ? '🌧️' : '⛅'}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => setMusicEnabled(!musicEnabled)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 rounded-lg text-blue-200 transition-all"
            >
              {musicEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              {musicEnabled ? 'Music On' : 'Music Off'}
            </button>

            <button
              onClick={() => setAmbiance(ambiance === 'rain' ? 'clear' : 'rain')}
              className="flex items-center gap-2 px-6 py-3 bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/40 rounded-lg text-cyan-200 transition-all"
            >
              {ambiance === 'rain' ? <Wind size={20} /> : <Moon size={20} />}
              {ambiance === 'rain' ? 'Rainy' : 'Clear'}
            </button>

            <button
              onClick={() => onNavigate('skillTree')}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 rounded-lg text-purple-200 transition-all"
            >
              📚 View Skills
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 px-6 py-3 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 rounded-lg text-slate-200 transition-all"
            >
              🎯 Dashboard
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Upload, Loader } from 'lucide-react';
import { tamboService } from '@/services/tambo-service';

interface SyllabusUploadProps {
  onUpload: (data: any) => void;
}

export default function SyllabusUpload({ onUpload }: SyllabusUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setIsLoading(true);

    try {
      // Use Tambo AI to parse syllabus
      const response = await tamboService.parseSyllabus(file);
      
      // Transform Tambo response to match our app's format
      const syllabus = {
        title: response.curriculum || 'Study Course',
        course_id: 'TAMBO-' + Date.now(),
        units: response.units.map((unit: any) => ({
          id: unit.id,
          name: unit.name,
          topics: unit.topics.map((topic: any) => ({
            id: topic.id,
            name: topic.name,
            difficulty: topic.difficulty,
            xp: topic.difficulty === 'Easy' ? 100 : topic.difficulty === 'Medium' ? 200 : 300,
            estimatedHours: topic.estimatedHours,
            prerequisites: topic.prerequisites
          }))
        })),
        totalXP: response.totalTopics * 150,
        totalTopics: response.totalTopics,
        estimatedHours: response.estimatedHours,
        fileName: file.name
      };

      setIsLoading(false);
      onUpload(syllabus);
    } catch (error) {
      console.error('Failed to parse syllabus:', error);
      setIsLoading(false);
      alert('Failed to parse syllabus. Please try again.');
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Welcome to StudyGenie
          </h2>
          <p className="text-xl text-purple-200 mb-2">
            Transform your syllabus into an epic RPG adventure
          </p>
          <p className="text-purple-300 mb-4">
            Upload your course material and let's generate your skill map!
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-full">
            <span className="text-purple-300 text-sm">⚡ Powered by</span>
            <span className="font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">Tambo AI</span>
          </div>
        </div>

        {/* Upload Card */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border-2 border-dashed border-purple-500/40 hover:border-purple-500/60 transition-all p-12">
          <label className="flex flex-col items-center justify-center gap-6 cursor-pointer">
            <input
              type="file"
              accept=".pdf,.txt,.md"
              onChange={handleFileUpload}
              disabled={isLoading}
              className="hidden"
            />

            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="relative w-20 h-20">
                  <Loader className="w-20 h-20 text-purple-400 animate-spin" />
                </div>
                <p className="text-purple-300 font-semibold text-lg">
                  🤖 Tambo AI is analyzing your syllabus...
                </p>
                <p className="text-sm text-purple-400">{fileName}</p>
                <div className="mt-4 space-y-1 text-xs text-purple-300">
                  <p>✓ Extracting curriculum structure</p>
                  <p>✓ Identifying topics and difficulty</p>
                  <p>✓ Calculating XP and prerequisites</p>
                </div>
              </div>
            ) : (
              <>
                <div className="p-6 bg-purple-500/10 rounded-xl">
                  <Upload className="w-16 h-16 text-purple-400" />
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white mb-2">
                    Drop your syllabus here
                  </p>
                  <p className="text-purple-300">
                    or click to select (PDF, TXT, MD)
                  </p>
                </div>
                <div className="text-sm text-purple-400 text-center">
                  <p>🎯 We'll extract units, topics, and difficulty levels</p>
                  <p>⚡ Then generate your personalized skill tree</p>
                </div>
              </>
            )}
          </label>
        </div>

        {/* Features Preview */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-2xl mb-2">📚</p>
            <p className="text-sm text-purple-200">
              <strong>Skill Tree</strong> with prerequisites
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-2xl mb-2">⚔️</p>
            <p className="text-sm text-purple-200">
              <strong>Combat Mode</strong> quizzes
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
            <p className="text-2xl mb-2">🎮</p>
            <p className="text-sm text-purple-200">
              <strong>Cozy Room</strong> aesthetics
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

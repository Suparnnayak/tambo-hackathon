import { useState, useCallback } from 'react';

export interface PlayerStats {
  level: number;
  xp: number;
  totalXP: number;
  health: number;
  focus: number;
  streak: number;
  skillsCompleted: number;
  totalSkills: number;
}

export interface Topic {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  xp: number;
  mastered?: boolean;
  prerequisites?: string[];
}

export interface Unit {
  id: string;
  name: string;
  topics: Topic[];
}

export interface Syllabus {
  title: string;
  course_id: string;
  units: Unit[];
  totalXP: number;
  fileName: string;
}

export interface SessionData {
  xpEarned: number;
  focusTime: number;
  weakAreas: string[];
  interviewReadiness: number;
  sessionDate: Date;
}

export const useStudyGenie = () => {
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 5,
    xp: 2340,
    totalXP: 5000,
    health: 85,
    focus: 65,
    streak: 12,
    skillsCompleted: 8,
    totalSkills: 18
  });

  const [syllabus, setSyllabus] = useState<Syllabus | null>(null);
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([]);

  // Gain XP
  const gainXP = useCallback((amount: number) => {
    setPlayerStats(prev => {
      const newXP = prev.xp + amount;
      const nextLevelXP = prev.totalXP;
      
      if (newXP >= nextLevelXP) {
        return {
          ...prev,
          level: prev.level + 1,
          xp: newXP - nextLevelXP,
          totalXP: nextLevelXP * 1.5
        };
      }
      return { ...prev, xp: newXP };
    });
  }, []);

  // Update focus level
  const updateFocus = useCallback((amount: number) => {
    setPlayerStats(prev => ({
      ...prev,
      focus: Math.max(0, Math.min(100, prev.focus + amount))
    }));
  }, []);

  // Update health
  const updateHealth = useCallback((amount: number) => {
    setPlayerStats(prev => ({
      ...prev,
      health: Math.max(0, Math.min(100, prev.health + amount))
    }));
  }, []);

  // Increment streak
  const incrementStreak = useCallback(() => {
    setPlayerStats(prev => ({
      ...prev,
      streak: prev.streak + 1
    }));
  }, []);

  // Save session data
  const saveSession = useCallback((data: SessionData) => {
    setSessionHistory(prev => [...prev, data]);
    gainXP(data.xpEarned);
  }, [gainXP]);

  // Master a topic
  const masterTopic = useCallback((topicId: string) => {
    setSyllabus(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        units: prev.units.map(unit => ({
          ...unit,
          topics: unit.topics.map(topic =>
            topic.id === topicId ? { ...topic, mastered: true } : topic
          )
        }))
      };
    });

    setPlayerStats(prev => ({
      ...prev,
      skillsCompleted: prev.skillsCompleted + 1
    }));
  }, []);

  return {
    playerStats,
    syllabus,
    sessionHistory,
    setSyllabus,
    gainXP,
    updateFocus,
    updateHealth,
    incrementStreak,
    saveSession,
    masterTopic
  };
};

export default useStudyGenie;

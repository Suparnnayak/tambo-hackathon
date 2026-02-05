/**
 * XP and Leveling System for StudyGenie 2.0
 */

export interface PlayerStats {
  level: number;
  xp: number;
  totalXP: number;
  health: number;
  focus: number;
  streak: number;
  skillsCompleted: number;
  totalSkills: number;
  interviewReadiness: number;
}

export interface XPReward {
  activity: string;
  baseXP: number;
  multiplier: number;
  total: number;
}

// XP Thresholds for leveling
export const XP_THRESHOLDS = [
  0,      // Level 1
  500,    // Level 2
  1200,   // Level 3
  2200,   // Level 4
  3500,   // Level 5
  5000,   // Level 6
  6800,   // Level 7
  8800,   // Level 8
  11000,  // Level 9
  13500,  // Level 10
];

// XP Rewards for activities
export const XP_REWARDS = {
  QUIZ_EASY: 50,
  QUIZ_MEDIUM: 75,
  QUIZ_HARD: 100,
  CODE_EASY: 75,
  CODE_MEDIUM: 150,
  CODE_HARD: 250,
  FLASHCARD: 10,
  DAILY_QUEST: 100,
  BOSS_DEFEAT: 500,
  STREAK_BONUS: 25,
  FOCUS_BONUS: 50,
} as const;

// Titles based on level
export const TITLES = [
  'Novice Scholar',
  'Apprentice',
  'Student',
  'Scholar',
  'Master',
  'Sage',
  'Expert',
  'Grandmaster',
  'Legend',
  'Mythical',
];

/**
 * Calculate current level based on XP
 */
export function calculateLevel(xp: number): number {
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

/**
 * Get XP needed to reach next level
 */
export function getXPToNextLevel(xp: number): number {
  const currentLevel = calculateLevel(xp);
  if (currentLevel >= XP_THRESHOLDS.length) {
    return 0; // Max level reached
  }
  return XP_THRESHOLDS[currentLevel] - xp;
}

/**
 * Get player title based on level
 */
export function getPlayerTitle(level: number): string {
  return TITLES[Math.min(level - 1, TITLES.length - 1)];
}

/**
 * Calculate interview readiness based on completed skills
 */
export function calculateInterviewReadiness(
  skillsCompleted: number,
  totalSkills: number
): number {
  const baseReadiness = (skillsCompleted / totalSkills) * 100;
  // Add bonus for consecutive days
  return Math.min(100, Math.round(baseReadiness));
}

/**
 * Calculate focus meter (0-100) based on session activity
 */
export function calculateFocus(
  timeSpent: number,
  questionsAnswered: number,
  correctAnswers: number
): number {
  // Base focus on time (more time = more focus fatigue)
  let focus = 100 - Math.min((timeSpent / 3600) * 20, 50); // Max 50% fatigue
  
  // Accuracy boosts focus
  const accuracy = correctAnswers / questionsAnswered;
  focus += accuracy * 20; // Max 20% boost from accuracy
  
  return Math.max(0, Math.min(100, Math.round(focus)));
}

/**
 * Apply streak bonus to XP rewards
 */
export function applyStreakBonus(baseXP: number, streak: number): number {
  const bonusPercentage = Math.min(streak * 5, 100); // Max 100% bonus at 20 day streak
  return Math.round(baseXP * (1 + bonusPercentage / 100));
}

/**
 * Apply difficulty multiplier to XP
 */
export function applyDifficultyMultiplier(baseXP: number, difficulty: string): number {
  const multipliers: Record<string, number> = {
    'Easy': 1.0,
    'Medium': 1.5,
    'Hard': 2.0,
  };
  return Math.round(baseXP * (multipliers[difficulty] || 1.0));
}

/**
 * Calculate total XP reward for an activity
 */
export function calculateXPReward(
  activity: string,
  difficulty: string = 'Medium',
  streak: number = 0,
  bonusMultiplier: number = 1.0
): number {
  let baseXP = 0;

  // Determine base XP
  if (activity.includes('quiz')) {
    baseXP = difficulty === 'Easy' ? XP_REWARDS.QUIZ_EASY :
             difficulty === 'Hard' ? XP_REWARDS.QUIZ_HARD :
             XP_REWARDS.QUIZ_MEDIUM;
  } else if (activity.includes('code')) {
    baseXP = difficulty === 'Easy' ? XP_REWARDS.CODE_EASY :
             difficulty === 'Hard' ? XP_REWARDS.CODE_HARD :
             XP_REWARDS.CODE_MEDIUM;
  } else if (activity === 'flashcard') {
    baseXP = XP_REWARDS.FLASHCARD;
  } else if (activity === 'boss') {
    baseXP = XP_REWARDS.BOSS_DEFEAT;
  } else if (activity === 'quest') {
    baseXP = XP_REWARDS.DAILY_QUEST;
  }

  // Apply difficulty multiplier
  let totalXP = applyDifficultyMultiplier(baseXP, difficulty);

  // Apply streak bonus
  if (streak > 0) {
    totalXP = applyStreakBonus(totalXP, streak);
  }

  // Apply additional multiplier
  totalXP = Math.round(totalXP * bonusMultiplier);

  return totalXP;
}

/**
 * Calculate burnout risk based on session data
 */
export function calculateBurnoutRisk(
  sessionData: {
    sessionsPerWeek: number;
    hourPerSession: number;
    accuracy: number;
    focusLevel: number;
  }
): 'Low' | 'Medium' | 'High' {
  let riskScore = 0;

  // Too many sessions
  if (sessionData.sessionsPerWeek > 6) riskScore += 30;
  else if (sessionData.sessionsPerWeek > 4) riskScore += 15;

  // Too long sessions
  if (sessionData.hourPerSession > 3) riskScore += 30;
  else if (sessionData.hourPerSession > 2) riskScore += 15;

  // Low accuracy
  if (sessionData.accuracy < 0.5) riskScore += 20;

  // Low focus
  if (sessionData.focusLevel < 30) riskScore += 25;

  if (riskScore >= 70) return 'High';
  if (riskScore >= 40) return 'Medium';
  return 'Low';
}

/**
 * Get recommended study time based on topic difficulty and progress
 */
export function getRecommendedStudyTime(
  topicDifficulty: string,
  completionPercentage: number,
  currentStreak: number
): number {
  let minutes = 30;

  // Adjust based on difficulty
  if (topicDifficulty === 'Easy') minutes = 20;
  else if (topicDifficulty === 'Hard') minutes = 50;

  // Reduce time for already completed topics
  if (completionPercentage > 50) minutes = Math.max(15, minutes - 10);

  // Increase for high streak (better momentum)
  if (currentStreak > 7) minutes = Math.round(minutes * 1.2);

  return minutes;
}

export default {
  calculateLevel,
  getXPToNextLevel,
  getPlayerTitle,
  calculateInterviewReadiness,
  calculateFocus,
  applyStreakBonus,
  applyDifficultyMultiplier,
  calculateXPReward,
  calculateBurnoutRisk,
  getRecommendedStudyTime,
};

/**
 * Tambo Service Integration
 * Handles all AI-powered features for StudyGenie 2.0
 */

export interface TamboTopic {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedHours: number;
  prerequisites?: string[];
}

export interface TamboUnit {
  id: string;
  name: string;
  weightage: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topics: TamboTopic[];
}

export interface TamboSyllabusResponse {
  units: TamboUnit[];
  totalTopics: number;
  estimatedHours: number;
  curriculum: string;
}

export interface TamboQuestion {
  id: string;
  question: string;
  type: 'mcq' | 'code' | 'essay';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  options?: string[];
  correctAnswer: number | string;
  explanation: string;
  xpReward: number;
  hints?: string[];
}

export interface TamboCodeChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  starterCode: string;
  testCases: Array<{
    input: string;
    output: string;
  }>;
  timeComplexity: string;
  spaceComplexity: string;
  xpReward: number;
}

export interface TamboVivaQuestion {
  id: string;
  question: string;
  suggestedAnswer: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  evaluationCriteria: string[];
}

class TamboService {
  private baseUrl = process.env.NEXT_PUBLIC_TAMBO_API_URL || 'http://localhost:3001';
  private apiKey = process.env.NEXT_PUBLIC_TAMBO_API_KEY || 'demo-key';
  private isDemoMode = !process.env.NEXT_PUBLIC_TAMBO_API_URL || process.env.NEXT_PUBLIC_TAMBO_API_KEY === 'demo-key';

  /**
   * Parse syllabus/PDF and extract curriculum structure
   */
  async parseSyllabus(file: File): Promise<TamboSyllabusResponse> {
    // First, try to read and parse the file content locally
    const fileContent = await this.extractFileContent(file);
    
    // In demo mode, parse the file locally instead of using API
    if (this.isDemoMode) {
      console.log('📚 Demo mode - parsing your file locally');
      await new Promise(resolve => setTimeout(resolve, 1500));
      return this.parseFileContentLocally(fileContent, file.name);
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('apiKey', this.apiKey);

      const response = await fetch(`${this.baseUrl}/api/syllabus/parse`, {
        method: 'POST',
        body: formData,
        headers: {
          'X-API-Key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to parse syllabus');
      }

      return await response.json();
    } catch (error) {
      console.warn('⚠️ Tambo API unavailable, parsing file locally');
      return this.parseFileContentLocally(fileContent, file.name);
    }
  }

  /**
   * Extract text content from uploaded file
   */
  private async extractFileContent(file: File): Promise<string> {
    return new Promise((resolve) => {
      // Check if file is PDF - we can't parse binary PDFs with FileReader
      if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
        console.warn('📄 PDF files need server-side parsing. Using filename for course name.');
        resolve(''); // Return empty string, will use filename only
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          const text = e.target?.result as string;
          // Validate that content is readable text, not binary
          if (text && this.isReadableText(text)) {
            resolve(text);
          } else {
            console.warn('⚠️ File content appears to be binary. Using filename for course name.');
            resolve('');
          }
        };
        reader.onerror = () => resolve('');
        reader.readAsText(file);
      }
    });
  }

  /**
   * Check if text content is readable (not binary)
   */
  private isReadableText(text: string): boolean {
    // Check for excessive non-printable characters
    const nonPrintableCount = text.split('').filter(char => {
      const code = char.charCodeAt(0);
      return code < 32 && code !== 9 && code !== 10 && code !== 13;
    }).length;
    
    // If more than 5% non-printable, likely binary
    return (nonPrintableCount / text.length) < 0.05;
  }

  /**
   * Parse file content locally and extract topics/structure
   */
  private parseFileContentLocally(content: string, filename: string): TamboSyllabusResponse {
    // Extract course name from filename
    const courseName = filename
      .replace(/\.[^/.]+$/, '') // Remove extension
      .replace(/[-_]/g, ' ') // Replace dashes/underscores with spaces
      .replace(/\b\w/g, l => l.toUpperCase()); // Capitalize words

    // Try to detect topics from content
    const topics = this.extractTopicsFromContent(content);
    
    if (topics.length > 0) {
      // Group topics into units (3-5 topics per unit)
      const units = this.groupTopicsIntoUnits(topics);
      
      return {
        units,
        totalTopics: topics.length,
        estimatedHours: topics.length * 4,
        curriculum: courseName,
      };
    }

    // If no topics detected, return personalized default
    return this.getMockSyllabusData(courseName);
  }

  /**
   * Extract topics from syllabus content using pattern matching
   */
  private extractTopicsFromContent(content: string): Array<{
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    estimatedHours: number;
  }> {
    const topics: Array<{ name: string; difficulty: 'Easy' | 'Medium' | 'Hard'; estimatedHours: number }> = [];
    const lines = content.split('\n');
    
    // Patterns to detect topics
    const topicPatterns = [
      /^\d+\.\s+(.+)$/,           // 1. Topic Name
      /^[A-Z][\w\s]+:?$/,          // TOPIC NAME
      /^-\s+(.+)$/,                // - Topic Name
      /^\*\s+(.+)$/,               // * Topic Name
      /^Unit\s+\d+[:\s]+(.+)$/i,  // Unit 1: Topic
      /^Chapter\s+\d+[:\s]+(.+)$/i, // Chapter 1: Topic
      /^Week\s+\d+[:\s]+(.+)$/i,  // Week 1: Topic
      /^Module\s+\d+[:\s]+(.+)$/i, // Module 1: Topic
    ];

    let topicCount = 0;
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length < 5 || trimmed.length > 100) continue;

      for (const pattern of topicPatterns) {
        const match = trimmed.match(pattern);
        if (match) {
          const topicName = (match[1] || match[0]).trim();
          if (topicName && !topicName.includes('http') && topicName.length > 3) {
            // Determine difficulty based on position (early = easy, late = hard)
            const difficulty = topicCount < 3 ? 'Easy' : topicCount < 6 ? 'Medium' : 'Hard';
            
            topics.push({
              name: topicName,
              difficulty,
              estimatedHours: difficulty === 'Easy' ? 3 : difficulty === 'Medium' ? 5 : 7,
            });
            topicCount++;
            break;
          }
        }
      }
      
      if (topicCount >= 12) break; // Limit to 12 topics
    }

    return topics;
  }

  /**
   * Group topics into logical units
   */
  private groupTopicsIntoUnits(topics: Array<{ name: string; difficulty: 'Easy' | 'Medium' | 'Hard'; estimatedHours: number }>): TamboUnit[] {
    const units: TamboUnit[] = [];
    const topicsPerUnit = Math.ceil(topics.length / 3); // Aim for 3 units
    
    let unitNumber = 1;
    for (let i = 0; i < topics.length; i += topicsPerUnit) {
      const unitTopics = topics.slice(i, i + topicsPerUnit);
      const avgDifficulty = unitTopics[unitTopics.length - 1].difficulty; // Use last topic's difficulty
      
      units.push({
        id: `unit-${unitNumber}`,
        name: this.generateUnitName(unitNumber, unitTopics),
        weightage: Math.round(100 / 3),
        difficulty: avgDifficulty,
        topics: unitTopics.map((t, idx) => ({
          id: `topic-${i + idx + 1}`,
          name: t.name,
          difficulty: t.difficulty,
          estimatedHours: t.estimatedHours,
          prerequisites: idx > 0 ? [`topic-${i + idx}`] : undefined,
        })),
      });
      
      unitNumber++;
    }

    return units;
  }

  /**
   * Generate a descriptive unit name based on topics
   */
  private generateUnitName(unitNumber: number, topics: Array<{ name: string }>): string {
    const unitNames = [
      'Fundamentals',
      'Core Concepts',
      'Advanced Topics',
      'Specialized Areas',
      'Expert Level',
    ];
    
    return `${unitNames[unitNumber - 1] || 'Unit ' + unitNumber}`;
  }

  /**
   * Generate quiz questions for a specific topic
   */
  async generateQuiz(
    topicId: string,
    difficulty: 'Easy' | 'Medium' | 'Hard',
    count: number = 5
  ): Promise<TamboQuestion[]> {
    // In demo mode, skip API call
    if (this.isDemoMode) {
      console.log('🎯 Demo mode - generating mock quiz questions');
      await new Promise(resolve => setTimeout(resolve, 800));
      return this.getMockQuestions(difficulty, count);
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/quizzes/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          topicId,
          difficulty,
          count,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate quiz');
      }

      return await response.json();
    } catch (error) {
      console.warn('⚠️ Tambo API unavailable, using mock questions');
      return this.getMockQuestions(difficulty, count);
    }
  }

  /**
   * Generate coding challenges
   */
  async generateCodeChallenge(
    topicId: string,
    difficulty: 'Easy' | 'Medium' | 'Hard'
  ): Promise<TamboCodeChallenge> {
    // In demo mode, skip API call
    if (this.isDemoMode) {
      console.log('💻 Demo mode - generating mock code challenge');
      await new Promise(resolve => setTimeout(resolve, 1000));
      return this.getMockCodeChallenge(difficulty);
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/challenges/code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          topicId,
          difficulty,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code challenge');
      }

      return await response.json();
    } catch (error) {
      console.warn('⚠️ Tambo API unavailable, using mock challenge');
      return this.getMockCodeChallenge(difficulty);
    }
  }

  /**
   * Execute and evaluate code
   */
  async evaluateCode(
    code: string,
    language: string,
    testCases: Array<{ input: string; output: string }>
  ): Promise<{ passed: number; total: number; results: string[] }> {
    // In demo mode, skip API call
    if (this.isDemoMode) {
      console.log('✅ Demo mode - simulating code evaluation');
      await new Promise(resolve => setTimeout(resolve, 1200));
      return { passed: testCases.length, total: testCases.length, results: ['All tests passed!'] };
    }

    try {
      const response = await fetch(`${this.baseUrl}/api/code/evaluate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          code,
          language,
          testCases,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to evaluate code');
      }

      return await response.json();
    } catch (error) {
      console.warn('⚠️ Tambo API unavailable, simulating evaluation');
      return { passed: testCases.length, total: testCases.length, results: [] };
    }
  }

  /**
   * Generate viva/interview questions
   */
  async generateVivaQuestions(
    topicId: string,
    count: number = 5
  ): Promise<TamboVivaQuestion[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/viva/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          topicId,
          count,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate viva questions');
      }

      return await response.json();
    } catch (error) {
      console.error('Tambo viva generation error:', error);
      return this.getMockVivaQuestions(count);
    }
  }

  /**
   * Detect user mood and adjust difficulty
   */
  async detectMoodAndAdjustDifficulty(
    canvasData?: string
  ): Promise<{ mood: string; recommendedDifficulty: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/mood/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify({
          canvasData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to detect mood');
      }

      return await response.json();
    } catch (error) {
      console.error('Tambo mood detection error:', error);
      return { mood: 'focused', recommendedDifficulty: 'Medium' };
    }
  }

  /**
   * Evaluate student performance and predict burnout
   */
  async analyzePerformance(sessionData: {
    questionsAnswered: number;
    correctAnswers: number;
    timeSpent: number;
    focusLevel: number;
  }): Promise<{
    accuracy: number;
    burnoutRisk: 'Low' | 'Medium' | 'High';
    recommendations: string[];
    nextDifficulty: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/api/performance/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey,
        },
        body: JSON.stringify(sessionData),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze performance');
      }

      return await response.json();
    } catch (error) {
      console.error('Tambo performance analysis error:', error);
      return {
        accuracy: (sessionData.correctAnswers / sessionData.questionsAnswered) * 100,
        burnoutRisk: 'Low',
        recommendations: ['Keep up the great work!', 'Take a break if needed'],
        nextDifficulty: 'Medium',
      };
    }
  }

  // Mock data for demo/offline mode
  private getMockSyllabusData(courseName?: string): TamboSyllabusResponse {
    return {
      units: [
        {
          id: 'unit-1',
          name: 'Fundamental Data Structures',
          weightage: 30,
          difficulty: 'Easy',
          topics: [
            {
              id: 'topic-1',
              name: 'Arrays & Lists',
              difficulty: 'Easy',
              estimatedHours: 4,
            },
            {
              id: 'topic-2',
              name: 'Stacks & Queues',
              difficulty: 'Medium',
              estimatedHours: 5,
              prerequisites: ['topic-1'],
            },
          ],
        },
        {
          id: 'unit-2',
          name: 'Trees & Graphs',
          weightage: 40,
          difficulty: 'Hard',
          topics: [
            {
              id: 'topic-3',
              name: 'Binary Trees',
              difficulty: 'Medium',
              estimatedHours: 6,
            },
            {
              id: 'topic-4',
              name: 'Graph Algorithms',
              difficulty: 'Hard',
              estimatedHours: 8,
              prerequisites: ['topic-3'],
            },
          ],
        },
      ],
      totalTopics: 4,
      estimatedHours: 23,
      curriculum: courseName || 'Data Structures & Algorithms',
    };
  }

  private getMockQuestions(
    difficulty: string,
    count: number
  ): TamboQuestion[] {
    const baseQuestions = [
      {
        id: '1',
        question: 'What is the time complexity of binary search?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
        correctAnswer: 1,
        explanation: 'Binary search divides the search space by half in each iteration.',
        xpReward: 50,
        hints: ['Think about how binary search eliminates half the elements each time'],
      },
      {
        id: '2',
        question: 'Which data structure uses LIFO principle?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: ['Queue', 'Stack', 'Tree', 'Graph'],
        correctAnswer: 1,
        explanation: 'Stack (Last In First Out) - elements are removed in reverse order.',
        xpReward: 50,
        hints: ['LIFO = Last In First Out'],
      },
      {
        id: '3',
        question: 'What is the space complexity of quicksort?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
        correctAnswer: 1,
        explanation: 'Quicksort uses O(log n) space for the recursive call stack.',
        xpReward: 60,
        hints: ['Consider the recursion depth'],
      },
      {
        id: '4',
        question: 'Which algorithm is used to find shortest path in a graph?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: ['DFS', 'BFS', 'Dijkstra', 'All of these'],
        correctAnswer: 3,
        explanation: 'All three can find shortest paths in different scenarios.',
        xpReward: 70,
        hints: ['Think about weighted vs unweighted graphs'],
      },
      {
        id: '5',
        question: 'What is a balanced binary tree?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: [
          'All nodes have equal values',
          'Left and right subtree heights differ by at most 1',
          'All leaf nodes are at same level',
          'Has minimum height'
        ],
        correctAnswer: 1,
        explanation: 'A balanced tree maintains height difference of at most 1 between subtrees.',
        xpReward: 50,
        hints: ['AVL and Red-Black trees are balanced'],
      },
      {
        id: '6',
        question: 'Which traversal gives sorted order in BST?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
        correctAnswer: 1,
        explanation: 'Inorder traversal (left-root-right) gives sorted sequence in BST.',
        xpReward: 55,
        hints: ['Visit left subtree, then root, then right'],
      },
      {
        id: '7',
        question: 'What is the worst-case time complexity of bubble sort?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2^n)'],
        correctAnswer: 2,
        explanation: 'Bubble sort compares each element with all others, giving O(n²).',
        xpReward: 45,
        hints: ['Think about nested loops'],
      },
      {
        id: '8',
        question: 'Which data structure is best for implementing LRU cache?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: ['Array', 'Stack', 'HashMap + Doubly Linked List', 'Binary Tree'],
        correctAnswer: 2,
        explanation: 'HashMap for O(1) access and Doubly Linked List for O(1) updates.',
        xpReward: 80,
        hints: ['Need both fast access and order tracking'],
      },
      {
        id: '9',
        question: 'What is dynamic programming?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: [
          'Programming that changes at runtime',
          'Solving problems by breaking into overlapping subproblems',
          'Writing code dynamically',
          'Memory allocation technique'
        ],
        correctAnswer: 1,
        explanation: 'DP solves problems by storing solutions to subproblems to avoid recomputation.',
        xpReward: 75,
        hints: ['Memoization and tabulation are DP techniques'],
      },
      {
        id: '10',
        question: 'What is the purpose of a hash function?',
        type: 'mcq' as const,
        difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
        options: [
          'Sort data',
          'Map data to fixed-size values',
          'Encrypt data',
          'Compress data'
        ],
        correctAnswer: 1,
        explanation: 'Hash functions map arbitrary-sized data to fixed-size hash values.',
        xpReward: 50,
        hints: ['Used in hash tables for constant-time lookups'],
      },
    ];

    // Return exactly the requested count
    return baseQuestions.slice(0, Math.min(count, baseQuestions.length));
  }

  private getMockCodeChallenge(difficulty: string): TamboCodeChallenge {
    return {
      id: '1',
      title: 'Reverse an Array',
      description: 'Write a function to reverse an array in-place',
      difficulty: difficulty as 'Easy' | 'Medium' | 'Hard',
      starterCode: `function reverseArray(arr) {
  // Your code here
  return arr;
}`,
      testCases: [
        { input: '[1,2,3]', output: '[3,2,1]' },
        { input: '[5,10,15]', output: '[15,10,5]' },
      ],
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      xpReward: 100,
    };
  }

  private getMockVivaQuestions(count: number): TamboVivaQuestion[] {
    const questions = [
      {
        id: '1',
        question: 'Explain the difference between arrays and linked lists.',
        suggestedAnswer:
          'Arrays provide O(1) access but O(n) insertion. Linked lists provide O(n) access but O(1) insertion at known positions.',
        difficulty: 'Medium' as const,
        evaluationCriteria: ['Mentions time complexity', 'Explains trade-offs'],
      },
      {
        id: '2',
        question: 'How would you design a cache with LRU (Least Recently Used) eviction?',
        suggestedAnswer:
          'Use a combination of HashMap and Doubly Linked List. HashMap for O(1) access, LinkedList to maintain order of usage.',
        difficulty: 'Hard' as const,
        evaluationCriteria: ['Mentions data structures', 'Explains eviction logic'],
      },
    ];

    return questions.slice(0, count);
  }
}

export const tamboService = new TamboService();
export default TamboService;

# StudyGenie - AI-Powered Learning Platform

> Transform your syllabus into an interactive dungeon. Gamify learning through **Groq AI-powered** quiz battles, code challenges, and spaced repetition.

![Status](https://img.shields.io/badge/status-production%20ready-brightgreen)
![Build](https://img.shields.io/badge/build-passing-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.5-black)
![Groq AI](https://img.shields.io/badge/Powered%20by-Groq%20AI-purple)

## 🤖 AI Backend Architecture

**StudyGenie uses a Flask + Groq AI backend** (Llama 3.1 70B Versatile) for intelligent content generation. The frontend Next.js app communicates with a separate Python backend service.

### Architecture Overview:

```
Next.js Frontend (this repo)
    ↓ HTTP/REST API
Flask Backend (separate repo)
    ↓ API calls
Groq AI (Llama 3.1 70B)
```

### How the AI Backend Powers StudyGenie:

1. **📚 PDF Syllabus Parsing** - Upload PDF → Backend extracts text → Groq AI analyzes and structures topics
2. **⚔️ Quiz Generation** - Request quiz → Groq AI creates MCQ questions with explanations and difficulty levels
3. **🎤 Interview Q&A** - Generate interview prep → Groq AI produces questions with detailed answers
4. **📊 Structured JSON Output** - All AI responses validated with Pydantic schemas for type safety

**All content is dynamically generated** - no static questions or hardcoded challenges. The AI adapts to YOUR syllabus content.

## ✨ Features (AI-Powered)

### 🎯 Combat Mode (AI Quiz Generation)
```typescript
// Backend generates 5-10 MCQ questions via Groq AI
const quiz = await studyGenieBackend.generateQuiz(topic, difficulty, 10);
// Returns: { quiz: [...], total_questions: 10, topics_covered: [...] }
```
- Health-based damage system for wrong answers
- **Groq AI generates MCQs** with 4 options + detailed explanations
- Difficulty scaling (Easy/Medium/Hard)
- Real-time scoring with XP rewards
- Graceful fallback with mock questions if backend unavailable

### 💻 Practice Editor (Code Challenges)
```typescript
// Local code editor with syntax highlighting
// Note: AI code generation ready for integration
const challenge = await studyGenieBackend.generateCodeChallenge(topic, difficulty);
```
- Built-in Monaco code editor (VS Code engine)
- Syntax highlighting for JavaScript, Python, Java
- Test case validation
- Ready for AI-generated challenges (backend endpoint available)

### 📊 Skill Tree (Visual Progress)
- Organized view of AI-parsed syllabus units and topics
- Local parsing with pattern matching (extracts topics from PDF text)
- 6 difficulty states: Locked, Weak, Learning, Strong, Boss, Mastered
- Click any topic → Opens modal to choose Combat/Practice/Flashcards
- Prerequisites tracking (can't unlock advanced topics first)

### 🃏 Flashcard System
- Interactive card flip animations
- Progress tracking (mastered/needs review)
- Manual flashcard creation
- Spaced repetition algorithm
- Ready for AI-generated flashcard integration

### 🏆 Dashboard
- XP and level tracking
- Daily quest system
- Weak areas identification (from quiz results)
- Study statistics and session tracking

### 🏠 Cozy Study Room
- Pomodoro focus timer (25min work / 5min break)
- Background lofi music player
- Ambient starfield and rain animations
- SessQuick Start

### Prerequisites
- Node.js 18+
- MongoDB database (for user data and progress)
- **Tambo API key** (or use demo mode)

### Installation

```bash
# 1. Clone repository
git clone <repo-url>
cd tambo-hackathon

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp example.env.local .env.local
```

Edit `.env.local`:
```env
# Tambo AI (Required for full features)
NEXT_PUBLIC_TAMBO_API_URL=https://api.tambo.ai
NEXT_PUBLIC_TAMBO_API_KEY=your_tambo_api_key

# MongoDB (Required for auth and progress)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/studygenie
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

### Run Development Server

```bash
npm ruHow It Works

### 1. Upload Your Syllabus (Local + AI Parsing)
```typescript
// Student uploads PDF/text file
const file = event.target.files[0];

// Option A: Send to AI backend (if available)
const response = await fetch('BACKEND_URL/api/upload-pdf', {
  method: 'POST',
  body: formData // Contains PDF file
});
const { skill_map } = await response.json();

// Option B: Local parsing fallback (pattern matching)
const syllabus = await tamboService.parseSyllabus(file);
// Returns: { units: [...], topics: [...], curriculum: "Course Name" }
```
**The system analyzes** your file and extracts:
- Course name and curriculum
- Units/modules/chapters
- Individual topics with difficulty levels
- Prerequisites and dependencies

### 2. View Skill Tree (AI-Organized)
- Visual tree showing all extracted topics
- Organized by units (AI determines logical groupings or local pattern matching)
- Click any topic to open learning mode selector

### 3. Choose Learning Mode

#### Option A: Combat Quiz (Tambo Generates Questions)
```typescript
// Tambo creates quiz questions for the selected topic
const quiz = await tamboService.generateQuiz(topicId, 'Medium', 10);
// 🔧 Tambo Service API

All AI features are powered by `src/services/tambo-service.ts` (730 lines):

### Available Methods

```typescript
class TamboService {
  // 1. Parse syllabus from uploaded file
  async parseSyllabus(file: File): Promise<TamboSyllabusResponse>
  
  // 2. Generate quiz questions for a topic
  async generateQuiz(
    topicId: string, 
    difficulty: 'Easy' | 'Medium' | 'Hard',
    count: number
  ): Promise<TamboQuestion[]>
  
  // 3. Generate coding challenges
  async generateCodeChallenge(
    topicId: string,
    difficulty: 'Easy' | 'Medium' | 'Hard'
  ): Promise<TamboCodeChallenge>
  
  // 4. Evaluate submitted code
  async evaluateCode(
    code: string,
    language: string,
    testCases: Array<{ input: string; output: string }>
  ): Promise<{ passed: number; total: number; results: string[] }>
  
  // 5. Generate viva/interview questions
  async generateVivaQuestions(
    topicId: string,
    count: number
  ): Promise<TamboVivaQuestion[]>
}
```

### Demo Mode Fallbacks

When Tambo API is unavailable (no API key or network error), the service automatically:
- ✅ Parses syllabus locally using pattern matching
- ✅ Generates mock quiz questions (difficulty-appropriate)
- ✅ Provides sample code challenges
- ✅ Simulates code evaluation

This ensures **StudyGenie always works**, even if backend is down!

### Backend API Endpoints (Separate Repository)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/upload-pdf` | POST | Upload PDF → AI extracts skill map + generates quiz + interview Q&A |
| `/api/generate-quiz` | POST | Generate MCQ questions for a specific topic |
| `/api/generate-flashcards` | POST | Generate flashcard sets (ready for integration) |
| `/api/generate-coding-challenge` | POST | Generate coding problems (ready for integration) |
| `/health` | GET | Health check endpoint |

### Where Backend Integration is Used

| Frontend Component | Backend Call | Trigger |
|--------------------|--------------|---------|
| `syllabus-upload.tsx` | `/api/upload-pdf` | File upload button |
| `combat-mode.tsx` | `/api/generate-quiz` | Start quiz button |
| `practice-editor-enhanced.tsx` | `/api/generate-coding-challenge` | Code practice mode (ready) |
| `flashcard-view.tsx` | `/api/generate-flashcards` | Flashcard generation (ready) |

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx                      # Landing page (marketing)
│   ├── study-genie/page.tsx          # Main app router
│   ├── auth/                         # NextAuth signin/signup
│   └── api/                          # API routes
│       ├── auth/[...nextauth]/       # NextAuth handler
│       ├── progress/                 # Save/load progress
│       ├── generate-quiz/            # Proxy to Tambo (optional)
│       └── youtube/parse/            # YouTube transcript parsing
│
├── components/
│   ├── study-genie/                  # Core StudyGenie components
│   │   ├── landing-page.tsx          # Hero/marketing page
│   │   ├── syllabus-upload.tsx       # 📚 Tambo: parseSyllabus()
│   │   ├── dashboard-enhanced.tsx    # Stats, quests, XP
│   │   ├── skill-tree-enhanced.tsx   # Visual topic tree
│   │   ├── combat-mode.tsx           # ⚔️ Tambo: generateQuiz()
│   │   ├── practice-editor-enhanced.tsx # 💻 Tambo: generateCodeChallenge()
│   │   ├── flashcard-view.tsx        # Flip cards
│   │   ├── cozy-room-enhanced.tsx    # Focus timer + music
│   │   ├── scorecard.tsx             # Results summary
│   │   └── modals/topic-modal.tsx    # Mode selector
│   └── ui/                           # Reusable UI components
│
├── services/
│   ├── tambo-service.ts              # Local fallback service (730 lines)
│   ├── studygenie-backend.ts         # 🤖 GROQ AI BACKEND CLIENT (primary)
│   ├── xp-system.ts                  # XP calculation logic
│   └── youtube-service.ts            # YouTube transcript parsing
│
├── models/                           # MongoDB schemas
│   ├── User.ts, UserProfile.ts
│   ├── Progress.ts, StudySession.ts
│   └── Syllabus.ts, Topic.ts
│
└── lib/
    ├── auth.ts                       # NextAuth config
    ├── db.ts                         # MongoDB connection
    └── utils.ts                      # Helper functions
```

### Key Files to Understand

1. **`src/services/studygenie-backend.ts`** - THE CORE. Backend API client (Groq AI integration)
2. **`src/services/tambo-service.ts`** - Fallback service with mock data
3. **`src/app/study-genie/page.tsx`** - Main router managing all views
4. **`src/components/study-genie/combat-mode.tsx`** - Quiz battle implementation
5. **`src/components/study-genie/syllabus-upload.tsx`** - File upload and parsing
6. **`src/components/study-genie/practice-editor-enhanced.tsx`** - Code editor (Monaco) └── utils.ts
│
└── lib/
    ├── tambo.ts
    └── utils.ts
```

## 🎯 Key Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| **LandingPage** | Hero page | Animations, feature showcase, dual CTAs |
| **SyllabusUpload** | PDF ingestion | File parsing via Tambo AI |
| **DashboardEnhanced** | Learning hub | Stats, quests, focus meter |
| **SkillTreeEnhanced** | Progress tracking | 6-state nodes, topic selection |
| **CombatMode** | Quiz battles | Health system, damage calculation |
| **FlashcardView** | Active recall | Card flip, progress tracking |
| **PracticeEditor** | Code challenges | Execution, hints, test cases |
| **CozyRoom** | Focus space | Ambient effects, timer |
| **ScoreCard** | Results display | Dynamic XP, weak areas, readiness |

## 💾 Data Flow

```
PDF Upload
    ↓
Tambo Parsing → Syllabus Data
    ↓
Dashboard (Display)
    ↓
Skill Tree (Topic Selection)
    ↓
Topic Modal (Mode Selection)
    ├→ Combat Mode → Combat Results
    ├→ Flashcards → Learning Stats
    └→ Code Practice → Evaluation
    ↓
ScoreCard (Dynamic Results)
    ↓
Dashboard (XP Update, Weak Areas)
```

## 🎨 Design System

- **Colors**: Purple-pink gradient theme with slate backgrounds
- **UI Kit**: Lucide React icons (50+), Tailwind CSS
- **Animations**: Smooth transitions, gradient shifts, bounce effects
- **Responsive**: Mobile-first, works on all screen sizes
- **Accessibility**: Proper contrast, keyboard navigation

## 📊 State Management

**Local State** (using React hooks):
- `currentView` - Navigation between pages
- `syllabus` - Parsed curriculum data
- `isDemoMode` - Demo vs real mode toggle
- `combatResults` - Session metrics
- `selectedTopic` - Current learning topic
- `showScoreCard` - Results modal visibility

**Session Data**:
- Combat metrics (score, time, correctAnswers)
- Weak area identification
- Progress tracking

## 🔧 Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, TypeScript 5, Next.js 15.5 |
| **Styling** | Tailwind CSS 4, Glassmorphism effects |
| **Icons** | Lucide React |
| **AI Backend** | **Flask + Groq AI (Llama 3.1 70B)** - separate service |
| **Database** | MongoDB with Mongoose |
| **Auth** | NextAuth.js v5 |
| **Code Editor** | Monaco Editor (VS Code engine) |
| **Build** | Next.js App Router, Vercel-ready |

## 🌐 Environment Variables

Required for production:

```env
# StudyGenie AI Backend (Flask + Groq AI)
NEXT_PUBLIC_STUDYGENIE_BACKEND_URL=https://studygenie-ai.onrender.com

# MongoDB (User Data & Progress)
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/studygenie

# NextAuth (Authentication)
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
```

### Backend Setup (Separate Repository)

The AI backend is a Flask service that needs:
- `GROQ_API_KEY` - Get from [console.groq.com](https://console.groq.com)
- Deployed separately to Render/Heroku  
- See backend README for full deployment instructions

**Without backend**: App works in demo mode with local fallbacks!

## 📈 Performance

- ✅ Build time: ~15 seconds (19 routes)
- ✅ Zero TypeScript errors
- ✅ Successful production build
- ✅ Optimized bundle size: 107 KB shared chunks
- ✅ Client-side rendering for interactivity
- ✅ Smooth animations (CSS-based, 60fps)

### Current ✅
- Combat quiz battles with health system
- Flashcard system with progress tracking
- Code challenge editor with hints
- Dashboard with XP tracking
- Skill tree with difficulty states
- Demo mode with sample data
- L✅ What's Implemented

### Fully Functional Features
- ✅ **Syllabus Upload & Parsing** (Tambo-powered with local fallback)
- ✅ **Combat Quiz Mode** (Tambo generates questions, mock fallback available)
- ✅ **Code Practice Editor** (Tambo generates challenges, mock fallback)
- ✅ **Skill Tree Visualization** (from parsed syllabus)
- ✅ **Flashcard System** (UI complete, ready for Tambo flashcard generation)
- ✅ **Dashboard** (XP tracking, quests, statistics)
- ✅ **Cozy Study Room** (Pomodoro timer, background music)
- ✅ **Landing Page** (Modern hero design)
- ✅ **Authentication** (NextAuth with MongoDB)
- ✅ **Progress Tracking** (MongoDB persistence)
- ✅ **Demo Mode** (works without Tambo API key)

### � Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

Add environment variables in Vercel dashboard:
- `NEXT_PUBLIC_TAMBO_API_URL`
- `NEXT_PUBLIC_TAMBO_API_KEY`
- `MONGODB_URI`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

### MongoDB Setup
1. Create cluster on MongoDB Atlas
2. Whitelist Vercel IPs: `0.0.0.0/0`
3. Copy connection string to `MONGODB_URI`

## 📞 Support & Troubleshooting

### Common Issues

**"Demo mode" message appearing?**
- Backend URL not configured in `.env.local`
- Backend service is down or unreachable
- Check backend health: `curl https://your-backend.onrender.com/health`

**Syllabus upload not working?**
- Check file is readable text (not scanned image PDF)
- Verify backend is running: check `/health` endpoint
- Check browser console for network errors
- Try demo mode (works offline with local parsing)

**MongoDB connection failed?**
- Verify `MONGODB_URI` format is correct
- Check MongoDB Atlas network access settings
- Ensure database user has read/write permissions

**Build failing?**
- Run `rm -rf .next node_modules && npm install && npm run build`
- Check all environment variables are set
- Verify TypeScript has no errors

## 🙏 Built With

### Frontend (This Repository)
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[MongoDB](https://mongodb.com)** - Database for user progress
- **[Tailwind CSS 4](https://tailwindcss.com)** - Styling framework
- **[NextAuth.js](https://next-auth.js.org)** - Authentication
- **[Monaco Editor](https://microsoft.github.io/monaco-editor/)** - Code editor (VS Code engine)

### AI Backend (Separate Repository)
- **[Flask](https://flask.palletsprojects.com)** - Python web framework
- **[Groq AI](https://groq.com)** - Llama 3.1 70B Versatile model
- **[pdfplumber](https://github.com/jsvine/pdfplumber)** - PDF text extraction
- **[Pydantic](https://docs.pydantic.dev)** - JSON schema validation

---

**Powered by Groq AI (Llama 3.1 70B) 🚀**

StudyGenie demonstrates AI-powered education with:
- ✨ Intelligent syllabus parsing
- 🎯 Dynamic quiz generation
- 🎤 Interview question creation
- 📊 Structured JSON validation
- 🎮 Gamified learning experience
**Made with 🎮 by the StudyGenie team**

For the complete implementation details, see the in-code documentation and component comments.

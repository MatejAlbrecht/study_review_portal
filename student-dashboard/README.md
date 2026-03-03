# Student Dashboard

A comprehensive, full-stack productivity web application designed specifically for students to manage their time, tasks, and study sessions.

## Features

### 📝 Advanced To-Do List
- Complete CRUD functionality for tasks
- Filter by status (Todo, In Progress, Done) and category (Homework, Exam, Personal)
- Sort by due date
- Priority levels (Low, Medium, High)
- Mark tasks complete with one click

### ⏱️ Pomodoro Timer
- 25-minute focus sessions
- 5-minute break intervals
- Automatic session logging to database
- Play/pause/reset controls

### 📓 Quick Notes/Scratchpad
- Multiple notes support
- Markdown content
- Automatic debounced saving (saves 1 second after you stop typing)
- Quick note switching

### 📊 Dashboard Overview
- Real-time statistics
- Today's task count
- Total study time logged today
- Total notes count

### 🎨 UI/UX
- Clean, minimalist design
- Dark mode with toggle (persists across sessions)
- Fully responsive (mobile-friendly)
- Real-time updates without page refreshes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: SQLite with Prisma 7
- **Backend**: Next.js Server Actions
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 20+ and npm

### Installation

1. Navigate to the project directory:
```bash
cd student-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Copy the example environment file
cp .env.example .env

# The .env file should contain:
# DATABASE_URL="file:./dev.db"
```

4. Set up the database:
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Seed the database with a demo user
sqlite3 dev.db "INSERT OR REPLACE INTO User (id, email, name, createdAt, updatedAt) VALUES ('demo-user-1', 'student@example.com', 'Demo Student', datetime('now'), datetime('now'));"
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Database Schema

### User
- id, email, name, timestamps

### Task
- id, title, description
- status (TODO, IN_PROGRESS, DONE)
- priority (LOW, MEDIUM, HIGH)
- category (HOMEWORK, EXAM, PERSONAL)
- dueDate, userId, timestamps

### StudySession
- id, duration (minutes), date, notes
- userId, timestamps

### Note
- id, title, content (markdown)
- userId, timestamps

## Project Structure

```
student-dashboard/
├── actions/          # Server Actions for backend operations
│   ├── tasks.ts      # Task CRUD operations
│   ├── sessions.ts   # Study session logging
│   └── notes.ts      # Notes CRUD operations
├── app/              # Next.js App Router pages
│   ├── layout.tsx    # Root layout
│   ├── page.tsx      # Dashboard page
│   └── globals.css   # Global styles
├── components/       # React components
│   ├── Header.tsx    # Header with dark mode toggle
│   ├── TaskSection.tsx
│   ├── PomodoroTimer.tsx
│   └── NotesSection.tsx
├── lib/              # Utilities
│   ├── prisma.ts     # Prisma client singleton
│   └── utils.ts      # Helper functions
└── prisma/           # Database
    ├── schema.prisma # Database schema
    └── migrations/   # Migration files
```

## Features in Detail

### Server Actions
All backend operations use Next.js Server Actions for a seamless experience:
- No API routes needed
- Type-safe operations
- Automatic revalidation
- Progressive enhancement

### Dark Mode
- Automatically detects system preference on first visit
- Toggle persists in localStorage
- Smooth transitions

### Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly controls

## License

MIT

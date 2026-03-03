import { getTasks } from '@/actions/tasks'
import { getTodayStudyTime } from '@/actions/sessions'
import { getNotes } from '@/actions/notes'
import TaskSection from '@/components/TaskSection'
import PomodoroTimer from '@/components/PomodoroTimer'
import NotesSection from '@/components/NotesSection'
import Header from '@/components/Header'

export default async function Home() {
  const tasksResult = await getTasks()
  const studyTimeResult = await getTodayStudyTime()
  const notesResult = await getNotes()

  const tasks = tasksResult.success && tasksResult.data ? tasksResult.data : []
  const todayStudyMinutes = studyTimeResult.success && studyTimeResult.data !== undefined ? studyTimeResult.data : 0
  const notes = notesResult.success && notesResult.data ? notesResult.data : []

  const todayTasks = tasks.filter(task => {
    if (!task.dueDate) return false
    const today = new Date()
    const dueDate = new Date(task.dueDate)
    return dueDate.toDateString() === today.toDateString()
  })

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-muted-foreground">Manage your tasks, study sessions, and notes all in one place</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-8">
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Today's Tasks</h3>
            <p className="text-3xl font-bold">{todayTasks.length}</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Study Time Today</h3>
            <p className="text-3xl font-bold">{todayStudyMinutes} min</p>
          </div>
          
          <div className="bg-card border rounded-lg p-6">
            <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Notes</h3>
            <p className="text-3xl font-bold">{notes.length}</p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <TaskSection initialTasks={tasks} />
          </div>
          
          <div className="space-y-6">
            <PomodoroTimer />
            <NotesSection initialNotes={notes} />
          </div>
        </div>
      </main>
    </div>
  )
}

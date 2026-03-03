'use client'

import { useState } from 'react'
import { Task, TaskStatus, TaskPriority, TaskCategory } from '@prisma/client'
import { createTask, deleteTask, toggleTaskStatus } from '@/actions/tasks'
import { Plus, Trash2, CheckCircle2, Circle, Clock } from 'lucide-react'
import { format } from 'date-fns'

interface TaskSectionProps {
  initialTasks: Task[]
}

export default function TaskSection({ initialTasks }: TaskSectionProps) {
  const [tasks, setTasks] = useState(initialTasks)
  const [isAdding, setIsAdding] = useState(false)
  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'ALL'>('ALL')
  const [filterCategory, setFilterCategory] = useState<TaskCategory | 'ALL'>('ALL')

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const result = await createTask(formData)
    
    if (result.success && result.data) {
      setTasks([result.data, ...tasks])
      setIsAdding(false)
      e.currentTarget.reset()
    }
  }

  const handleToggleStatus = async (id: string) => {
    const result = await toggleTaskStatus(id)
    if (result.success && result.data) {
      setTasks(tasks.map(t => t.id === id ? result.data : t))
    }
  }

  const handleDeleteTask = async (id: string) => {
    const result = await deleteTask(id)
    if (result.success) {
      setTasks(tasks.filter(t => t.id !== id))
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'ALL' && task.status !== filterStatus) return false
    if (filterCategory !== 'ALL' && task.category !== filterCategory) return false
    return true
  })

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'HIGH': return 'text-red-600 dark:text-red-400'
      case 'MEDIUM': return 'text-yellow-600 dark:text-yellow-400'
      case 'LOW': return 'text-green-600 dark:text-green-400'
    }
  }

  const getStatusIcon = (status: TaskStatus) => {
    if (status === 'DONE') return <CheckCircle2 className="h-5 w-5 text-green-600" />
    if (status === 'IN_PROGRESS') return <Clock className="h-5 w-5 text-blue-600" />
    return <Circle className="h-5 w-5" />
  }

  return (
    <div className="bg-card border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="p-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="flex gap-2 mb-4 flex-wrap">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'ALL')}
          className="px-3 py-1 border rounded-md bg-background text-sm"
        >
          <option value="ALL">All Status</option>
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value as TaskCategory | 'ALL')}
          className="px-3 py-1 border rounded-md bg-background text-sm"
        >
          <option value="ALL">All Categories</option>
          <option value="HOMEWORK">Homework</option>
          <option value="EXAM">Exam</option>
          <option value="PERSONAL">Personal</option>
        </select>
      </div>

      {isAdding && (
        <form onSubmit={handleAddTask} className="mb-4 p-4 border rounded-lg bg-muted/50">
          <input
            name="title"
            type="text"
            placeholder="Task title"
            required
            className="w-full px-3 py-2 border rounded-md mb-2 bg-background"
          />
          <textarea
            name="description"
            placeholder="Description (optional)"
            className="w-full px-3 py-2 border rounded-md mb-2 bg-background"
            rows={2}
          />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <select name="priority" className="px-3 py-2 border rounded-md bg-background">
              <option value="LOW">Low Priority</option>
              <option value="MEDIUM">Medium Priority</option>
              <option value="HIGH">High Priority</option>
            </select>
            <select name="category" className="px-3 py-2 border rounded-md bg-background">
              <option value="HOMEWORK">Homework</option>
              <option value="EXAM">Exam</option>
              <option value="PERSONAL">Personal</option>
            </select>
          </div>
          <input
            name="dueDate"
            type="date"
            className="w-full px-3 py-2 border rounded-md mb-2 bg-background"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90"
            >
              Add Task
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border rounded-md hover:bg-muted"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleStatus(task.id)}
                  className="mt-0.5 hover:opacity-70 transition-opacity"
                >
                  {getStatusIcon(task.status)}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={'font-medium ' + (task.status === 'DONE' ? 'line-through text-muted-foreground' : '')}>
                      {task.title}
                    </h3>
                    <span className={'text-xs font-medium ' + getPriorityColor(task.priority)}>
                      {task.priority}
                    </span>
                    <span className="text-xs px-2 py-0.5 bg-secondary rounded-full">
                      {task.category}
                    </span>
                  </div>
                  
                  {task.description && (
                    <p className="text-sm text-muted-foreground mb-1">{task.description}</p>
                  )}
                  
                  {task.dueDate && (
                    <p className="text-xs text-muted-foreground">
                      Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                    </p>
                  )}
                </div>
                
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-md transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

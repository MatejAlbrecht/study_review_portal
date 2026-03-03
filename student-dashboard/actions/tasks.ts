'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { TaskStatus, TaskPriority, TaskCategory } from '@prisma/client'

const DEFAULT_USER_ID = 'demo-user-1'

export async function getTasks() {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: DEFAULT_USER_ID },
      orderBy: [
        { dueDate: 'asc' },
        { createdAt: 'desc' }
      ]
    })
    return { success: true, data: tasks }
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return { success: false, error: 'Failed to fetch tasks' }
  }
}

export async function createTask(formData: FormData) {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null
    const status = formData.get('status') as TaskStatus || 'TODO'
    const priority = formData.get('priority') as TaskPriority || 'MEDIUM'
    const category = formData.get('category') as TaskCategory || 'HOMEWORK'
    const dueDateStr = formData.get('dueDate') as string | null
    
    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        category,
        dueDate: dueDateStr ? new Date(dueDateStr) : null,
        userId: DEFAULT_USER_ID
      }
    })
    
    revalidatePath('/')
    return { success: true, data: task }
  } catch (error) {
    console.error('Error creating task:', error)
    return { success: false, error: 'Failed to create task' }
  }
}

export async function updateTask(id: string, formData: FormData) {
  try {
    const title = formData.get('title') as string
    const description = formData.get('description') as string | null
    const status = formData.get('status') as TaskStatus
    const priority = formData.get('priority') as TaskPriority
    const category = formData.get('category') as TaskCategory
    const dueDateStr = formData.get('dueDate') as string | null
    
    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        category,
        dueDate: dueDateStr ? new Date(dueDateStr) : null
      }
    })
    
    revalidatePath('/')
    return { success: true, data: task }
  } catch (error) {
    console.error('Error updating task:', error)
    return { success: false, error: 'Failed to update task' }
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({
      where: { id }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting task:', error)
    return { success: false, error: 'Failed to delete task' }
  }
}

export async function toggleTaskStatus(id: string) {
  try {
    const task = await prisma.task.findUnique({ where: { id } })
    if (!task) return { success: false, error: 'Task not found' }
    
    const newStatus = task.status === 'DONE' ? 'TODO' : 
                     task.status === 'TODO' ? 'IN_PROGRESS' : 'DONE'
    
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { status: newStatus }
    })
    
    revalidatePath('/')
    return { success: true, data: updatedTask }
  } catch (error) {
    console.error('Error toggling task status:', error)
    return { success: false, error: 'Failed to toggle task status' }
  }
}

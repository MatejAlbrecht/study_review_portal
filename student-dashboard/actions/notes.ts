'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

const DEFAULT_USER_ID = 'demo-user-1'

export async function getNotes() {
  try {
    const notes = await prisma.note.findMany({
      where: { userId: DEFAULT_USER_ID },
      orderBy: { updatedAt: 'desc' }
    })
    return { success: true, data: notes }
  } catch (error) {
    console.error('Error fetching notes:', error)
    return { success: false, error: 'Failed to fetch notes' }
  }
}

export async function getNote(id: string) {
  try {
    const note = await prisma.note.findUnique({
      where: { id }
    })
    return { success: true, data: note }
  } catch (error) {
    console.error('Error fetching note:', error)
    return { success: false, error: 'Failed to fetch note' }
  }
}

export async function createNote(title: string, content: string) {
  try {
    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId: DEFAULT_USER_ID
      }
    })
    
    revalidatePath('/')
    return { success: true, data: note }
  } catch (error) {
    console.error('Error creating note:', error)
    return { success: false, error: 'Failed to create note' }
  }
}

export async function updateNote(id: string, title: string, content: string) {
  try {
    const note = await prisma.note.update({
      where: { id },
      data: { title, content }
    })
    
    revalidatePath('/')
    return { success: true, data: note }
  } catch (error) {
    console.error('Error updating note:', error)
    return { success: false, error: 'Failed to update note' }
  }
}

export async function deleteNote(id: string) {
  try {
    await prisma.note.delete({
      where: { id }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Error deleting note:', error)
    return { success: false, error: 'Failed to delete note' }
  }
}

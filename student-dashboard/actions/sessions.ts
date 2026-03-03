'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { startOfDay, endOfDay } from 'date-fns'

const DEFAULT_USER_ID = 'demo-user-1'

export async function createStudySession(duration: number, notes?: string) {
  try {
    const session = await prisma.studySession.create({
      data: {
        duration,
        notes,
        userId: DEFAULT_USER_ID
      }
    })
    
    revalidatePath('/')
    return { success: true, data: session }
  } catch (error) {
    console.error('Error creating study session:', error)
    return { success: false, error: 'Failed to create study session' }
  }
}

export async function getTodayStudyTime() {
  try {
    const today = new Date()
    const sessions = await prisma.studySession.findMany({
      where: {
        userId: DEFAULT_USER_ID,
        date: {
          gte: startOfDay(today),
          lte: endOfDay(today)
        }
      }
    })
    
    const totalMinutes = sessions.reduce((sum, session) => sum + session.duration, 0)
    return { success: true, data: totalMinutes }
  } catch (error) {
    console.error('Error fetching today study time:', error)
    return { success: false, error: 'Failed to fetch study time' }
  }
}

export async function getRecentSessions(limit = 10) {
  try {
    const sessions = await prisma.studySession.findMany({
      where: { userId: DEFAULT_USER_ID },
      orderBy: { date: 'desc' },
      take: limit
    })
    
    return { success: true, data: sessions }
  } catch (error) {
    console.error('Error fetching recent sessions:', error)
    return { success: false, error: 'Failed to fetch sessions' }
  }
}

import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  // Use environment variable or fallback to default database path
  const databaseUrl = process.env.DATABASE_URL || `file:${path.join(process.cwd(), 'dev.db')}`

  const libsql = createClient({
    url: databaseUrl,
  })

  const adapter = new PrismaLibSql(libsql as any)
  return new PrismaClient({ adapter } as any)
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

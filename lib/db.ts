import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// В случае Netlify build без DATABASE_URL, не инициализируем Prisma
let prismaInstance: PrismaClient | null = null;

if (process.env.DATABASE_URL) {
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : [],
  })

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
} else {
  console.warn('DATABASE_URL not set, Prisma client not initialized')
}

export const prisma = prismaInstance

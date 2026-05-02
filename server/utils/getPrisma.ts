import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '~~/prisma/client/client'
import { serverEnv } from './serverEnv'

const adapter = new PrismaPg({ connectionString: serverEnv.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

export default (): PrismaClient => prisma

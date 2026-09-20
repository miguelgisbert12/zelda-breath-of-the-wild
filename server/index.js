import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import prisma from './lib/prisma.js'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import { requireAuth, requireAdmin } from './middleware/auth.js'
import usersRoutes from './routes/users.routes.js'
import entriesRoutes from './routes/entries.routes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(helmet())

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/entries', entriesRoutes)

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend funcionando correctamente',
  })
})

app.get('/api/db-health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`

    res.json({
      success: true,
      message: 'Base de datos conectada correctamente',
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Error conectando con la base de datos',
    })
  }
})

app.get('/api/admin/health', requireAuth, requireAdmin, (req, res) => {
  res.json({
    success: true,
    message: 'Acceso de administrador autorizado',
  })
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`)
})
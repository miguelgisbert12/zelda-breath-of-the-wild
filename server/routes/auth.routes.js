import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '../lib/prisma.js'
import jwt from 'jsonwebtoken'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

const registerSchema = z.object({
  name: z.string().trim().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().trim().toLowerCase().email('El email no es válido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
})

router.post('/register', async (req, res) => {
  const validation = registerSchema.safeParse(req.body)

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Datos de registro no válidos',
      errors: validation.error.flatten().fieldErrors,
    })
  }

  const { name, email, password } = validation.data

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un usuario con ese email',
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return res.status(201).json({
      success: true,
      message: 'Usuario registrado correctamente',
      user,
    })
  } catch (error) {
    console.error(error)

    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
    })
  }
})

router.post('/login', async (req, res) => {
  const validation = loginSchema.safeParse(req.body)

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Email o contraseña no válidos',
    })
  }

  const { email, password } = validation.data

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      success: false,
      message: 'Email o contraseña incorrectos',
    })
  }

  const token = jwt.sign(
    {
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      subject: String(user.id),
      expiresIn: '1d',
    },
  )

  res.cookie('auth_token', token, {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
  })

  return res.json({
    success: true,
    message: 'Inicio de sesión correcto',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  })
})

router.post('/logout', (req, res) => {
  res.clearCookie('auth_token')

  res.json({
    success: true,
    message: 'Sesión cerrada correctamente',
  })
})

router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  })

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    })
  }

  res.json({
    success: true,
    user,
  })
})

export default router
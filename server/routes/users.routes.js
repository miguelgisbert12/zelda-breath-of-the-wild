import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import prisma from '../lib/prisma.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.use(requireAuth, requireAdmin)

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.json({
    success: true,
    users,
  })
})

router.patch('/:id', async (req, res) => {
  const userId = Number(req.params.id)

  const validation = z.object({
    name: z.string().trim().min(2).optional(),
    role: z.enum(['user', 'admin']).optional(),
    password: z.string().min(8).optional(),
  }).safeParse(req.body)

  if (!validation.success || !Number.isInteger(userId)) {
    return res.status(400).json({
      success: false,
      message: 'Datos no válidos',
    })
  }

  const { name, role, password } = validation.data

  const data = {}

  if (name !== undefined) data.name = name
  if (role !== undefined) data.role = role
  if (password !== undefined) {
    data.password = await bcrypt.hash(password, 12)
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    res.json({
      success: true,
      user,
    })
  } catch {
    res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    })
  }
})

router.delete('/:id', async (req, res) => {
  const userId = Number(req.params.id)

  if (!Number.isInteger(userId)) {
    return res.status(400).json({
      success: false,
      message: 'ID no válido',
    })
  }

  if (userId === req.user.id) {
    return res.status(400).json({
      success: false,
      message: 'No puedes eliminar tu propio usuario',
    })
  }

  try {
    await prisma.user.delete({
      where: { id: userId },
    })

    res.json({
      success: true,
      message: 'Usuario eliminado correctamente',
    })
  } catch {
    res.status(404).json({
      success: false,
      message: 'Usuario no encontrado',
    })
  }
})

export default router
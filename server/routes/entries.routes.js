import { Router } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

const entrySchema = z.object({
  apiId: z.coerce.number().int().positive(),
  name: z.string().trim().min(1),
  category: z.string().trim().min(1),
  description: z.string().trim().nullable().optional(),
  image: z.string().url().nullable().optional(),
  isPublished: z.boolean().optional(),
})

router.get('/', async (req, res) => {
  const entries = await prisma.compendiumEntry.findMany({
    where: { isPublished: true },
    orderBy: { name: 'asc' },
  })

  res.json({
    success: true,
    entries,
  })
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: 'ID no válido',
    })
  }

  const entry = await prisma.compendiumEntry.findFirst({
    where: {
      id,
      isPublished: true,
    },
  })

  if (!entry) {
    return res.status(404).json({
      success: false,
      message: 'Elemento no encontrado',
    })
  }

  res.json({
    success: true,
    entry,
  })
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const validation = entrySchema.safeParse(req.body)

  if (!validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Datos del elemento no válidos',
      errors: validation.error.flatten().fieldErrors,
    })
  }

  try {
    const entry = await prisma.compendiumEntry.create({
      data: validation.data,
    })

    res.status(201).json({
      success: true,
      entry,
    })
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({
        success: false,
        message: 'Ya existe un elemento con ese apiId',
      })
    }

    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Error creando el elemento',
    })
  }
})

router.patch('/:id', requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const validation = entrySchema.partial().safeParse(req.body)

  if (!Number.isInteger(id) || !validation.success) {
    return res.status(400).json({
      success: false,
      message: 'Datos no válidos',
    })
  }

  try {
    const entry = await prisma.compendiumEntry.update({
      where: { id },
      data: validation.data,
    })

    res.json({
      success: true,
      entry,
    })
  } catch {
    res.status(404).json({
      success: false,
      message: 'Elemento no encontrado',
    })
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      success: false,
      message: 'ID no válido',
    })
  }

  try {
    await prisma.compendiumEntry.delete({
      where: { id },
    })

    res.json({
      success: true,
      message: 'Elemento eliminado correctamente',
    })
  } catch {
    res.status(404).json({
      success: false,
      message: 'Elemento no encontrado',
    })
  }
})

export default router
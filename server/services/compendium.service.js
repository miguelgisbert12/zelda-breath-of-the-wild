import prisma from '../lib/prisma.js'

const API_URL = 'https://api.hyrule-compendium.com/v3/compendium/all'

export async function importCompendiumEntries() {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error(`La API respondió con ${response.status}`)
  }

  const result = await response.json()
  const entries = Array.isArray(result) ? result : result.data

  if (!Array.isArray(entries)) {
    throw new Error('Formato de respuesta inesperado')
  }

  let imported = 0

  for (const entry of entries) {
    if (!entry.id || !entry.name || !entry.category) {
      continue
    }

    await prisma.compendiumEntry.upsert({
      where: {
        apiId: entry.id,
      },
      update: {
        name: entry.name,
        category: entry.category,
        description: entry.description || null,
        image: entry.image || null,
      },
      create: {
        apiId: entry.id,
        name: entry.name,
        category: entry.category,
        description: entry.description || null,
        image: entry.image || null,
        isPublished: true,
      },
    })

    imported += 1
  }

  return imported
}
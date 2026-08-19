const API_URL = 'https://api.hyrule-compendium.com/v3'

// Llamada a la API para encontrar categorías

export async function getCategory(category) {
    const response = await fetch(
        `${API_URL}/compendium/category/${category}`
    )

    if(!response.ok) {
        throw new Error('No se han podido obtener los datos de la API')
    }

    const data = await response.json()

    return data
}

// Llamada a la API para encontrar entradas específicas

export async function getEntry(entryId) {
    const response = await fetch(
        `${API_URL}/compendium/entry/${entryId}`
    )

    if(!response.ok) {
        throw new Error('No se ha podido obtener la entrada correspondiente')
    }

    const data = await response.json()

    return data.data
}
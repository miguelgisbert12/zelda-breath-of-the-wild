const API_URL = 'https://api.hyrule-compendium.com/v3'

export function getCategoryUrl(category) {
  return `${API_URL}/compendium/category/${category}`
}

export function getEntryUrl(entryId) {
  return `${API_URL}/compendium/entry/${entryId}`
}
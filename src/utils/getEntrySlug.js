export function getEntrySlug(entry) {
    
    const imageUrl = entry.image
    const parts = imageUrl.split('/')

    return parts[parts.length - 2]
}
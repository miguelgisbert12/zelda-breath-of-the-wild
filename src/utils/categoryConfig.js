export const categories = {

    monsters: {
        slug: 'enemigos',
        title: 'Enemigos'
    },

    creatures: {
        slug: 'criaturas',
        title: 'Criaturas'
    },

    materials: {
        slug: 'materiales',
        title: 'Materiales'
    },

    equipment: {
        slug: 'equipo',
        title: 'Equipo'
    },

    treasure: {
        slug: 'tesoros',
        title: 'Tesoros'
    }
}

export function getCategoryConfig(category) {
    return categories[category]
}
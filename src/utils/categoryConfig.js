export const categories = {

    monsters: {
        slug: 'enemigos',
        title: 'Enemigos',
        description: 'Descubre las bestias y monstruos que habitan Hyrule. ¿Conoces ya los puntos débiles de cada una?'
    },

    creatures: {
        slug: 'criaturas',
        title: 'Criaturas',
        description: 'Conoce la extensa fauna de Hyrule. Desde insectos, aves y pequeñas criaturas hasta caballos, zorros y osos.'
    },

    materials: {
        slug: 'materiales',
        title: 'Materiales',
        description: 'Explora un sinfín de curiosos materiales con los que fabricar pociones y cocinar nutritivos alimentos.'
    },

    equipment: {
        slug: 'equipo',
        title: 'Equipo',
        description: 'Trajes, armaduras, espadas, mazas... aquí encontrarás todo lo necesario para atacar y defenderte de los múltiples peligros que acechan a Link.'
    },

    treasure: {
        slug: 'tesoros',
        title: 'Tesoros',
        description: 'Pequeñas recompensas que valen su peso en oro.'
    }
}

export function getCategoryConfig(category) {
    return categories[category]
}
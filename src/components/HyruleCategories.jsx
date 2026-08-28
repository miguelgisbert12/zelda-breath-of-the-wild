import CategoryCard from "./CategoryCard";

import enemigos from '../assets/images/categories/enemies.png'
import criaturas from '../assets/images/categories/creatures.png'
import materiales from '../assets/images/categories/materials.png'
import equipo from '../assets/images/categories/equipment.png'
import tesoros from '../assets/images/categories/treasures.png'

import './HyruleCategories.css'

const categories = [
    {
        title: 'Enemigos',
        image: enemigos,
        path: '/hyrule/enemigos',
    },
    {
        title: 'Criaturas',
        image: criaturas,
        path: '/hyrule/criaturas',
    },
    {
        title: 'Materiales',
        image: materiales,
        path: '/hyrule/materiales',
    },
    {
        title: 'Equipo',
        image: equipo,
        path: '/hyrule/equipo',
    },
    {
        title: 'Tesoros',
        image: tesoros,
        path: '/hyrule/tesoros',
    },
]

function HyruleCategories() {
    return(
        <div className="categories-grid">
            {categories.map((category) => (
                <CategoryCard
                    key={category.path}
                    title={category.title}
                    image={category.image}
                    path={category.path}
                />
            ))}
        </div>
    )
}

export default HyruleCategories
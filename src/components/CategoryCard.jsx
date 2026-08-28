import { Link } from "react-router-dom";

import './CategoryCard.css'

function CategoryCard({ title, image, path }) {
    return(
        <Link className="category-card" to={path}>
            <img className="category-card__image" src={image} alt="" />

            <h3 className="category-card__title">
                {title}
            </h3>
        </Link>
    )
}

export default CategoryCard
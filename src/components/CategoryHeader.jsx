import './CategoryHeader.css'

function CategoryHeader({ title, description, count }) {

    return(
        <header className="category-header">

            <h1 className='category-header__title'>
                {title}
            </h1>

            <p className='category-header__description'>
                {description}
            </p>

            <span className='category-header__count'>
                {count} elementos
            </span>

        </header>
    )
}

export default CategoryHeader
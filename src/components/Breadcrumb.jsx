import { Link } from 'react-router-dom'

import './Breadcrumb.css'

function Breadcrumb({ category, entryName }) {

    return(
        <nav className='breadcrumb' aria-label='Migas de pan'>
            <span>
                Hyrule
            </span>

            <span className='breadcrumb__separator'>
                &gt;
            </span>

            <Link to={`/hyrule/${category.slug}`}>
                {category.title}
            </Link>

            <span className='breadcrumb__separator'>
                &gt;
            </span>

            <span>
                {entryName}
            </span>
        </nav>
    )
}

export default Breadcrumb
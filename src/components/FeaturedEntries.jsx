import { featuredEntries } from '../utils/featuredEntries'
import FeaturedEntry from './FeaturedEntry'

import './FeaturedEntries.css'

function FeaturedEntries() {

    return(
        <div className='featured-entries'>
            {featuredEntries.map((featuredEntry) => (
                <FeaturedEntry 
                    key={featuredEntry.slug}
                    slug={featuredEntry.slug}
                />
            ))}
        </div>
    )
}

export default FeaturedEntries
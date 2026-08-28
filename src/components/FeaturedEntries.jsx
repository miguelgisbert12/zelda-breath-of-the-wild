import CompendiumCard from './CompendiumCard'

import './FeaturedEntries.css'

function FeaturedEntries({ entries }) {
    
    return(
        <div className='featured-entries'>
            {entries.map((entry) => (
                <CompendiumCard 
                    key={entry.id}
                    entry={entry}
                />
            ))}
        </div>
    )
}

export default FeaturedEntries
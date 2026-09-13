import capitalizeWords from '../utils/capitalizeWords'

import './EntryHeader.css'

function EntryHeader({ entry }) {

    return(
        <header className="entry-header">
            <img
                className="entry-header__image" 
                src={entry.image} 
                alt={entry.name} 
            />

            <div className="entry-header__content">
                <h1 className="entry-header__title">
                    {capitalizeWords(entry.name)}
                </h1>

                <p className="entry-header__description">
                    {entry.description}
                </p>
            </div>
        </header>
    )
}

export default EntryHeader
import './EntryInfo.css'

import capitalizeWords from '../utils/capitalizeWords'

function EntryInfo({ entry }) {
    return (
        <section className="entry-info">

            <h2 className="entry-info__title">
                Información
            </h2>

            <div className="entry-info__content">

                {entry.common_locations?.length > 0 && (
                    <div className="entry-info__group">

                        <h3>Localizaciones</h3>

                        <ul>
                            {entry.common_locations.map((location) => (
                                <li key={location}>
                                    {location}
                                </li>
                            ))}
                        </ul>

                    </div>
                )}

                {entry.drops?.length > 0 && (
                    <div className="entry-info__group">

                        <h3>Objetos obtenibles</h3>

                        <ul>
                            {entry.drops.map((drop) => (
                                <li key={drop}>
                                    {capitalizeWords(drop)}
                                </li>
                            ))}
                        </ul>

                    </div>
                )}

            </div>

        </section>
    )
}

export default EntryInfo
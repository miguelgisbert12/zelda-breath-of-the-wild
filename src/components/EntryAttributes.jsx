import './EntryAttributes.css'

function EntryAttributes({ entry }) {
    return (
        <section className="entry-attributes">

            <h2 className="entry-attributes__title">
                Características
            </h2>

            <div className="entry-attributes__content">

                {entry.properties?.attack !== undefined && (
                    <div className="entry-attributes__item">
                        <h3>Ataque</h3>

                        <span>{entry.properties.attack}</span>
                    </div>
                )}

                {entry.properties?.defense !== undefined && (
                    <div className="entry-attributes__item">
                        <h3>Defensa</h3>

                        <span>{entry.properties.defense}</span>
                    </div>
                )}

                {entry.cooking_effect && (
                    <div className="entry-attributes__item">
                        <h3>Efecto de cocina</h3>

                        <span>{entry.cooking_effect}</span>
                    </div>
                )}

                {entry.hearts_recovered !== undefined && (
                    <div className="entry-attributes__item">
                        <h3>Corazones recuperados</h3>

                        <span>{entry.hearts_recovered}</span>
                    </div>
                )}

                {entry.edible !== undefined && (
                    <div className="entry-attributes__item">
                        <h3>Comestible</h3>

                        <span className={entry.edible ? 'is-true' : 'is-false'}>
                            {entry.edible ? 'Sí' : 'No'}
                        </span>
                    </div>
                )}

                {entry.dlc !== undefined && (
                    <div className="entry-attributes__item">
                        <h3>Contenido DLC</h3>

                        <span className={entry.dlc ? 'is-true' : 'is-false'}>
                            {entry.dlc ? 'Sí' : 'No'}
                        </span>
                    </div>
                )}

            </div>

        </section>
    )
}

export default EntryAttributes
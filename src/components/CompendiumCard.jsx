import { Link } from "react-router-dom"

import { getCategoryConfig } from "../utils/categoryConfig"
import { getEntrySlug } from "../utils/getEntrySlug"
import capitalizeWords from "../utils/capitalizeWords"

import './CompendiumCard.css'

function CompendiumCard({ entry }) {

    const categoryConfig = getCategoryConfig(entry.category)
    const entrySlug = getEntrySlug(entry)

    return (
        <article className="compendium-card">
            <Link to={`/hyrule/${categoryConfig.slug}/${entrySlug}`}>
            
                <img 
                    className="compendium-card__image" 
                    src={entry.image} 
                    alt={entry.name} 
                />

                <div className="compendium-card__content">
                    <h2 className="compendium-card__title">
                        {capitalizeWords(entry.name)}
                    </h2>

                    <p className="compendium-card__description">
                        {entry.description}
                    </p>
                </div>

            </Link>
        </article>
    )
}

export default CompendiumCard
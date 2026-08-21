import { Link } from "react-router-dom"
import { getCategoryConfig } from "../utils/categoryConfig"
import { getEntrySlug } from "../utils/getEntrySlug"

function CompendiumCard({ entry }) {

    const categoryConfig = getCategoryConfig(entry.category)
    const entrySlug = getEntrySlug(entry)

    return (
        <article>
            <Link to={`/hyrule/${categoryConfig.slug}/${entrySlug}`}>
                <img src={entry.image} alt={entry.name} />
                <h2>{entry.name}</h2>
                <p>{entry.description}</p>
            </Link>
        </article>
    )
}

export default CompendiumCard
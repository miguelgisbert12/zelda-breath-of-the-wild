function MonsterCard({monster}) {
    return (
        <article>
            <img src={monster.image} alt={monster.name} />
            <h2>{monster.name}</h2>
            <p>{monster.description}</p>
        </article>
    )
}

export default MonsterCard
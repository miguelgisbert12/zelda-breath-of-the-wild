import Container from './Container'
import './Hero.css'

function Hero() {
    return(
        <section className='hero'>
            <Container>
                <div className='hero__content'>
                    <h1>Zelda BOTW Compendium</h1>
                    <p>Explora Hyrule y descubre todo lo que esconde su mundo.</p>
                </div>
            </Container>
        </section>
    )
}

export default Hero
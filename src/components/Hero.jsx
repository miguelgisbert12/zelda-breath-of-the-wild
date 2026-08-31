import { useEffect, useState } from 'react'

import Container from './Container'

import logotipoZelda from '../assets/images/hero/logotipo_zelda_negro.svg'

import heroImage1 from '../assets/images/hero/hero_background1.jpeg'
import heroImage2 from '../assets/images/hero/hero_background2.jpg'
import heroImage3 from '../assets/images/hero/hero_background3.png'

import './Hero.css'

const heroImages = [
    {
        image: heroImage1,
        position: '50% 30%'
    },
    {
        image: heroImage2,
        position: 'center center'
    },
    {
        image: heroImage3,
        position: 'center'
    },
]

function Hero() {

    const [currentImage, setCurrentImage] = useState(0)
    const [isFading, setIsFading] = useState(false)

    useEffect(() => {

        let timeout

        const interval = setInterval(() => {
            setIsFading(true)

            timeout = setTimeout(() => {
                setCurrentImage((current) => {
                    return (current + 1) % heroImages.length
                })

                setIsFading(false)
            }, 1000)
        }, 6000)

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [])

    const nextImage = (currentImage + 1) % heroImages.length

    return(
        <section className='hero'>
            <div 
                key={`current-${currentImage}`}
                className={`hero__background hero__background--current ${isFading ? 'hero__background--fade-out' : ''}`} 
                style={{
                    backgroundImage: `url(${heroImages[currentImage].image})`,
                    backgroundPosition: heroImages[currentImage].position
                }}
            >   
            </div>

            <div
                key={`next-${nextImage}`}
                className={`hero__background hero__background--next ${isFading ? 'hero__background--fade-in' : ''}`}
                style={{
                    backgroundImage: `url(${heroImages[nextImage].image})`,
                    backgroundPosition: heroImages[nextImage].position
                }}
            >
            </div>

            <Container>
                <div className='hero__container'>
                    <img 
                        className='hero__image' 
                        src={logotipoZelda} 
                        alt="Logotipo Zelda BOTW" 
                    />
                    
                    <div className='hero__content'>
                        <h1>La guía visual del videojuego</h1>
                        <p>Explora Hyrule y descubre todo lo que esconde su mundo.</p>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default Hero
import Container from '../components/Container'
import Hero from '../components/Hero'
import HyruleCategories from '../components/HyruleCategories'
import FeaturedEntries from '../components/FeaturedEntries'

import './Home.css'

function Home() {
  return(
    <div className='home'>

      <Hero />
      
      <section className='home__categories'>
          <Container>
              <h2>Explora Hyrule</h2>
              <HyruleCategories />
          </Container>
      </section>

      <section className='home__featured'>
          <Container>
            <h2>Destacados</h2>

            <FeaturedEntries />
          </Container>
      </section>

    </div>
  ) 
}

export default Home
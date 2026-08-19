import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Hyrule from './pages/Hyrule'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'
import Enemies from './pages/Enemies'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/hyrule" element={<Hyrule />} />
          <Route path="/hyrule/enemigos" element={<Enemies />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
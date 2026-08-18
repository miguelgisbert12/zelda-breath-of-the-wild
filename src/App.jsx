import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Compendium from './pages/Compendium'
import NotFound from './pages/NotFound'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/compendium" element={<Compendium />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
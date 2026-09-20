import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Hyrule from './pages/Hyrule'
import MainLayout from './layouts/MainLayout'

import Enemies from './pages/Enemies'
import Creatures from './pages/Creatures'
import Equipment from './pages/Equipment'
import Materials from './pages/Materials'
import Treasures from './pages/Treasures'

import NotFound from './pages/NotFound'
import HyruleEntryDetail from './pages/HyruleEntryDetail'
import SearchResults from './pages/SearchResults'

import Login from './pages/Login'
import Admin from './pages/Admin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<SearchResults />} />
          <Route path="/hyrule" element={<Hyrule />} />
          <Route path="/hyrule/enemigos" element={<Enemies />} />
          <Route path="/hyrule/criaturas" element={<Creatures />} />
          <Route path="/hyrule/materiales" element={<Materials />} />
          <Route path="/hyrule/equipo" element={<Equipment />} />
          <Route path="/hyrule/tesoros" element={<Treasures />} />
          <Route path="/hyrule/:category/:entryId" element={<HyruleEntryDetail/>} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/acceso" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
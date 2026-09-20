import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import HyruleMenu from './HyruleMenu'
import SearchMenu from './SearchMenu'
import Container from './Container'

import './Navbar.css'
import logo from '../assets/logos/logo_zelda_header.png'

const API_URL = import.meta.env.VITE_API_URL

function Navbar() {

  const [openMenu, setOpenMenu] = useState(null)
  const [currentUser, setCurrentUser] = useState(undefined)

  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const navbarRef = useRef(null)

  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const response = await fetch(`${API_URL}/api/auth/me`, {
          credentials: 'include',
        })

        if (!response.ok) {
          setCurrentUser(null)
          return
        }

        const data = await response.json()
        setCurrentUser(data.user)
      } catch {
        setCurrentUser(null)
      }
    }

    loadCurrentUser()
  }, [])

  useEffect(() => {
        function handleOutsideClick(event) {
            if (
            navbarRef.current &&
            !navbarRef.current.contains(event.target)
            ) {
            setOpenMenu(null)
            }
        }

        document.addEventListener('pointerdown', handleOutsideClick)

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick)
        }
  }, [])

  const toggleMenu = (menu) => {
    setOpenMenu((currentMenu) =>
      currentMenu === menu ? null : menu,
    )
  }

  async function handleLogout() {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    })

    setCurrentUser(null)
    setOpenMenu(null)
    navigate('/')
  }

  return (
    <>
      <nav ref={navbarRef} className="navbar">
        <Container>
          <Link className="navbar__brand" to="/">
            <img
              className="navbar__logo"
              src={logo}
              alt="Logo Zelda BOTW"
            />
            <span className="navbar__title">
              Zelda BOTW Compendium
            </span>
          </Link>

          <div className="navbar__navigation">
            <Link className="navbar__item" to="/">
              Inicio
            </Link>

            <HyruleMenu
              isOpen={openMenu === 'hyrule'}
              onToggle={() => toggleMenu('hyrule')}
            />

            {!isHome && (
              <SearchMenu
                isOpen={openMenu === 'search'}
                onToggle={() => toggleMenu('search')}
              />
            )}

            {currentUser === undefined ? null : currentUser ? (
              <div className="navbar__user-menu">
                <button
                  type="button"
                  className="navbar__user-button"
                  onClick={() => toggleMenu('user')}
                  aria-expanded={openMenu === 'user'}
                  aria-haspopup="menu"
                >
                  {currentUser.name}
                </button>

                {openMenu === 'user' && (
                  <div className="navbar__user-dropdown" role="menu">
                    <Link
                      to="/admin"
                      role="menuitem"
                      onClick={() => setOpenMenu(null)}
                    >
                      Ir al Back-Office
                    </Link>

                    <button
                        type="button"
                        role="menuitem"
                        className="navbar__user-logout"
                        onClick={handleLogout}
                    >
                        Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link className="navbar__item" to="/login">
                Entrar
              </Link>
            )}
          </div>
        </Container>
      </nav>

      {isHome && (
        <SearchMenu isOpen={true} variant="home" />
      )}
    </>
  )
}

export default Navbar
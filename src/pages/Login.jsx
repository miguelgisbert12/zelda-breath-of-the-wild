import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isRegister = mode === 'register'

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage('')
    setIsLoading(true)

    const endpoint = isRegister
      ? '/api/auth/register'
      : '/api/auth/login'

    const body = isRegister
      ? form
      : {
          email: form.email,
          password: form.password,
        }

    try {
      const response = await fetch(`http://localhost:3000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Ha ocurrido un error')
      }

      if (isRegister) {
        setMode('login')
        setForm({
          name: '',
          email: form.email,
          password: '',
        })
        setMessage('Registro correcto. Ya puedes iniciar sesión.')
      } else {
        navigate('/admin')
      }
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <h1>{isRegister ? 'Crear cuenta' : 'Acceder'}</h1>

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Nombre
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                minLength={2}
              />
            </label>
          )}

          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </label>

          <button type="submit" disabled={isLoading}>
            {isLoading
              ? 'Procesando...'
              : isRegister
                ? 'Registrarse'
                : 'Iniciar sesión'}
          </button>
        </form>

        {message && <p role="alert">{message}</p>}

        <button
          type="button"
          onClick={() => {
            setMode(isRegister ? 'login' : 'register')
            setMessage('')
          }}
        >
          {isRegister
            ? 'Ya tengo una cuenta'
            : 'Crear una cuenta'}
        </button>
      </section>
    </main>
  )
}

export default Login
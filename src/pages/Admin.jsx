import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './Admin.css'

const API_URL = 'http://localhost:3000'

function Admin() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [entries, setEntries] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function loadDashboard() {
      try {
        const meResponse = await fetch(`${API_URL}/api/auth/me`, {
          credentials: 'include',
        })

        if (!meResponse.ok) {
          navigate('/acceso')
          return
        }

        const meData = await meResponse.json()

        if (meData.user.role !== 'admin') {
          setMessage('No tienes permisos de administrador')
          return
        }

        setUser(meData.user)

        const [usersResponse, entriesResponse] = await Promise.all([
          fetch(`${API_URL}/api/users`, {
            credentials: 'include',
          }),
          fetch(`${API_URL}/api/entries/admin/all`, {
            credentials: 'include',
          }),
        ])

        if (!usersResponse.ok || !entriesResponse.ok) {
          throw new Error('No se han podido cargar los datos')
        }

        const usersData = await usersResponse.json()
        const entriesData = await entriesResponse.json()

        setUsers(usersData.users)
        setEntries(entriesData.entries)
      } catch (error) {
        setMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [navigate])

    async function handleImport() {
        setMessage('Importando contenido...')

        try {
        const response = await fetch(`${API_URL}/api/entries/import`, {
            method: 'POST',
            credentials: 'include',
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'No se pudo importar el contenido')
        }

        const entriesResponse = await fetch(
            `${API_URL}/api/entries/admin/all`,
            {
            credentials: 'include',
            },
        )

        const entriesData = await entriesResponse.json()

        setEntries(entriesData.entries)
        setMessage(`Importación completada: ${data.imported} entradas procesadas`)
        } catch (error) {
        setMessage(error.message)
        }
    }

    async function handleTogglePublished(entry) {
        try {
        const response = await fetch(`${API_URL}/api/entries/${entry.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
            isPublished: !entry.isPublished,
            }),
        })

        if (!response.ok) {
            throw new Error('No se pudo actualizar la visibilidad')
        }

        setEntries((currentEntries) =>
            currentEntries.map((currentEntry) =>
            currentEntry.id === entry.id
                ? {
                    ...currentEntry,
                    isPublished: !currentEntry.isPublished,
                }
                : currentEntry,
            ),
        )

        setMessage('Estado actualizado correctamente')
        } catch (error) {
        setMessage(error.message)
        }
    }

    async function handleDeleteEntry(entryId) {
        const confirmed = window.confirm(
        '¿Seguro que quieres eliminar esta entrada?',
        )

        if (!confirmed) {
        return
        }

        try {
        const response = await fetch(`${API_URL}/api/entries/${entryId}`, {
            method: 'DELETE',
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error('No se pudo eliminar la entrada')
        }

        setEntries((currentEntries) =>
            currentEntries.filter((entry) => entry.id !== entryId),
        )

        setMessage('Entrada eliminada correctamente')
        } catch (error) {
        setMessage(error.message)
        }
    }

    async function handleUpdateUser(currentUser, changes) {
        try {
            const response = await fetch(`${API_URL}/api/users/${currentUser.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(changes),
            })

            const data = await response.json()

            if (!response.ok) {
            throw new Error(data.message || 'No se pudo actualizar el usuario')
            }

            setUsers((currentUsers) =>
            currentUsers.map((userItem) =>
                userItem.id === currentUser.id ? data.user : userItem,
            ),
            )

            setMessage('Usuario actualizado correctamente')
        } catch (error) {
            setMessage(error.message)
        }
    }

    async function handleDeleteUser(currentUser) {
        const confirmed = window.confirm(
            `¿Quieres eliminar al usuario ${currentUser.email}?`,
        )

        if (!confirmed) {
            return
        }

        try {
            const response = await fetch(`${API_URL}/api/users/${currentUser.id}`, {
            method: 'DELETE',
            credentials: 'include',
            })

            const data = await response.json()

            if (!response.ok) {
            throw new Error(data.message || 'No se pudo eliminar el usuario')
            }

            setUsers((currentUsers) =>
            currentUsers.filter((userItem) => userItem.id !== currentUser.id),
            )

            setMessage('Usuario eliminado correctamente')
        } catch (error) {
            setMessage(error.message)
        }
    }

    async function handleLogout() {
        await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        })

        navigate('/acceso')
    }

    if (isLoading) {
        return (
        <main className="admin-page">
            <section className="admin-panel">
            <p>Cargando Back-Office...</p>
            </section>
        </main>
        )
    }

    if (!user) {
        return (
        <main className="admin-page">
            <section className="admin-panel">
            <p role="alert">{message}</p>
            <button type="button" onClick={() => navigate('/')}>
                Volver al inicio
            </button>
            </section>
        </main>
        )
    }

    return (
        <main className="admin-page">
        <header className="admin-header">
            <div>
                <p>Sesión iniciada como {user.name}</p>
                <h1>Back-Office</h1>
            </div>

            <div className="admin-header__actions">
                <button type="button" onClick={() => navigate('/')}>
                Volver a la web
                </button>

                <button type="button" onClick={handleLogout}>
                Cerrar sesión
                </button>
            </div>
        </header>

        {message && (
            <p className="admin-message" role="status">
            {message}
            </p>
        )}

        <section className="admin-summary" aria-label="Resumen">
            <article>
            <strong>{users.length}</strong>
            <span>Usuarios</span>
            </article>

            <article>
            <strong>{entries.length}</strong>
            <span>Entradas</span>
            </article>
        </section>

        <section className="admin-panel">
            <h2>Usuarios registrados</h2>

            <div className="admin-table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((currentUser) => (
                        <tr key={currentUser.id}>
                            <td>
                            <input
                                className="admin-inline-input"
                                defaultValue={currentUser.name}
                                aria-label={`Nombre de ${currentUser.email}`}
                                onBlur={(event) => {
                                const name = event.target.value.trim()

                                if (name && name !== currentUser.name) {
                                    handleUpdateUser(currentUser, { name })
                                }
                                }}
                            />
                            </td>

                            <td>{currentUser.email}</td>

                            <td>
                            <select
                                value={currentUser.role}
                                aria-label={`Rol de ${currentUser.email}`}
                                onChange={(event) =>
                                handleUpdateUser(currentUser, {
                                    role: event.target.value,
                                })
                                }
                            >
                                <option value="user">Usuario</option>
                                <option value="admin">Administrador</option>
                            </select>
                            </td>

                            <td className="admin-actions">
                            <button
                                type="button"
                                onClick={() => handleDeleteUser(currentUser)}
                                disabled={currentUser.id === user.id}
                            >
                                Eliminar
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </section>

        <section className="admin-panel">
            <div className="admin-section-header">
            <h2>Contenido del compendio</h2>

            <button type="button" onClick={handleImport}>
                Importar desde API
            </button>
            </div>

            <div className="admin-table-wrapper">
            <table>
                <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>API ID</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
                </thead>

                <tbody>
                {entries.map((entry) => (
                    <tr key={entry.id}>
                    <td>{entry.name}</td>
                    <td>{entry.category}</td>
                    <td>{entry.apiId}</td>
                    <td>
                        {entry.isPublished ? 'Publicado' : 'Oculto'}
                    </td>
                    <td className="admin-actions">
                        <button
                        type="button"
                        onClick={() => handleTogglePublished(entry)}
                        >
                        {entry.isPublished ? 'Ocultar' : 'Publicar'}
                        </button>

                        <button
                        type="button"
                        onClick={() => handleDeleteEntry(entry.id)}
                        >
                        Eliminar
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </section>
        </main>
    )
}

export default Admin
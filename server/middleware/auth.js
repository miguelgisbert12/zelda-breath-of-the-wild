import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next) {
  const token = req.cookies.auth_token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No autenticado',
    })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.user = {
      id: Number(payload.sub),
      role: payload.role,
    }

    next()
  } catch {
    return res.status(401).json({
      success: false,
      message: 'Sesión no válida o caducada',
    })
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'No tienes permisos de administrador',
    })
  }

  next()
}
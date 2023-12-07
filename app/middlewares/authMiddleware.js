// authMiddleware.js
module.exports = (req, res, next) => {
    // Verificar si existe una sesión de usuario iniciada
    if (!req.session || !req.session.userId) {
        return res.status(401).json({ success: false, message: 'Acceso no autorizado' });
    }
    // Si hay una sesión de usuario, permitir el acceso a la siguiente ruta
    next();
};

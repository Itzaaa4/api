// src/server.ts
import express from 'express';
import userRoutes from './api/routes/UserRoutes.js';
import settingsRoutes from './api/routes/SettingsRoutes.js';
const app = express();
// Puerto HTTP por defecto (3000) en lugar del puerto de MySQL (3306)
const PORT = process.env.PORT || 3000;
// Habilitar CORS para permitir que un frontend (Angular) consuma esta API
// Intentamos usar el paquete "cors" si está disponible; si no, aplicamos un middleware mínimo.
async function getCorsMiddleware() {
    try {
        const mod = await import('cors');
        const origin = process.env.CORS_ORIGIN || undefined; // ej: 'http://localhost:4200'
        return mod.default ? mod.default({ origin }) : mod({ origin });
    }
    catch {
        const allowedOrigin = process.env.CORS_ORIGIN || '*';
        return function minimalCors(req, res, next) {
            res.header('Access-Control-Allow-Origin', allowedOrigin);
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Cache-Control');
            // Manejar preflight
            if (req.method === 'OPTIONS') {
                return res.status(204).end();
            }
            next();
        };
    }
}
// Registrar CORS (async) y luego las rutas
// Nota: Top-level await está habilitado por target ES2022 + module nodenext
const corsMiddleware = await getCorsMiddleware();
app.use(corsMiddleware);
app.use(express.json());
app.use('/users', userRoutes);
app.use('/settings', settingsRoutes);
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
    console.log(`\nServer ejecutándose en http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map
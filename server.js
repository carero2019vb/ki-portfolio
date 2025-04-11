const express = require('express');
const path = require('path');
const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');

// Express App initialisieren
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(compression()); // GZIP Komprimierung
app.use(helmet()); // Sicherheits-Header
app.use(cors()); // CORS-Unterstützung
app.use(express.json());
app.use(express.static('public')); // Statische Dateien

// Security Middleware
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        imgSrc: ["'self'", "data:", "https:"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        connectSrc: ["'self'"],
        frameSrc: ["'none'"],
        objectSrc: ["'none'"]
    }
}));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'healthy' });
});

// Projektrouten
const projectRoutes = require('./routes/projects');
app.use('/api/projects', projectRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Ein Fehler ist aufgetreten!',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Catch-all Route für SPA
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
}); 
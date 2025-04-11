const express = require('express');
const router = express.Router();

// Beispiel-Projekte (später durch Datenbankanbindung ersetzen)
const projects = [
    {
        id: 1,
        title: 'KI-Text-Analyse',
        description: 'Automatisierte Textanalyse mit NLP',
        technologies: ['Python', 'NLTK', 'Transformers'],
        category: 'KI-Text'
    },
    {
        id: 2,
        title: 'KI-Bildverarbeitung',
        description: 'Computer Vision Anwendungen',
        technologies: ['TensorFlow', 'OpenCV', 'PyTorch'],
        category: 'KI-Bild'
    }
];

// GET alle Projekte
router.get('/', (req, res) => {
    try {
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen der Projekte' });
    }
});

// GET einzelnes Projekt
router.get('/:id', (req, res) => {
    try {
        const project = projects.find(p => p.id === parseInt(req.params.id));
        if (!project) {
            return res.status(404).json({ message: 'Projekt nicht gefunden' });
        }
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Projekts' });
    }
});

// GET Projekte nach Kategorie
router.get('/category/:category', (req, res) => {
    try {
        const categoryProjects = projects.filter(p => 
            p.category.toLowerCase() === req.params.category.toLowerCase()
        );
        res.json(categoryProjects);
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Filtern der Projekte' });
    }
});

module.exports = router; 
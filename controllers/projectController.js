const Project = require('../models/Project');
const asyncHandler = require('express-async-handler');

// @desc    Alle Projekte abrufen
// @route   GET /api/projects
// @access  Public
exports.getProjects = asyncHandler(async (req, res) => {
    const { category, status, search, sort = '-createdAt' } = req.query;
    const query = {};

    // Filter nach Kategorie
    if (category) {
        query.category = category;
    }

    // Filter nach Status
    if (status) {
        query.status = status;
    }

    // Textsuche
    if (search) {
        query.$text = { $search: search };
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;

    const projects = await Project.find(query)
        .sort(sort)
        .skip(startIndex)
        .limit(limit);

    const total = await Project.countDocuments(query);

    res.json({
        success: true,
        count: projects.length,
        total,
        pagination: {
            current: page,
            pages: Math.ceil(total / limit)
        },
        data: projects
    });
});

// @desc    Einzelnes Projekt abrufen
// @route   GET /api/projects/:id
// @access  Public
exports.getProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Projekt nicht gefunden');
    }

    res.json({
        success: true,
        data: project
    });
});

// @desc    Neues Projekt erstellen
// @route   POST /api/projects
// @access  Private
exports.createProject = asyncHandler(async (req, res) => {
    const project = await Project.create(req.body);

    res.status(201).json({
        success: true,
        data: project
    });
});

// @desc    Projekt aktualisieren
// @route   PUT /api/projects/:id
// @access  Private
exports.updateProject = asyncHandler(async (req, res) => {
    let project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Projekt nicht gefunden');
    }

    project = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    res.json({
        success: true,
        data: project
    });
});

// @desc    Projekt löschen
// @route   DELETE /api/projects/:id
// @access  Private
exports.deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Projekt nicht gefunden');
    }

    await project.remove();

    res.json({
        success: true,
        data: {}
    });
});

// @desc    Projekte nach Kategorie abrufen
// @route   GET /api/projects/category/:category
// @access  Public
exports.getProjectsByCategory = asyncHandler(async (req, res) => {
    const projects = await Project.find({ 
        category: req.params.category 
    }).sort('-createdAt');

    res.json({
        success: true,
        count: projects.length,
        data: projects
    });
}); 
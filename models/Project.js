const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Projekttitel ist erforderlich'],
        trim: true,
        maxlength: [100, 'Titel darf nicht länger als 100 Zeichen sein']
    },
    description: {
        type: String,
        required: [true, 'Projektbeschreibung ist erforderlich'],
        trim: true,
        maxlength: [500, 'Beschreibung darf nicht länger als 500 Zeichen sein']
    },
    technologies: [{
        type: String,
        required: true,
        trim: true
    }],
    category: {
        type: String,
        required: [true, 'Projektkategorie ist erforderlich'],
        enum: {
            values: ['KI-Text', 'KI-Bild', 'KI-Sound', 'KI-Video'],
            message: '{VALUE} ist keine gültige Kategorie'
        }
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?:\/\/.+\..+/.test(v);
            },
            message: props => `${props.value} ist keine gültige URL`
        }
    },
    githubUrl: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https:\/\/github\.com\/.+/.test(v);
            },
            message: props => `${props.value} ist keine gültige GitHub URL`
        }
    },
    demoUrl: String,
    status: {
        type: String,
        enum: ['in Entwicklung', 'abgeschlossen', 'geplant'],
        default: 'in Entwicklung'
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: Date,
    highlights: [{
        type: String,
        trim: true
    }],
    tags: [{
        type: String,
        trim: true
    }]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Virtuelle Eigenschaften
projectSchema.virtual('duration').get(function() {
    if (!this.endDate) return 'Laufend';
    const days = Math.ceil((this.endDate - this.startDate) / (1000 * 60 * 60 * 24));
    return `${days} Tage`;
});

// Indizes
projectSchema.index({ category: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ title: 'text', description: 'text' });

// Middleware
projectSchema.pre('save', function(next) {
    if (this.endDate && this.endDate < this.startDate) {
        next(new Error('Enddatum kann nicht vor Startdatum liegen'));
    }
    next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project; 
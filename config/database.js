const mongoose = require('mongoose');

// MongoDB Verbindungs-URL aus Umgebungsvariablen
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ki-portfolio';

// Verbindungsoptionen
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
};

// Verbindungsfunktion
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI, options);
        console.log(`MongoDB verbunden: ${conn.connection.host}`);

        // Event Listener für Verbindungsfehler
        mongoose.connection.on('error', (err) => {
            console.error(`MongoDB Verbindungsfehler: ${err}`);
        });

        // Event Listener für Verbindungsverlust
        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB Verbindung verloren');
        });

        // Graceful Shutdown
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close();
                console.log('MongoDB Verbindung geschlossen');
                process.exit(0);
            } catch (err) {
                console.error('Fehler beim Schließen der MongoDB Verbindung:', err);
                process.exit(1);
            }
        });

    } catch (error) {
        console.error(`Fehler bei der MongoDB Verbindung: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB; 
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DBSOURCE = path.join(__dirname, process.env.DB_PATH || "users.db");

let db = null;

const initializeDatabase = async () => {
    try {
        db = await open({
            filename: DBSOURCE,
            driver: sqlite3.Database,
        });

        // Create users table if it doesn't exist
        await db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                phone TEXT,
                street TEXT,
                city TEXT,
                zipcode TEXT,
                geo_lat TEXT,
                geo_lng TEXT
            )
        `);

        console.log('Connected to the SQLite database.');
        console.log('Users table created or already exists.');
        return db;
    } catch (error) {
        console.error('Database initialization error:', error);
        throw error;
    }
};

// Initialize database on import
const database = await initializeDatabase();

export default database;

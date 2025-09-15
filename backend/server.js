import express, { json } from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import database from './database.js';
import userRoutes from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(json()); 

// Make database available to routes
app.locals.db = database;

app.use('/api/users', userRoutes);

// Root endpoint for testing
app.get('/', (req, res) => {
    res.send('User Management API is running.');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

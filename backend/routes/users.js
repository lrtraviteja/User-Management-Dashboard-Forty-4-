import { Router } from 'express';
import { validateUserData, validateUserId } from '../middleware/validation.js';

const router = Router();

// GET all users
router.get('/', async (req, res) => {
    try {
        const db = req.app.locals.db;
        const users = await db.all('SELECT * FROM users ORDER BY id DESC');
        res.status(200).json({ data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET user by ID
router.get('/:id', validateUserId, async (req, res) => {
    try {
        const db = req.app.locals.db;
        const user = await db.get('SELECT * FROM users WHERE id = ?', [req.userId]);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ data: user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create new user
router.post('/', validateUserData, async (req, res) => {
    try {
        const db = req.app.locals.db;
        const {
            name, email, phone,
            street, city, zipcode, geo_lat, geo_lng
        } = req.sanitizedData;

        const sql = `
            INSERT INTO users (
                name, email, phone,
                street, city, zipcode, geo_lat, geo_lng
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const params = [
            name,  email, phone, 
            street,  city, zipcode, geo_lat, geo_lng
        ];

        const result = await db.run(sql, params);
        res.status(201).json({ message: 'User created successfully', id: result.lastID });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'A user with this email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update user by id
router.put('/:id', validateUserId, validateUserData, async (req, res) => {
    try {
        const db = req.app.locals.db;
        const {
            name,  email, phone, street,
            city, zipcode, geo_lat, geo_lng
        } = req.sanitizedData;

        const sql = `
            UPDATE users SET
                name = ?, email = ?, phone = ?,
                street = ?, city = ?, zipcode = ?,
                geo_lat = ?, geo_lng = ?
            WHERE id = ?
        `;
        const params = [
            name,  email, phone, street,
            city, zipcode, geo_lat, geo_lng,
            req.userId
        ];

        const result = await db.run(sql, params);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', changes: result.changes });
    } catch (error) {
        console.error('Error updating user:', error);
        if (error.message && error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'A user with this email already exists.' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE user by id
router.delete('/:id', validateUserId, async (req, res) => {
    try {
        const db = req.app.locals.db;
        const result = await db.run('DELETE FROM users WHERE id = ?', [req.userId]);
        if (result.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully', changes: result.changes });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
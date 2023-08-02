import express from 'express';
import mongoose from 'mongoose';
import { UserController } from './components/User/controllers/user.controller';
import { authenticate } from './components/User/middlewares/auth.middleware';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/user_db';
console.log(process.env.JWT_SECRET_KEY);
mongoose.connect(MONGODB_URI, {})
    .then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });


// Middleware to parse JSON body
app.use(express.json());

const userController = new UserController();

// Public route for user registration
app.post('/api/users', userController.createUser);

// Protected routes for user management
app.get('/api/users/:userId', authenticate, userController.getUserById); // Authenticated users can view their own profile
app.put('/api/users/:userId', authenticate, userController.updateUser); // Only admins can update user roles
app.delete('/api/users/:userId', authenticate, userController.deleteUser); // Only admins can delete users

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

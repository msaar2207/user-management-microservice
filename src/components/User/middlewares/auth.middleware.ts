import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        // Extract token from request header
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - Token not provided' });
        }

        // Verify the token using jwt.verify()
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || '');

        // Set req.user if token is valid
        const user = await UserModel.findById(decoded);

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized - Invalid token' });
        }

        // Set the user object in the request
        (<any>req).user = user;

        // If token is invalid, return 401 Unauthorized response
        // Call next() to continue to the next middleware/controller
        next();
    } catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

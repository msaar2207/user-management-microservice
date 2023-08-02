import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ['admin', 'customer', 'service_provider'], default: 'customer' },
    // Add more fields as per your requirements
});

const UserModel = model('User', userSchema);

export default UserModel;

import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        username: user.username
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '2h'});

    return token;
}

const register = async (userData) => {

    if (userData.password !== userData.confirmPassword) {
        throw new Error('Passwords missmatch!');
    }

    const user = await User.findOne({email: userData.email}).select({_id: true});

    if (user) {
        throw new Error('User already exists!');
    }

    const createdUser = await User.create(userData);

    const token = generateToken(createdUser);
    
    return token;

};

export const login = async (email, password) => {
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Invalid password or email!')
    }

    const isValid = bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid password or email!')
    }

    const token = generateToken(user);

    return token;
 
}


const authService = {
    login,
    register
};

export default authService;
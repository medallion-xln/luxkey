import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import { generateToken, setAuthCookie } from '../lib/utils';

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, firstName, lastName } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('auth/register', { title: 'Register', messages: { error: 'Email already registered' } });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, firstName, lastName, role: 'user' });
        await user.save();
        const token = generateToken(user);
        setAuthCookie(res, token);
        return res.redirect('/dashboard');
    } catch (error: any) {
        return res.render('auth/register', { title: 'Register', messages: { error: 'Error during registration: ' + error.message } });
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.render('auth/login', { title: 'Login', messages: { error: info.message } });
        }
        const token = generateToken(user);
        setAuthCookie(res, token);
        return res.redirect('/dashboard');
    })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    return res.redirect('/');
};
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
            return res.status(400).send('<div class="alert alert-error">Email already registered</div>' +
                '<form hx-post="/auth/register" hx-swap="outerHTML" class="mt-4">' +
                '  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" type="text" placeholder="First Name" required></div>' +
                '  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">Last Name</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" type="text" placeholder="Last Name" required></div>' +
                '  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" required></div>' +
                '  <div class="mb-6"><label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" required></div>' +
                '  <div class="flex items-center justify-between"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button></div>' +
                '</form>'
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, firstName, lastName, role: 'user' });
        await user.save();
        const token = generateToken(user);
        setAuthCookie(res, token);
        return res.status(200).send('<div hx-get="/dashboard" hx-trigger="load"></div>');
    } catch (error: any) {
        return res.status(500).send('<div class="alert alert-error">Error during registration: ' + error.message + '</div>' +
            '<form hx-post="/auth/register" hx-swap="outerHTML" class="mt-4">' +
            '  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">First Name</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="firstName" name="firstName" type="text" placeholder="First Name" required></div>' +
            '  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">Last Name</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="lastName" name="lastName" type="text" placeholder="Last Name" required></div>' +
            '  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" required></div>' +
            '  <div class="mb-6"><label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" required></div>' +
            '  <div class="flex items-center justify-between"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Register</button></div>' +
            '</form>'
        );
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(400).send('<div class="alert alert-error">' + info.message + '</div>' +
                '<form hx-post="/auth/login" hx-swap="outerHTML" class="mt-4">' +
                '  <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" name="email" type="email" placeholder="Email" required></div>' +
                '  <div class="mb-6"><label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label><input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" name="password" type="password" placeholder="Password" required></div>' +
                '  <div class="flex items-center justify-between"><button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Login</button></div>' +
                '</form>'
            );
        }
        const token = generateToken(user);
        setAuthCookie(res, token);
        return res.status(200).send('<div hx-get="/dashboard" hx-trigger="load"></div>');
    })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    return res.status(200).send('<div hx-get="/" hx-trigger="load"></div>');
};
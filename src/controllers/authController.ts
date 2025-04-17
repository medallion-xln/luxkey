import { Request, Response } from 'express';
import passport from 'passport';
import { User } from '../models/User';
import bcrypt from 'bcrypt';

export const login = (req: Request, res: Response) => {
  res.render('auth/login', { title: 'Login' });
};

export const loginPost = passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/auth/login',
  failureFlash: true
});

export const register = (req: Request, res: Response) => {
  res.render('auth/register', { title: 'Register' });
};

export const registerPost = async (req: Request, res: Response) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      req.flash('error', 'Email already registered');
      return res.redirect('/auth/register');
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'user'
    });

    await user.save();

    // Log in the new user
    req.login(user, (err) => {
      if (err) {
        req.flash('error', 'Error during login');
        return res.redirect('/auth/login');
      }
      res.redirect('/dashboard');
    });
  } catch (error) {
    req.flash('error', 'Error during registration');
    res.redirect('/auth/register');
  }
};

export const logout = (req: Request, res: Response) => {
  req.logout(() => {
    res.redirect('/');
  });
};

export const forgotPassword = (req: Request, res: Response) => {
  res.render('auth/forgot-password', { title: 'Forgot Password' });
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    // Implement password reset logic here
    req.flash('success', 'Password reset instructions sent to your email');
    res.redirect('/auth/login');
  } catch (error) {
    req.flash('error', 'Error processing request');
    res.redirect('/auth/forgot-password');
  }
}; 
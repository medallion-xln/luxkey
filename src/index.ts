import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import authRoutes from './routes/auth';
import dashboardRoutes from './routes/dashboard';
import connectDB from './config/database';
import './config/passport';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/luxkey',
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 14 * 24 * 60 * 60 * 1000 // 14 days
  }
}));

// Flash messages
app.use(flash());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.use(expressLayouts);

// Global variables
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);

// Sample data
const sampleListings = [
  {
    id: 1,
    title: 'Luxury Penthouse with Ocean View',
    location: 'Miami Beach, FL',
    price: 2500000,
    image: 'https://images.unsplash.com/photo-1613977257365-aaae4018b1f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Modern Villa in Beverly Hills',
    location: 'Beverly Hills, CA',
    price: 4500000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Historic Townhouse in Manhattan',
    location: 'New York, NY',
    price: 3500000,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

// Home route
app.get('/', (req, res) => {
  res.render('index', {
    title: 'LuxKey - Luxury Real Estate',
    listings: sampleListings
  });
});

// API Routes
app.get('/api/listings', (req, res) => {
  const search = req.query.search as string;
  if (search) {
    const filteredListings = sampleListings.filter(listing => 
      listing.title.toLowerCase().includes(search.toLowerCase()) ||
      listing.location.toLowerCase().includes(search.toLowerCase())
    );
    res.json({ listings: filteredListings });
  } else {
    res.json({ listings: sampleListings });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
}); 
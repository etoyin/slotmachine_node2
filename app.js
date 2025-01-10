const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user.router');
const adminRoutes = require('./routes/admin_router');
const path = require('path');
var cookieParser = require('cookie-parser');

require("./controllers/DailyCronJobs");

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Middleware for parsing JSON payloads
app.use(express.json({
  verify: (req, res, buf) => {
    // Store raw body for webhook verification
    if (req.url.startsWith('/webhook')) {
      req.rawBody = buf;
    }
  }
}));

// Regular middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// View engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Static files with proper headers
app.use(express.static(path.join(__dirname, 'public'), {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    // Set CSP headers for static files
    res.setHeader('Content-Security-Policy', 
      "default-src 'self' https://*.hyperswitch.io; " +
      "script-src 'self' 'unsafe-inline' https://*.hyperswitch.io; " +
      "style-src 'self' 'unsafe-inline'; " +
      "connect-src 'self' https://*.hyperswitch.io; " +
      "frame-src 'self' https://*.hyperswitch.io;"
    );
  }
}));

// Routes
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', adminRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test endpoint
app.get("/test", (req, res) => {
  res.render('demo.ejs', {
    title: 'Slotgame | Landing Page',
    url: ''
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  // Log detailed error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Stack:', err.stack);
    console.error('Request details:', {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body
    });
  }

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    details: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// Start server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
  console.log('Environment:', process.env.NODE_ENV || 'development');
  console.log('Base URL:', process.env.BASE_URL);
});

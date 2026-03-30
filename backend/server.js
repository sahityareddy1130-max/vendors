const express = require('express');
const cors = require('cors');
const vendorRoutes = require('./routes/vendorRoutes');

const app = express();

// CORS middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-frontend.netlify.app' // Replace with your actual Netlify URL
  ],
  credentials: true,
}));

// Body parser middleware
app.use(express.json({ limit: '8mb' }));

// Debug log for every request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Mount vendor routes
app.use('/api/vendors', vendorRoutes);

// Default route for root URL
app.get('/', (req, res) => {
  res.send('<h2>Welcome to the Vendor Website Backend API!</h2><p>Use <code>/api/vendors</code> for API access.</p>');
});

// 404 handler for unknown API routes
app.use('/api', (req, res) => {
  console.log('404 Not Found:', req.method, req.originalUrl);
  res.status(404).json({ message: 'API route not found' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

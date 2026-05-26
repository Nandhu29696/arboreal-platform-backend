const express   = require('express');
const cors      = require('cors');
const helmet    = require('helmet');
const morgan    = require('morgan');
const rateLimit = require('express-rate-limit');
const path      = require('path');
require('dotenv').config();

const app = express();

/**
 * Trust proxy (only in production)
 */
if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

/**
 * Core Middleware
 */
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));
app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB Connection
const db = require('./src/model');
const { log } = require('console');
(async () => {
  await db.sequelize.authenticate();
  console.log('Database connected...');

  // Sync models (use with caution in production)
  await db.sequelize.sync({ alter: true });
  console.log('Table synced..');
  
})();


// Static uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

/**
 * Rate Limiter
 */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api', limiter);

/**
 * API Routes
 */
app.use('/api/business-associates', require('./src/routes/businessAssociate.routes'));
app.use('/api/consultants',         require('./src/routes/technicalConsultant.routes'));
app.use('/api/employees',           require('./src/routes/employee.routes'));
app.use('/api/hospitality',         require('./src/routes/hospitalityVertical.routes'));
app.use('/api/land',                require('./src/routes/landResource.routes'));
app.use('/api/ngos',                require('./src/routes/ngo.routes'));
app.use('/api/nursery-vendors',     require('./src/routes/nurseryVendor.routes'));
app.use('/api/vendors',             require('./src/routes/vendor.routes'));
app.use('/api/volunteers',          require('./src/routes/volunteer.routes'));
app.use('/api/products',            require('./src/routes/product.routes'));
app.use('/api/tree-species',        require('./src/routes/treeSpecies.routes'));
app.use('/api/projects',            require('./src/routes/project.routes'));
app.use('/api/dashboard',           require('./src/routes/dashboard.routes'));
 
app.use(
  '/uploads',
  express.static(
    path.join(process.cwd(), 'uploads')
  )
);

/**
 * Health Check
 */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', ts: new Date() });
});

/**
 * 🔥 Serve React build
 */
const buildPath = path.join(__dirname, 'build');

app.use(express.static(buildPath));

// React routing (only for non-API routes)
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(buildPath, 'index.html'));
});

/**
 * 404 Handler (for API / unknown routes)
 */
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

/**
 * Global Error Handler
 */
app.use((err, req, res, next) => {
  console.error('🔥 ERROR:', err);
  console.error('🔥 STACK:', err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🌳 Arboreal API running on port ${PORT}`);
});

module.exports = app;
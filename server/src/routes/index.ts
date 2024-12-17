// import all dependencies, including express router, our api routes, and our auth routes
// also import our authentication token middleware to ensure authentication is complete correctly and securely
import { Router } from 'express';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';

const router = Router();

// paths to run either an auth request, or an api request
router.use('/auth', authRoutes);
router.use('/api', apiRoutes);

export default router;

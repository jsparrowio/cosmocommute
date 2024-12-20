import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { signupRouter } from './signup-routes.js';
import { authenticateToken } from '../../middleware/auth.js';
import { weatherRouter } from './weather-routes.js';
import { apodRouter } from './apod-routes.js';

const router = Router();

router.use('/users', authenticateToken, userRouter);
router.use('/signup', signupRouter);
router.use('/weatherevents', weatherRouter);
router.use('/apod', apodRouter);

export default router;
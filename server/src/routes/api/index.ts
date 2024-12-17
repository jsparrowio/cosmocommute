import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { signupRouter } from './signup-routes.js';
import { authenticateToken } from '../../middleware/auth.js';

const router = Router();

router.use('/users', authenticateToken, userRouter);
router.use('/signup', signupRouter);

export default router;
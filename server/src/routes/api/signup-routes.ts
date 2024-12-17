import express from 'express';
import {
  createUser,
} from '../../controllers/user-controller.js';

const router = express.Router();

// POST /users - Create a new user
router.post('/', createUser);

export { router as signupRouter };
// import depenencies such as express router, user model, JWT, and bcrypt
import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// export login call function
export const login = async (req: Request, res: Response) => {

  const { username, password } = req.body;

  // find user in database, if not, return a 401 with a message that the user does not exist
  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: 'User not found. Did the user mean to sign up?' });
  }

  // use bcrypt to encrypt the password, then compare the encryption with what exists in the db
  const validatePassword = await bcrypt.compare(password, user.password);
  if (!validatePassword) {
    return res.status(401).json({ message: 'Username or Password incorrect' });
  }

  const secretKey = process.env.JWT_SECRET_KEY || '';

  // sign the token using jwt functions that is validated with the secret key we provide in our env
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1hr' });
  return res.json({ token })
};

// express router establishment
const router = Router();

// path to run the login request
router.post('/login', login);

export default router;

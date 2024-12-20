import { Request, Response } from 'express';
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';



// GET /Users
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] }
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// POST /Users
export const createUser = async (req: Request, res: Response) => {
  const { username, first_name, last_name, email, password } = req.body;
  const existingUser = await User.findOne({
    where: { username },
  });
  const existingEmail = await User.findOne({
    where: { email },
  });
  if (!existingUser && !existingEmail) {
    try {
      const newUser = await User.create({ username, first_name, last_name, email, password });
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.status(409).json({ message: 'Username or email already exist' });
  }
};

// PUT /Users/:id
export const updateUserProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, first_name, last_name, email } = req.body;
  let existingUser;
  let existingEmail;
  try {
    const user = await User.findByPk(id);
    if (user) {
      if (username !== user.username) {
        existingUser = await User.findOne({
          where: { username },
        });
      }
      if (email !== user.email) {
        existingEmail = await User.findOne({
          where: { email },
        });
      }
      if (!existingUser && !existingEmail) {
      user.id = parseInt(id);
      user.username = username;
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      await user.save({'fields': ['username', 'first_name', 'last_name', 'email']});
      res.json(user);
      } else {
        res.status(409).json({ message: 'Username or email already exists'})
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateUserPassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { currentPassword, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (user) {
      const validatePassword = await bcrypt.compare(currentPassword, user.password);
      if (!validatePassword) {
        res.status(401).json({ message: 'Current password incorrect' });
        return;
      }
      user.password = password;
      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

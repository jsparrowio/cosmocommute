// import dependencies 
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// jwt payload interface, which contains user data
interface JwtPayload {
  username: string;
}

// export authenticateToken middleware, which checks validates the token against the secret key for validity, or responds a 403 forbidden
// If no authHeader, return a 401 unauthroize as no authorization header waas given
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const secretKey = process.env.JWT_SECRET_KEY || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user as JwtPayload;
      return next();
    })
  } else {
    res.sendStatus(401);
  }
};

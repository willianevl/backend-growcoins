import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import authConfig from '../../../../core/infra/config/auth.config';

export default async (req: any, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(404).json({ msg: 'invalid token' });
    }

    const [, token] = authHeader.split(" ");

    try {
        jwt.verify(token, authConfig.secret!, (err: any, decoded: any) => {
            req.userUid = decoded.uid;

            return next();
        });
    } catch (error) {
        return res.status(401).json({ msg: 'invalid token' })
    }
}
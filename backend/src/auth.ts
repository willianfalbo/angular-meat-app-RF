import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import * as config from './config';
import { User, findUser } from './users';

export const handleAuthentication = (req: Request, resp: Response) => {
    const user: User = req.body;
    if (isValid(user)) {
        const dbUser: User = findUser(user.email);
        const token: string = jwt.sign({ sub: dbUser.email, iss: 'food-app' }, config.APP_SECRET_KEY);
        resp.json({ name: dbUser.name, email: dbUser.email, accessToken: token });
    } else {
        resp.status(403).json({ message: 'Dados inválidos.' });
    }
};

function isValid(user: User): boolean {
    if (!user) {
        return false;
    }
    const dbUser = findUser(user.email);
    return dbUser !== undefined && dbUser.matches(user);
}

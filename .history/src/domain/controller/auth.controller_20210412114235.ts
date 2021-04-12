import { Response } from "express";
import logging from "../../core/logging";
import UserModel from "../../data/models/user.model";

const NAMESPACE = 'AUTH CONTROLLER';

export class AuthController {
    public async loginUser(req: any, res: Response): Promise<void> {
        logging.info(NAMESPACE, 'Login user');
        const { username, password } = req.body;
        const errors = [];

        if (!username) {
            errors.push('Username required');
        }

        if (!password) {
            errors.push('Password required');
        }

        UserModel.findOne({ username: username, password: password })
            .then((response) => {
                if (response) res.status(200).json({ message: 'User logged in', data: response })
                else res.status(401).json({
                    message: 'Invalid username or password',
                    error: {
                        message: errors.length > 0 ? 'Required fields' : 'Invalid credentials',
                        errors: errors
                    },
                })
            })
            .catch((error) => res.status(500).json({ message: 'Error occurred', errors: error }));
    }

    public async registerUser(req: any, res: Response): Promise<void> {
        logging.info(NAMESPACE, 'Register user');

        res.send({ message: 'whoewww' });
    }

    public async forgotPassword(req: any, res: Response): Promise<void> {
        logging.info(NAMESPACE, 'Forgot password');

        res.send({ message: 'whoewww' });
    }
}
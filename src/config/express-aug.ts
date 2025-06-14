import { UserPayload } from '../models/userPayload';

declare module 'express-serve-static-core' {
    interface Request {
        user?: UserPayload;
    }
}

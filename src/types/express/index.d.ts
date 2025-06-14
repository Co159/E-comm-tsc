import { UserPayload } from '../../models/userPayload'; 

declare global {
  namespace Express {
   export interface Request {
      user?: UserPayload;
    }
  }
}

import {Request, Response, NextFunction} from 'express';
import { IUser } from '../interfaces/user';

declare global {
    namespace Express {
        interface Request{
            user?: IUser;  // puede haber un usuario
        }
    }
}
export function authMiddleware(req: Request, res: Response, next: NextFunction){
    //Primera opcion pero si tengo muchos se tiene que hace las veces que sean necesarias 
    //const token = req.query.token;
    //Puedes hacerlo asi y solo lo haces una vez
    const {token} = req.query;

    if(token === '12345'){
        req.user = {
            id: 123,
            name: 'Juan',
            email: 'juan@iteso.mx'
        }
        next();
    } else{
        //res.staus(401).send();
        //res.sendStatus(401);
        res.sendStatus(401).send({ message: 'not logged in'});
    }
}


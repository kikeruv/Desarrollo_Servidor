import {Request, Response, NextFunction} from 'express';
import { IUser } from '../interfaces/user';

export function authMiddleware(req: Request, res: Response, next: NextFunction){

    declare globa{
        namespace Express{
            interface Request{
                user?: IUser;
            }
        }
    }

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
        //res.staus(401).send
        //res.
        res.sendStatus(401);
    }
}


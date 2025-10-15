import {Request, Response} from 'express'

export function getUser(req: Request, res: Response){
    console.log('User: ', req.user);
    res.send([]);
}

export function uploadProfilePic( req: Request, res: Response){
    res.send('function uploadProfile');
    console.log('Imagen cargada');
}
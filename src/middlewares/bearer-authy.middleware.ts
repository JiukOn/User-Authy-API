import { NextFunction, Request, Response} from "express";
import ForbbidenError from "../models/errors/forbbiden.error.model";
import JWT from 'jsonwebtoken';
import userRepositoriy from "../repositories/user.repositoriy";

async function BearerATMiddleware(req:Request,res:Response,next:NextFunction){

    try {
    const autorizationHeader = req.headers['authorization'];

    if(!autorizationHeader){
        throw new ForbbidenError('Authy Error!');

    }

    const[Authytype,Token] = autorizationHeader.split(' ');
    if(Authytype !== 'Bearer' || !Token){
        throw new ForbbidenError('Authy type Error!')
    }

    const tokenpayload = JWT.verify(Token, 'my_secret_key');

    if(typeof tokenpayload !== 'object' || !tokenpayload.sub){
        throw new ForbbidenError('Invalid Token Error');
    }
    
    const user = {uuid: tokenpayload.sub, username: tokenpayload.username};
    req.user = user;
    
    next();
} catch (error) {
    next(error)
}

}

export default BearerATMiddleware;
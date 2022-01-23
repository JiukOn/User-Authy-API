import { NextFunction, Request, Response } from "express";
import ForbbidenError from "../models/errors/forbbiden.error.model";
import userRepositoriy from "../repositories/user.repositoriy";

 async function basicAtMiddleware (req: Request,res: Response,next: NextFunction){
     try {
        const autorizationHeader = req.headers['authorization'];

        if(!autorizationHeader){
            throw new ForbbidenError('Authy Error!');
    
        }
    
        const[Authytype,Token] = autorizationHeader.split(' ');
        if(Authytype !== 'Basic || !token'){
            throw new ForbbidenError('Authy type Error!')
        }
    
        const tokenContent = Buffer.from(Token, 'base64').toString('utf-8');
        const[username,password] = tokenContent.split(':');
    
        if(!username || !password){
            throw new ForbbidenError('Authy Error!');
        }
    
        const user = await userRepositoriy.findByUsernameAndPassword(username,password);
       
        if(!user){
            throw new ForbbidenError('Invalid Username or Password Error!');
        }

        req.user = user;
        next();
     } catch (error) {
         next(error);
     }
}

export default basicAtMiddleware;
import { Router,Request,Response,NextFunction } from "express";
import basicAtMiddleware from "../middlewares/basic-authy.middleware";
import JWT from 'jsonwebtoken';
import ForbbidenError from "../models/errors/forbbiden.error.model";


const AuthyRoute = Router();

AuthyRoute.post('/token', basicAtMiddleware , async (req: Request,res: Response,next: NextFunction) => {
    try{
    const user = req.user;

    if(!user){
        throw new ForbbidenError("Not User! Error!");
    }

    const JWTPAYLOAD = {username: user.username};
    const JWTOPTION = {subject: user?.uuid};
    const SECRETKEY = 'my_secret_key';

    JWT.sign(JWTPAYLOAD,SECRETKEY,JWTOPTION);

    }catch(error){
    next(error);
    }

});

export default AuthyRoute;
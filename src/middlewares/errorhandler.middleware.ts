import { Request,Response,NextFunction } from "express";
import DatabBaseError from "../models/errors/database.error.model";
import ForbbidenError from "../models/errors/forbbiden.error.model";

function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    if(error instanceof DatabBaseError){
    res.sendStatus(400);
    }else if(error instanceof ForbbidenError){
    res.status(403);
    }else{
    res.status(500);
    }
}

export default errorHandler;
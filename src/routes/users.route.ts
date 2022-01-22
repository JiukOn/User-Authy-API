import { Request,Response,NextFunction, Router } from "express";
import DatabBaseError from "../models/errors/database.error.model";
import userRepositoriy from "../repositories/user.repositoriy";

const usersRoute = Router();

usersRoute.get('/users', async (req: Request,res: Response,next: NextFunction) => {
    const users = await userRepositoriy.findAllUsers();
    res.status(200).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request<{uuid: string}>,res: Response,next: NextFunction) => {
    try{
        const uuid = req.params.uuid;
        const user = await userRepositoriy.findByID(uuid);
        res.status(200).send(user);
    }catch(error){
       next(error);
    }
});

usersRoute.post('/users', async (req: Request,res: Response,next: NextFunction) => {
   const newUser = req.body;
   const uuid = await userRepositoriy.create(newUser);
   res.status(201).send(uuid);

   console.log(req.body);
});

usersRoute.put('/users/:uuid', async (req: Request<{uuid: string}>,res: Response,next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;

    await userRepositoriy.update(modifiedUser);

    res.status(200).send(modifiedUser);
});

usersRoute.delete('/users/:uuid', async(req: Request,res: Response,next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepositoriy.remove(uuid);
    res.status(200);
 });

export default usersRoute;
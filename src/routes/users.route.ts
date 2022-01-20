import { Request,Response,NextFunction, Router } from "express";

const usersRoute = Router();

usersRoute.get('/users', (req: Request,res: Response,next: NextFunction) => {
    const users= [{username: 'JiukOn'}];
    res.status(200).send(users);
});

usersRoute.get('/users/:uuid', (req: Request<{uuid: string}>,res: Response,next: NextFunction) => {
    const uuid = req.params.uuid;
    res.status(200).send({uuid});
});

usersRoute.post('/users', (req: Request,res: Response,next: NextFunction) => {
   const newUser = req.body;
   res.status(201).send(newUser);

   console.log(req.body);
});

usersRoute.put('/users/:uuid', (req: Request<{uuid: string}>,res: Response,next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid;
    res.status(200).send(modifiedUser);
});

usersRoute.delete('/users/:uuid', (req: Request,res: Response,next: NextFunction) => {
    res.status(200);
 });

export default usersRoute;
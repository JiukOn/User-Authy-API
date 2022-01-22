import express, {Request, Response, NextFunction} from 'express';
import errorHandler from './middlewares/errorhandler.middleware';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//App init
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use(usersRoute);
app.use(statusRoute);

//ErrorHandler
app.use(errorHandler);

//Server Run
app.listen(3000, () => {
    console.log('Server is Running');
})
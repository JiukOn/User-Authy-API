import express, {Request, Response, NextFunction} from 'express';
import BearerATMiddleware from './middlewares/bearer-authy.middleware';
import errorHandler from './middlewares/errorhandler.middleware';
import AuthyRoute from './routes/authy.route';
import statusRoute from './routes/status.route';
import usersRoute from './routes/users.route';

const app = express();

//App init
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routes
app.use(usersRoute);
app.use(statusRoute);
app.use(AuthyRoute);

//ErrorHandler
app.use(errorHandler);


//Server Run
app.listen(3000, () => {
    console.log('Server is Running');
})
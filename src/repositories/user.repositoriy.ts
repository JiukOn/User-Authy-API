import db from "../db";
import DatabBaseError from "../models/errors/database.error.model";
import User from "../models/user.model";


class UserRepository {

    async findAllUsers(): Promise<User[]>{
        const query = `SELECT uuid, username FROM Authy_user`;
        const { rows } = await db.query<User>(query);

        return rows || [];
    }

    async findByID(uuid:string): Promise<User> {
        try{
            const query = `SELECT uuid, username FROM Authy_user WHERE uuid = $1`;
        const values = [uuid];
        const { rows } = await db.query<User>(query,values);
        const[user] = rows;

        return user;
        }catch(error){
            throw new DatabBaseError("ID Error!");
        }
    }

    async findByUsernameAndPassword(username: string,password: string){
        try{const query = `SELECT uuid, username from Authy_user WHERE username = $1 AND password = crypt(=$2,'my_salt')`;
        const values = [username,password];
        const {rows} = await db.query<User>(query,values);
        const [user] = rows;

        return user || null;
    }catch(error){
        throw new DatabBaseError('Username or Passwor Error',error);
    }

    }

    async create(user: User): Promise<string> {
        const script = `INSERT INTO Authy_user (username, password) VALUES ($1, crypt($2,'my_salt')) RETURNING uuid`;

        const values = [user.username, user.password];
        const {rows} = await db.query<{uuid: string}>(script, values);
        const [newUser] = rows;

        return newUser.uuid;
    }

    async update(user: User): Promise<void> {
        const script = `UPDATE INTO Authy_user SET username=$1, password=crypt($2, 'my_salt') WHERE uuid = $3`;

        const values = [user.username, user.password,user.uuid];
        await db.query(script, values);
    }

    async remove(uuid: string): Promise<void>{
        const cript = `DELETE FROM Authy_user WHERE uuid = $1`;

        const values = [uuid];
        await db.query(cript,values);
    }
        
}

export default new UserRepository();
import bcrypt from "bcryptjs";  
import { createError } from "../utils/createError.js";  
import  jwt  from "jsonwebtoken";
import pool from "../config/database.js";


export const register = async (req, res, next) => {
    
    const username = req.body.name
    const email = req.body.email
    const password = req.body.password

    //Check if user already exists
    const checkIfUserExistsQuery = "SELECT * FROM user WHERE name = ? OR email = ?"
    pool.query(checkIfUserExistsQuery, [username, email],(err, results)=>{

        if(err){
            return next(err)
        }

        if(results.length>0){
            // User already exists, throw an error
            return next(createError(409, "User already exists"))

        }
        else{
            // User does not exist
            //Hash the password
            const salt = bcrypt.genSaltSync(10);  
            const hash = bcrypt.hashSync(password, salt);  
            console.log(hash)
            //Register the user
            const createUserQuery = "INSERT INTO user (name, email, password) values(?,?,?)"
            pool.query(createUserQuery, [username, email, hash], (err, results) => {
                if(err){
                    return next(err);
                }

                res.status(200).send("Successfully Registered");  
            })     
        }
    })
    
};

export const login = async (req, res, next) => {

    const username = req.body.name
    
    //Check if User exists
    const checkIfUserExistsQuery = "SELECT * FROM user WHERE name = ?"
    pool.query(checkIfUserExistsQuery, [username], async (err, results)=>{
        const user = results[0]
        
        if(err){
            return next(err)
        }

        if(results.length=0){
            // User Doesn't exists, throw an error
            return next(createError(404, "User Not Found"))
            
        }
        else{
            //User Found
            //Compare the password
            const isPassCorrect = await bcrypt.compare(req.body.password, user.password);
            if (!isPassCorrect) {//Password is incorrect
                return next(createError(400, "Incorrect Password or Username"));  // Return error if password is incorrect
            }
            
            //Login the user and send a cookie
            const { password, ...otherDetails } = user;
            const token = jwt.sign({id:user.id, isAdmin:user.isAdmin}, process.env.JWT)
            res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).send(otherDetails);
        }
    })

    
};
import Todo from "../modal/todo.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"
import config from "../config/config.js";
export const handleLogin = async(req, res)=>{
    const {username, password } = req.body;
    const user = await Todo.findOne({username: username});
    if(user){
        const storedHashedPassword = user.password;
        bcrypt.compare(password, storedHashedPassword, async(err, result)=>{
            if (err) {
                console.log(err);                
            }else{
                if(result){
                    const token = jwt.sign({user: user.username, userId: user._id}, config.jwtSecret);
                    res.cookie('token', token, { httpOnly: true });
                    res.json({message: "log in success" })
                }else{
                    res.json({
                        message: "Invalid Password"
                    })
                }
            }
        })
    }else res.status(401).json({message: "Invalid username"})
}
let saltRounds = 10;
export const handleRegister = async(req, res)=>{
    const {username, password } = req.body;
    const user = await Todo.find({username: username});
    if(user.length>0) {
        res.json({user: "already registered user, try login"})
    }else{

    bcrypt.hash(password, saltRounds, async(err, hash)=>{
        if (err) console.log(err);
        const user = new Todo({
            username,
            password: hash,
        });
        await user.save()
        
    })
    res.json({message: "user registered succesfully"})
    }
}
export const handleLogout = (req, res)=>{
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) }); 
    return res.json({ message: "Logged out successfully" });
}

import jwt from "jsonwebtoken";
import config from "../config/config.js";
const  verifyToken = (req, res, next)=>{
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
        res.sendStatus(401)
    }else{
        jwt.verify(token, config.jwtSecret, (err, user)=>{
            if (err) {
                res.sendStatus(403);
            }else{
                req.user = user;
                
                next();
            }
        })
    }
}
export default verifyToken;

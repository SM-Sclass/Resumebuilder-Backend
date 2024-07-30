import jwt from "jsonwebtoken"

const isAuthenticated = async(req, res, next) =>{
    try {
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({message: "Unauthorized"})
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY)
        if(!decode){
            return res.status(401).json({message: "Invalid token"})
        }
        req.id = decode.userId;
        next()
    } catch (error) {
        console.log(error, "Error in Authentication")
        return res.status(400).json({ msg: "Some error", success: false });
    }
}

export default isAuthenticated;
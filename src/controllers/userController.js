import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                msg: "Please fill in all fields",
                success: false
            });
        }
        const userName = await User.findOne({ username });
        if (username) {
            return res.status(400).json({ msg: "username already exists", success: false });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "Email already exists", success: false });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const createduser = User.create({
            username,
            email,
            password: hashPassword
        })
        res.status(201).json({ msg: "User created successfully", success: true, createduser })
    } catch (error) {
        console.log(error, "Error in SignUp")
        return res.status(400).json({ msg: "Some error", success: false });
    }

}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                msg: "Please fill in all fields",
                success: false
            });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ 
                msg: "Incorrect username or password", 
                success: false 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                msg:"Incorrect username or password", 
                success:false
            });
        }

        const tokenData = {
            id: user._id,
            username: user.username
        }
        const token = await jwt.sign(tokenData , process.env.SECRET_KEY, {expireIn:'1d'})

        return res.status(200).cookie("token", token, {maxAge: 1*24*60*60*1000, httpsOnly:true, sameSite:'strict'}).json(
            {msg: `Welcome back ${user.username}`,
            user,
            success: true}
        )
    } catch (error) {
        console.log(error, "Error in Login")
        return res.status(400).json({ msg: "Some error", success: false });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json(
            {msg: "Logged out successfully.",
            success: true}
        )
    } catch (error) {
        console.log(error,"Logout error");
        return res.status(400).json({ msg: "Some error", success: false });
    }
}

export const updateProfile = async(req, res) => {
    try {
        const {username} = req.body;
        if(!username){
            return res.status(400).json({msg: "Please enter a username", success: false})
        }
        const user = await User.findOne({username})
        if(user){
            return res.status(400).json({msg: "Username already exists enter another username", success: false})
        }
        user.username = username;
        await user.save();
        user = {
            _id: user._id,
            username: user.username,
            email: user.email
        }
        return res.status(200).json({
            msg: "Profile updated successfully.",
            user, 
            success:true
        })
    } catch (error) {
        console.log(error,"updating error");
        return res.status(400).json({ msg: "Some error", success: false });
    }
}
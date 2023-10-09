import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../models/UserModel.js'

class UserController{
    static userRegister = async(req, res)=>{
        const{name, email, phone, gender="", city="", state="", password="", sources=[]} = req.body
        const user = await userModel.find({email})
        try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)
            const doc = new userModel({
                name,email,password:hashPassword,phone, gender, city, state, sources
            })
            const r = await doc.save();
            //generate jwt token
            // const user = await userModel.findOne({email:email})
            const token=jwt.sign({userId: r._id}, process.env.JWT_SECRET_KEY, {expiresIn:'5d'})

            res.status(201).json({success: true ,user: r,token, message: "Registered Successfully"})
        } catch (error) {
            res.status(400).json({success: false ,message:"Error on Registering. Try Again Later."})
        }      
    }

    static userLogin=async (req, res)=>{
        try {
            const {email, password}=req.body
            const result = await userModel.findOne({email})
            const isMatch = await bcrypt.compare(password, result.password) 

            if(isMatch){
                const token=jwt.sign({userId:result._id}, process.env.JWT_SECRET_KEY, {expiresIn:'5d'})
                res.status(200).json({result, token, success: true, message:"Logged in Successfully"})
            }else{
                res.status(401).json({success: false ,message:"Password didn't match"})
            }
            // res.send("wrong")
        } catch (error) {
            res.status(401).json({success: false ,message:"User not exists"})
        }
    }

    static getAllUser = async (req, res)=>{
        try {
            const users = await userModel.find().select("-password")

            res.status(200).json({success: true, message: "", users})
        } catch (error) {
            res.status(401).json({success: false ,message:"Error fetching Users"})
            
        }
    }

    static updateUser = async (req, res)=>{
        const {name, phone, email} = req.body
        try {
            const updatedUser = await userModel.updateOne({email}, {name, phone, updatedAt: Date.now()})
            res.status(200).json({success: true, message: "Successfully Updated", user: updatedUser})
        } catch (error) {
            res.status(401).json({success: false ,message:"Error Updating User"})
            
        }
    }

    static deleteUser = async (req, res)=>{
        const {email} = req.body
        try {
            await userModel.deleteOne({email})
            const updatedUsers = await userModel.find()
            res.status(204).json({success: true, message: "Successfully Deleted", users: updatedUsers})
        } catch (error) {
            res.status(401).json({success: false ,message:"Error Deleting User"})
            
        }
    }
}

export default UserController
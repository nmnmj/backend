import express from 'express'
import UserController from '../controller/User.js'
import checkUserAuth from '../utils/authMiddleware.js'
const router = express.Router()

router.get("/", (req, res)=>res.status(200).json({success:true}))

router.post("/register", UserController.userRegister)
router.post("/login", UserController.userLogin)
router.get("/get-all-users", checkUserAuth, UserController.getAllUser)
router.post("/update-user", checkUserAuth, UserController.updateUser)
router.post("/delete-user", checkUserAuth, UserController.deleteUser)



export default router
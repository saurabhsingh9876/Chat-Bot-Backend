import express from 'express'
import { signup, login ,logout,getAllUsers,getByid,updateUserById,searchUsers } from '../controller/auth_controllers.js';
import { signupValidation, loginValidation } from '../middlewares/auth-validation.js'
import { isAdmin } from '../middlewares/auth.js';


const router=express.Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);
router.post('/logout', logout);
router.get('/getall',isAdmin,getAllUsers);
router.get('/get',getByid);
router.put('/update',isAdmin,updateUserById);
router.get('/find',isAdmin,searchUsers);

export default router
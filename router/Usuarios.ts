import { Router } from "express";
import { logInUser, registerUser, updateRolUser, updateStateUsers } from "../controller/Usuarios";
import {body}  from 'express-validator';        


const router = Router();


router.get('/',(req,res)=>res.json('prueba'));
router.post('/login',[
    body('email').isEmail(),
    body('password').notEmpty()
],logInUser) ;
router.post('/register',[
    body('email').isEmail(),
    body('password').notEmpty(),
    body('fullName').isString(),
    ],
    registerUser
);
router.put('/update/state',[
    body('token').isString(),
    body('idUserPut').notEmpty(),
    body('condition').isBoolean()
],updateStateUsers);
router.put('/update/rol',[
    body('token').isString(),
    body('idUserPut').notEmpty(),
    body('rol').notEmpty()
],updateRolUser);




export default router;
import {Request } from 'express'
import { validationResult } from 'express-validator';
import ModelUsers from '../../models/db/Users';
import bcrypt from "bcrypt";
import { Identifier, Model, ModelAttributes } from 'sequelize/types';
import { decodeIdToken } from './jwt';
import { Json } from 'sequelize/types/lib/utils';
import ModelManager from 'sequelize/types/lib/model-manager';
import { Roles } from '../../constant/tables';

export const validatorRequest = (req : Request)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return {
                status:'Error en peticion',
                error: error.array()
            };
    }
}

export const existingUser = async (email : string)=>{
    const usuario = await ModelUsers.findOne({
        where:{Email:email}
    });
    if(usuario){

        return true;
    }


    return false;

}

export const userLoginValidation = async (email: string,password:string)=>{

    const usuario  = await ModelUsers.findOne({
        where:{Email:email}
    });
    if(!usuario){
        return false;
    }
    const usuariosAtributte  = usuario.get();
    const validation = await comparePassword(password,usuariosAtributte.Password)
    if(validation){
        return true;
    }
    return false;
    

}

 export function comparePassword  (password: string, hash:any) : Boolean {
    return bcrypt.compareSync(password,hash);
}

export function bcryptPassword (password: string):Promise<string>{
    const salt = 10;
    return bcrypt.hash(password,salt);
}

export async function validatePermissions (token : string, fk : Identifier ):Promise<Boolean>{
    const id : any = decodeIdToken(token);

    if(id===false){
        return false;
    }
    const usuario = await ModelUsers.findByPk(id);

    if(usuario?.get().RolUser===fk){
        return true;
    }
    return false;
}

export async function verifyUserById(id:Identifier) : Promise<Boolean | Model> {

    try {
        const user = await ModelUsers.findByPk(id);
        if(user===null){
            return false;
        }
        return user;
    } catch (error) {
        console.log(error);
        return false;
    }
    
}

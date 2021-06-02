import {DataTypes, } from 'sequelize';
import db from '../../database/connect';


const ModelContratista = db.define('Contratista',{
    FullName:{
        type:DataTypes.STRING
    },
    Email:{
        type:DataTypes.STRING
    },
    NumeroTelefono:{
        type:DataTypes.STRING
    }
},
    {
        timestamps:false
    }
);

export default ModelContratista;
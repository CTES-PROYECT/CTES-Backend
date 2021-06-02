import {DataTypes, } from 'sequelize';
import db from '../../database/connect';


const ModelClasificacion = db.define('Clasificacion',{
    NameClasificacion:{
        type:DataTypes.STRING
    }
},
    {
        timestamps:false
    }
);

export default ModelClasificacion;
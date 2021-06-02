import {DataTypes} from 'sequelize';
import db from '../../database/connect';


const ModelCaracteristicas = db.define('Caracteristicas',{
    Longitud:{
        type:DataTypes.STRING
    },
    Seccion:{
        type:DataTypes.STRING
    },
    Pendiente:{
        type:DataTypes.STRING
    }
},
    {
        timestamps:false
    }
);

export default ModelCaracteristicas;
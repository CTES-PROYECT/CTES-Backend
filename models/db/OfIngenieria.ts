
import {DataTypes} from 'sequelize';
import db from '../../database/connect';
import ModelComuna from './Comuna';


const ModelOfIngenieria = db.define('OfIngenieria',{
    Direccion:{
        type:DataTypes.STRING
    },
    FkComuna:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelComuna,
            key:'id'
        }
    },
},
    {
        timestamps:false
    }
);

export default ModelOfIngenieria;
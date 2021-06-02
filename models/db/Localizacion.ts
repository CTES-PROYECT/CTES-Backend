
import {DataTypes} from 'sequelize';
import db from '../../database/connect';
import ModelComuna from './Comuna';
import ModelOfIngenieria from './OfIngenieria';


const ModelLocalizacion = db.define('Localizacion',{
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
    FkOfIngenieria:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelOfIngenieria,
            key:'id'
        }
    },
},
    {
        timestamps:false
    }
);

export default ModelLocalizacion;
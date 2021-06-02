import {DataTypes} from 'sequelize';
import db from '../../database/connect';
import ModelRegiones from './Regiones';


const ModelComuna = db.define('Comuna',{
    NameComuna:{
        type:DataTypes.STRING
    },
    FkRegion:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelRegiones,
            key:'id'
        }
    }
},
    {
        timestamps:false
    }
);

export default ModelComuna;
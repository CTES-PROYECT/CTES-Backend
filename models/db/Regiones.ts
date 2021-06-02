import {DataTypes} from 'sequelize';
import db from '../../database/connect';


const ModelRegiones = db.define('Regiones',{
    NameRegion:{
        type:DataTypes.STRING
    },
},
    {
        timestamps:false
    }
);

export default ModelRegiones;
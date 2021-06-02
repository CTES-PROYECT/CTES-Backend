import {DataTypes} from 'sequelize';
import db from '../../database/connect';


const ModelTipoSolicitudes = db.define('TipoSolicitudes',{
    NameSolicitudes:{
        type:DataTypes.STRING
    },
},
    {
        timestamps:false
    }
);

export default ModelTipoSolicitudes;
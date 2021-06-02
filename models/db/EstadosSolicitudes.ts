

import {DataTypes} from 'sequelize';
import db from '../../database/connect';


const ModelEstadosSolicitudes = db.define('EstadosSolicitudes',{
    NameEstadoSolicitud:{
        type:DataTypes.STRING
    },
},
    {
        timestamps:false
    }
);

export default ModelEstadosSolicitudes;
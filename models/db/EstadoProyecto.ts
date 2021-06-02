import {DataTypes, } from 'sequelize';
import db from '../../database/connect';


const ModelEstadoProyecto = db.define('EstadoProyecto',{
    NameState:{
        type:DataTypes.STRING
    }
},
    {
        timestamps:false
    }
);

export default ModelEstadoProyecto;
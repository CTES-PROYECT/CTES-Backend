import {DataTypes} from 'sequelize';
import db from '../../database/connect';


const ModelDateProyecto = db.define('DateProyecto',{
    PlazoEjecucion:{
        type:DataTypes.DATE
    },
    FechaLicitacion:{
        type:DataTypes.DATE
    },
    FechaInicioObra:{
        type:DataTypes.DATE
    }
},
    {
        timestamps:false
    }
);

export default ModelDateProyecto;
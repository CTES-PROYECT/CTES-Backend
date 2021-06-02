import {DataTypes} from 'sequelize';
import db from '../../database/connect';
import ModelEstadosSolicitudes from './EstadosSolicitudes';
import ModelProyecto from './Proyecto';
import ModelTipoSolicitudes from './TipoSolicitudes';
import ModelUsers from './Users';


const ModelSolicitudesProyectos = db.define('SolicitudesProyectos',{
    Comment:{
        type:DataTypes.STRING
    },
    UserInformador:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelUsers,
            key:'id'
        }
    },
    UserValidador:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelUsers,
            key:'id'
        }
    },
    FkEstadoSolicitud:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelEstadosSolicitudes,
            key:'id'
        }
    },
    FkProyecto:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelProyecto,
            key:'id'
        }
    },
    FkTipoSolicitud:{
        type:DataTypes.INTEGER,
        references:{
            model:ModelTipoSolicitudes,
            key:'id'
        }
    }
},
    {
        timestamps:false
    }
);

export default ModelSolicitudesProyectos;
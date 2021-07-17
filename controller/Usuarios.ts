import {Request, Response} from "express";
import ModelUsers from "../models/db/Users";
import {
    existingUser,
    comparePassword,
    validatorRequest,
    bcryptPassword,
    validatePermissionsForToken,
    verifyUserById, validatePermissionsForId,
} from "./utils/validations";
import {generateToken} from "./utils/jwt";
import {Model} from "sequelize/types";
import {ResponseCorrect, ResponseError} from "../constant/msgResponse";
import {Roles} from "../constant/tables";

export const logInUser = async (req: Request, res: Response) => {
    const validation = validatorRequest(req);

    if (validation) {
        return res.status(401).json(validation);
    }

    const {email, password} = req.body;
    const usuario = await ModelUsers.findOne({
        where: {Email: email},
    });

    if (!usuario) {
        return res.status(401).json({
            status: "ERROR",
            msg: "Email invalido",
        });
    }
    const usuariosAtributte = usuario.get();
    const validationPassword = comparePassword(
        password,
        usuariosAtributte.Password
    );

    if (validationPassword && usuariosAtributte.EstadoUser === true) {
        return res.json({
            status: "OK",
            msg: ResponseCorrect.UserAuthCorrectly,
            data: {
                name: usuariosAtributte.FullName,
                token: generateToken(usuariosAtributte.id),
                rol: usuariosAtributte.RolUser,
            },
        });
    }
    if (validationPassword && usuariosAtributte.EstadoUser === null) {
        return res.status(401).json({
            status: "ERROR",
            msg: ResponseError.UserInCheck,
        });
    }
    return res.status(401).json({
        status: "ERROR",
        msg: ResponseError.PasswordIncorrectly,
    });
};

export const registerUser = async (req: Request, res: Response) => {
    const validation = validatorRequest(req);
    if (validation) {
        return res.status(400).json(validation);
    }
    const {fullName, password, email} = req.body;

    const existing = await existingUser(email);
    if (existing) {
        return res.status(400).json({
            status: "ERROR",
            msg: ResponseError.EmailExisting,
        });
    }
    try {
        const passwordCrypt = await bcryptPassword(password);
        await ModelUsers.create({
            FullName: fullName,
            Email: email,
            Password: passwordCrypt,
        });
        return res.json({
            status: "OK",
            msg: ResponseCorrect.UserCreateCorrectly,
        });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }
};
/**
 *
 * @param req { , condition:true o false, idUserPut  }
 * @param res
 */
export const updateStateUsers = async (req: Request, res: Response) => {
    const {idUser, idUserPut, condition} = req.body;

    const validation = validatorRequest(req);

    if (validation) {
        return res.status(400).json(validation);
    }

    const premissions: boolean = await validatePermissionsForId(
        idUser,
        Roles.validador
    );
    if (!premissions) {
        return res.status(401).json({
            status: "ERROR",
            msg: ResponseError.UnauthorizedForUpdate,
        });
    }

    const user: any = await verifyUserById(idUserPut);

    if (user === false) {
        return res.status(400).json({
            status: "ERROR",
            msg: ResponseError.NotExistId,
        });
    }
    if (user.get().EstadoUser === condition) {
        return res.json({
            status: "OK",
            msg: ResponseCorrect.NotChangeUser,
        });
    }
    try {
        await user.update({
            EstadoUser: condition,
        });
        return res.json({
            status: "OK",
            msg: ResponseCorrect.UpdateUser,
        });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }
};
/**
 *
 * @param req { token, idUserPut, rol }
 * @param res
 */
export const updateRolUser = async (req: Request, res: Response) => {
    const {token, idUserPut, rol} = req.body;
    const validation = validatorRequest(req);

    if (validation) {
        return res.status(400).json(validation);
    }

    const premissions: boolean = await validatePermissionsForToken(token, Roles.admin);
    if (!premissions) {
        return res.status(401).json({
            status: "ERROR",
            msg: ResponseError.UnauthorizedForUpdate,
        });
    }

    const user: any = await verifyUserById(idUserPut);

    if (user === false) {
        return res.status(400).json({
            status: "ERROR",
            msg: ResponseError.NotExistId,
        });
    }

    try {
        await user.update({
            RolUser: rol,
        });
        return res.json({
            status: "OK",
            msg: ResponseCorrect.UpdateUser,
        });
    } catch (error) {
        return res.status(500).json({
            status: "ERROR",
            msg: ResponseError.ErrorServidor,
        });
    }
};

export const confimedUser = async (req: Request, res: Response) => {
    const {idUser} = req.body;

    const user = await ModelUsers.findByPk(idUser);
    if (user) {
        return res.json({
            status: "OK",
            data: {
                fullName: user.get().FullName,
                rol: user.get().RolUser,
            },
        });
    }
    return res.status(401).json({
        status: "ERROR",
        msg: ResponseError.Unauthorized,
    });
};

export const usersPendings = async (req: Request, res: Response) => {
    const {idUser} = req.body;

    const premissions: boolean = await validatePermissionsForId(idUser, Roles.validador);

    if (!premissions) {
        return res.status(401).json({
            status: "ERROR",
            msg: ResponseError.UnauthorizedForRequest,
        });
    }

    try {
        const result = await ModelUsers.findAll(
            {
                where: {
                    EstadoUser: null
                }
            }
        );
        return res.json({
            status: 'OK',
            data: result
        });
    } catch (e) {
        return res.status(500).json({
            status: 'ERROR',
            msg: ResponseError.ErrorServidor
        });
    }

}

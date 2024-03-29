import {NextFunction, Request, Response, Router} from "express";
import {
    confimedUser,
    getUserActive,
    logInUser,
    registerUser,
    updateRolUser,
    updateStateUsers, usersPendings,
} from "../controller/Usuarios";
import {body} from "express-validator";
import {resultValidationToken} from "../models/interfaces";
import {verifyBearerToken} from "../controller/utils/validations";
import {ResponseError} from "../constant/msgResponse";

const router = Router();
const middlewareToken = (req: Request, res: Response, next: NextFunction) => {
    const tokenVerify: resultValidationToken = verifyBearerToken(
        req.headers.authorization
    );
    if (!tokenVerify.validation) {
        return res.status(401).json({
            status: "ERROR",
            msg: ResponseError.Unauthorized,
        });
    }

    req.body.idUser = tokenVerify.id;

    return next();
};

// /api/users

router.get("/", middlewareToken, confimedUser);

router.get("/pendings", middlewareToken, usersPendings);

router.post(
    "/login",
    [body("email").isEmail(), body("password").notEmpty()],
    logInUser
);
router.post(
    "/register",
    [
        body("email").isEmail(),
        body("password").notEmpty(),
        body("fullName").isString(),
    ],
    registerUser
);
router.put(
    "/update/state",
    [
        middlewareToken,
        body("idUserPut").notEmpty(),
        body("condition").isBoolean(),
    ],
    updateStateUsers
);
router.put(
    "/update/rol",
    [
        middlewareToken,
        body("idUserPut").notEmpty(),
        body("rol").notEmpty(),
    ],
    updateRolUser
);

router.get("/active",middlewareToken,getUserActive);

export default router;

import { response } from "express";
import { OK, Created, InternalServerError, Forbidden } from "../../helpers/http-response";
import logger from "../../helpers/utils/logger";
import httpRequest from "./http_request";
import jwt from "../../middlewares/jwt_auth_helper";
import Command from "./command";


const notEligibleToProcessMessage = "Unknown user",
    createAccountSuccessMessage = "Succesfully created an account";


class AdminService {
    constructor() {
        this.ctx = this.constructor.name;
        this.command = new Command();
    }

    async login(payload) {
        const ctx = `${this.ctx}.login`;
        const responses = await httpRequest.login(payload);
        if (responses.code != 200) {
            logger.log(`${ctx}.httpRequest.login`, responses.message, response.code);
            return responses;
        }

        const { name, email } = responses.data;
        const admin = { name, email };
        const token = await jwt.generateToken(responses.data);
        admin.token = {
            value: token,
            // 3600 detik (1 jam) *  24 jam * 3 hari
            expiresIn: 3600 * 24 * 3
        }

        const ok = new OK(responses.status);
        return ok.response(admin, responses.message);
    }

    async registration(payload, perpetrator) {
        const ctx = `${this.ctx}.registration`;
        const createdBy = await this.command.getUserFromSession(`user.profile.${perpetrator.id}`);
        if (createdBy.error) {
            logger.log(ctx, createdBy.message, `this.command.getUserFromSession`);
            return new Forbidden("NOT_ELIGIBLE").response(null, notEligibleToProcessMessage);
        };

        payload.createdBy = {
            id: createdBy.data.id,
            name: createdBy.data.name,
            email: createdBy.data.email
        };

        const responses = await httpRequest.registration(payload);
        if (responses.code != 201) {
            logger.log(ctx, responses.message, "httpRequest.registration");
            return responses;
        };

        return new Created().response(responses.data, createAccountSuccessMessage);
    }
}

export default AdminService;
import { response } from "express";
import { ERROR } from "../../../../EazyApiRefactor/eazyapi-service/bin/helpers/http-status/status_code";
import { OK, Created, InternalServerError } from "../../helpers/http-response";
import logger from "../../helpers/utils/logger";
import httpRequest from "./http_request";
import jwt from "../../middlewares/jwt_auth_helper";

class AdminService {
    constructor() {
        this.ctx = this.constructor.name;
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

    async registration(payload) {
        const ctx = `${this.ctx}.registration`;
        const responses = await httpRequest.registration(payload);
        if (responses.code != 201) {
            logger.log(`${ctx}.httpRequest.registration`, responses.message, response.code);
            return responses;
        };

        return new Created().response(responses.data, "Succesfully created an account");
    }
}

export default AdminService;
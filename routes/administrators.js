import httpHandler from "../module/administrators/http_handler";
import basicAuth from "../middlewares/basic_auth_helper";
import jwt from "../middlewares/jwt_auth_helper";

const init = server => {
    server.post("/administrators-api/v1/administrators/login", basicAuth.isAuthenticated, httpHandler.login);
    server.post("/administrators-api/v1/administrators/registration", jwt.verifyToken, httpHandler.registration);
};

export default { init };
import wrapper from "../helpers/utils/wrapper";
import { OK } from "../helpers/http-response";
import { NotFound, UnprocessableEntity } from "../helpers/http-response";
import administrators from "./administrators";
import basicAuth from "../middlewares/basic_auth_helper";

const init = server => {
    basicAuth.init();
    administrators.init(server);

    server.get("/administrators-api", (req, res) => {
        const ok = new OK();
        return wrapper.response(res, ok.response(null, "Application running properly"));
    });

    server.use((req, res, next) => {
        const error = new NotFound("PAGE_NOT_FOUND").response(null, "You're lost, double check your endpoint");
        next(error);
    });

    server.use((error, req, res, next) => {
        if (error.type === "entity.parse.failed") {
            return wrapper.response(res, new UnprocessableEntity().response(null, error.message));
        };
        return wrapper.response(res, error);
    });
};

export default { init };
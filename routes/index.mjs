import wrapper from "../helpers/utils/wrapper.mjs";
import { NotFound } from "../helpers/http-response/index.mjs";
import users from "./users.mjs";

const init = server => {
    users.init(server);

    server.use((req, res, next) => {
        const error = new NotFound();
        res.status(404);
        next(error);
    });

    server.use((error, req, res, next) => {
        return wrapper.response(res, error.response(null, "Page not found"));
    });
};

export default { init };
import HttpHandler from "../module/users/http_handler.mjs";

const init = server => {
    server.post("/v1/users/registration", HttpHandler.registration);
};

export default { init };
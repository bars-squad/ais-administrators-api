import Response from "./response.mjs";

class NotFound extends Response {
    constructor(status = "NOT_FOUND") {
        super();
        this.code = 404;
        this.status = status;
    };
};

export default NotFound;
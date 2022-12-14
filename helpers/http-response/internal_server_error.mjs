import Response from "./response.mjs";

class InternalServerError extends Response {
    constructor(status = "INTERAL_SERVER_ERROR") {
        super();
        this.code = 500;
        this.status = status;
    }
}

export default InternalServerError;
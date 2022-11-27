import Response from "./response.mjs";

class BadRequest extends Response {
    constructor(status = "BAD_REQUEST") {
        super();
        this.code = 400;
        this.status = status;
    };
};

export default BadRequest;
import Response from "./response.mjs";

class Forbidden extends Response {
    constructor(status = "FORBIDDEN") {
        super();
        this.code = 403;
        this.status = status;
    }
}

export default Forbidden;
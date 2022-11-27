import Response from "./response.mjs";

class Unauthorized extends Response {
    constructor(status = "UNAUTHORIZED") {
        super();
        this.code = 401;
        this.status = status;
    }
}

export default Unauthorized;
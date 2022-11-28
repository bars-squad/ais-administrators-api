import Response from "./response";

class Created extends Response {
    constructor(status = "CREATED") {
        super();
        this.code = 201;
        this.status = status;
    }
};

export default Created;
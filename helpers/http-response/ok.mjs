import Response from "./response.mjs";

class OK extends Response {
    constructor(status = "OK") {
        super();
        this.code = 200;
        this.status = status;
    }
};

export default OK;
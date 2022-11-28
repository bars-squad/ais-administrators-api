import Response from "./response";

class OK extends Response {
    constructor(status = "OK") {
        super();
        this.code = 200;
        this.status = status;
    }
};

export default OK;
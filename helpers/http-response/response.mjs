class Response {
    constructor(code, status) {
        this.code = code;
        this.status = status;
    };

    response(data, message, meta) {
        const { code, status } = this;
        return { data, code, message, status, meta };
    }
};

export default Response;
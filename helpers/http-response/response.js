class Response {
    constructor(code, status) {
        this.code = code;
        this.status = status;
    };

    response(data, message, meta) {
        const { code, status } = this;
        return { data, code, message, status, meta };
    }

    error(data, message) {
        const { code, status } = this;
        return { error: true, data, code: code, status: status, message };
    }
};

export default Response;
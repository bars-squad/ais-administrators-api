import Response from "./response";

class UnprocessableEntity extends Response {
  constructor(status = "UNPROCESSABLE_ENTITY") {
    super();
    this.code = 422;
    this.status = status;
  }
}

export default UnprocessableEntity;
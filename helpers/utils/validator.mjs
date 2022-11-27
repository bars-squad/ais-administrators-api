import validate from "validate.js";
import wrapper from "./wrapper.mjs";
import { OK, BadRequest } from "../http-response/index.mjs";

const isValid = (payload, constraint) => {
    const { value, error } = constraint.validate(payload);
    if (!validate.isEmpty(error)) {
        return wrapper.result(error, "Invalid Payload", new BadRequest());
    }
    return wrapper.result(value, "Payload Valid", new OK());
};

export default { isValid };

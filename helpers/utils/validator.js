import validate from "validate.js";
import { OK, BadRequest } from "../http-response";

const isValid = (payload, constraint) => {
    const { value, error } = constraint.validate(payload);
    if (!validate.isEmpty(error)) {
        return new BadRequest().error(error, "Invalid Payload");
    }
    return new OK().response(value, "Payload Valid");
};

export default { isValid };


import { OK, Created } from "../../helpers/http-response";
import wrapper from "../../helpers/utils/wrapper.mjs";
import UserService from "./service.mjs";
import validator from "../../helpers/utils/validator.mjs";
import payloadSchema from "./payload_schema.mjs";

const registration = async (req, res) => {
    const payload = req.body;
    const validatePayload = validator.isValid(payload, payloadSchema.registration);

    const postData = async (result) => {
        if (result.error) {
            return result;
        };
        const userService = new UserService();
        return userService.registration(result.data);
    };

    const sendResponse = async (result) => wrapper.response(res, result);
    sendResponse(await postData(validatePayload));
};

export default { registration };
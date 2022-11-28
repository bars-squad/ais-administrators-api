import wrapper from "../../helpers/utils/wrapper";
import AdminService from "./service";
import validator from "../../helpers/utils/validator";
import payloadSchema from "./payload_schema";

const login = async (req, res) => {
    const payload = req.body;
    const validatePayload = validator.isValid(payload, payloadSchema.login);

    const postData = async (result) => {
        if (result.error) {
            return result;
        };
        const admin = new AdminService();
        return admin.login(result.data);
    };

    const sendResponse = async (result) => wrapper.response(res, result);
    sendResponse(await postData(validatePayload));
};

const registration = async (req, res) => {
    const payload = req.body;

    const validatePayload = validator.isValid(payload, payloadSchema.registration);
    validatePayload.data.createdBy = req.user;

    const postData = async (result) => {
        if (result.error) {
            return result;
        };
        const admin = new AdminService();
        return admin.registration(result.data);
    };

    const sendResponse = async (result) => wrapper.response(res, result);
    sendResponse(await postData(validatePayload));
};

export default { registration, login };
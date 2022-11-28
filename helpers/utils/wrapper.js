import { OK, Created, BadRequest, Unauthorized, Forbidden, NotFound, InternalServerError } from "../http-response";

function _checkCategoriesHttpResponseCode(httpResponse) {
    const { code } = httpResponse;

    switch (code) {
        case 200:
        case 201:
            return { error: false, message: "Successful responses" };
        case 400:
        case 401:
        case 403:
        case 404:
            return { error: true, message: "Client error responses" };
        default:
            return { error: true, message: "Server error responses" };
    };
};

function _checkHttpResponseCode(httpResponse) {
    const { code } = httpResponse;

    switch (code) {
        case 200:
            return OK
        case 201:
            return Created;
        case 400:
            return BadRequest;
        case 401:
            return Unauthorized;
        case 403:
            return Forbidden;
        case 404:
            return NotFound;
        case 409:
            return NotFound;
        default:
            return InternalServerError;
    };
};

const result = (data = null, message = "", httpResponse) => {
    const httpResponseStatus = _checkCategoriesHttpResponseCode(httpResponse);
    return { error: httpResponseStatus.error, data, code: httpResponse.code, message: message, status: httpResponse.status };
}

const response = (res, result) => {
    delete result.error;
    return res.status(result.code).json(result);
};

/* const response = (res, result) => {
    const HttpResponse = _checkHttpResponseCode(result);
    const httpResponse = new HttpResponse(result.status).response(result.data, result.message);
    return res.status(result.code).json(httpResponse);
}; */

export default { response, result };
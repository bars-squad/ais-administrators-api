import wrapper from "../../helpers/utils/wrapper.mjs";
import { OK, Created, InternalServerError } from "../../helpers/http-response/index.mjs";

class UserService {
    constructor() { }

    registration(paylod) {
        return wrapper.result(null, "MESSAGE", new InternalServerError());
    }
}

export default UserService;
import fetch from "../../helpers/http-request";
import host from "../../config/service_registry";
import config from "../../config/global_config";

const login = async (payload) => {
  const options = {
    method: "POST",
    url: `${host.userCommand}/v1/administrators/login`,
    data: payload,
    auth: {
      username: config.get("/basicAuthUsernamePersisten"),
      password: config.get("/basicAuthPasswordPersisten")
    },
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    return error;
  };
};

const registration = async (payload) => {
  const options = {
    method: "POST",
    url: `${host.userCommand}/v1/administrators/registration`,
    data: payload,
    auth: {
      username: config.get("/basicAuthUsernamePersisten"),
      password: config.get("/basicAuthPasswordPersisten")
    },
  };

  try {
    const response = await fetch(options);
    return response;
  } catch (error) {
    return error;
  };
};

export default { login, registration };
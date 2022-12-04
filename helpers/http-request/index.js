import axios from "axios";
import { InternalServerError } from "../http-response";
import logger from "../utils/logger";

function fetch(options) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(options);
      resolve(response.data);
    } catch (error) {
      const defaultError = new InternalServerError();
      if (typeof error.response === 'undefined' || typeof error.response.data === 'undefined') {
        logger.log("fetch", error.message, "fetch")
        reject(defaultError.response(null, "Failed to fetch data"));
      }
      reject(error.response.data);
    }
  });
}

export default fetch

import axios from "axios";

function fetch(options) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios(options);
      resolve(response.data);
    } catch (error) {
      reject(error);
    }
  });
}

export default fetch

import Redis from "../../helpers/cache/redis";
import { NotFound, OK } from "../../helpers/http-response";

class Command {
  constructor() {
    this.redis = new Redis();
  }

  getUserFromSession = async (key) => {
    const result = await this.redis.get(key);
    return result;
  }
}

export default Command;
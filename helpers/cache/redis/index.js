import redis from "./connection";
import { OK, InternalServerError, NotFound } from '../../http-response';
import logger from "../../utils/logger";
import wrapper from "../../utils/wrapper";

// convert json to string
const stringify = (args) => {
  if (typeof (args) === 'object') {
    return JSON.stringify(args);
  }
  return args;
};

// convert string to json
const serializer = (args) => {
  try {
    const obj = JSON.parse(args);
    return obj;
  } catch (err) {
    return args;
  }
};

class Redis {
  constructor() {
    this.client = redis.getConnection();
    this.ctx = "redis-client-";
  };

  async get(key) {
    const result = new Promise((resolve, reject) => {
      this.client.get(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
    return Promise.resolve(result)
      .then(res => {
        if (!res) {
          return new NotFound().error(null, "Key is not exist")
        }
        return new OK().response(serializer(res))
      })
      .catch(err => {
        logger.log(this.ctx, err.message, 'get');
        return new InternalServerError().error(null, err.message)
      });
  }

  async set(key, value) {
    const ctx = this.ctx + 'set';

    return new Promise(async (resolve, reject) => {
      try {
        const reply = await this.client.set(key, stringify(value));
        resolve(reply);
      } catch (error) {
        logger.log(ctx, err.message, 'set');
        return new InternalServerError().error(null, err.message)
      }
    });
  }

  async setex(key, value, exipireAt = 10) {
    const ctx = this.ctx + 'setex';
    const result = new Promise((resolve, reject) => {
      this.client.setex(key, exipireAt, stringify(value), (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
    return Promise.resolve(result)
      .then(res => wrapper.data(res))
      .catch(err => {
        logger.log(ctx, err.message, 'setex');
        return new InternalServerError().error(null, err.message)
      });
  }

  // check time to live
  async ttl(key) {
    const ctx = this.ctx + 'ttl';
    const result = new Promise((resolve, reject) => {
      this.client.ttl(key, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
    return Promise.resolve(result)
      .then(res => wrapper.data(res))
      .catch(err => {
        logger.log(ctx, err.message, 'ttl()');
        return new InternalServerError().error(null, err.message)
      });
  };
};

export default Redis;
import Redis from "ioredis";
import config from '../../../config/global_config';
import logger from '../../utils/logger';

const redisClient = () => {
  const redisConfig = config.get('/redisConfig');
  const options = {
    port: redisConfig.port,
    host: redisConfig.host,
    password: redisConfig.password,
  };
  return new Redis(options);
};

const init = () => {
  const client = redisClient();
  client.on('error', (err) => {
    logger.log('redis-createConnection', err, "Initate Redis connection");
  });
  client.on('ready', () => {
    logger.log('redis-createConnection', 'Redis connected', "Initate Redis connection");
  });
};

const getConnection = () => redisClient();

export default {
  init,
  getConnection
};
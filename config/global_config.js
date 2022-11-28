import dotenv from "dotenv";
import confidence from "confidence";

dotenv.config();

const config = {
    publicKey: process.env.PUBLIC_KEY_PATH,
    privateKey: process.env.PRIVATE_KEY_PATH,
    port: process.env.PORT,
    basicAuthUsernamePersisten: process.env.BASIC_AUTH_USERNAME_PERSISTENCE,
    basicAuthPasswordPersisten: process.env.BASIC_AUTH_PASSWORD_PERSISTENCE,
    basicAuthApi: [
        {
            username: process.env.BASIC_AUTH_USERNAME,
            password: process.env.BASIC_AUTH_PASSWORD
        }
    ],
    mysql: {
        database: process.env.MYSQL_DATABASE,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST
    },
    mongoDbUrl: process.env.MONGO_DATABASE_URL,
    jwtKey: process.env.JWT_KEY,
};

const store = new confidence.Store(config);
const get = key => store.get(key);

export default { get }

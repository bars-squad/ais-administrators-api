import express from "express";
import cors from "cors";
import routes from "../routes";
import helmet from "helmet";
import redisConnection from "../helpers/cache/redis/connection";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

redisConnection.init();
routes.init(app);

export default app;
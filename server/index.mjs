import express from "express";
import cors from "cors";
import routes from "../routes";
// import mySQLConnection from "../helpers/database/mysql/connection.mjs";
import mongoConnection from "../helpers/database/mongodb/connection.mjs";
import helmet from "helmet";

const app = express();
// mySQLConnection.init();
mongoConnection.init();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
routes.init(app);

export default app;
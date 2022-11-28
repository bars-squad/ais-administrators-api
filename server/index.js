import express from "express";
import cors from "cors";
import routes from "../routes";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
routes.init(app);

export default app;
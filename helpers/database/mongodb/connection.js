import mongoose from 'mongoose';
import logger from "../../utils/logger";
import config from "../../../config/global_config";

const init = () => {
    const ctx = 'mongooseConnections';
    const configMongoose = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try {
        mongoose.connect(config.get('/mongoDbUrl'), configMongoose);
        logger.log(ctx, 'Mongoose Connected', "Initate MongoDB connection");
        const db = mongoose.connection;
        return db;
    } catch (error) {
        logger.log(ctx, err, "Initate MongoDB connection");
        logger.log(ctx, 'Mongoose Disconnected', 'info');
        process.exit(1);
    }
};

export default {
    init
};

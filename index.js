import logger from "./helpers/utils/logger";
import server from "./server";
import config from "./config/global_config";
const PORT = config.get('/port');

server.listen(PORT, () => {
    const ctx = 'server.listen';
    logger.log(ctx, `Apps started, listening at ${PORT}`, 'initate application');
});
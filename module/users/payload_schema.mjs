import joi from 'joi';

const registration = joi.object({
    username: joi.string().required().regex(/^[a-zA-Z0-9-_]+$/).message("Only contain letters (a-z), numbers (1-9), dashes ( - ), and underscores ( _ )"),
    password: joi.string().required(),
    fullName: joi.string().required(),
    email: joi.string().email().required(),
});

export default { registration };
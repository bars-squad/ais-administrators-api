import joi from 'joi';

const registration = joi.object({
    password: joi.string().required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    role: joi.string().valid('superadmin', 'lecture')
});

const login = joi.object({
    password: joi.string().required(),
    email: joi.string().email().required(),
});

export default { registration, login };
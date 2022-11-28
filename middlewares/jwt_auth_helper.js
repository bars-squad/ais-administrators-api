import jwt from 'jsonwebtoken';
import config from '../config/global_config';
import wrapper from '../helpers/utils/wrapper';
import { Unauthorized, Forbidden } from '../helpers/http-response';
import fs from "fs";

const verifyOptions = {
  algorithm: 'RS256',
  expiresIn: '3d'
};

const getToken = (headers) => {
  if (headers && headers.authorization && headers.authorization.includes('Bearer')) {
    const parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    };
  };
  return undefined;
};

const verifyToken = async (req, res, next) => {
  const publicKey = fs.readFileSync(config.get('/publicKey'), 'utf8');
  const encryptedtoken = getToken(req.headers);
  if (!encryptedtoken) {
    const forbidden = new Forbidden();
    return wrapper.response(res, forbidden.response(null, "Invalid token"))
  };

  let decodedToken;
  try {
    decodedToken = await jwt.verify(encryptedtoken, publicKey, verifyOptions);
  } catch (error) {
    const unauthorized = new Unauthorized();
    if (error instanceof jwt.TokenExpiredError) {
      return wrapper.response(res, unauthorized.response(null, "token expired"));
    }
    return wrapper.response(res, unauthorized.response(null, "Invalid token"));
  }
  req.user = decodedToken;
  next();
};

const generateToken = async (payload) => {
  const privateKey = fs.readFileSync(config.get('/privateKey'), 'utf8');/* 
  const verifyOptions = {
    algorithm: 'RS256',
    expiresIn: '3d'
  }; */
  const token = jwt.sign(payload, privateKey, verifyOptions);
  return token;
};


export default { verifyToken, generateToken };

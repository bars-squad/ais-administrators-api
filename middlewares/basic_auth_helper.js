import passport from "passport";
import { BasicStrategy } from "passport-http";
import { Unauthorized } from "../helpers/http-response";
import User from "./auth_repository"

passport.use(new BasicStrategy((username, password, cb) => {
  const user = new User();
  const error = new Unauthorized();
  error.message = "Authentication failed"

  return user.findByUsername(username, (user) => {
    if (!user) {
      return cb(error, false);
    }
    if (!user.isValidPassword(password)) {
      return cb(error, false);
    }
    return cb(null, user);
  });
}));

const isAuthenticated = passport.authenticate('basic', { session: false });
const init = () => passport.initialize();

export default {
  isAuthenticated,
  init
};

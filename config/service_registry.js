import dotenv from "dotenv";
dotenv.config();

const host = {
  userCommand: `${process.env.HOST_USER_COMMAND}/user-command`
}

export default host
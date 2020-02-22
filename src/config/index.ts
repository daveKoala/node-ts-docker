import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
}
export default {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV
};
import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').default(5000).asPortNumber(),
  
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),

  EMAIL_SERVICE: get('EMAIL_SERVICE').required().asString(),
  EMAIL_NAME: get('EMAIL_NAME').required().asEmailString(),
  EMAIL_PASSWORD: get('EMAIL_PASSWORD').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),
}
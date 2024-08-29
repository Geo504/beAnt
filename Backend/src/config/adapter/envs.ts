import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').default(5000).asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  BACKEND_URL: get('BACKEND_URL').required().asString(),
  FRONTEND_URL: get('FRONTEND_URL').required().asString(),
  
  MONGO_URL: get('MONGO_URL').required().asString(),
  MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
  MONGO_USER: get('MONGO_USER').required().asString(),
  MONGO_PASSWORD: get('MONGO_PASSWORD').required().asString(),

  EMAIL_SERVICE: get('EMAIL_SERVICE').required().asString(),
  EMAIL_NAME: get('EMAIL_NAME').required().asEmailString(),
  EMAIL_PASSWORD: get('EMAIL_PASSWORD').required().asString(),

  JWT_SEED: get('JWT_SEED').required().asString(),

  AWS_BUCKET_NAME: get('AWS_BUCKET_NAME').required().asString(),
  AWS_BUCKET_REGION: get('AWS_BUCKET_REGION').required().asString(),
  AWS_ACCESS_KEY: get('AWS_ACCESS_KEY').required().asString(),
  AWS_SECRET_KEY: get('AWS_SECRET_KEY').required().asString(),
}
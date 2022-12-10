import { registerAs } from '@nestjs/config';

export const MongoConfig = registerAs('mongo', () => ({
  dbName: process.env.MONGODB_DATABASE,
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  password: process.env.MONGO_INITDB_ROOT_PASSWORD,
  uri: process.env.MONGO_URI,
  uriDocker: process.env.MONGO_URI_DOCKER,
  version: process.env.MONGO_VERSION,
}));

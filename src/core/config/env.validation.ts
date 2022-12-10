import { plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  validateSync,
} from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  // APP
  @IsString()
  COMPOSE_PROJECT_NAME: string;

  @IsString()
  APP_NAME: string;

  @IsBoolean()
  APP_SEED: boolean;

  @IsNumber()
  SERVER_PORT: number;

  @IsString()
  SERVER_FULL_HOST: string;

  // AUTH
  @IsString()
  JWT_SECRET: string;

  @IsNumber()
  JWT_EXPIRE: number;

// MONGO
  @IsString()
  MONGODB_DATABASE: string;

  @IsString()
  MONGO_INITDB_ROOT_USERNAME: string;

  @IsString()
  MONGO_INITDB_ROOT_PASSWORD: string;

  @IsString()
  MONGO_URI: string;

  @IsString()
  MONGO_URI_DOCKER: string;

  @IsString()
  MONGO_VERSION: string;
}

export function validateEnvironment(
  config: Record<string, unknown>,
): EnvironmentVariables {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

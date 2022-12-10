import { Logger } from '@nestjs/common';
import dotenv from 'dotenv';

export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);

  private readonly envConfig: { [prop: string]: string };

  constructor(path?: string) {
    this.envConfig = dotenv.config(path ? { path } : null).parsed;
    if (!this.envConfig) {
      this.logger.error('.env file not specified!');
      this.envConfig = { ...process.env };
    } else {
      this.logger.debug(`loaded .env from ${path}!`);
    }
  }

  public getStoragePath(suffix: string): string {
    return `${process.cwd()}/storage/${suffix}`;
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public getNumber(key: string): number {
    return +this.envConfig[key];
  }

  public getString(key: string): string {
    const val = this.envConfig[key];
    if (!val) {
      this.log(key);
    }
    return val;
  }

  public getStringArray(key: string): string[] {
    const env = this.getString(key);
    return env ? env.split(',') : [];
  }

  public getClientHost(): string {
    return this.getString('CLIENT_FULL_HOST');
  }

  public getServerHost(): string {
    return this.getString('SERVER_FULL_HOST');
  }

  public getBoolean(key: string): boolean {
    const value = this.envConfig[key];
    return value && value === 'true';
  }

  public checkConfigAvailable(...envKeys): boolean {
    for (const confKey of envKeys) {
      const emailRedirectKey = this.get(confKey);
      if (!emailRedirectKey) {
        this.log(confKey);
        return false;
      }
    }
    return true;
  }

  public isDev(): boolean {
    return this.getString('NODE_ENV') === 'development';
  }

  public isProd(): boolean {
    return this.getString('NODE_ENV') === 'production';
  }

  public isStage(): boolean {
    return this.getString('NODE_ENV') === 'staging';
  }

  public isTest(): boolean {
    return this.getString('NODE_ENV') === 'test';
  }

  private log(key: string): void {
    this.logger.error(`${key} is not defined in .env`);
  }
}

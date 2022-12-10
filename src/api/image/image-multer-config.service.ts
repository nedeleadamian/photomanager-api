import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '@core/upload.utils';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';

@Injectable()
export class ImageMulterConfigService implements MulterOptionsFactory {
  public createMulterOptions(): MulterModuleOptions {
    return {
      limits: {
        fileSize: 20 * 1024 * 1024,
        fieldSize: 20 * 1024 * 1024,
      },
      storage: diskStorage({
        destination: (req, file, callback) => {
          const newDestination = `${process.cwd()}/storage/images`;

          if (!existsSync(newDestination)) {
            mkdirSync(newDestination, { recursive: true });
          }
          callback(null, newDestination);
        },
        filename: editFileName,
      }),
      fileFilter: (req, file, cb) => {
        return imageFileFilter(req, file, cb);
      },
    };
  }
}

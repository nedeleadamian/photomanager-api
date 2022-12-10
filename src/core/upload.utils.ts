import { HttpException, HttpStatus } from '@nestjs/common';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';

export const getStoragePath = (
  suffix: string,
): { shortPath: string; longPath: string } => ({
  shortPath: `${suffix}`,
  longPath: `${process.cwd()}/storage/${suffix}`,
});
export const getStoragePathByUploadTarget = (identifier?: string | number) => {
  return getStoragePath(`user/${identifier || 'storage'}/images`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.mimetype.match(/(image\/)*/i)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const documentFileFilter = (req, file, cb) => {
  if (
    file.mimetype.match(
      /\/(vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.openxmlformats-officedocument.presentationml.presentation|vnd.ms-powerpoint|vnd.ms-excel|msword|vnd.openxmlformats-officedocument.spreadsheetml.sheet|pdf|x-zip-compressed|octet-stream|rar|jpeg|png|xls|xlsx|doc|docx|ppt|pptx)$/i,
    )
  ) {
    // Allow storage of file
    cb(null, true);
  } else {
    // Reject file
    cb(
      new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ),
      false,
    );
  }
};

export const editFileName = (req, file, callback) => {
  // Calling the callback passing the random name generated with the original extension name
  callback(null, `${uuid()}${extname(file.originalname)}`);
};

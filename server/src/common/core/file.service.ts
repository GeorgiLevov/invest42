import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { join, extname } from 'path';
import { v4 } from 'uuid';

@Injectable()
export class FileService {

  static fileLimit(files: number, fileSize: number) {
    return {
      files,
      fileSize,
    };
  }

  static storage(path: string[]) {
    return diskStorage({
      destination: (req, file, cb) => cb(null, join('.', ...path)),
      filename: (req, file, cb) => cb(null, `${v4().replace(/-/g, '')}${extname(file.originalname)}`),
    });
  }

  static fileFilter(req: any, file, cb, ...extensions: string[]) {

    const ext = extname(file.originalname);
    if (!extensions.includes(ext)) {
      return cb(new Error('Extension not allowed'), false);
    }
    return cb(null, true);
  }
}

import { FileInterceptor } from '@nestjs/platform-express';
import { Injectable, mixin, NestInterceptor, Type } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { diskStorage } from 'multer';

interface LocalFilesInterceptorOptions {
  fieldName: string;
  path?: string;
  fileFilter?: any;
  limits?: MulterOptions['limits'];
  userId?: any
}

function LocalFilesInterceptor(options: LocalFilesInterceptorOptions): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;
    constructor() {
      // const filesDestination = configService.get('UPLOADED_FILES_DESTINATION');
      const filesDestination = 'upload-images';

      const destination = `${filesDestination}${options.path}`
      console.log('*******************************', options.fileFilter.userId)
      const multerOptions: MulterOptions = {
        storage: diskStorage({
          destination
        }),
        fileFilter: options.fileFilter.status,
        limits: options.limits
      }

      this.fileInterceptor = new (FileInterceptor(options.fieldName, multerOptions));
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      console.log('&&&&&&&&&&&&&&&&&&&',args)
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default LocalFilesInterceptor;
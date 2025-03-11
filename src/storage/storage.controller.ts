import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile() data: Express.Multer.File,
  ): Promise<{ url: string; blobName: string }> {
    return this.storageService.uploadFile(
      data.buffer,
      data.originalname,
      data.mimetype,
    );
  }
  @Get('download/:blobName')
  downloadFile(@Param('blobName') blobName: string, @Res() res: Response) {
    return this.storageService.getFile(blobName, res);
  }
}

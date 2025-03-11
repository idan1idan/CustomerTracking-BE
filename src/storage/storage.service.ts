import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BlobServiceClient } from '@azure/storage-blob';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class StorageService {
  private blobServiceClient: BlobServiceClient;
  private containerName: string;

  constructor(private readonly configService: ConfigService) {
    console.log(this.configService.get<string>('BLOB_CONNECTION_STRING'));
    console.log(this.configService.get<string>('TRANSACTION_CONTAINER_NAME'));
    const connectionString = this.configService.get<string>(
      'BLOB_CONNECTION_STRING',
    );
    this.containerName = this.configService.get<string>(
      'TRANSACTION_CONTAINER_NAME',
    )!;
    if (!this.containerName) {
      throw new Error('Container name is missing');
    }

    if (!connectionString) {
      throw new Error('Azure Storage connection string is missing');
    }

    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);
  }

  async uploadFile(
    buffer: Buffer,
    filename: string,
    mimetype: string,
  ): Promise<{ url: string; blobName: string }> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(
        this.containerName,
      );
      await containerClient.createIfNotExists();
      const blobName = `${uuidv4()}-${filename}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.uploadData(buffer, {
        blobHTTPHeaders: { blobContentType: mimetype },
      });

      return {
        url: blockBlobClient.url,
        blobName,
      }; // Return file URL
    } catch (error) {
      throw new InternalServerErrorException(
        'Error uploading file to Azure Storage',
      );
    }
  }

  async deleteFile(blobName: string): Promise<boolean> {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(
        this.containerName,
      );
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.deleteIfExists();
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting file from Azure Storage',
      );
    }
  }
  async getFile(blobName: string, res: Response) {
    try {
      const containerClient = this.blobServiceClient.getContainerClient(
        this.containerName,
      );
      const blobClient = containerClient.getBlobClient(blobName);

      const isExists = await blobClient.exists();
      if (!isExists) {
        throw new NotFoundException('File not found');
      }
      // Get blob properties to set content type
      const properties = await blobClient.getProperties();

      // Set appropriate headers
      res.set({
        'Content-Type': properties.contentType || 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${blobName}"`,
        'Content-Length': properties.contentLength,
      });

      // Create read stream from the blob
      const blobReadStream = await blobClient.download();
      if (!blobReadStream.readableStreamBody) {
        throw new InternalServerErrorException(
          'Error downloading file from Azure Storage',
        );
      }
      // Pipe the stream directly to the response
      blobReadStream.readableStreamBody.pipe(res);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error downloading file from Azure Storage',
      );
    }
  }
}

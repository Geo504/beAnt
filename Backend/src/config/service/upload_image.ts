import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { UploadedFile } from 'express-fileupload';
import { v4 as uuidv4 } from 'uuid';



export class FileUploaderService {
  private bucketName: string;
  private region: string;
  private s3Client: S3Client;

  constructor(
    bucketName: string,
    region: string,
    accessKey: string,
    secretKey: string,

  ) {
    this.bucketName = bucketName;
    this.region = region;
    this.s3Client = new S3Client({
      region: region,
      credentials: { 
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
    })
  }

  private handleImageName(url?: string): string {
    const name = url?.split('/').pop();
    return name || `${uuidv4()}.jpeg`;
  }



  async uploadFile(file: UploadedFile, url?: string) {
    const fileName = this.handleImageName(url);
    const fileRoute = `users/${fileName}`;
    const buffer = Buffer.from(file.data);

    const params = {
      Bucket: this.bucketName,
      Key: fileRoute,
      Body: buffer,
      ACL: "public-read" as const,
    };


    try {
      await this.s3Client.send(new PutObjectCommand(params));
      const url = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileRoute}`;
      return url;
      
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
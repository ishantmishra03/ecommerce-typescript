import ImageKit from 'imagekit';
import dotenv from  'dotenv';

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});


export const uploadImage = (file: string, fileName: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    imagekit.upload(
      {
        file, 
        fileName,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result?.url || '');
      }
    );
  });
};

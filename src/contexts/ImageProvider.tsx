import { createContext } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';

export interface IImage {
  cld: Cloudinary;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const ImageContext = createContext<IImage>({} as IImage);

export const ImageProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const cld = new Cloudinary({
    cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME },
  });
  return (
    <ImageContext.Provider
      value={{
        cld,
      }}>
      {children}
    </ImageContext.Provider>
  );
};

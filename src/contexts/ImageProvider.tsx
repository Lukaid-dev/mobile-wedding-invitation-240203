import React, { createContext, useEffect, useState } from 'react';
import { storage } from '../firebase';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

type images = {
  [key: string]: {
    thumbnail: string;
    main: string;
  };
};

export interface IImage {
  images: images;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export const ImageContext = createContext<IImage>({} as IImage);

export const ImageProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [images, setImages] = useState<images>({});

  useEffect(() => {
    const mainRef = ref(storage, '/main');
    const thumbnailRef = ref(storage, '/thumbnail');

    const fetchData = async () => {
      const mainRes = await listAll(mainRef);
      const thumbnailRes = await listAll(thumbnailRef);

      // Fetch main images
      mainRes.items.map(async (item) => {
        const name = item.name.split('_')[1].split('.')[0];
        const url = await getDownloadURL(item);
        setImages((prevImages) => ({
          ...prevImages,
          [name]: {
            ...prevImages[name],
            main: url,
          },
        }));
      });

      // Fetch thumbnail images
      thumbnailRes.items.map(async (item) => {
        const name = item.name.split('_')[1].split('.')[0];
        const url = await getDownloadURL(item);
        setImages((prevImages) => ({
          ...prevImages,
          [name]: {
            ...prevImages[name],
            thumbnail: url,
          },
        }));
      });
    };

    fetchData();
  }, []); // Run only once on mount

  return (
    <ImageContext.Provider value={{ images }}>{children}</ImageContext.Provider>
  );
};

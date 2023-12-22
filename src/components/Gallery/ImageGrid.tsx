import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase';

import spinner from '../../assets/spinner.svg';

type images = {
  [key: string]: {
    thumbnail: string;
    main: string;
  };
};

export default function ImageGrid() {
  const [images, setImages] = useState<images>({});
  const [loading, setLoading] = useState(true);

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

  // 1초뒤에 loading을 false로 바꿔줌
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <div className="flex items-center justify-center">
      <img src={spinner} alt="" className="w-10" />
    </div>
  ) : (
    <div className="grid grid-cols-3 gap-[2px]">
      {Object.keys(images).map((key) => (
        <div key={key} className="aspect-ratio-1/1 relative overflow-hidden">
          <img
            src={images[key].thumbnail}
            alt={`Photo ${key + 1}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

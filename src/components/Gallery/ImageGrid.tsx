import { useEffect, useRef, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../firebase';

import spinner from '../../assets/spinner.svg';
import ImageModal from './ImageModal';

import { images } from '../../types';

export default function ImageGrid() {
  const [loading, setLoading] = useState(true);

  // images
  const [images, setImages] = useState<images>({});
  const [imageKeys, setImageKeys] = useState<string[]>([]);

  // modal
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const modalOverlayRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const modalOutsideClick = (arg: React.MouseEvent<HTMLDivElement>) => {
    if (arg.target === modalOverlayRef.current) {
      closeModal();
    }
  };

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

  useEffect(() => {
    setImageKeys(Object.keys(images));
  }, [images]);

  // 1초뒤에 loading을 false로 바꿔줌
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <div className="flex items-center justify-center">
      <img src={spinner} alt="spinner" className="w-10" />
    </div>
  ) : (
    <>
      <div className="grid grid-cols-3 gap-[2px]">
        {imageKeys.map((key, idx) => (
          <div key={idx} className="aspect-ratio-1/1 relative overflow-hidden">
            <img
              src={images[key].thumbnail}
              alt={`Photo ${idx + 1}`}
              className="h-full w-full object-cover"
              onClick={() => {
                setCurrentImageIdx(idx);
                openModal();
              }}
            />
          </div>
        ))}
      </div>
      {modalOpen && (
        <ImageModal
          images={images}
          imageKeys={imageKeys}
          currentImageIdx={currentImageIdx}
          modalOverlayRef={modalOverlayRef}
          closeModal={closeModal}
          modalOutsideClick={modalOutsideClick}
        />
      )}
    </>
  );
}

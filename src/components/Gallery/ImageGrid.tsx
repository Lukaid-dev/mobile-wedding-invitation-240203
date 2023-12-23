import { useEffect, useRef, useState } from 'react';
import ImageModal from './ImageModal';
import { images } from '../../images';

export default function ImageGrid() {
  // images
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
    setImageKeys(Object.keys(images));
  }, []);

  return (
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

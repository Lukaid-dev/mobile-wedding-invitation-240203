import { ReactNode, useEffect, useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ImageModal from './ImageModal';
import { images } from '../../images';

export default function ImageGrid() {
  // images
  const imageKeys = Object.keys(images).sort((a, b) => Number(a) - Number(b));

  // modal
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const [modalImage, setModalImage] = useState<ReactNode[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const openModal = () => {
    if (!isLoaded) {
      toast('이미지를 불러오는 중이에요!', {
        position: 'bottom-center',
        icon: '🤵❤️👰‍♀️',
      });
    }
    setModalOpen(true);
    // 모달이 열렸을 때, 스크롤을 막아준다.
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    // 모달이 닫혔을 때, 스크롤을 허용한다.
    document.body.style.overflow = 'auto';
  };

  const modalOutsideClick = (arg: React.MouseEvent<HTMLDivElement>) => {
    if (arg.target === modalOverlayRef.current) {
      closeModal();
    }
  };

  // modal에서 사용될 이미지들 미리 로딩
  useEffect(() => {
    let loadCount = 0;

    const imageLists: ReactNode[] = imageKeys.map((key, idx) => (
      <div key={idx} className={`flex w-[100vw] justify-center`}>
        <img
          src={images[key].main}
          className="sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2"
          alt={`Photo ${idx + 1}`}
          onLoad={() => {
            loadCount++;
            if (loadCount === imageKeys.length) {
              toast('이미지 로딩 완료!', {
                position: 'bottom-center',
                icon: '💍',
              });
              setIsLoaded(true);
            }
          }}
        />
      </div>
    ));
    setModalImage(imageLists);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          images={modalImage}
          imageKeys={imageKeys}
          currentImageIdx={currentImageIdx}
          modalOverlayRef={modalOverlayRef}
          closeModal={closeModal}
          modalOutsideClick={modalOutsideClick}
        />
      )}
      <Toaster />
    </>
  );
}

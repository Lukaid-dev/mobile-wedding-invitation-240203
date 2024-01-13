import { ReactNode, TouchEventHandler, useState } from 'react';

import x from '../../assets/x.svg';
import chevronLeft from '../../assets/chevronLeft.png';
import chevronRight from '../../assets/chevronRight.png';

interface ImageModalProps {
  images: ReactNode[];
  imageKeys: string[];
  currentImageIdx: number;
  modalOverlayRef: React.RefObject<HTMLDivElement>;
  closeModal: () => void;
  modalOutsideClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const moveStyle: { [key: number]: string } = {
  0: 'translate-x-[950vw]',
  1: 'translate-x-[850vw]',
  2: 'translate-x-[750vw]',
  3: 'translate-x-[650vw]',
  4: 'translate-x-[550vw]',
  5: 'translate-x-[450vw]',
  6: 'translate-x-[350vw]',
  7: 'translate-x-[250vw]',
  8: 'translate-x-[150vw]',
  9: 'translate-x-[50vw]',
  10: 'translate-x-[-50vw]',
  11: 'translate-x-[-150vw]',
  12: 'translate-x-[-250vw]',
  13: 'translate-x-[-350vw]',
  14: 'translate-x-[-450vw]',
  15: 'translate-x-[-550vw]',
  16: 'translate-x-[-650vw]',
  17: 'translate-x-[-750vw]',
  18: 'translate-x-[-850vw]',
  19: 'translate-x-[-950vw]',
};

export default function ImageModal({
  images,
  imageKeys,
  currentImageIdx,
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
}: ImageModalProps) {
  const [touchX, setTouchX] = useState(0);

  const [currIndex, setCurrIndex] = useState(currentImageIdx);

  const nextHandler = () => {
    if (currIndex === imageKeys.length - 1) {
      setCurrIndex(0);
    } else {
      setCurrIndex(currIndex + 1);
    }
  };

  const prevHandler = () => {
    if (currIndex === 0) {
      setCurrIndex(imageKeys.length - 1);
    } else {
      setCurrIndex(currIndex - 1);
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    setTouchX(e.changedTouches[0].pageX);
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const distanceX = touchX - e.changedTouches[0].pageX;

    if (distanceX > 0) {
      nextHandler();
    } else {
      prevHandler();
    }
  };

  return (
    <div
      ref={modalOverlayRef}
      onClick={modalOutsideClick}
      className="fixed inset-0 z-50 flex h-[100vh] items-center justify-center bg-black/50"
      style={{
        backdropFilter: 'blur(2px)',
        WebkitBackdropFilter: 'blur(2px)',
      }}>
      <img
        src={x}
        className="absolute right-5 top-5 z-[100] h-8 w-8"
        onClick={closeModal}
      />
      <div
        className={`flex items-center transition duration-500 ease-in-out ${moveStyle[currIndex]}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}>
        {images}
      </div>
      <button
        onClick={nextHandler}
        className="absolute right-1 flex h-[2rem] w-[2rem] items-center justify-center">
        <img src={chevronRight} className="h-[2.5rem]" />
      </button>
      <button
        onClick={prevHandler}
        className="absolute left-1 flex h-[2rem] w-[2rem] items-center justify-center">
        <img src={chevronLeft} className="h-[2.5rem]" />
      </button>
    </div>
  );
}

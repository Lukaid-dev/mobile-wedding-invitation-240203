import { ReactNode, TouchEventHandler, useState } from 'react';

// import { imagesType } from '../../types';
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
  0: 'translate-x-[1000vw]',
  1: 'translate-x-[900vw]',
  2: 'translate-x-[800vw]',
  3: 'translate-x-[700vw]',
  4: 'translate-x-[600vw]',
  5: 'translate-x-[500vw]',
  6: 'translate-x-[400vw]',
  7: 'translate-x-[300vw]',
  8: 'translate-x-[200vw]',
  9: 'translate-x-[100vw]',
  10: 'translate-x-0',
  11: 'translate-x-[-100vw]',
  12: 'translate-x-[-200vw]',
  13: 'translate-x-[-300vw]',
  14: 'translate-x-[-400vw]',
  15: 'translate-x-[-500vw]',
  16: 'translate-x-[-600vw]',
  17: 'translate-x-[-700vw]',
  18: 'translate-x-[-800vw]',
  19: 'translate-x-[-900vw]',
  20: 'translate-x-[-1000vw]',
};

export default function ImageModal({
  images,
  imageKeys,
  currentImageIdx,
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
}: ImageModalProps) {
  let touchStartX: number;
  let touchEndX: number;

  const [currIndex, setCurrIndex] = useState(currentImageIdx);

  const nextHandler = () => {
    console.log(currIndex);
    if (currIndex === imageKeys.length - 1) {
      setCurrIndex(0);
    } else {
      setCurrIndex(currIndex + 1);
    }
  };

  const prevHandler = () => {
    console.log(currIndex);

    if (currIndex === 0) {
      setCurrIndex(imageKeys.length - 1);
    } else {
      setCurrIndex(currIndex - 1);
    }
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (e) => {
    touchStartX = e.nativeEvent.touches[0].clientX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    touchEndX = e.nativeEvent.changedTouches[0].clientX;

    if (touchStartX >= touchEndX) {
      nextHandler();
    } else {
      prevHandler();
    }
  };

  return (
    <div
      ref={modalOverlayRef}
      onClick={modalOutsideClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
        className={`flex  items-center transition duration-500 ease-in-out ${moveStyle[currIndex]}`}>
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

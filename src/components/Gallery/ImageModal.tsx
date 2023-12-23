// import { useState } from 'react';

import { imagesType } from '../../types';
import x from '../../assets/x.svg';
// import chevronLeft from '../../assets/chevronLeft.png';
// import chevronRight from '../../assets/chevronRight.png';

interface ImageModalProps {
  images: imagesType;
  imageKeys: string[];
  currentImageIdx: number;
  modalOverlayRef: React.RefObject<HTMLDivElement>;
  closeModal: () => void;
  modalOutsideClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

// const moveStyle: { [key: number]: string } = {
//   0: 'translate-x-0',
//   1: 'translate-x-[-100vw]',
//   2: 'translate-x-[-200vw]',
//   3: 'translate-x-[-300vw]',
//   4: 'translate-x-[-400vw]',
//   5: 'translate-x-[-500vw]',
//   6: 'translate-x-[-600vw]',
//   7: 'translate-x-[-700vw]',
//   8: 'translate-x-[-800vw]',
//   9: 'translate-x-[-900vw]',
//   10: 'translate-x-[-1000vw]',
//   11: 'translate-x-[-1100vw]',
//   12: 'translate-x-[-1200vw]',
//   13: 'translate-x-[-1300vw]',
//   14: 'translate-x-[-1400vw]',
//   15: 'translate-x-[-1500vw]',
//   16: 'translate-x-[-1600vw]',
//   17: 'translate-x-[-1700vw]',
//   18: 'translate-x-[-1800vw]',
//   19: 'translate-x-[-1900vw]',
//   20: 'translate-x-[-2000vw]',
// };

export default function ImageModal({
  images,
  imageKeys,
  currentImageIdx,
  modalOverlayRef,
  closeModal,
  modalOutsideClick,
}: ImageModalProps) {
  // const [keyIdx, setKeyIdx] = useState(currentImageIdx);

  // const nextHandler = () => {
  //   console.log(keyIdx);
  //   if (keyIdx === imageKeys.length - 1) {
  //     setKeyIdx(0);
  //   } else {
  //     setKeyIdx(keyIdx + 1);
  //   }
  // };

  // const prevHandler = () => {
  //   console.log(keyIdx);

  //   if (keyIdx === 0) {
  //     setKeyIdx(imageKeys.length - 1);
  //   } else {
  //     setKeyIdx(keyIdx - 1);
  //   }
  // };

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
      {/* <div
        className={`flex max-h-[60%] items-center transition duration-1000 ease-in-out ${moveStyle[keyIdx]}`}>
        {imageKeys.map((_, idx) => {
          console.log(idx);
          return (
            <div key={idx} className="flex w-[100vw] justify-center">
              <img
                src={images[imageKeys[keyIdx]].main}
                className="w-[80vw]"
                alt={`Photo ${keyIdx + 1}`}
              />
            </div>
          );
        })}
      </div>
      <button
        onClick={nextHandler}
        className="bg-black-10 absolute right-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full opacity-50">
        <img src={chevronRight} className="stroke-black-50 h-[2.5rem]" />
      </button>
      <button
        onClick={prevHandler}
        className="bg-black-10 absolute left-4 flex h-[4rem] w-[4rem] items-center justify-center rounded-full opacity-50">
        <img src={chevronLeft} className="stroke-black-50 h-[2.5rem]" />
      </button>
      <ul className="absolute bottom-20 flex w-full justify-center gap-[2px]">
        {imageKeys.map((_, idx) => (
          <li
            key={idx}
            className={`h-[8px] w-[8px] rounded-full bg-white ${
              idx === keyIdx ? 'opacity-100' : 'opacity-50'
            }`}
            onClick={() => setKeyIdx(idx)}
          />
        ))}
      </ul> */}
      <div className="flex">
        <img
          src={images[imageKeys[currentImageIdx]].main}
          alt={`Photo ${currentImageIdx + 1}`}
        />
      </div>
    </div>
  );
}

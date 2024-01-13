import { useEffect, useState } from 'react';
import dotsThree from '../../assets/dotsThree.svg';
import timeBefore from '../../utils/timeBefore';

type CardProps = {
  name: string;
  text: string;
  createdAt: string;
  id: string;
  openModal: (id: string) => void;
};

export default function Card({
  name,
  text,
  createdAt,
  id,
  openModal,
}: CardProps) {
  const [ellipsis, setEllipsis] = useState(false);

  const handleClick = () => {
    setEllipsis(!ellipsis);
  };

  const renderText = () => {
    if (ellipsis) {
      return (
        <div className="flex">
          <p
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
            {text}
          </p>
        </div>
      );
    } else {
      return <p>{text}</p>;
    }
  };

  useEffect(() => {
    if (text?.length > 100) {
      setEllipsis(true);
    }
  }, [text]);

  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <p className="font-bold">{name}</p>·
          <p className="text-sm">{timeBefore(createdAt)}</p>
        </div>
        <img
          src={dotsThree}
          alt="dotsThree"
          className="w-6"
          onClick={() => openModal(id)}
        />
      </div>
      {renderText()}
      {ellipsis && (
        <div className=" flex justify-start">
          <button className="text-sm text-gray-400" onClick={handleClick}>
            더보기
          </button>
        </div>
      )}
    </div>
  );
}

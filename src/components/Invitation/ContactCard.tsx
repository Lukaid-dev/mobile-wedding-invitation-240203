import phone from '../../assets/phone.svg';
import chat from '../../assets/chat.svg';
import { who } from '../../types';
import { useEffect, useState } from 'react';

export default function ContactCard({ name, who }: { name: string; who: who }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  const call = (who: who) => {
    if (isMobile) {
      switch (who) {
        case 'groom':
          window.open(`tel:${import.meta.env.VITE_GROOM_PHONE}`);
          break;
        case 'bride':
          window.open(`tel:${import.meta.env.VITE_BRIDE_PHONE}`);
          break;
        case 'choi':
          window.open(`tel:${import.meta.env.VITE_CHOI_PHONE}`);
          break;
        case 'park':
          window.open(`tel:${import.meta.env.VITE_PARK_PHONE}`);
          break;
        case 'moon':
          window.open(`tel:${import.meta.env.VITE_MOON_PHONE}`);
          break;
      }
    } else {
      alert('모바일에서만 가능합니다.');
    }
  };

  const message = (who: who) => {
    if (isMobile) {
      switch (who) {
        case 'groom':
          window.open(`sms:${import.meta.env.VITE_GROOM_PHONE}`);
          break;
        case 'bride':
          window.open(`sms:${import.meta.env.VITE_BRIDE_PHONE}`);
          break;
        case 'choi':
          window.open(`sms:${import.meta.env.VITE_CHOI_PHONE}`);
          break;
        case 'park':
          window.open(`sms:${import.meta.env.VITE_PARK_PHONE}`);
          break;
        case 'moon':
          window.open(`sms:${import.meta.env.VITE_MOON_PHONE}`);
          break;
      }
    } else {
      alert('모바일에서만 가능합니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 ">
      <div>{name} 연락하기</div>
      <div className="flex gap-4">
        <div className="flex flex-col items-center justify-center gap-1">
          <div
            className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
            onClick={() => {
              call(who);
            }}>
            <img src={phone} alt="Phone" className="w-[28px]" />
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '19.5px',
            }}>
            통화하기
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div
            className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
            onClick={() => {
              message(who);
            }}>
            <img src={chat} alt="Chat" className="w-[28px]" />
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '19.5px',
            }}>
            문자하기
          </div>
        </div>
      </div>
    </div>
  );
}

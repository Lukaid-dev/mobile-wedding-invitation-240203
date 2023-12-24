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
          window.open(`tel:${import.meta.env.VITE_PHONE_GROOM}`);
          break;
        case 'bride':
          window.open(`tel:${import.meta.env.VITE_PHONE_BRIDE}`);
          break;
        case 'choi':
          window.open(`tel:${import.meta.env.VITE_PHONE_CHOI}`);
          break;
        case 'park':
          window.open(`tel:${import.meta.env.VITE_PHONE_PARK}`);
          break;
        case 'moon':
          window.open(`tel:${import.meta.env.VITE_PHONE_MOON}`);
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
          window.open(`sms:${import.meta.env.VITE_PHONE_GROOM}`);
          break;
        case 'bride':
          window.open(`sms:${import.meta.env.VITE_PHONE_BRIDE}`);
          break;
        case 'choi':
          window.open(`sms:${import.meta.env.VITE_PHONE_CHOI}`);
          break;
        case 'park':
          window.open(`sms:${import.meta.env.VITE_PHONE_PARK}`);
          break;
        case 'moon':
          window.open(`sms:${import.meta.env.VITE_PHONE_MOON}`);
          break;
      }
    } else {
      alert('모바일에서만 가능합니다.');
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 ">
      <div className="flex w-[50%] justify-end">{name} 연락하기</div>
      <div className="flex w-[50%] justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-1">
          <div
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
            onClick={() => {
              call(who);
            }}>
            <img src={phone} alt="Phone" className="w-[16px]" />
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '19.5px',
            }}></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <div
            className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
            onClick={() => {
              message(who);
            }}>
            <img src={chat} alt="Chat" className="w-[16px]" />
          </div>
          <div
            className="font-sans"
            style={{
              fontSize: '13px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '19.5px',
            }}></div>
        </div>
      </div>
    </div>
  );
}

import Box from './Box';
import phone from '../../assets/phone.svg';
import chat from '../../assets/chat.svg';
import { useEffect, useState } from 'react';

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);
  console.log(navigator.userAgent);

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  function callGroom() {
    if (isMobile) {
      window.open('tel:010-5511-3288');
    } else {
      alert('모바일에서만 가능합니다.');
    }
  }

  function messageGroom() {
    if (isMobile) {
      window.open('sms:010-5511-3288');
    } else {
      alert('모바일에서만 가능합니다.');
    }
  }

  function callBride() {
    if (isMobile) {
      window.open('tel:010-9056-4904');
    } else {
      alert('모바일에서만 가능합니다.');
    }
  }

  function messageBride() {
    if (isMobile) {
      window.open('sms:010-9056-4904');
    } else {
      alert('모바일에서만 가능합니다.');
    }
  }

  return (
    <Box title="연락처">
      <div className="mt-6 flex w-full justify-around">
        <div className="flex flex-col items-center justify-center gap-4 ">
          <div>신랑 연락하기</div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <div
                className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
                onClick={callGroom}>
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
                onClick={messageGroom}>
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
        <div className="flex flex-col items-center justify-center gap-4 ">
          <div>신부 연락하기</div>
          <div className="flex gap-4">
            <div className="flex flex-col items-center justify-center gap-1">
              <div
                className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-gray-50 hover:bg-gray-200"
                onClick={callBride}>
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
                onClick={messageBride}>
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
      </div>
    </Box>
  );
}

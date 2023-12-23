import { useEffect, useState } from 'react';
import NextButton from '../components/NextButton';
import Divider from '../components/Divider';

import main from '../assets/main.png';

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);

  const dDay = new Date('2024-02-03T00:00:00+09:00');
  const today = new Date();
  const diff = Math.ceil(
    (dDay.getTime() - today.getTime()) / (1000 * 3600 * 24),
  );

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 16 * 4;
      setHeight(window.innerHeight - headerHeight);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      id="home-page"
      className="relative flex flex-col items-center"
      style={{
        backgroundImage: `url(${main})`,
        backgroundSize: '90% auto',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        height: `${height}px`,
      }}>
      <div className="mt-4 flex flex-col items-center">
        <span className="text-center font-batang text-xl text-gray-900">
          초대합니다
        </span>
        <span className="mb-4 mt-2 text-center font-batang text-sm">
          우리라는 이름으로 걸어가는 첫걸음,
          <br />
          소중한 분들을 모십니다
        </span>
        <Divider />
        <span
          className="mt-4"
          style={{
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '19px',
          }}>
          월드컵 컨벤션
        </span>
        <span
          style={{
            marginTop: '4px',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '19px',
          }}>
          2024년 2월 3일 오후 3시 20분
        </span>
        <span
          style={{
            color: 'red',
            marginTop: '4px',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '19px',
          }}>
          D-{diff}
        </span>
      </div>
      <NextButton to="/Invitation" text="청첩장 보러가기" />
    </div>
  );
}

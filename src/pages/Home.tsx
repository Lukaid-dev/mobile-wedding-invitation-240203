import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import NextButton from '../components/NextButton';

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);

  const url = useLoaderData() as string;

  const dDay = new Date('2024-02-03T15:20:00+09:00');
  const today = new Date();
  // 며칠 남았는지 계산
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
      className="relative flex flex-col items-center "
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        height: `${height}px`,
      }}>
      <div className="mt-4 flex flex-col items-center">
        <span className="text-center font-batang text-xl text-gray-900">
          초대합니다
        </span>
        <span className="mt-2 text-center font-batang text-sm">
          부부라는 이름으로 서로의 곁에서
          <br />
          언제나 함께 하겠습니다
        </span>
        {/* TODO: 배경 색 바꾸고 여기 색도 바꿔야 함 */}
        <div className="mx-auto my-4 h-[1px] w-2/3 bg-gray-400" />
        <span
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

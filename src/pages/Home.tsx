import { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);

  const url = useLoaderData() as string;

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 16 * 4;
      setHeight(window.innerHeight - headerHeight);
    };
    // 최초 렌더링 시와 윈도우 리사이즈 시에 높이를 업데이트합니다.
    updateHeight();
    window.addEventListener('resize', updateHeight);

    // 컴포넌트가 언마운트되면 리스너를 정리합니다.
    return () => {
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <>
      <div
        className="animate-fadeInOut relative flex flex-col items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${url})`,
          height: `${height}px`,
        }}>
        <span className="text-center text-2xl text-white">
          SeongWoo <br /> & <br /> Yeju
        </span>

        <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-white to-transparent"></div>

        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white"></div>
        <div className="absolute bottom-0 flex w-full flex-col items-center justify-center">
          <span className="text-xl">성우와 예주</span>
          <span className="text-center">
            부부라는 이름으로 서로의 곁에서
            <br />
            언제나 함께 하겠습니다
          </span>
          <Link
            to="/Invitation"
            className="my-2 flex w-[80%] justify-center rounded-full bg-orange-400 py-2 font-bold text-white">
            청첩장 보러가기
          </Link>
        </div>
      </div>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import NextButton from '../components/NextButton';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase';
import Divider from '../components/Divider';

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);

  const url = useLoaderData();

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

  useEffect(() => {
    const loadImage = async () => {
      try {
        const imageRef = ref(storage, 'background_image.png');
        const url = await getDownloadURL(imageRef);

        const image = new Image();
        image.src = url as string;
        document
          .getElementById('home-page')
          ?.style.setProperty('background-image', `url(${url})`);
      } catch (error) {
        new Error(error as string);
      }
    };
    loadImage();
  }, []);

  return (
    <div
      id="home-page"
      className="relative flex flex-col items-center"
      style={{
        backgroundImage: `url(${url})`,
        backgroundSize: '100% auto',
        backgroundPosition: 'bottom',
        backgroundRepeat: 'no-repeat',
        height: `${height}px`,
        transition: 'background-image 0.5s ease-in-out',
      }}>
      <div className="mt-4 flex flex-col items-center">
        <span className="text-center font-batang text-xl text-gray-900">
          초대합니다
        </span>
        <span className="mb-4 mt-2 text-center font-batang text-sm">
          부부라는 이름으로 서로의 곁에서
          <br />
          언제나 함께 하겠습니다
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

export const loader = async (): Promise<string> => {
  try {
    const imageRef = ref(storage, 'main.png');
    const url = await getDownloadURL(imageRef);
    console.log(url);
    return url;
  } catch (error) {
    console.error(error);
    return '';
  }
};

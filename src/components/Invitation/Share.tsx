import { useEffect } from 'react';
import kakaoLogo from '../../assets/kakao.svg';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Kakao: any;
  }
}

const { Kakao } = window;

const Share = () => {
  const url = 'https://wedding-invitation-240203.web.app/Home';

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);
  }, []);

  const shareKakao = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: '성우 ❤️ 예주 결혼합니다.',
        description: '2024. 02. 03. 15:20',
        imageUrl:
          'https://res.cloudinary.com/dxahuoqco/image/upload/v1703169023/cdnhvump79tmoh6x5gga.png',
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '청첩장 보러가기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <div className="flex w-full gap-2">
      <div
        className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-yellow"
        onClick={() => {
          shareKakao();
        }}>
        <img src={kakaoLogo} alt="kakaoLogo" className="h-6" />
        <div>카카오톡 공유하기</div>
      </div>
    </div>
  );
};

export default Share;

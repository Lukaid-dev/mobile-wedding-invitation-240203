import { useEffect } from 'react';
import github from '../../assets/github.png';
import kakaoLogo from '../../assets/kakao.svg';
// kakao 기능 동작을 위해 넣어준다.
const { Kakao } = window;

const Share = () => {
  const url = 'https://wedding-invitation-240203.web.app/Home';
  const githubUrl =
    'https://github.com/Lukaid-dev/mobile-wedding-invitation-240203';

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
        className="flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-yellow"
        onClick={() => {
          shareKakao();
        }}>
        <img src={kakaoLogo} alt="kakaoLogo" className="h-6" />
      </div>
      <div
        className="flex h-10 w-full items-center justify-center rounded-lg border"
        onClick={() => {
          window.open(githubUrl);
        }}>
        <img src={github} alt="github" className="h-6" />
      </div>
    </div>
  );
};

export default Share;

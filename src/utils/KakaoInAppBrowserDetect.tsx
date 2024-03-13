import { PropsWithChildren } from 'react';
import useKakaoInAppBrowserDetect from '../hooks/useKakaoInAppBrowserDetect';
import { useEffect } from 'react';

const KakaoInAppBrowserDetect: React.FC<PropsWithChildren> = ({ children }) => {
  const { isKakaoInAppBrowser, moveOtherBrowser } =
    useKakaoInAppBrowserDetect();

  useEffect(() => {
    if (isKakaoInAppBrowser) moveOtherBrowser();
  }, [isKakaoInAppBrowser, moveOtherBrowser]);

  if (isKakaoInAppBrowser)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          카카오 인앱 브라우저에서는 정상적으로 작동하지 않습니다. <br /> 외부
          브라우저로 이동합니다.
        </div>
        <button
          className="mx-4 mb-8 flex w-full items-center justify-center rounded-lg bg-gray-400 py-4"
          onClick={moveOtherBrowser}>
          브라우저에서 열기
        </button>
      </div>
    );
  else return <>{children}</>;
};

export default KakaoInAppBrowserDetect;

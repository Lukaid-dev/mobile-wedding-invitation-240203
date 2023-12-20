import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';

import KakaoInAppBrowserDetect from './KakaoInAppBrowserDetect';
import { useEffect, useState } from 'react';

function App() {
  const [bg, setBg] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/Home') {
      setBg(`bg-gradient-to-b from-bg_from to-bg_to mix-blend-overlay`);
    } else {
      setBg(`bg-white`);
    }
  }, [location.pathname]);

  return (
    <KakaoInAppBrowserDetect>
      <div className="flex items-center justify-center">
        <div className={`w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 ${bg}`}>
          <Header />
          <Outlet />
        </div>
      </div>
    </KakaoInAppBrowserDetect>
  );
}

export default App;

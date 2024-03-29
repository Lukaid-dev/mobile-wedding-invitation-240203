import { Outlet, useLocation } from 'react-router-dom';
import Header from './header/Header';

import KakaoInAppBrowserDetect from './utils/KakaoInAppBrowserDetect';
import { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/api';

function App() {
  const [bg, setBg] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/Home') {
      setBg(`bg-gradient-to-b from-bg_from to-bg_to`);
    } else {
      setBg(`bg-white`);
    }
  }, [location.pathname]);

  return (
    <KakaoInAppBrowserDetect>
      <div className="flex items-center justify-center">
        <div className={`w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 ${bg}`}>
          <Header />
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </div>
      </div>
    </KakaoInAppBrowserDetect>
  );
}

export default App;

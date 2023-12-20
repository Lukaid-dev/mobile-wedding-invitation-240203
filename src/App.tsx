import { Outlet } from 'react-router-dom';
import Header from './header/Header';

function App() {
  // router에 따라 css를 다르게 적용해야 함

  return (
    <div className="flex items-center justify-center">
      <div className="w-full bg-gradient-to-b from-bg_from to-bg_to mix-blend-overlay sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;

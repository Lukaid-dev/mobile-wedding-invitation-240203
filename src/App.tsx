import { Outlet } from 'react-router-dom';
import Header from './header/Header';

function App() {
  return (
    <div className="flex items-center justify-center ">
      <div className="from-bg w-full bg-gradient-to-b to-white mix-blend-overlay sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './header/Header';

function App() {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default App;

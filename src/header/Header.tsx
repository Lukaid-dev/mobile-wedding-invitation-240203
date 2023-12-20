import { NavTabs } from './NavTabs';
import heartWhite from '../assets/heart_white.svg';
import heartRed from '../assets/heart_red.svg';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const [textColor, setTextColor] = useState('text-white');
  const [heart, setHeart] = useState(heartWhite);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/Home') {
      setTextColor('text-white');
      setHeart(heartWhite);
    } else {
      setTextColor('text-black');
      setHeart(heartRed);
    }
  }, [location.pathname]);

  return (
    <div className="flex flex-col">
      <header className="my-1 flex h-[1.5rem] w-full items-center justify-center">
        <div className={`flex items-center font-batang text-base ${textColor}`}>
          <span>성우</span>
          <img src={heart} alt="Heart" className="mx-2 h-3 w-3" />
          <span>예주</span>
        </div>
      </header>
      <NavTabs />
    </div>
  );
}

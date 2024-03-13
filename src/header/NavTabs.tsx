import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { INavItem } from '../utils/types';

const navList: INavItem[] = [
  {
    url: 'Home',
    title: '초대합니다',
  },
  {
    url: 'Invitation',
    title: '청첩장',
  },
  {
    url: 'Gallery',
    title: '사진',
  },
  {
    url: 'Guestbook',
    title: '방명록',
  },
];

const getCurrentIndex = (pathname: string) => {
  const path = pathname.split('/')[1];
  const index = navList.findIndex((item) => item.url === path);
  return index === -1 ? 0 : index;
};

export function NavTabs() {
  const location = useLocation();
  const [textColor, setTextColor] = useState('text-white');
  const [borderColor, setBorderColor] = useState('border-white');
  const [currentIndex, setCurrentIndex] = useState(
    getCurrentIndex(location.pathname),
  );

  useEffect(() => {
    setCurrentIndex(getCurrentIndex(location.pathname));
    window.scrollTo(0, 0);

    if (location.pathname === '/Home') {
      setTextColor('text-white');
      setBorderColor('border-white');
    } else {
      setTextColor('text-gray-400');
      setBorderColor('border-gray-400');
    }
  }, [location.pathname]);

  return (
    <nav className="relative h-[2rem]">
      <ul
        className={`flex items-center justify-center border-b-2 ${borderColor}`}>
        {navList.map((item) => (
          <li
            className={`relative flex cursor-pointer items-center justify-center ${
              item.url === location.pathname.split('/')[1]
                ? 'text-red'
                : textColor
            } w-[25%]`}
            key={item.title}>
            <Link to={item.url} className="w-full text-center">
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <span
        className={`absolute w-[25%] duration-1000 ease-in-out `}
        style={{
          transform: `translateX(${currentIndex * 100}%)`,
        }}>
        <div className="absolute bottom-0 h-[2px] w-full bg-red" />
      </span>
    </nav>
  );
}

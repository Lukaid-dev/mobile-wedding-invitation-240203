import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { INavItem } from '../types';

const navList: INavItem[] = [
  {
    url: 'Home',
    title: '홈',
  },
  {
    url: 'Invitation',
    title: '청첩장',
  },
  {
    url: 'Gallery',
    title: '사진첩',
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
  const [currentIndex, setCurrentIndex] = useState(
    getCurrentIndex(location.pathname),
  );

  useEffect(() => {
    setCurrentIndex(getCurrentIndex(location.pathname));
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className="relative h-[2rem]">
      <ul className="flex items-center justify-center border-b-2 border-white">
        {navList.map((item) => (
          <li
            className={`relative flex cursor-pointer items-center justify-center ${
              item.url === location.pathname.split('/')[1]
                ? 'text-red'
                : 'text-white'
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

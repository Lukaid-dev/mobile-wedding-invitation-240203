import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { INavItem } from "./types";

const navList: INavItem[] = [
  {
    url: "Home",
    title: "홈",
  },
  {
    url: "Invitation",
    title: "청첩장",
  },
  {
    url: "Gallery",
    title: "사진첩",
  },
  {
    url: "Guestbook",
    title: "방명록",
  },
];

const getCurrentIndex = (pathname: string) => {
  const path = pathname.split("/")[1];
  const index = navList.findIndex((item) => item.url === path);
  return index === -1 ? 0 : index;
};

export function NavTabs() {
  const location = useLocation();
  const [currentIndex, setCurrentIndex] = useState(
    getCurrentIndex(location.pathname)
  );

  useEffect(() => {
    setCurrentIndex(getCurrentIndex(location.pathname));
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav className="h-[2rem]">
      <ul className="flex justify-center align-middle">
        {navList.map((item) => (
          <li
            className={`relative flex justify-center align-middle cursor-pointer ${
              item.url === location.pathname.split("/")[1]
                ? "text-red-500"
                : "text-gray-500"
            } w-[25%]`}
            key={item.title}
          >
            <Link
              to={item.url}
              className="flex justify-center"
              // onClick={() => {
              //   setCurrentIndex(getCurrentIndex(item.url));
              // }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <span
        className={`absolute bg-gray-300 duration-500 ease-in-out w-[25%] h-[2px]`}
        style={{
          transform: `translateX(${currentIndex * 100}%)`,
        }}
      />
    </nav>
  );
}

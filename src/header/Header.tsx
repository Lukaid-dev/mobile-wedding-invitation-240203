import { NavTabs } from './NavTabs';
import heart from '../assets/heart_white.svg';

export default function Header() {
  return (
    <div className="flex flex-col">
      <header className="my-1 flex h-[1.5rem] w-full items-center justify-center">
        <div className="flex items-center">
          <span className="font-batang text-base text-white">성우</span>
          <img src={heart} alt="Heart" className="mx-2 h-3 w-3" />
          <span className="font-batang text-base text-white">예주</span>
        </div>
      </header>
      <NavTabs />
    </div>
  );
}

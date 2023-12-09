import { NavTabs } from './NavTabs';

export default function Header() {
  return (
    <div className="flex flex-col">
      <header className="my-1 flex h-[2rem] w-full items-center justify-center">
        <div className=""> 성우 ❤️ 예주 </div>
      </header>
      <NavTabs />
    </div>
  );
}

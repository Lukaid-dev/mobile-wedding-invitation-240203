import { Link, useLocation } from 'react-router-dom';

export default function NextButton({
  to,
  text,
  textColor = 'text-black',
  bg = 'bg-white',
}: {
  to: string;
  text: string;
  textColor?: string;
  bg?: string;
}) {
  const location = useLocation();
  const isInvitation = location.pathname === '/Invitation';

  return (
    <Link
      to={to}
      className={`${
        isInvitation ? 'relative' : 'absolute'
      } mb-8 flex w-full items-center justify-center rounded-lg ${bg} ${textColor} py-4 font-bold`}
      style={{
        width: isInvitation ? '100%' : 'calc(100% - (2 * 1rem))', // 1rem is the left and right margin (mx-4)
        bottom: isInvitation ? '0' : '1rem',
      }}>
      {text}
    </Link>
  );
}

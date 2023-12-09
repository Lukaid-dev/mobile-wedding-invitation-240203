import { Link } from 'react-router-dom';

export default function NextButton({ to, text }: { to: string; text: string }) {
  return (
    <Link
      to={to}
      className="mx-4 mb-8 flex w-full items-center justify-center rounded-lg bg-orange-400 py-4"
      style={{
        width: 'calc(100% - 2 * 1rem)', // 1rem is the left and right margin (mx-4)
        marginLeft: '1rem',
        marginRight: '1rem',
      }}>
      {text}
    </Link>
  );
}
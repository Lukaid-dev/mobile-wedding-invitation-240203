import { Link } from 'react-router-dom';

export default function NextButton({ to, text }: { to: string; text: string }) {
  return (
    <Link
      to={to}
      className="absolute mx-4 mb-8 flex w-full items-center justify-center rounded-lg bg-white py-4"
      style={{
        width: 'calc(100% - 2 * 1rem)', // 1rem is the left and right margin (mx-4)
        marginLeft: '1rem',
        marginRight: '1rem',
        bottom: '32px',
      }}>
      {text}
    </Link>
  );
}

import Divider from '../../components/Divider';

export default function Calendar({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-center rounded-lg border border-gray-200 p-6 font-batang">
      <p className="mb-[10px] font-bold">{title}</p>
      <Divider />
      {children}
    </div>
  );
}

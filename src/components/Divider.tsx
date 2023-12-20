export default function Divider({ width = 'w-2/3' }: { width?: string }) {
  return <div className={`mx-auto h-[1px] ${width} bg-gray-200`} />;
}

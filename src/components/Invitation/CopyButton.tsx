import copy from '../../assets/copy.svg';

export default function CopyButton() {
  return (
    <div className="flex h-10 w-full items-center justify-center gap-1 rounded-lg border border-gray-400">
      <img src={copy} alt="copy" className="h-5" />
      <p className="font-bold">복사</p>
    </div>
  );
}

import toast, { Toaster } from 'react-hot-toast';
import copy from '../../assets/copy.svg';

type Bank = 'toss' | 'woori' | 'hana' | 'nh';

export default function CopyButton({ bank }: { bank: Bank }) {
  const bankAccounts: { [K in Bank]: string } = {
    toss: '1000-6586-0069',
    woori: '1002-943-618487',
    hana: '287-910593-11307',
    nh: '352-1737-6288-23',
  };

  const bankNames: { [K in Bank]: string } = {
    toss: '토스뱅크',
    woori: '우리은행',
    hana: '하나은행',
    nh: '농협은행',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('계좌번호가 복사되었습니다.');
  };

  return (
    <div
      className="flex h-10 w-full items-center justify-center gap-1 rounded-lg border border-gray-400"
      onClick={() => {
        copyToClipboard(`${bankNames[bank]} ${bankAccounts[bank]}`);
      }}>
      <img src={copy} alt="copy" className="h-5" />
      <p className="font-bold">복사</p>
      <Toaster position="bottom-center" />
    </div>
  );
}

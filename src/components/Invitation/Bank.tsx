import CopyButton from '../CopyButton';
import Divider from '../Divider';
import KPButton from '../KPButton';
import Box from './Box';

export default function Bank() {
  return (
    <Box title="마음 전하실 곳">
      <div className="my-[26px] flex w-full flex-col gap-4 font-sans">
        <div className="flex w-full">
          <p className="font-sans font-bold">신랑 측 계좌번호</p>
        </div>
        <div className="flex items-stretch justify-between">
          <div className="flex">이성우</div>
          <div className="flex items-center justify-center gap-1">
            <img src="src/assets/kb.png" alt="" className="h-4 w-4" />
            <p>국민 123456-78-901234</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton />
          <KPButton />
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div className="flex items-stretch justify-between">
          <div className="flex">이성우</div>
          <div className="flex items-center justify-center gap-1">
            <img src="src/assets/kb.png" alt="" className="h-4 w-4" />
            <p>국민 123456-78-901234</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton />
          <KPButton />
        </div>
      </div>

      <div className="my-[26px] flex w-full flex-col gap-4 font-sans">
        <div className="flex w-full">
          <p className="font-sans font-bold">신부 측 계좌번호</p>
        </div>
        <div className="flex items-stretch justify-between">
          <div className="flex">최예주</div>
          <div className="flex items-center justify-center gap-1">
            <img src="src/assets/kb.png" alt="" className="h-4 w-4" />
            <p>국민 123456-78-901234</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton />
          <KPButton />
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div className="flex items-stretch justify-between">
          <div className="flex">최예주</div>
          <div className="flex items-center justify-center gap-1">
            <img src="src/assets/kb.png" alt="" className="h-4 w-4" />
            <p>국민 123456-78-901234</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton />
          <KPButton />
        </div>
      </div>
    </Box>
  );
}

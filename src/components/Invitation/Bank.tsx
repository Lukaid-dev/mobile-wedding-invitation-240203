import CopyButton from './CopyButton';
import Divider from '../Divider';
import KPButton from './KPButton';
import Box from './Box';

import toss from '../../assets/toss.png';
import woori from '../../assets/woori.png';
import hana from '../../assets/hana.png';
import nh from '../../assets/nh.png';

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
            <img src={toss} alt="토스뱅크" className="h-4 w-4" />
            <p>토스 1000-6586-0069</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton bank="toss" />
          <KPButton />
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div className="flex items-stretch justify-between">
          <div className="flex">문일순</div>
          <div className="flex items-center justify-center gap-1">
            <img src={woori} alt="우리은행" className="h-4 w-4" />
            <p>우리 1002-943-618487</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton bank="woori" />
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
            <img src={hana} alt="하나은행" className="h-4 w-4" />
            <p>하나 287-910593-11307</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton bank="hana" />
          <KPButton />
        </div>
        <div className="my-4">
          <Divider />
        </div>
        <div className="flex items-stretch justify-between">
          <div className="flex">최상철</div>
          <div className="flex items-center justify-center gap-1">
            <img src={nh} alt="농협은행" className="h-4 w-4" />
            <p>농협 352-1737-6288-23</p>
          </div>
        </div>
        <div className="flex gap-2">
          <CopyButton bank="nh" />
          <KPButton />
        </div>
      </div>
    </Box>
  );
}

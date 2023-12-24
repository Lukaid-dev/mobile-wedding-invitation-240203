import CopyButton from './CopyButton';
import Divider from '../Divider';
import Box from './Box';

import toss from '../../assets/toss.png';
import woori from '../../assets/woori.png';
import hana from '../../assets/hana.png';
import nh from '../../assets/nh.png';
import { useState } from 'react';

export default function Bank() {
  const [accordionGroomOpen, setAccordionGroomOpen] = useState<boolean>(false);
  const [accordionBrideOpen, setAccordionBrideOpen] = useState<boolean>(false);

  return (
    <Box title="마음 전하실 곳">
      <div className="mt-[26px] flex w-full flex-col gap-4 font-sans">
        <div className="flex w-full justify-between">
          <div className="font-sans">신랑 측 계좌번호</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAccordionGroomOpen(!accordionGroomOpen);
            }}>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`ttransform origin-center transition duration-200 ease-out ${
                  accordionGroomOpen && '!rotate-180'
                }`}
              />
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`origin-center rotate-90 transform transition duration-200 ease-out ${
                  accordionGroomOpen && '!rotate-180'
                }`}
              />
            </svg>
          </button>
        </div>
        <div
          className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${
            accordionGroomOpen ? 'opacity-100' : 'h-0 opacity-0'
          }`}>
          <div className="flex items-stretch justify-between">
            <div className="flex">이성우</div>
            <div className="flex items-center justify-center gap-1">
              <img src={toss} alt="토스뱅크" className="h-4 w-4" />
              <p>토스 1000-6586-0069</p>
            </div>
          </div>
          <div className="flex gap-2">
            <CopyButton bank="toss" />
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
          </div>
        </div>
      </div>

      <div className="mt-[26px] flex w-full flex-col gap-4 font-sans">
        <div className="flex w-full justify-between">
          <div className="font-sans">신부 측 계좌번호</div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setAccordionBrideOpen(!accordionBrideOpen);
            }}>
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`ttransform origin-center transition duration-200 ease-out ${
                  accordionBrideOpen && '!rotate-180'
                }`}
              />
              <rect
                y="7"
                width="16"
                height="2"
                rx="1"
                className={`origin-center rotate-90 transform transition duration-200 ease-out ${
                  accordionBrideOpen && '!rotate-180'
                }`}
              />
            </svg>
          </button>
        </div>
        <div
          className={`flex flex-col gap-4 overflow-hidden transition-all duration-500 ease-in-out ${
            accordionBrideOpen ? 'opacity-100' : 'h-0 opacity-0'
          }`}>
          <div className="flex items-stretch justify-between">
            <div className="flex">최예주</div>
            <div className="flex items-center justify-center gap-1">
              <img src={hana} alt="하나은행" className="h-4 w-4" />
              <p>하나 287-910593-11307</p>
            </div>
          </div>
          <div className="flex gap-2">
            <CopyButton bank="hana" />
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
          </div>
        </div>
      </div>
    </Box>
  );
}

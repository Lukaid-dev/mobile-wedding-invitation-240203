import { useEffect, useRef } from 'react';
import Divider from '../Divider';
import Box from './Box';

import train from '../../assets/train.svg';
import bus from '../../assets/bus.svg';
import car from '../../assets/car.svg';
import naverMap from '../../assets/naverMap.png';
import kakaoMap from '../../assets/kakaoMap.png';

export default function Map() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    const center = new naver.maps.LatLng(37.5685875, 126.8963364);
    const location = new naver.maps.LatLng(37.5685875, 126.8963364);
    const mapOptions: naver.maps.MapOptions = {
      center,
      zoom: 16,
      zoomControl: false,
      disableDoubleTapZoom: false,
      disableDoubleClickZoom: false,
      disableTwoFingerTapZoom: false,
      pinchZoom: false,
      draggable: false,
      scrollWheel: false,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return (
    <Box title="오시는 길">
      <div className="w-full font-sans">
        <div className="my-6 flex flex-col items-center justify-center gap-[6px] ">
          <div className="font-batang font-bold">월드컵 컨벤션</div>
          <div>서울특별시 마포구 성산동 월드컵로 240</div>
        </div>

        <div ref={mapElement} className="h-[182px] w-full rounded-lg" />

        <div className="flex w-full justify-center gap-12 pt-6">
          <a href="https://naver.me/FSQeKoSR" target="_blank" rel="noreferrer">
            <img
              src={naverMap}
              alt="네이버 지도"
              className="h-10 w-10 rounded-lg shadow-lg"
            />
          </a>
          <a href="https://kko.to/ZtD3GTCY6-" target="_blank" rel="noreferrer">
            <img
              src={kakaoMap}
              alt="카카오 지도"
              className="h-10 w-10 rounded-lg shadow-lg"
            />
          </a>
        </div>

        <div className="my-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src={train} alt="Train" className="h-4 w-4" />
            <p className="font-bold">지하철</p>
          </div>
          <div className="ml-8 flex items-center justify-start gap-[2px]">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brown text-white">
              6
            </div>
            <p>호선 월드컵 경기장역 2번 출구</p>
          </div>
        </div>

        <Divider width="w-full" />

        <div className="my-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src={bus} alt="Bus" className="h-4 w-4" />
            <p className="font-bold">버스</p>
          </div>
          <div className="ml-8 flex items-center justify-start">
            <p>월드컵 경기장 서측. 문화 비축기지 정류장</p>
          </div>
          <div className="ml-8 flex items-center justify-start gap-2">
            <div>간선:</div>
            <div className="flex h-6 items-center justify-center rounded bg-blue px-[10px] py-[6px] text-white">
              571
            </div>
            <div className="flex h-6 items-center justify-center rounded bg-blue px-[10px] py-[6px] text-white">
              710
            </div>
            <div className="flex h-6 items-center justify-center rounded bg-blue px-[10px] py-[6px] text-white">
              760
            </div>
          </div>
          <div className="ml-8 flex items-center justify-start gap-2">
            <div>지선:</div>
            <div className="flex h-6 items-center justify-center rounded bg-green px-[10px] py-[6px] text-white">
              7019
            </div>
            <div className="flex h-6 items-center justify-center rounded bg-green px-[10px] py-[6px] text-white">
              7715
            </div>
            <div className="flex h-6 items-center justify-center rounded bg-green px-[10px] py-[6px] text-white">
              8777
            </div>
          </div>
          <div className="ml-8 flex items-center justify-start gap-2">
            <div>광역:</div>
            <div className="flex h-6 items-center justify-center rounded bg-red px-[10px] py-[6px] text-white">
              9711
            </div>
          </div>
        </div>

        <Divider width="w-full" />

        <div className="my-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img src={car} alt="Car" className="h-4 w-4" />
            <p className="font-bold">자가용</p>
          </div>
          <div className="ml-8 flex flex-col items-start justify-center gap-4">
            <div>‘월드컵 컨벤션’ 네비게이션에 검색</div>
            <div>월드컵경기장 서문 진입후 서측 1,2주차장 이용</div>
            <div>주차 접수대 사전 등록 후 출차 (90분 무료)</div>
          </div>
        </div>
      </div>
    </Box>
  );
}

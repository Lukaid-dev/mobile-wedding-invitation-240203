import { Link, useLoaderData } from 'react-router-dom';
import { IoCall } from 'react-icons/io5';
import { AiOutlineMessage } from 'react-icons/ai';
import { useEffect, useRef } from 'react';

export default function Invitation() {
  const mapElement = useRef<HTMLDivElement>(null);

  const url = useLoaderData() as string;

  useEffect(() => {
    if (!mapElement.current) return;

    const center = new naver.maps.LatLng(37.5685875, 126.8963364);
    const location = new naver.maps.LatLng(37.5685875, 126.8963364);
    const mapOptions: naver.maps.MapOptions = {
      center,
      zoom: 16,
      zoomControl: true,
      disableDoubleTapZoom: false,
      disableDoubleClickZoom: false,
      disableTwoFingerTapZoom: false,
      pinchZoom: true,
      draggable: true,
      scrollWheel: true,
    };
    const map = new naver.maps.Map(mapElement.current, mapOptions);

    new naver.maps.Marker({
      position: location,
      map,
    });
  }, []);

  return (
    <>
      <div className="animate-fadeInOut flex flex-col items-center justify-center">
        <div className="w-[80%] pt-5 text-start">
          <h1 className="pb-10 font-myeongjo text-3xl font-bold">인 사 말</h1>
          <div className="flex flex-col gap-8 text-start font-myeongjo">
            <span>
              마음을 같이하여 같은 사랑을 가지고 <br />
              뜻을 합하여 한마음을 품어 <br />- 빌립보서 2장 2절 -
            </span>

            <span>
              하나님의 예정하심을 따라 <br />
              사랑으로 만난 두 사람이 <br />
              이제 하나가 되어 하나님만 경외하는 <br />
              아름다운 가정을 이루고자 합니다. <br />
              한곳을 바라보며 첫발을 떼는 자리에 <br />
              함께하셔서 주의 이름으로 축복해 주시면 <br />
              더없는 기쁨으로 간직하겠습니다.
            </span>
          </div>
        </div>
        {/* 여기 디자인 다시 */}
        <div className="mt-10 w-full">
          <div className="flex justify-center">
            <div className="w-[120px] text-center font-myeongjo">문일순</div>
            <div className="mr-2">의 장남</div>
            <div>성우</div>
          </div>
          <div className="flex justify-center">
            <div className="w-[120px] text-center font-myeongjo">
              최상철 · 박경순
            </div>
            <div className="mr-2">의 장녀</div>
            <div>예주</div>
          </div>
        </div>
        <div
          className="my-10 flex w-full items-center justify-center bg-cover bg-center text-white"
          style={{
            backgroundImage: `url(${url})`,
            height: '120px',
          }}>
          소중한 당신을 초대합니다
        </div>

        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex w-full justify-end">신랑에게 연락하기</div>
          <div className="flex w-full justify-start gap-4">
            {/* TODO: 이거 svg 예희한테 뽑아달라고 하자 */}
            {/* TODO: 그리고 이거 연락하기 로직 어케됨? 바로 폰의 전화랑 메세지로 연결되나? */}
            <IoCall
              className="rounded-full bg-slate-400"
              style={{
                width: '40px',
                height: '40px',
              }}
            />
            <AiOutlineMessage
              className="rounded-full bg-slate-400"
              style={{
                width: '40px',
                height: '40px',
              }}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-4">
          <div className="flex w-full justify-end">신부에게 연락하기</div>
          <div className="flex w-full justify-start gap-4">
            <IoCall
              className="rounded-full bg-slate-400"
              style={{
                width: '40px',
                height: '40px',
              }}
            />
            <AiOutlineMessage
              className="rounded-full bg-slate-400"
              style={{
                width: '40px',
                height: '40px',
              }}
            />
          </div>
        </div>
      </div>

      <div ref={mapElement} className="h-[200px] w-full" />

      {/* TODO: 티맵이랑 카카오네비 방법 찾기 */}
      <div>
        <a href="https://naver.me/FSQeKoSR" target="_blank" rel="noreferrer">
          naver
        </a>
        <a href="https://kko.to/jB3gsSqJCj" target="_blank" rel="noreferrer">
          kakao
        </a>
      </div>

      <Link
        to="/Gallery"
        className="my-2 flex w-[80%] justify-center rounded-full bg-orange-400 py-2 font-bold text-white">
        Gallery
      </Link>
    </>
  );
}

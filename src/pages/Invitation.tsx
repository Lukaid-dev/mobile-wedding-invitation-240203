import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import Greeting from '../components/Invitation/Greeting';
import Calendar from '../components/Invitation/Calendar';
import Contact from '../components/Invitation/Contact';
import Bank from '../components/Invitation/Bank';

export default function Invitation() {
  const mapElement = useRef<HTMLDivElement>(null);

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
      <div className="animate-fadeInOut flex flex-col items-center justify-center gap-6 p-4">
        <Greeting />
        <Calendar />
        <Contact />
        <Bank />
      </div>

      <div ref={mapElement} className="h-[200px] w-full" />

      <Link
        to="/Gallery"
        className="bg-orange-400 my-2 flex w-[80%] justify-center rounded-full py-2 font-bold text-white">
        Gallery
      </Link>
    </>
  );
}

{
  /* <div>
  <a href="https://naver.me/FSQeKoSR" target="_blank" rel="noreferrer">
    naver
  </a>
  <a href="https://kko.to/jB3gsSqJCj" target="_blank" rel="noreferrer">
    kakao
  </a>
</div> */
}

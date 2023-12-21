import Greeting from '../components/Invitation/Greeting';
import Calendar from '../components/Invitation/Calendar';
import Contact from '../components/Invitation/Contact';
import Bank from '../components/Invitation/Bank';
import Map from '../components/Invitation/Map';
import NextButton from '../components/NextButton';
import Share from '../components/Invitation/Share';

export default function Invitation() {
  return (
    <div className="animate-fadeInOut flex flex-col items-center justify-center gap-6 p-4">
      <Greeting />
      <Calendar />
      <Contact />
      <Bank />
      <Map />
      <Share />
      <NextButton
        to="/Gallery"
        text="사진 보러 가기"
        bg="bg-red"
        textColor="text-white"
      />
    </div>
  );
}

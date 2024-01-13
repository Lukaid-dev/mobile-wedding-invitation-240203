import Greeting from './Greeting';
import Calendar from './Calendar';
import Contact from './Contact';
import Bank from './Bank';
import Map from './Map';
import NextButton from '../../components/NextButton';
import Share from './Share';
import MadeBy from './MadeBy';

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
      <MadeBy />
    </div>
  );
}

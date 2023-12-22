// import NextButton from '../components/NextButton';
import ImageGrid from '../components/Gallery/ImageGrid';

export default function Gallery() {
  return (
    <div className="flex flex-col items-center justify-center">
      <ImageGrid />
      {/* <NextButton
        to="/Guestbook"
        text="방명록 쓰러가기"
        bg="bg-red"
        textColor="text-white"
      /> */}
    </div>
  );
}

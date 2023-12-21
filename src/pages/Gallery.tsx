import NextButton from '../components/NextButton';

export default function Gallery() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-fadeInOut flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold underline"> GALLEY </h1>
      </div>
      <NextButton
        to="/Guestbook"
        text="방명록 쓰러가기"
        bg="bg-red"
        textColor="text-white"
      />
    </div>
  );
}

import kp from '../../assets/kakaoPay.png';

export default function KPButton() {
  return (
    <div className="bg-yellow flex h-10 w-full items-center justify-center rounded-lg">
      <img src={kp} alt="kakao pay" className="h-6" />
    </div>
  );
}

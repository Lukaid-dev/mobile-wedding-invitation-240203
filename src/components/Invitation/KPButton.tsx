import kp from '../../assets/kakaoPay.png';

export default function KPButton() {
  return (
    <div className="flex h-10 w-full items-center justify-center rounded-lg bg-yellow">
      <img src={kp} alt="kakao pay" className="h-6" />
    </div>
  );
}

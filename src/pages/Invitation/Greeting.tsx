import Divider from '../../components/Divider';

export default function Greeting() {
  return (
    <div className="flex w-full bg-gray-50 p-4">
      <div className="flex w-full flex-col items-center justify-center bg-white p-4">
        <p className="mb-[10px] font-batang text-base font-bold">인사말</p>
        <Divider />
        <div className="my-4 flex flex-col gap-8 text-center font-batang">
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
        <Divider />
        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="self-stretch text-center font-batang text-base font-normal">
            <span>문일순 의 장남 </span>
            <span className="font-bold">
              성우
              <br />
            </span>
            <span>최상철 • 박경순 의 장녀 </span>
            <span className="font-bold">예주</span>
          </div>
        </div>
      </div>
    </div>
  );
}

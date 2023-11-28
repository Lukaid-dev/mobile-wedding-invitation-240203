import { Link } from "react-router-dom";

export default function Invitation() {
  return (
    <>
      <div className="flex flex-col justify-center items-center animate-fadeInOut">
        <h1 className="text-3xl font-myeongjo font-bold pt-2 pb-10">
          {" "}
          인 사 말{" "}
        </h1>
        <div className="flex flex-col gap-8 font-myeongjo">
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
      <Link
        to="/Gallery"
        className="flex justify-center bg-orange-400 w-[80%] rounded-full py-2 my-2 text-white font-bold"
      >
        Gallery
      </Link>
    </>
  );
}

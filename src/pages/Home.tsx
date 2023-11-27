import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      const headerHeight = 16 * 4;
      setHeight(window.innerHeight - headerHeight);
    };
    // 최초 렌더링 시와 윈도우 리사이즈 시에 높이를 업데이트합니다.
    updateHeight();
    window.addEventListener("resize", updateHeight);

    // 컴포넌트가 언마운트되면 리스너를 정리합니다.
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <>
      <div
        className="relative flex flex-col justify-center items-center animate-fadeInOut bg-cover bg-center"
        style={{
          backgroundImage: "url('src/assets/images/image_test.png')",
          height: `${height}px`,
        }}
      >
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent"></div>

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white"></div>
        <div className="absolute flex flex-col justify-center items-center bottom-0">
          <span className="text-xl">성우와 예주</span>
          <span className="text-center">
            부부라는 이름으로 서로의 곁에서
            <br />
            언제나 함께 하겠습니다
          </span>
          <button>
            <Link to="/Invitation">Invitation</Link>
          </button>
        </div>
      </div>
    </>
  );
}

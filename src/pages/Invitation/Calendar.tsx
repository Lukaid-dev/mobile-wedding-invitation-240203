import Box from './Box';

export default function Calendar() {
  return (
    <Box title="예식일">
      <div className="my-6 flex flex-col items-center gap-[6px]">
        <div
          style={{
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 700,
            lineHeight: '16px',
          }}>
          2024년 2월 3일
        </div>
        <div
          className="font-sans"
          style={{
            fontSize: '13px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '19.5px',
          }}>
          토요일 오후 3시 20분
        </div>
      </div>
      {/* calendar */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-[18px] text-gray-400">
          <div className="flex w-6 justify-center text-red">일</div>
          <div className="flex w-6 justify-center ">월</div>
          <div className="flex w-6 justify-center ">화</div>
          <div className="flex w-6 justify-center ">수</div>
          <div className="flex w-6 justify-center ">목</div>
          <div className="flex w-6 justify-center ">금</div>
          <div className="flex w-6 justify-center ">토</div>
        </div>
        <div className="flex gap-[18px]">
          <div className="flex w-6 justify-center text-red"></div>
          <div className="flex w-6 justify-center"></div>
          <div className="flex w-6 justify-center"></div>
          <div className="flex w-6 justify-center"></div>
          <div className="flex w-6 justify-center">1</div>
          <div className="flex w-6 justify-center">2</div>
          <div className="flex w-6 justify-center rounded-full bg-gray-900 text-white">
            3
          </div>
        </div>
        <div className="flex gap-[18px]">
          <div className="flex w-6 justify-center text-red">4</div>
          <div className="flex w-6 justify-center">5</div>
          <div className="flex w-6 justify-center">6</div>
          <div className="flex w-6 justify-center">7</div>
          <div className="flex w-6 justify-center">8</div>
          <div className="flex w-6 justify-center">9</div>
          <div className="flex w-6 justify-center">10</div>
        </div>
        <div className="flex gap-[18px]">
          <div className="flex w-6 justify-center text-red">11</div>
          <div className="flex w-6 justify-center">12</div>
          <div className="flex w-6 justify-center">13</div>
          <div className="flex w-6 justify-center">14</div>
          <div className="flex w-6 justify-center">15</div>
          <div className="flex w-6 justify-center">16</div>
          <div className="flex w-6 justify-center">17</div>
        </div>
        <div className="flex gap-[18px]">
          <div className="flex w-6 justify-center text-red">18</div>
          <div className="flex w-6 justify-center">19</div>
          <div className="flex w-6 justify-center">20</div>
          <div className="flex w-6 justify-center">21</div>
          <div className="flex w-6 justify-center">22</div>
          <div className="flex w-6 justify-center">23</div>
          <div className="flex w-6 justify-center">24</div>
        </div>
        <div className="flex gap-[18px]">
          <div className="flex w-6 justify-center text-red">25</div>
          <div className="flex w-6 justify-center">26</div>
          <div className="flex w-6 justify-center">27</div>
          <div className="flex w-6 justify-center">28</div>
          <div className="flex w-6 justify-center">29</div>
          <div className="flex w-6 justify-center"></div>
          <div className="flex w-6 justify-center"></div>
        </div>
      </div>
    </Box>
  );
}

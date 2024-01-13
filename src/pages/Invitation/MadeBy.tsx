export default function MadeBy() {
  const githubUrl =
    'https://github.com/Lukaid-dev/mobile-wedding-invitation-240203';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2">
        <div> Developed </div>
        <div> by </div>
        <div
          className="font-bold"
          onClick={() => {
            window.open(githubUrl);
          }}>
          Lukaid-dev
        </div>
      </div>
      <div className="flex gap-2">
        <div> Designed </div>
        <div> by </div>
        <div
          className="font-bold"
          onClick={() => {
            window.open('https://www.instagram.com/illinpilli');
          }}>
          {' '}
          illinpilli{' '}
        </div>
      </div>
    </div>
  );
}

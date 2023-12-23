import Box from './Box';
import ContactCard from './ContactCard';

export default function Contact() {
  return (
    <Box title="연락처">
      <div className="my-6 flex w-full justify-around">
        <div className="flex flex-col gap-8">
          <ContactCard name="신랑" who="groom" />
          <ContactCard name="신랑 어머님" who="moon" />
        </div>

        <div className="flex flex-col gap-8">
          <ContactCard name="신부" who="bride" />
          <ContactCard name="신부 어머님" who="park" />
          <ContactCard name="신부 아버님" who="choi" />
        </div>
      </div>
    </Box>
  );
}

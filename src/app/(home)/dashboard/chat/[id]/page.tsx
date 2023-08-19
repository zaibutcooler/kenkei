import GigaChat from "@/components/GigaChat";

const ChatPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;

  return (
    <div className="w-full">
      <section className="h-16 border-b w-full">Personal Information</section>
      <section className="w-full">
        <GigaChat />
      </section>
    </div>
  );
};

export default ChatPage;

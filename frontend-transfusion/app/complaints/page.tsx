import Sidebar from "@/components/Sidebar";
import TextArea from "@/components/TextArea";

export default function Complaints() {
  return (
    <main className="relative flex min-h-screen w-full">
      <div className="relative w-full min-h-screen flex flex-col gap-y-20 place-items-center">
        <Sidebar />
        <TextArea />
      </div>
    </main>
  );
}

import Sidebar from "@/components/Sidebar";
import Table from "@/components/Table";

export default function Users() {
  return (
    <main className="relative flex min-h-screen w-full">
      <div className="relative w-full min-h-screen flex flex-col gap-y-20 place-items-center">
        <Sidebar />
        <Table />
      </div>
    </main>
  );
}

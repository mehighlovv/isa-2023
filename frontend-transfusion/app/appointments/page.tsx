import Sidebar from "@/components/Sidebar";
import TableAppointments from "@/components/Table2";

export default function Appointments () {
    return (
         <main className="relative flex min-h-screen w-full">
            <div className="relative w-full min-h-screen flex flex-col gap-y-20 place-items-center">
        <Sidebar />
        <TableAppointments />
        </div>
        </main>
    )
}
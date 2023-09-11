import { useRouter } from "next/navigation";
import Button from "./PrimaryButton";

export default function TableAppointments() {
  const router = useRouter();
  const handleSchedule = () => {
    router.push("/");
  };
  return (
    <div className="absolute top-10 min-h-full w-full pl-80 pt-10">
      <table className="w-full left-24 text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Center
            </th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              15/08
            </th>
            <td className="px-6 py-4">14:55</td>
            <td className="px-6 py-4">Transfusion centre 2</td>
            <td className="px-6 py-4">
              {" "}
              <Button title="schedule" action={handleSchedule} />
            </td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              16/08
            </th>
            <td className="px-6 py-4">10:00</td>
            <td className="px-6 py-4">Transfusion centre 5</td>
            <td className="px-6 py-4">
              {" "}
              <Button title="schedule" action={handleSchedule} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

"use client";
import { useRouter } from "next/navigation";
import Button from "./PrimaryButton";

export default function TextArea() {
  const router = useRouter();
  const handleSchedule = () => {
    router.push("/");
  };
  return (
    <div className="absolute top-10 min-h-full w-full pl-80 pt-10">
      <label className="flex mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Write your complaint
      </label>
      <textarea
        id="message"
        className=" p-2.5 h-96 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
      <Button title="back" action={handleSchedule} />
    </div>
  );
}

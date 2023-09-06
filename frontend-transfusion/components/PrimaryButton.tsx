"use client"
import { useRouter } from "next/navigation";


export default function Button({title}: {title: string}) {
   const router = useRouter();
   const handleBack = () => router.push("/");
  return (
      <button onClick={() => {handleBack()}} className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        {title}
      </button>
  );
}

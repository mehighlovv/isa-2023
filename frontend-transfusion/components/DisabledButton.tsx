export default function DisabledButton({ title }: { title: string }) {
  return (
    <button className="text-${}-900 bg-gray border border-gray-500 focus:outline-none hover:bg-black-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">
      {title}
    </button>
  );
}

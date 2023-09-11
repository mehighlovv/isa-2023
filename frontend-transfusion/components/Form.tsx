export default function Form({
  children,
  onSubmit,
}: {
  children: React.ReactNode[];
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form className="z-9999999" onSubmit={onSubmit}>
      {!!children?.length &&
        children?.map((child: React.ReactNode) => (
          <div className="relative z-0 w-full mb-6 group" key={Math.random()}>
            {child}
          </div>
        ))}

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}

export default function Input (props: { type: string, id: string, required?: boolean, name: string, pattern?: string }) {
    const {type, id, required, name, pattern} = props;
    return (
       <input type={type} name={name} id={id} pattern={pattern} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required={required}/>
 
    );
}
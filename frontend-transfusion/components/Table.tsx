export default function Table (){
    return(
        
<div className="relative overflow-x-auto">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                <th scope="col" className="px-6 py-3">
                    First name
                </th>
                <th scope="col" className="px-6 py-3">
                    Last name
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Johnnnnn123
                </th>
                <td className="px-6 py-4">
                    JOhn
                </td>
                <td className="px-6 py-4">
                    Smith
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Anglelina31213
                </th>
                <td className="px-6 py-4">
                    Tina
                </td>
                <td className="px-6 py-4">
                    Johaness
                </td>
                
            </tr>
          
        </tbody>
    </table>
</div>

    )
}
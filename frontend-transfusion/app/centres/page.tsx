
import Button from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import DisabledButton from '@/components/DisabledButton'
import Card from '@/components/Card'
import Sidebar from '@/components/Sidebar'

//   async function getData() {
//   const res = await fetch('http://localhost:3001/performance/testSuite')
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//  console.log(res)
//   if (!res.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data')
//   }
//  JSON.stringify(res)
//   return res.json()
// }



export default async function Page() {

    const mockCentres = [{id: "c1", name: "centre 21", description: "some short description some short description some short description some short description"}, {id: "c1", name: "centre 100", description: "some short description"}, {id: "c1", name: "centre 500", description: "some short description"}]

// const data = await getData()

    return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sidebar />
      <div className="relative flex flex-col gap-y-20 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
      
       <h2 className={`mb-3 text-2xl font-semibold`}>Transfusion centres</h2>
       <div className="flex gap-5 z-10 items-stretch flex-wrap">
       {!!mockCentres?.length && mockCentres?.map((centre: { id: any; name: any; description: any }) => <Card key={centre.id} name={centre?.name} description={centre?.description}/>)}</div>
       <div className="flex flex-row p-4">
       <Button title="back" />
       <SecondaryButton title='secondary'/>
       <DisabledButton title='disabled'/>
</div>
      </div>
    </main>
  )
}

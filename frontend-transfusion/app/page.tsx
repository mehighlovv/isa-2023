"use client";

import { useRouter } from "next/navigation";
import Form from '@/components/Form'
import Input from '@/components/Input'
import Label from '@/components/Label'


export default function Home() {
  const router = useRouter();
  const handleForm = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/centres");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-0 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
       <h2 className={`mb-3 text-2xl font-semibold`}>Sign in</h2>
       <Form onSubmit={handleForm}><>
        <Input name="floating_email" id="floating_email" type="email" required/><Label title="Email address"/></><>
        <Input name="floating_password" id="floating_password" type="password" required/><Label title="Password"/></>
       </Form>
      </div>
    </main>
  )
}

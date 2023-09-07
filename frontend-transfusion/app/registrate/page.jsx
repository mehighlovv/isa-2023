"use client";

import { useRouter } from "next/navigation";
import Form from "@/components/Form";
import Label from "@/components/Label";
import Input from "@/components/Input";

export default function Registration() {
  const router = useRouter();
  const handleForm = (e) => {
    e.preventDefault();
    router.push("/centres");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-0 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h2 className={`mb-3 text-2xl font-semibold`}>Registration</h2>
        <Form onSubmit={handleForm}>
          <>
            <Input
              name="floating_email"
              id="floating_email"
              type="email"
              required
            />
            <Label title="Email address" />
          </>
          <>
            <Input
              name="floating_password"
              id="floating_password"
              type="password"
              required
            />
            <Label title="Password" />
          </>
          <>
            <Input
              name="floating_repeat_password"
              id="repeat_password"
              type="password"
              required
            />
            <Label title="Confirm password" />
          </>
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <Input
                  name="floating_first_name"
                  id="floating_first_name"
                  type="text"
                  required
                />
                <Label title="First name" />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <Input
                  name="floating_last_name"
                  id="floating_last_name"
                  type="text"
                  required
                />
                <Label title="Last name" />
              </div>
            </div>
          </>
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <Input
                  name="floating_phone"
                  id="floating_phone"
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                />
                <Label title="Phone number (123-456-7890)" />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <Input
                  name="floating_company"
                  id="floating_company"
                  type="text"
                  required
                />
                <Label title="Company (Ex.Google)" />
              </div>
            </div>
          </>
          <>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="relative z-0 w-full mb-6 group">
                <Input
                  name="floating_phoneNumber"
                  id="floating_phoneNumber"
                  type="text"
                  required
                />
                <Label title="Phone number" />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <Input
                  name="floating_address"
                  id="floating_address"
                  type="text"
                  required
                />
                <Label title="Address" />
              </div>
            </div>
          </>
          <div className="relative z-0 w-full mb-6 group">
            <Input
              name="floating_city"
              id="floating_city"
              type="text"
              required
            />
            <Label title="City" />
          </div>
          <></>
        </Form>
      </div>
    </main>
  );
}

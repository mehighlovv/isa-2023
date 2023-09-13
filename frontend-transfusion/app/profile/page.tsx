"use client";
import Input from "@/components/Input";
import Sidebar from "@/components/Sidebar";
import { useReducer, useState } from "react";

export default function Profile() {
  function reducer(
    state: { name: any; age: number; fullName: string },
    action: { type: string; name: string; fullName: string; age: number }
  ) {
    console.log(action.type);
    switch (action.type) {
      case "changed_fullName": {
        return {
          name: state.name,
          fullName: action.fullName,
          age: state.age,
        };
      }
      case "changed_name": {
        return {
          name: action.name,
          fullName: state.fullName,
          age: state.age,
        };
      }
    }
    throw Error("Unknown action: " + action.type);
  }
  const [state, dispatch] = useReducer(reducer, {
    name: "Taylor",
    fullName: "Smith",
    age: 12,
  });

  function handleInputChange(e: { target: { value: any } }) {
    dispatch({
      type: "changed_name",
      name: e.target.value,
      fullName: state.fullName,
      age: state.age,
    });
    dispatch({
      type: "changed_fullName",
      name: state.name,
      fullName: e.target.value,
      age: state.age,
    });
    console.log(state);
  }
  return (
    <main className="relative flex min-h-screen w-full">
      <div className="relative w-full min-h-screen flex flex-col gap-y-20 place-items-center">
        <Sidebar />
        <div
          className={`absolute flex flex-col w-2/4 top-11 gap-y-8 place-items-center`}
        >
          <label>Email</label>
          <input
            name="changed_name"
            id="changed_name"
            type="text"
            placeholder={state.name}
            required
            onChange={handleInputChange}
            className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label>First name</label>
          <input
            name="changed_fullName"
            id="changed_fullName"
            type="text"
            placeholder={state.fullName}
            required
            onChange={handleInputChange}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          <label>Last name</label>
          <Input name="floating_city" id="floating_city" type="text" required />
          <label>JMBG</label>
          <Input name="floating_city" id="floating_city" type="text" required />
          <label>Gender</label>
          <Input name="floating_city" id="floating_city" type="text" required />
          <label>Address</label>
          <Input name="floating_city" id="floating_city" type="text" required />
          <label>Country</label>
          <Input name="floating_city" id="floating_city" type="text" required />
          <label>Phone</label>
          <Input name="floating_city" id="floating_city" type="text" required />
        </div>
      </div>
    </main>
  );
}

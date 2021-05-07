import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { timeNow } from "../libs/time";

const EventLog = () => {
  const [event, setEvent] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date())
    }, 1000);
  }, [])

  return (
    <div className="flex flex-col flex-wrap items-center justify-around w-full mt-6">
      <div className="p-6 mt-6 text-left w-full rounded-xl border">
        <h3 className="text-2xl font-bold">Event Log</h3>
        <span className="mt-2 mb-2 text-gray-400	 flex">Preview:<br />{`${timeNow(date)}: ${event}`}</span>
        <input
          type="text"
          class="px-4 py-1 leading-5 border mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Enter Date"
          value={timeNow(date)}
          onChange={(e) => { setDate(e.target.value) }}
        />
        <input
          type="text"
          class="px-4 py-3 leading-5 border w-full mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Enter Event"
          onChange={(e) => { setEvent(e.target.value) }}
        />
        <button
          className="bg-blue-300 hover:bg-blue-700 text-white 
            font-bold py-2 px-4 rounded text-xl mt-4"
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Experiment Tools</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 px-10 text-center">
        <h1 className="text-6xl font-bold">Experiment tools</h1>

        <p className="mt-3 text-2xl">Get started by editing the input box</p>
        <EventLog />
      </main>
    </div>
  );
}

import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { timeNow } from "../libs/time";
import { copyText } from "../libs/util";

const EventLog = () => {
  const [event, setEvent] = useState('');
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date())
    }, 1000);
  }, [])

  return (
    <div className="flex flex-col flex-wrap max-w-2xl items-center justify-around w-full mt-6">
      <div className="p-6 mt-6 text-left w-full rounded-xl border">
        <h3 className="text-2xl font-bold">Event Log</h3>
        <div className="mt-2 mb-2 text-gray-400 flex">Preview:<br /> {`${timeNow(date)}: ${event}`}</div>
        <input
          type="text"
          class="px-2 py-1 max-w-sm border mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Enter Date"
          value={timeNow(date)}
          onChange={(e) => { setDate(e.target.value) }}
        />
        <input
          type="text"
          class="px-2 py-3 leading-5 border w-full mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Enter Event"
          onChange={(e) => { setEvent(e.target.value) }}
        />
        <button
          className={`${event.length == 0 ? 'bg-blue-300' : 'bg-blue-500'} w-full text-white 
            font-bold py-2 px-4 rounded text-xl mt-4`}
          onClick={(e) => { copyText(`${timeNow(date)}: ${event}`) }}
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

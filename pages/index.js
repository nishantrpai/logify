import Head from "next/head";

const EventLog = () => {
  return (
    <div className="flex flex-col flex-wrap items-center justify-around w-full mt-6">
      <div className="p-6 mt-6 text-left w-full rounded-xl bg-blue-100">
        <h3 className="text-2xl font-bold">Event Log</h3>
        <input
          type="text"
          class="px-4 py-3 leading-5 border w-full mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Event"
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

      <main className="flex flex-col items-center w-1/2 justify-center flex-1 px-10 text-center">
        <h1 className="text-6xl font-bold">Experiment tools</h1>

        <p className="mt-3 text-2xl">Get started by editing the input box</p>
        <EventLog />
      </main>
    </div>
  );
}

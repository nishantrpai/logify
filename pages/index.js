import Head from "next/head";
import { useEffect, useState } from "react";
import { timeNow } from "../libs/time";
import { copyText, getDataEntry } from "../libs/util";

const EventLog = () => {
  const [event, setEvent] = useState("");
  const [date, setDate] = useState(new Date());
  const [isCopied, setCopyStatus] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  const copyClick = () => {
    copyText(`${timeNow(date)}: ${event}`, (status) => {
      setCopyStatus(status);
      if (status == true) {
        setTimeout(
          function () {
            setCopyStatus(false);
          }.bind(this),
          5000
        ); // wait 5 seconds, then reset to false
      }
    });
  };

  return (
    <div className="flex flex-col flex-wrap max-w-lg items-center justify-around w-full mt-6">
      <div className="p-6 bg-white mt-6 text-left w-full rounded-xl shadow shadow-xl">
        <h3 className="text-2xl font-bold">Event Log</h3>
        <span className="mt-2 mb-2 text-gray-500 flex text-sm">Preview:</span>
        <span className="mt-1 max-w-sm text-gray-400 text-sm">
          {`${timeNow(date)}:`}&nbsp;
        </span>
        <span className="mt-1 max-w-sm text-gray-400 text-sm">
          {" "}
          {`${event || "*Your event*"}`}
        </span>
        <input
          type="text"
          class="px-2 py-3 leading-5 border w-full mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Enter Event"
          onChange={(e) => {
            setEvent(e.target.value);
          }}
        />
        <button
          className={`
          ${isCopied ? "bg-green-700" : ""}
          ${event.length == 0 ? "bg-blue-300" : "bg-blue-500"}
          w-full text-white 
          font-bold py-2 px-4 rounded text-xl mt-4`}
          onClick={(e) => {
            copyClick();
          }}
        >
          {isCopied ? 'Copied' : 'Copy'}
        </button>
      </div>
    </div>
  );
};

const IO = () => {
  const [iolog, setIOLog] = useState("");
  const [dataType, setDataType] = useState("Markdown");
  const [isVisible, setVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setDate(new Date());
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col flex-wrap max-w-lg items-center justify-around w-full mt-6">
      <div className="p-6 bg-white mt-6 text-left w-full rounded-xl shadow shadow-xl">
        <h3 className="text-2xl font-bold">I/O Log</h3>
        <p className="mt-2 mb-2 text-gray-500 flex text-sm">Preview:</p>
        <p className="mt-1 mb-2 max-w-md text-gray-400 text-sm flex">{`${getDataEntry(
          dataType,
          `${timeNow(date)},${iolog}`
        )}`}</p>
        <div className="rounded-md shadow-sm">
          <div className="relative inline-block text-left w-1/3">
            <button
              className="inline-flex  w-full px-4 py-2 text-sm font-medium 
            text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:text-gray-500 
            focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
              onClick={() => {
                setVisibility(!isVisible);
              }}
            >
              <span className="w-full text-left">{dataType}</span>
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path>
              </svg>
            </button>

            <div
              className={`${
                isVisible ? "block" : "hidden"
              } absolute bg-white border visible w-full`}
            >
              <div className="py-1">
                <span
                  className="text-gray-700 flex w-full px-4 py-2 text-sm leading-5 text-left"
                  onClick={() => {
                    setDataType("Markdown");
                    setVisibility(false);
                  }}
                >
                  Markdown
                </span>
                <span
                  className="text-gray-700 flex w-full px-4 py-2 text-sm leading-5 text-left"
                  onClick={() => {
                    setDataType("CSV");
                    setVisibility(false);
                  }}
                >
                  CSV
                </span>
              </div>
            </div>
          </div>
        </div>

        <input
          type="text"
          class="px-2 py-3 leading-5 border w-full mt-4 rounded-md focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Enter , separated values"
          onChange={(e) => {
            setIOLog(e.target.value);
          }}
        />
        <button
          className={`${
            iolog.length == 0 ? "bg-blue-300" : "bg-blue-500"
          } w-full text-white 
            font-bold py-2 px-4 rounded text-xl mt-4`}
          onClick={(e) => {
            copyText(`${getDataEntry(dataType, `${timeNow(date)},${iolog}`)}`);
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default function Home() {
  const [alert, setalert] = useState("success");

  return (
    <div className="flex bg-gray-100 flex-col items-center justify-start min-h-screen py-2">
      <Head>
        <title>✍️ Logify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center max-w-2xl justify-start flex-1 px-10 py-20 text-center">
        <h1 className="text-6xl mb-4 font-bold">Logify</h1>
        <p className="mt-6 flex text-gray-400">
          ✍️ Write events, inputs, and outputs to your logfile or while
          experimenting.
        </p>
        <EventLog />
        <IO />
      </main>
    </div>
  );
}

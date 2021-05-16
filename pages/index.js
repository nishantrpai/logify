import Head from "next/head";
import { useEffect, useState } from "react";
import { timeNow } from "../libs/time";
import { copyText, getDataEntry } from "../libs/util";

const EventLog = () => {
 const [event, setEvent] = useState("");
 const [date, setDate] = useState(new Date());
 const [isCopied, setCopyStatus] = useState(false);
 const [isFocused, setIsFocused] = useState(false);

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
  <div className="flex flex-col flex-wrap max-w-lg items-center justify-around w-full mt-6 md:max-w-md">   <div className={`p-6 border bg-white dark:bg-gray-900 mt-6 text-left w-full rounded-xl transition delay-100 ease-in ${isFocused ? "shadow shadow-xl border-gray-50" : "border-gray-200"} dark:border-none`}>
   <h3 className="text-2xl font-bold dark:text-gray-300">Event Log</h3>
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
    className="px-2 py-3 leading-5 border dark:bg-gray-700 dark:text-gray-50 dark:border-none w-full mt-4 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
    placeholder="Enter Event"
    onFocus={() => { setIsFocused(true) }}
    onBlur={() => { setIsFocused(false) }}
    onChange={(e) => {
     setEvent(e.target.value);
    }}
   />
   <button
    className={`${event.length == 0 ? "bg-blue-300" : "bg-blue-500"}
          w-full text-white border-none outline-none focus:outline-none
          font-bold py-2 px-4 rounded  mt-4 transition delay-100 ease-in`}
    onClick={(e) => {
     copyClick();
    }}
   >
    {isCopied ? "Copied" : "Copy"}
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
 const [isCopied, setCopyStatus] = useState(false);
 const [isFocused, setIsFocused] = useState(false);

 useEffect(() => {
  setInterval(() => {
   setDate(new Date());
  }, 1000);
 }, []);

 const copyClick = () => {
  copyText(
   getDataEntry(dataType, `${timeNow(date)},${iolog}`),
   (status) => {
    console.log(status);
    setCopyStatus(status);
    if (status == true) {
     setTimeout(
      function () {
       setCopyStatus(false);
      }.bind(this),
      5000
     ); // wait 5 seconds, then reset to false
    }
   }
  );
 };

 return (
  <div className="flex flex-col flex-wrap max-w-lg items-center justify-around w-full mt-6 md:max-w-md">
   <div className={`p-6 border bg-white dark:bg-gray-900 mt-6 text-left w-full rounded-xl transition delay-100 ease-in ${isFocused ? "shadow shadow-xl border-gray-50" : "border-gray-200"} dark:border-none`}>
    <h3 className="text-2xl font-bold dark:text-gray-300">I/O Log</h3>
    <p className="mt-2 mb-2 text-gray-500 flex text-sm">Preview:</p>
    <p className="mt-1 mb-2 max-w-md text-gray-400 text-sm flex">{`${getDataEntry(
     dataType,
     `${timeNow(date)},${iolog}`
    )}`}</p>
    <div className="rounded-md shadow-sm">
     <div className="relative inline-block text-left w-1/3">
      <button
       className="inline-flex  w-full px-4 py-2 text-sm font-medium 
            text-gray-700 transition duration-150 ease-in-out bg-white 
            dark:bg-gray-700 dark:border-none border dark:text-gray-300 
            border-gray-300 rounded-md hover:text-gray-500 dark:hover:text-gray-50 
            focus:outline-none focus:border-blue-300 focus:shadow-outline-blue 
            dark:active:bg-gray-800 active:bg-gray-50 active:text-gray-800"
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
       className={`${isVisible ? "block" : "hidden"
        } absolute bg-white border visible w-full dark:bg-gray-800 dark:border-none`}
      >
       <div className="py-1">
        <span
         className="text-gray-700 dark:text-gray-300 flex w-full px-4 py-2 text-sm leading-5 text-left"
         onClick={() => {
          setDataType("Markdown");
          setVisibility(false);
         }}
        >
         Markdown
                </span>
        <span
         className="text-gray-700 dark:text-gray-300 flex w-full px-4 py-2 text-sm leading-5 text-left"
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
     className="px-2 py-3 leading-5 border dark:bg-gray-700 dark:text-gray-50 dark:border-none w-full mt-4 rounded-md focus:outline-none focus:ring-2 focus:border-blue-500"
     placeholder="Enter ',' separated input, output values"
     onFocus={() => { setIsFocused(true) }}
     onBlur={() => { setIsFocused(false) }}
     onChange={(e) => {
      setIOLog(e.target.value);
     }}
    />
    <button
     className={`${iolog.length == 0 ? "bg-blue-300" : "bg-blue-500"} w-full text-white 
            font-bold py-2 px-4 rounded mt-4  outline-none focus:outline-none transition delay-100 ease-in`}
     onClick={(e) => {
      copyClick()
     }}
    >
     {isCopied ? "Copied" : "Copy"}
    </button>
   </div>
  </div>
 );
};

const TimeStamp = () => {
 const [date, setDate] = useState(new Date());
 const [isCopied, setCopyStatus] = useState(false);

 useEffect(() => {
  setInterval(() => {
   setDate(new Date());
  }, 1000);
 }, []);

 const copyClick = () => {
  copyText(`Timestamp: ${timeNow(date)}`, (status) => {
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
  <div className="flex flex-col flex-wrap max-w-lg items-center justify-around w-full mt-6 md:max-w-md">
   <div className={`p-6 border bg-white dark:bg-gray-900 mt-6 text-left w-full rounded-xl transition delay-100 ease-in ${isCopied ? "shadow shadow-xl border-gray-50" : "border-gray-200"} dark:border-none`}>
    <h3 className="text-2xl font-bold dark:text-gray-300">Timestamp</h3>
    <span className="mt-2 mb-2 text-gray-500 flex text-sm">Preview:</span>
    <span className="mt-1 max-w-sm text-gray-400 text-sm">
     Timestamp:&nbsp;
        </span>
    <span className="mt-1 max-w-sm text-gray-400 text-sm">
     {`${timeNow(date)}`}
    </span>
    <button
     className={`bg-blue-500 w-full text-white border-none outline-none focus:outline-none
          font-bold py-2 px-4 rounded  mt-4 transition delay-100 ease-in`}
     onClick={(e) => {
      copyClick();
     }}
    >
     {isCopied ? "Copied" : "Copy"}
    </button>
   </div>
  </div>
 );
};


export default function Home() {
 const [darkMode, setDarkMode] = useState(false);

 useEffect(() => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
   setDarkMode(true);
  }
 }, [])


 return (
  <div className="flex bg-white dark:bg-gray-800 flex-col items-center justify-start min-h-screen py-2">
   <Head>
    <title>Logify — Preview, Edit and Generate Event Logs</title>
    <meta name="title" content="Logify — Preview, Edit and Generate Event Logs" />
    <meta name="description" content="Use Logify for keeping track of context across projects and timestamping events." />

    {/* Open graph */}
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://logify.vercel.app/" />
    <meta property="og:title" content="Logify — Preview, Edit and Generate Event Logs" />
    <meta property="og:description" content="Use Logify for keeping track of context across projects and timestamping events." />
    <meta property="og:image" content="https://logify.vercel.app/logify_og_image.png" />

    {/* Twitter */}
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://logify.vercel.app/" />
    <meta property="twitter:title" content="Logify — Preview, Edit and Generate Event Logs" />
    <meta property="twitter:description" content="Use Logify for keeping track of context across projects and timestamping events." />
    <meta property="og:image" content="https://logify.vercel.app/logify_og_image.png" />

    {/* Favicon */}
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png" />
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png" />
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png" />
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png" />
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png" />
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png" />
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    {darkMode ?
     <link rel="manifest" href="/manifest-dark.json" /> :
     <link rel="manifest" href="/manifest.json" />
    }
    {darkMode ?
     <meta name="msapplication-TileColor" content="#111827" /> :
     <meta name="msapplication-TileColor" content="#ffffff" />
    }
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    {darkMode ?
     <meta name="theme-color" content="#111827" /> :
     <meta name="theme-color" content="#ffffff" />
    }
   </Head>

   <main className="flex flex-col items-center max-w-2xl justify-start flex-1 px-10 py-20 text-center">
    <h1 className="text-6xl mb-4 font-bold dark:text-gray-100">Logify</h1>
    <p className="mt-6 flex text-gray-500">
     ✍️ Record events, inputs, and outputs in your logfile
        </p>
    <EventLog />
    <IO />
    <TimeStamp />
   </main>

   <footer className="flex flex-col items-center w-full justify-start flex-1 px-10 py-10 text-center border-t dark:border-none">

    <a
     className="flex justify-center text-blue-500 mb-8"
     href="https://nishantpai.substack.com/p/logify"
     target="_blank"
     rel="noopener noreferrer"
    >
     Why did I build this ?
        </a>


    <a
     className="flex justify-center text-blue-500"
     href="https://twitter.com/painishant"
     target="_blank"
     rel="noopener noreferrer"
    >
     @PaiNishant
        </a>

   </footer>

  </div>
 );
}

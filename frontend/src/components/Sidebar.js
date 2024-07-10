import Link from "next/link";
import React, { useState, useEffect } from "react";
//import { json } from 'react-router-dom';

export default function Sidebar({ data, setCurrentSection, pageTopic, currentSection }) {
  const [keyArray, setKeyArray] = useState([]);
  const [progress, setProgress] = useState(0);

    useEffect(() => {
        handleSectionChange(data[0]);
    }, [data]);

    useEffect(() => {
        for (const section of data) {
            if (section === currentSection) {
                setProgress(((data.indexOf(section) + 1) / data.length) * 100);
                break;
            }
        }
    }, [currentSection]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    // adjust progress bar
    for (let i = 0; i < data.length; i++) {
            if (data[i] === section) {
                setProgress(((i + 1) / data.length) * 100);
                break;
            }
        }
  }


  return (
    <div className="w-[500px] flex flex-col gap-y-2 calcPageHeight border-r border-black">
      <div className="fixed left-0 bg-[#20AC58] w-5 h-[100vh] top-0"></div>
      <div className="flex flex-col gap-y-14 pl-8 ">
        <h1 className="text-4xl font-extrabold">Sections</h1>
        <ul
          className="
            overflow-hidden text-ellipsis whitespace-nowrap flex flex-col gap-y-2 pr-8"
        >
          {data.filter((key) => key !== "url")
            .map((key, index) => (
            <li
              key={index}
              onClick={() => handleSectionChange(key)}
              className="text-nowrap text-lg font-semibold cursor-pointer  overflow-hidden text-ellipsis border-b-2 p-2 px-4 "
            >
              {key.split("-")[1]}
            </li>
          ))}
        </ul>
        <Link href={`/section/${pageTopic}/quiz`}>
          <button
            className="bg-[#20AC58] max-w-[200px] text-white p-2 rounded-md"
          >
            Take Quiz
          </button>
        </Link>
        <div className="w-[400px] border border-black rounded-lg ">
            <div
            className='h-4 bg-[#20AC58] rounded-md duration-200  '
            style={{ width: `${progress}%` }}
            ></div>
        </div>
      </div>
    </div>
  );
}

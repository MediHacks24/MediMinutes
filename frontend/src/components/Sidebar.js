import Link from "next/link";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Sidebar({ data, setCurrentSection, quizTime, currentSection }) {
  const [keyArray, setKeyArray] = useState([]);
  const [progress, setProgress] = useState(0);
  const [brainImage, setBrainImage] = useState("/images/brain1.png");

  useEffect(() => {
    let oldBrainImage = brainImage;
    let newBrainImage = "";
    if (progress <= 25) newBrainImage = "/images/brain1.png";
    else if (progress <= 50) newBrainImage = "/images/brain2.png";
    else if (progress <= 75) newBrainImage = "/images/brain3.png";
    else newBrainImage = "/images/brain4.png";

    if (oldBrainImage !== newBrainImage) {
      setBrainImage(newBrainImage);
      const brainImageElement = document.getElementById("brainImage");
      brainImageElement.classList.add("animate-brain");
      setTimeout(() => {
        brainImageElement.classList.remove("animate-brain");
      }, 750); // Duration of the animation
    }
  }, [progress]);

  useEffect(() => {
    handleSectionChange(data[0]);
  }, [data]);


  useEffect(() => {
    if (quizTime) {
      setProgress(100);
    } else {
      for (const section of data) {
        if (section === currentSection) {
          setProgress(((data.indexOf(section)) / data.length) * 100);
          break;
        }
      }
    }
  }, [data, quizTime]);


  useEffect(() => {
    if (quizTime) {
      setProgress(100);
      return;
    }
    for (const section of data) {
      if (section === currentSection) {
        setProgress(((data.indexOf(section)) / data.length) * 100);
        break;
      }
    }
  }, [currentSection]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
    for (let i = 0; i < data.length; i++) {
      if (data[i] === section) {
        setProgress(((i + 1) / data.length) * 100);
        break;
      }
    }
  };

  return (
    <div className="w-[500px] flex flex-col gap-y-2 calcPageHeight border-r border-black bg-[#E1E1EA]">
      <div className="flex flex-col gap-y-8 pt-8 pl-8 pr-8 w-full">
        <h1 className="text-4xl font-extrabold">Sections</h1>
        <ul className="overflow-hidden text-ellipsis whitespace-nowrap flex flex-col pt-0">
          {data.filter((key) => key !== "url").map((key, index) => (
            <div key={index}
            className={`${currentSection === key ? "bg-[#737487] rounded-lg text-white" : "hover:brightness-150  hover:bg-[#737487] rounded-lg "}`}>
            <li
            onClick={() => handleSectionChange(key)}
            className={`text-nowrap text-lg font-semibold cursor-pointer overflow-hidden text-ellipsis p-4 `}
            >
            {key.split("-")[1]}
            </li>
            </div>
          ))}
        </ul>

        <div className="w-full justify-center flex relative">
          <img src={brainImage} id="brainImage" className="w-32 h-24 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={200}
            thickness={4}
            sx={{ color: '#20AC58', margin: '20px 0' }}
          />
        </div>
        <div className="flex flex-col text-2xl">
          <h2 className="text-center">{Math.round(progress)}%</h2>
          <h2 className="text-center">Complete</h2>
        </div>

        {/*<Link className="px-0" href={`/section/${pageTopic}/quiz`}>
          <button className="bg-[#20AC58] w-full h-12 text-white p-2 rounded-md">
            Take Quiz
          </button>
        </Link>*/}
      </div>
    </div>
  );
}

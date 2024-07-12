import Link from "next/link";
import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Sidebar({ data, setCurrentSection, pageTopic, currentSection }) {
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
      }, 1000); // Duration of the animation
    }
  }, [progress]);

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
    for (let i = 0; i < data.length; i++) {
      if (data[i] === section) {
        setProgress(((i + 1) / data.length) * 100);
        break;
      }
    }
  };

  return (
    <div className="w-[500px] flex flex-col gap-y-2 calcPageHeight border-r border-black">
      <div className="fixed left-0 bg-[#20AC58] w-5 h-[100vh] top-0"></div>
      <div className="flex flex-col gap-y-8 pt-8 pl-8 pr-8 w-full">
        <h1 className="text-4xl font-extrabold">Sections</h1>
        <ul className="overflow-hidden text-ellipsis whitespace-nowrap flex flex-col pt-0">
          {data.filter((key) => key !== "url").map((key, index) => (
            <li
              key={index}
              onClick={() => handleSectionChange(key)}
              className={`${currentSection === key ? "bg-[#65327D] rounded-lg text-white" : ""} text-nowrap text-lg font-semibold cursor-pointer overflow-hidden text-ellipsis border-b-2 p-4`}
            >
              {key.split("-")[1]}
            </li>
          ))}
        </ul>

        <div className="w-full justify-center flex relative">
          <img src={brainImage} id="brainImage" className="w-32 h-32 absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          <CircularProgress
            variant="determinate"
            value={progress}
            size={200}
            thickness={4}
            sx={{ color: '#20AC58', margin: '20px 0' }}
          />
        </div>

        <Link className="px-0" href={`/section/${pageTopic}/quiz`}>
          <button className="bg-[#20AC58] w-full h-12 text-white p-2 rounded-md">
            Take Quiz
          </button>
        </Link>
      </div>
    </div>
  );
}

import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import CueCard from "@/components/CueCard";
import QuizTime from "@/components/QuizTime";
import { CircularProgress } from "@mui/material";


const ClickedSection = () => {
  const router = useRouter();
  const { sectionID } = router.query;
  const [data, setData] = useState(null);
  const [sortedSections, setSortedSections] = useState([]);
  const [currentSection, setCurrentSection] = useState("");
  const [headers, setHeaders] = useState([]);
  const [quizTime, setQuizTime] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (sectionID) {
        try {
          const docRef = doc(db, "project", sectionID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error getting document:", error);
        }
      }
    };

    fetchData();
  }, [sectionID]);

  useEffect(() => {
    sortSections();
    console.log(data)
  }, [data]);

  useEffect(() => {
    console.log(currentSection);
  }, [currentSection]);

  const sortSections = () => {
    if (data) {
      const sectionsArray = Object.entries(data)
        .filter(([key, value]) => key.split("-")[1] && key.split("-")[1].trim() !== "" && value.length > 0)
        .sort(([a], [b]) => parseInt(a) - parseInt(b));
  
      setSortedSections(sectionsArray);
  
      let tempHeaderArray = [];
      for (const [key, value] of sectionsArray) {
        if (key.toLowerCase().includes("key facts")) {
          setCurrentSection(key);
        }
        tempHeaderArray.push(key);
      }
      setHeaders(tempHeaderArray);
    }
  };
  

  const handleBackClick = () => {
    const keys = sortedSections.map(([key, value]) => key);
    let currentIndex = keys.indexOf(currentSection);
    console.log(currentIndex);
    if (currentIndex === 0) {
      return;
    }
    if (currentIndex === keys.length - 1 && quizTime) {
      // set the current index to the last section
      setQuizTime(false);
      const previousSection = keys[currentIndex];

      setCurrentSection(previousSection);
      return;
    }
    const previousSection = keys[currentIndex - 1];
    setCurrentSection(previousSection);
  };

  const handleNextClick = () => {
    const keys = sortedSections.map(([key, value]) => key);
    const currentIndex = keys.indexOf(currentSection);
    if (currentIndex === keys.length - 1) {
      setQuizTime(true);
      return;
    } else {
      const nextSection = keys[currentIndex + 1];
      setCurrentSection(nextSection);
    }
  };

  return (
    <div>
      <Navbar />
      {data ? (
        <div className="pt-[65px]">
          <div className="flex flex-row gap-x-2 ">
            <div className="flex flex-col pl-2 pr-4">
              <Sidebar
                data={headers}
                setCurrentSection={setCurrentSection}
                quizTime={quizTime}
                currentSection={currentSection}
                setQuizTime={setQuizTime}
              />
            </div>

            <div className="flex flex-col calcWidthOfSection pt-8 ">
              <h1 className="text-4xl font-extrabold">{sectionID}</h1>

              {quizTime ? (
                <div className="">
                  <QuizTime />
                </div>
              ) : (
                <div className="flex flex-col gap-y-5 pt-[50px]">
                  {sortedSections
                    .filter(([key, value]) => key === currentSection)
                    .map(([key, value], index) => (
                      <div key={index}>
                        <CueCard header={key.split("-")[1]} body={value} />
                      </div>
                    ))}
                </div>
              )}
              <div className="pt-[30px] mx-auto w-[100%] px-20">
                <div className="flex flex-row gap-x-[25%] justify-center">
                  <button
                    onClick={() => handleBackClick()}
                    className="bg-[#ffffff] max-w-[400px] text-black text-2xl font-semibold text-center p-2 px-4 rounded-2xl border border-black w-full hover:scale-110 duration-200"
                  >
                    Previous
                  </button>
                  {quizTime ? (
                    <Link className="bg-[#20AC58] max-w-[400px] text-white text-2xl font-semibold text-center p-2 px-4 rounded-2xl border border-black w-full hover:scale-110 duration-200" href={`/section/${sectionID}/quiz`}>
                        Take Quiz
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleNextClick()}
                      className="bg-[#20AC58] max-w-[400px] text-white text-2xl font-semibold text-center p-2 px-4 rounded-2xl border border-black w-full hover:scale-110 duration-200"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
};

export default ClickedSection;

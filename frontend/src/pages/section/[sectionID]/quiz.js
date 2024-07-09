import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust the path according to your file structure
import Navbar from "@/components/Navbar";
import Link from "next/link";

const QuizPage = () => {
  const router = useRouter();
  const { sectionID } = router.query;
  const [quizData, setQuizData] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (sectionID) {
        try {
          const docRef = doc(db, "questions", sectionID); // Adjust collection name as necessary
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            let data = docSnap.data();

            // get 5 random questions from the data
            let keys = Object.keys(data);
            let shuffledKeys = keys.sort(() => Math.random() - 0.5);
            let randomKeys = shuffledKeys.slice(0, 5);

            let randomData = {};
            randomKeys.forEach((key) => {
              randomData[key] = data[key];
            });

            setQuizData(randomData);
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

  if (!quizData) {
    return <p>Loading...</p>; // put a spinner here eventually 
  }

  const handleNextQuestion = () => {
    setQuestionIndex(
      (prevIndex) => (prevIndex + 1) % Object.keys(quizData).length
    );
  };
  const handlePreviousQuestion = () => {
    setQuestionIndex(
      (prevIndex) =>
        (prevIndex - 1 + Object.keys(quizData).length) %
        Object.keys(quizData).length
    );
  };

  return (
    <div>
      <div className="pt-[80px] flex flex-row gap-x-12">
        
        { /* Side Bar Container */}
        <div className="items-center w-[500px] flex flex-col gap-y-2 calcPageHeight border-r border-black">
          <div className="fixed left-0 bg-[#20AC58] w-5 h-[100vh] top-0"></div>
          <div className="flex flex-col gap-y-20 pl-8 ">
            <h1 className="text-4xl font-extrabold">Sections</h1>
            <ul className=" text-ellipsis whitespace-nowrap flex flex-col gap-y-2 ">
              <Link href={`/section/${sectionID}`}>
                <button className="bg-[#20AC58] text-white text-nowrap text-2xl font-semibold text-center p-2 px-4 rounded-lg w-full">Back to Readings</button>
              </Link>
              {Object.keys(quizData).map((key, index) => (
                <li
                  key={index}
                  onClick={() => setQuestionIndex(index)}
                  className={`cursor-pointer text-nowrap text-2xl font-semibold text-cennter p-2 ${ questionIndex === index ? 'multipleChoiceOption rounded-lg' : '' }`}
                >
                  Question {index + 1}
                </li>
              ))}
            </ul>
          </div>
        </div>

        { /* Quiz Container */}
        <div className="flex flex-col w-[1100px] gap-y-10">
          <h1 className="text-4xl font-extrabold">{sectionID}</h1>
          {/* Render quiz data */}
          {Object.entries(quizData).map(
            ([question, answers], index) =>
              index === questionIndex && (
                <div key={question} className="flex flex-col gap-y-8">
                  <h2 className="text-4xl h-[125px] ">{question}</h2>
                  <div className="flex flex-col gap-y-2 w-[900px]">
                    {answers.map((answer, index) => (
                      <p key={index} className="text-2xl multipleChoiceOption p-3 rounded-lg">{`${String.fromCharCode(65 + index)}) ${answer}`}</p>
                    ))}
                  </div>
                </div>
              )
          )}
          {/* Render navigation buttons */}
          <div className="flex w-[900px] justify-between">
            <div className="justify-start flex-1">
              {questionIndex > 0 && (
                <button
                  onClick={handlePreviousQuestion}
                  className="w-[150px] text-2xl whiteButton"
                >
                  Previous
                </button>
              )}
            </div>
            <div className="flex-1 justify-end">
              {questionIndex < Object.keys(quizData).length - 1 && (
                <button
                  onClick={handleNextQuestion}
                  className="ml-[600px] w-[150px] text-2xl greenButton"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizPage;

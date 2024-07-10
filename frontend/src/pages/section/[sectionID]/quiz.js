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
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [userAnswers, setuserAnswers] = useState([0, 0, 0, 0, 0]);
  const [answerKey, setAnswerKey] = useState(null);

  // You can debug code with blocks like this so see what the new variable becomes when you update a useState
  // useEffect(() => {
  //   console.log(userAnswers);
  // }, [userAnswers]);


  // Fetch data from Firestore
  // Gets 5 random questions from the bank of questions 
  // Extracts the Answer Key from the 5 questions then randomizes the order of the answers
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

            // get the answerKey before shuffling the answer order
            let answerKey = [];
            randomKeys.forEach((key) => {
              answerKey.push(data[key][0]);
            });
            console.log(answerKey);
            setAnswerKey(answerKey);

            // shuffle the answers order for each question
            randomKeys.forEach((key) => {
              let shuffledAnswers = randomData[key].sort(() => Math.random() - 0.5);
              randomData[key] = shuffledAnswers;
            });

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

  // renders while we are waiting for the fetch request above to finish and get the quiz data
  if (!quizData) {
    return <p>Loading...</p>; // put a spinner here eventually 
  }

  // Button Click handlers
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
  const handleSidebarClick = (index) => {
    if (questionIndex >= 0)
      setQuestionIndex(index);
  };
  const handleAnswerSelection = (answer, questionNumber) => {
    if (userAnswers[questionNumber] === answer){
      let newAnswers = [...userAnswers];
      newAnswers[questionNumber] = 0;
      setuserAnswers(newAnswers);
    } else {
      let newAnswers = [...userAnswers];
      newAnswers[questionIndex] = answer;
      setuserAnswers(newAnswers);
    }
  }
  const handleQuizFinished = () => {
    if (userAnswers.includes(0)){
      alert("Please answer all questions before submitting");
    } else {
      let score = 0;
      for (let i = 0; i < userAnswers.length; i++){
        if (userAnswers[i] === answerKey[i]){
          score++;
        }
      }
      alert(`You scored ${score} out of 5`);
    }

  }

  
  return (
    <div>
      {/* It was wrapped in a div because before I was rendering the nav */}
      {/* <NavBar /> */}
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
                  onClick={() => handleSidebarClick(index)}
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

          {/* Render instructions */}
          {questionIndex === -1 ? 
            <div className="flex flex-col gap-y-4">
              <ul className=" list-disc flex flex-col text-2xl gap-y-2 pl-6">
                <li> This quiz consists of 5 questions</li>
                <li> Each question has multiple choice answers</li>
              </ul>
              <button onClick={() => setQuestionIndex(0)} className="text-2xl greenButton w-[200px]">Start Quiz</button>

            </div>
            : null
          }    

          {/* Quiz Started */}
          {Object.entries(quizData).map(
            ([question, answers], index) =>
              index === questionIndex && (
                <div key={question} className="flex flex-col gap-y-8">
                  <h2 className="text-4xl h-[125px] ">{question}</h2>
                  <div className="flex flex-col gap-y-2 w-[900px]">
                    {answers.map((answer, aIndex) => (
                      <p key={aIndex} onClick={() => handleAnswerSelection(answer, aIndex)} className={`text-2xl p-3 rounded-lg ${userAnswers[index] === answer ? "bg-blue-600 text-white" : "multipleChoiceOption" }`}>{`${String.fromCharCode(65 + aIndex)}) ${answer}`}</p>
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
              {questionIndex < Object.keys(quizData).length - 1 && questionIndex >= 0 && (
                <button
                  onClick={handleNextQuestion}
                  className="ml-[600px] w-[150px] text-2xl greenButton"
                >
                  Next
                </button>
              )}
              {questionIndex == Object.keys(quizData).length - 1 && (
                <button
                  onClick={() => handleQuizFinished()}
                  className="ml-[600px] w-[150px] text-2xl greenButton"
                >
                  Submit
                </button>
              )
              }
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizPage;

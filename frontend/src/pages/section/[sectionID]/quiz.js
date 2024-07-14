import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase"; // Adjust the path according to your file structure
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ReviewQuiz from "@/components/ReviewQuiz";
import { useAuth } from "../../../contexts/authContext";

const QuizPage = () => {
  const router = useRouter();
  const { sectionID } = router.query;
  const [quizData, setQuizData] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(-1);
  const [userAnswers, setuserAnswers] = useState([0, 0, 0, 0, 0]);
  const [answerKey, setAnswerKey] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [reviewQuiz, setReviewQuiz] = useState(false);
  const { currentUser } = useAuth();
  const [userID, setUserID] = useState(null);
  const [quizAlreadyDone, setQuizAlreadyDone] = useState(false);
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
              let shuffledAnswers = randomData[key].sort(
                () => Math.random() - 0.5
              );
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

  useEffect(() => {
      console.log(currentUser);
      if (currentUser) setUserID(currentUser.uid);
  }, [currentUser]);
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
    if (questionIndex >= 0) setQuestionIndex(index);
  };
  const handleAnswerSelection = (answer, questionNumber) => {
    if (userAnswers[questionNumber] === answer) {
      let newAnswers = [...userAnswers];
      newAnswers[questionNumber] = 0;
      setuserAnswers(newAnswers);
    } else {
      let newAnswers = [...userAnswers];
      newAnswers[questionIndex] = answer;
      setuserAnswers(newAnswers);
    }
  };
  const handleQuizFinished = async() => {
    if (userAnswers.includes(0)) {
      alert("Please answer all questions before submitting");
    } else {
      let score = 0;
      for (let i = 0; i < userAnswers.length; i++) {
        if (userAnswers[i] === answerKey[i]) {
          score++;
        }
      }
      if (score === 5) {
       


        const docRef = doc(db, `users/${userID}`);
        const docSnap = await getDoc(docRef);

        let completedArray;
        if (docSnap.exists()) {
          let data = docSnap.data();
          completedArray = data.completed;
        }
        if (completedArray.includes(sectionID)) {
          setQuizAlreadyDone(true);
        } else {
          completedArray.push(sectionID);
          await setDoc(docRef, 
            { completed: completedArray },
            { merge: true });
        }
      }
      setQuizFinished(true);
      setQuizScore(score);
    }
  };
  const handleRefresh = () => {
    window.location.reload();
  };
  const handleReviewClick = () => {
    setReviewQuiz(true);
    setQuestionIndex(0);
  };
  return (
    <div>
      {/* It was wrapped in a div because before I was rendering the nav */}
      <Navbar />
      <div className="pt-[60px] flex flex-row gap-x-12">
        {/* Side Bar Container */}
        <div className="w-[500px] flex flex-col gap-y-2 calcPageHeight border-r border-black bg-[#E1E1EA]">
          <div className="flex flex-col gap-y-8 pt-8 pl-8 pr-8 w-full ">
            <h1 className="text-4xl font-extrabold">Questions</h1>
            <ul className=" overflow-hidden text-ellipsis whitespace-nowrap flex flex-col pt-0">
              {Object.keys(quizData).map((key, index) => (
                <div
                  key={index}
                  className={`${
                    questionIndex === index
                      ? "bg-[#737487] rounded-lg text-white"
                      : "bg-[#E1E1EA] hover:bg-[#737487] hover:brightness-150 rounded-lg "
                  }`}
                >
                  <li
                    key={index}
                    onClick={() => handleSidebarClick(index)}
                    className={`hover:brightness-110 text-nowrap text-lg font-semibold cursor-pointer overflow-hidden text-ellipsis p-4`}
                  >
                    Question {index + 1}
                  </li>
                </div>
              ))}
              <Link href={`/section/${sectionID}`} className="pt-6">
                <button className="bg-[#20AC58] text-white text-nowrap text-2xl font-semibold text-center p-3 px-4 rounded-lg w-full">
                  Back to Readings
                </button>
              </Link>
            </ul>
          </div>
        </div>

        {/* Quiz Container */}
        <div className="flex flex-col w-[1100px] gap-y-10 pt-8">
          <h1 className="text-4xl font-extrabold">{sectionID}</h1>
          {/* Render quiz data */}

          {/* Render instructions */}
          {questionIndex === -1 && !quizFinished && (
            <div className="flex flex-col gap-y-4">
              <ul className=" list-disc flex flex-col text-2xl gap-y-2 pl-6">
                <li> This quiz consists of 5 questions</li>
                <li> Each question has multiple choice answers</li>
              </ul>
              <button
                onClick={() => setQuestionIndex(0)}
                className="text-2xl greenButton w-[200px]"
              >
                Start Quiz
              </button>
            </div>
          )}

          {quizFinished ? (
            <div>
              {reviewQuiz ? (
                <div className="flex flex-col gap-y-8">
                  <ReviewQuiz
                    quizData={quizData}
                    userAnswers={userAnswers}
                    answerKey={answerKey}
                    score={quizScore}
                    questionIndex={questionIndex}
                    setQuestionIndex={setQuestionIndex}
                  />
                  <button
                    className="w-[90%] max-w-[900px] duration-300 whiteButton text-black text-2xl font-semibold p-2 px-4 rounded-md"
                    onClick={() => setReviewQuiz(false)}
                  >
                    Finish Review
                  </button>
                </div>
              ) : (
                <div className="mt-[8%] flex flex-col justify-center text-center gap-y-4 w-full">
                  <h1 className="text-5xl font-bold">Congratulations</h1>
                  <h2 className="text-2xl">You have completed the quiz</h2>

                  <h2 className="">Quiz Score: {quizScore} / 5</h2>
                  <h2>{Math.round((quizScore / 5) * 100)}%</h2>
                  <div className="flex flex-col gap-y-3 items-center self-center w-[40%]">
                    <button
                      onClick={() => handleReviewClick()}
                      className="w-full  rounded-md font-bold text-xl text-white p-2 bg-[#20AC58] greenButton "
                    >
                      Review Answers
                    </button>
                    <button
                      onClick={() => handleRefresh()}
                      refresh="true"
                      className="w-full  rounded-md font-bold text-xl text-black p-2 bg-[#ffffff] whiteButton "
                    >
                      Re-Attempt Quiz
                    </button>
                    <Link
                      href={`/section/${sectionID}/`}
                      className="w-full  rounded-md font-bold text-xl text-black p-2 bg-[#ffffff] whiteButton "
                    >
                      Back to Course
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Quiz Started */}
              {Object.entries(quizData).map(
                ([question, answers], index) =>
                  index === questionIndex && (
                    <div key={question} className="flex flex-col gap-y-8">
                      <h2 className="text-4xl h-[125px] ">{question}</h2>
                      <div className="flex flex-col gap-y-2 w-[900px]">
                        {answers.map((answer, aIndex) => (
                          <p
                            key={aIndex}
                            onClick={() =>
                              handleAnswerSelection(answer, aIndex)
                            }
                            className={`text-2xl p-3 rounded-lg hover:bg-[#DDD5E5] cursor-pointer
                              ${
                              userAnswers[index] === answer
                                ? "bg-[#DDD5E5] brightness-75"
                                : "bg-[#DDD5E5] hover:brightness-90 "
                            }`}
                          >{`${String.fromCharCode(
                            65 + aIndex
                          )}) ${answer}`}</p>
                        ))}
                      </div>
                    </div>
                  )
              )}
              {/* Render navigation buttons */}
              <div className="flex w-[900px] justify-between pt-4">
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
                  {questionIndex < Object.keys(quizData).length - 1 &&
                    questionIndex >= 0 && (
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
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;

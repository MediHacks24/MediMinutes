import React, {useEffect, useState} from 'react'



export default function ReviewQuiz({quizData, userAnswers, answerKey, score, questionIndex, setQuestionIndex}) {
    
    useEffect(() => {
        console.log(questionIndex);
    }, [questionIndex]);

   
    const handleNextClick = () => {
        if (questionIndex < userAnswers.length - 1)
        setQuestionIndex(questionIndex + 1);
    }

    const handleBackClick = () => {
        if (questionIndex > 0)
        setQuestionIndex(questionIndex
            - 1);
    }


    return (
    <div className='flex flex-col gap-y-4'>
    { quizData && 
            <div>
        <div className='flex flex-row justify-between'>
        <h1 className='text-4xl pb-2'>Review Quiz</h1>
        <h2 className='text-4xl'>Score: {score} / {userAnswers.length}</h2>
        </div>
        <div className='flex flex-col gap-y-8 max-h-[700px] w-full overflow-y-auto'>
        {Object.entries(quizData)
            .map(([question, answers], index) =>
                (   
                    // filter out all questions except tthe index that matches the question index
                    questionIndex === index &&
                    
                    <div key={question} className="flex flex-col gap-y-2">
                    <h2 className="text-2xl h-[80px] ">{index+1}. {question}</h2>
                    <div className="flex flex-col gap-y-2 w-[900px]">
                    {answers.map((answer, aIndex) => (
                        <p
                        key={aIndex}
                        className={`text-2xl p-3 rounded-lg ${
                            answer === answerKey[index] 
                            ? "bg-green-400"
                            : 
                            answer === userAnswers[index]? "bg-red-400":
                            "bg-[#DDD5E5]"
                            }`}
                            >{`${String.fromCharCode(
                                65 + aIndex
                                )}) ${answer}`}</p>
                            ))}
                            </div>
                            </div>
                        )
                    )}
                    
                    </div>
                    </div>
                }
                <div className='flex flex-row gap-x-24 max-w-[900px]'>
                
                    <button className="w-full hover:scale-105 duration-300 border border-black bg-[#ffffff] text-black text-2xl font-semibold p-2 px-4 rounded-md" onClick={() => handleBackClick()}>Previous question</button>
                    <button className="w-full hover:scale-105 duration-300 border border-black bg-[#20AC58] text-white text-2xl font-semibold p-2 px-4 rounded-md" onClick={() => handleNextClick()}>Next question</button>

                </div>
    </div>
  )
}

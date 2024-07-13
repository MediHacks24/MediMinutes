import React, { useEffect, useState } from 'react';

export default function QuizTime() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className='flex flex-col max-h-[682px] h-[682px] justify-between w-full items-center content-center'>
      <img
        className={`h-[100%] ${animate ? 'frog-animation' : ''}`}
        src='/images/quizTimeFrog.png'
        alt='quiz time'
      />
    </div>
  );
}

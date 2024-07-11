import React from "react";

export default function HomePage() {
  const heading = "Expand Your Health Vocabulary and Test Your Knowledge:";
  const subheading =
    "Empower yourself with essential health knowledge through interactive learning modules and quizzes. Understand diseases and health terminology to enhance your well-being.";

  const containerStyle = {
    position: "relative",
    width: "120px",
    height: "120px",
    marginLeft: "50px",
  };

  const squareStyle = {
    width: "450px",
    height: "450px",
    position: "absolute",
    borderRadius: "20px",
  };

  return (
    <div className="flex flex-row overflow-hidden justify-center mt-10 h-[100vh] pt-[40px]">
      <div className="flex-1 flex flex-col gap-y-2 max-w-[700px]">
        <div className="max-w-[600px] ml-[50px]">
          <h1 className="text-6xl font-bold pb-[25px]" >{heading}</h1>
          <h2 className="font-lighter pb-[25px]">{subheading}</h2>
          <div className="flex gap-x-10">
            <button className="w-[140px] bg-[rgb(32,172,88)] hover:bg-[#20AC58] text-white font-bold rounded-xl text-lg">
              Demo
            </button>
            <button className="w-[140px] text-black font-bold py-2 rounded-xl border border-black text-lg">Sign Up</button>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col gap-y-2 h-fit max-w-[450px] relative ml-[60px]">
        <div className="mr-[20px] w-[450px] h-[450px] absolute rounded-3xl bg-[#65327D]"/>
        <div className="mr-[20px] w-[450px] h-[450px] absolute rounded-3xl bg-white border border-black mt-[10px] ml-[10px]"/>
          <img src="images/healthImage.jpg" alt="Image" className="mr-[20px] h-[450px] absolute rounded-3xl mt-[10px] ml-[10px]"/>
          <img src="images/yellowCircle.png" alt="Image" className="mr-[20px] h-[70px] w-[70px] absolute rounded-3xl mt-auto ml-auto"/> 
      </div>
    </div>
  );
}


// return (
//   <div className='flex flex-row w-[100vw] justify-center gap-x-4' style={{marginLeft: '100px', marginTop: '50px', fontFamily: 'Verdana'}}>
//       <div className='flex-1 flex flex-col gap-y-2 max-w-[700px]'>
//           <h1 className='text-6xl font-bold' style={{paddingBottom: '25px', lineHeight: 1.1, width: '700px' }}>{heading}</h1> 
//           <h2 className='font-lighter' style={{ fontSize: 20, lineHeight: 1.5, paddingBottom: '25px', width: '700px' }}>{subheading}</h2>
//           <div className='flex gap-x-10'>
//               <button className='bg-[#20AC58] hover:bg-[#20AC58] text-white font-bold' style={{width: '120px', borderRadius: '12px'}}>Demo</button>
//               <button className=' text-black font-bold py-2 px-4' style={{width: '120px', borderRadius: '12px', border: '1px solid #000000'}}>Sign Up</button>
//           </div>
//       </div>
//       <div className='flex flex-col gap-y-2 relative content-center justify-center text-white rounded-md px-5 justify-end' style={containerStyle}>
//         <div style={{ ...squareStyle, backgroundColor: '#65327D', marginRight: '20px' }} />
//         <div style={{ ...squareStyle, backgroundColor: 'white', border: '1px solid #000000', marginTop: '10px'}} />
//         {/* <img src="images/healthImage.jpg" alt="Image" style={{...squareStyle, border: '1px solid #000000', marginTop: '10px', marginLeft: '528px'}}/> /}

//       </div>




//       {/ <img src="images/healthImage.jpg" alt="Image" style={{width: '450px', height: '450px', position: 'absolute', borderRadius: '20px', border: '1px solid #000000', marginLeft: '750px', marginTop: '10px'}}/> /}
//       {/ <img src="images/yellowCircle.png" alt="Image" style={{width: '80px', height: '80px', position: 'absolute', marginLeft: '750px', marginBottom: '1500px'}}/> */}

//   </div>
// );
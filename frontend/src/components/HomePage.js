import React from 'react';

export default function HomePage() {
  const heading = "Expand Your Health Vocabulary and Test Your Knowledge:";
  const subheading = "Empower yourself with essential health knowledge through interactive learning modules and quizzes. Understand diseases and health terminology to enhance your well-being.";

  const containerStyle = {
    position: 'relative',
    width: '120px',
    height: '120px',
    marginLeft: '50px',
  };

  const squareStyle = {
    width: '450px',
    height: '450px',
    position: 'absolute',
    borderRadius: '20px'
    
  };
    
  return (
    <div className='flex flex-row gap-x-10' style={{ marginLeft: '100px', marginTop: '50px', fontFamily: 'Verdana'}}>
        <div className='flex flex-col gap-y-2 relative'>
            <h1 className='text-6xl font-bold' style={{paddingBottom: '25px', lineHeight: 1.1, width: '700px' }}>{heading}</h1> 
            <h2 className='font-lighter' style={{ fontSize: 20, lineHeight: 1.5, paddingBottom: '25px', width: '700px' }}>{subheading}</h2>
            <div className='flex gap-x-10'>
                <button className='bg-[#20AC58] hover:bg-[#20AC58] text-white font-bold' style={{width: '120px', borderRadius: '12px'}}>Demo</button>
                <button className=' text-black font-bold py-2 px-4' style={{width: '120px', borderRadius: '12px', border: '1px solid #000000'}}>Sign Up</button>
            </div>
        </div>
        <div className='flex flex-col gap-y-2 relative' style={containerStyle}>
          <div style={{ ...squareStyle, backgroundColor: '#65327D' }} />
          <div style={{ ...squareStyle, backgroundColor: 'white', border: '1px solid #000000', top: '10px', left: '10px' }} />

        </div>
        <img src="images/healthImage.jpg" alt="Image" style={{width: '450px', height: '450px', position: 'absolute', borderRadius: '20px', border: '1px solid #000000', marginLeft: '800px', marginTop: '10px'}}/>
        <img src="images/yellowCircle.png" alt="Image" style={{width: '80px', height: '80px', position: 'absolute', marginLeft: '750px', marginBottom: '1500px'}}/>
        
    </div>
  );
}



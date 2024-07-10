import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase'; // Adjust the path according to your file structure
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import CueCard from '@/components/CueCard';

const ClickedSection = () => {
  const router = useRouter();
  const { sectionID } = router.query;
  const [data, setData] = useState(null);
  const [sortedSections, setSortedSections] = useState([]);
  const [currentSection, setCurrentSection] = useState("");
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (sectionID) {
        try {
          const docRef = doc(db, 'project', sectionID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(docSnap.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.log('Error getting document:', error);
        }
      }
    };

    fetchData();
  }, [sectionID]);

  useEffect(() => {
    sortSections();
  }, [data]);

  const sortSections = () => {
    if (data) {
      const sectionsArray = Object.entries(data)
        .filter(([key]) => key !== 'url')
        .sort(([a], [b]) => parseInt(a) - parseInt(b));
      setSortedSections(sectionsArray);

      let tempHeaderArray = [];
      for (const [key, value] of sectionsArray) {
        if (key.toLowerCase().includes('key facts')) {
          setCurrentSection(key);
        }
        tempHeaderArray.push(key);
      }
      setHeaders(tempHeaderArray);
    }
  };

  const handleBackClick = () => {
    const keys = sortedSections.map(([key, value]) => key);
    const currentIndex = keys.indexOf(currentSection);
    if (currentIndex === 0) {
      return;
    }
    const previousSection = keys[currentIndex - 1];
    setCurrentSection(previousSection);

  }

  const handleNextClick = () => {
    const keys = sortedSections.map(([key, value]) => key);
    const currentIndex = keys.indexOf(currentSection);
    if (currentIndex === keys.length - 1) {
      return;
    }
    const nextSection = keys[currentIndex + 1];
    setCurrentSection(nextSection);
  }


  return (
    <div>
      {data ? (
        <div className='pt-[80px]'>
          <Navbar />
          <div className='flex flex-row gap-x-2'>
            <div className='flex flex-col pl-2 pr-4'>
              <Sidebar data={headers} setCurrentSection={setCurrentSection} pageTopic={sectionID} currentSection={currentSection}/>
            </div>

            <div className='flex flex-col calcWidthOfSection pt-4'>
              <h1 className='text-4xl font-extrabold'>{sectionID}</h1>
                <div className='flex flex-col gap-y-5 pt-[50px]'>
                  {sortedSections
                    .filter(([key, value]) => key === currentSection)
                    .map(([key, value], index) => (
                      <div key={index}>
                        <CueCard header={key.split('-')[1]} body={value} />
                      </div>
                    ))}
                </div>
                <div className='mx-auto pt-[30px]'>
                  <div className='flex flex-row gap-x-4'>
                    <button onClick={() => handleBackClick()} className='bg-[#20AC58] text-white text-2xl font-semibold text-center p-2 px-4 rounded-lg w-full'>Back</button>
                    <button onClick={() => handleNextClick()} className='bg-[#20AC58] text-white text-2xl font-semibold text-center p-2 px-4 rounded-lg w-full'>Next</button>
                  </div>
                </div>
                </div>
                </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClickedSection;

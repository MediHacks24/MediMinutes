import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import AlternateNavbar from '@/components/AlternateNavBar';

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
  }, []);

  // when we get the data from the request we can then get the keyfacts and then sort the sections
  useEffect(() => {
    sortSections();
  }, [data]);



  const sortSections = () => {
    if (data) {
      const sectionsArray = Object.entries(data)
        .filter(([key]) => key !== 'Key Facts')
        .sort(([a], [b]) => parseInt(a) - parseInt(b));
      setSortedSections(sectionsArray);


      let tempHeaderArray = []
      for (const [key, value] of sectionsArray) {
        if (key.toLowerCase().includes('key facts')) {
          setCurrentSection(key);
        }
        tempHeaderArray.push(key)
      }
      setHeaders(tempHeaderArray);
    }
  }

  // useEffect(() => {
  //   console.log("Current section is", currentSection)
  // }, [currentSection])

  return (
    <div className='pt-[80px]'>
    < Navbar />
      <div className='flex flex-row gap-x-2'>
        <div className='flex flex-col pl-2 pr-4'>
          < Sidebar data={headers} setCurrentSection={setCurrentSection} />
        </div>

        <div className='flex flex-col calcWidthOfSection pt-4' >
        
          <h1 className='text-4xl font-extrabold'>{sectionID}</h1>
        {data ? (
            <div className='flex flex-col gap-y-5 pt-[50px]'>
              {sortedSections
                .filter(([key, value]) => key === currentSection)
                .map(([key, value], index) => (
                  <div key={index}>
                    <CueCard header={key.split('-')[1]} body={value} />
                  </div>
                ))
              }
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClickedSection;

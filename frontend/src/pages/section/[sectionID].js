import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ClickedSection = () => {
  const router = useRouter();
  const { sectionID } = router.query;
  const [data, setData] = useState(null);
  const [keyFactsSection, setKeyFactsSection] = useState(null);
  const [sortedSections, setSortedSections] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (sectionID) {
        try {
          const docRef = doc(db, 'project', sectionID);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setData(docSnap.data());
            console.log(docSnap.data());
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

  // when we get the data from the request we can then get the keyfacts and then sort the sections
  useEffect(() => {
    extractKeyFacts();
    sortSections();
  }, [data]);
 
  const extractKeyFacts = () => {
    if (data) {
      for (const key of Object.keys(data)) {
        if (key === 'Key Facts') {
          console.log(data[key])
          let facts = data[key][0];
          let factsArray = [...facts.split('\n')];
          factsArray = factsArray.filter(fact => fact !== "")
          console.log(factsArray)
          setKeyFactsSection(factsArray);
        }
      }
    }
  }

  const sortSections = () => {
    if (data) {
      const sectionsArray = Object.entries(data)
        .filter(([key]) => key !== 'Key Facts')
        .sort(([a], [b]) => parseInt(a) - parseInt(b));
      setSortedSections(sectionsArray);
    }
  }

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-4xl font-extrabold'>{sectionID}</h1>
      {data ? (
        <div className='flex flex-col gap-y-5'>

          {sortedSections
            .map(([key, value], index) => (
              <div key={index}>
                <h2 className='text-2xl font-bold'>{key.split('-')[1]}</h2>
                <div className='flex flex-col gap-y-1'>
                    <p>{value}</p>
                </div>
              </div>
            ))
          }
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClickedSection;

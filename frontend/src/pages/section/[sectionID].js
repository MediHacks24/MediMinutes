import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const ClickedSection = () => {
  const router = useRouter();
  const { sectionID } = router.query;
  const [data, setData] = useState(null);
  const [keyFactsSection, setKeyFactsSection] = useState(null);

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

  useEffect(() => {
    extractKeyFacts();
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

  return (
    <div>
      <h1 className='text-4xl font-extrabold'>{sectionID}</h1>
      {data ? (
        <div className='flex flex-col gap-y-5'>
          {/* KEY FACTS FIRST*/}
          <div className='flex flex-col'>
            {keyFactsSection && keyFactsSection.map((fact, index) => (
              <p key={index} className={`${index === 0 ? "text-2xl font-bold" : "" }`}>{fact}</p>
            ))
            }
          </div>
          {/* EVERYTHING EXCEPT KEY FACTS*/}
          <ul  className='flex flex-col gap-y-5'>
          {Object.entries(data)
            .filter(([key]) => key !== "Key Facts") 
            .map(([key, value], index) => (
              <li key={index}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>



        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClickedSection;

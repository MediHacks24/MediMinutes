import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure to import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function DisplaySections() {
  const [sections, setSections] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'project'));
      const sectionsList = querySnapshot.docs.map((doc) => doc.id); // Get document IDs
      setSections(sectionsList);
    };

    fetchData();
  }, []);

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='text-center text-3xl'>Project Sections</h1>
      {sections ?

        <ul className='grid grid-cols-3 gap-y-3 gap-x-4 px-[4px]'>
        {sections.map((section, index) => (
          <Link  key={index} href={`/section/${section}`} className='h-[60px] p-4 bg-red-400 rounded-md'>
            <li  className='text-center'>{section}</li>
          </Link>
        ))}
      </ul>
      
      :
      <p className='text-3xl font-bold text-center'>Loading...</p>
    }
    </div>
  );
}
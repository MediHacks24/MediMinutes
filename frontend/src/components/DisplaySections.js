import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Make sure to import your Firebase configuration
import { collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';

export default function DisplaySections() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchSectionData = async () => {
      const querySnapshot = await getDocs(collection(db, 'project'));
      const sectionsList = querySnapshot.docs.map((doc) => doc.id); 
      setSections(sectionsList);
    };

    const fetchCategoryData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const categoriesList = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            items: doc.data().items || [], // Assuming the arrays are stored under the 'items' field
          };
        });
        setCategories(categoriesList);
      } catch (error) {
        console.error('Error fetching category data: ', error);
      }
    };

    fetchSectionData();
    fetchCategoryData();
  }, []);

  useEffect(() => {
    console.log(categories);
  }, [sections, categories]);

  return (
    <div className='flex flex-col gap-y-4'>
      <h1 className='text-center text-3xl'>Project Sections</h1>
      {sections.length > 0 && categories.length > 0 ? (
        <div>
          {categories.map((category, index) => (
            <div key={index}>
              <h2 className='text-2xl font-bold'>{category.id}</h2>
              <ul className='grid grid-cols-3 gap-y-3 gap-x-4 px-[4px]'>
                {category.items.map((item, index) => (
                  <Link key={index} href={`/section/${item}`} className='h-[80px] p-4 bg-[#20AC58] rounded-md'>
                    <li className='text-center'>{item}</li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className='text-3xl font-bold text-center'>Loading...</p>
      )}
    </div>
  );
  
}

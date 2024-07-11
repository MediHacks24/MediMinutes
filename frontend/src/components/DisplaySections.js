import React, { useState, useEffect, useMemo } from "react";
import { db } from "../firebase"; // Make sure to import your Firebase configuration
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Navbar from "./Navbar";
import { CircularProgress } from "@mui/material";

const mockCategories = [
  { id: "Adolescent and Child Health", items: ["Section1", "Section2"] },
  { id: "Adult Health", items: [ "Section3", "Section3", "Section3", "Section3", "Section3", "Section3"]},
  { id: "Geriatric Health", items: ["Section4"] },
  { id: "Mental Health", items: ["Section5"] },
  { id: "Child Health1", items: ["Section1", "Section2"] },
  { id: "Child Health2", items: ["Section1", "Section2"] },
  { id: "Child Health3", items: ["Section1", "Section2"] },
  { id: "Child Health4", items: ["Section1", "Section2"] },
  { id: "Child Health5", items: ["Section1", "Section2"] },
  { id: "Child Health6", items: ["Section1", "Section2"] },
  { id: "Child Health7", items: ["Section1", "Section2"] },
  { id: "Child Health8", items: ["Section1", "Section2"] },
];

const mockSections = [
   "Section1", "Section2", "Section3", "Section3", "Section4", "Section5", "Section1", "Section2", "Section3", "Section3", "Section4", "Section5", "Section1", "Section2", "Section3", "Section3", "Section4", "Section5", "Section1", "Section2", "Section3", "Section3", "Section4", "Section5", "Section1", "Section2", "Section3", "Section3", "Section4", "Section5", "Section1", "Section2", "Section3", "Section3", "Section4", "Section5",
];

export default function DisplaySections() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "Adolescent and Child Health"
  );

  useEffect(() => {
    const fetchSectionData = async () => {
      const querySnapshot = await getDocs(collection(db, "project"));
      const sectionsList = querySnapshot.docs.map((doc) => doc.id);
      setSections(sectionsList);
    };

    const fetchCategoryData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "categories"));
        const categoriesList = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            items: doc.data().items || [],
          };
        });
        setCategories(categoriesList);
      } catch (error) {
        console.error("Error fetching category data: ", error);
      }
    };

    // fetchSectionData();
    // fetchCategoryData();
    setSections(mockSections);
    setCategories(mockCategories);
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedSections = useMemo(() => sections, [sections]);

  useEffect(() => {
    console.log(memoizedCategories);
  }, [memoizedSections, memoizedCategories]);

  return (
    <div className="flex flex-col gap-y-4 calcPageHeight max-h-[100vh] w-[100vw] max-w-[100vw] overflow-hidden">
      <Navbar />
      {memoizedSections.length > 0 && memoizedCategories.length > 0 ? (
        <div className="px-6 flex flex-row gap-x-8 h-full w-full">
          {/* List All Sections Here */}
          <div className="min-w-[300px] flex flex-col gap-y-4 pb-8">
            <h2 className="text-2xl">Topics</h2>
            <ul className="flex flex-col gap-y-2 overflow-y-scroll h-full">
              {memoizedSections.map((section, index) => (
                <Link key={index} href={`/section/${section}`}>
                  <li className="text-lg font-semibold cursor-pointer text-nowrap overflow-hidden text-ellipsis border-b-2 p-2 rounded-md duration-200">
                    {section}
                  </li>
                </Link>
              ))}
            </ul>
          </div>

          {/* Right Side Container */}
          <div className="w-full flex flex-col gap-y-8">
            {/* Top Category Slider */}
            <div className="w-fit text-nowrap flex flex-col gap-y-2 mx-auto">
              <h2 className="text-2xl">Categories</h2>
              <div className="w-full max-w-[800px] overflow-x-scroll">
                <ul className="flex flex-row gap-x-4 w-max">
                  {memoizedCategories.map((category, index) => (
                    <li
                      onClick={() => setSelectedCategory(category.id)}
                      key={index}
                      className={`${
                        selectedCategory === category.id
                          ? "bg-[#20AC58] text-white"
                          : "bg-white text-black"
                      } text-nowrap text-lg font-semibold cursor-pointer rounded-md p-2`}
                    >
                      {category.id}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sections In Selected Category */}
            <div className="w-full">
              <div className=" w-full">
                {memoizedCategories
                  .filter((category) => category.id === selectedCategory)
                  .map((category, index) => (
                    <div key={index} className="flex flex-col gap-y-4">
                      <h2 className="text-2xl font-bold">{category.id}</h2>
                      <ul className="grid grid-cols-2 xl:grid-cols-3 gap-y-3 gap-x-4 w-full">
                        {category.items.map((item, index) => (
                          <Link
                            key={index}
                            href={`/section/${item}`}
                            className="h-20 w-full p-1 px-4 content-center bg-[#20AC58] rounded-md"
                          >
                            <li className="text-white text-lg">{item}</li>
                          </Link>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-full">
          <CircularProgress color="success" />
        </div>
      )}
    </div>
  );
}

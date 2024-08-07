import React, { useState, useEffect, useMemo, use } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase"; // Adjust the path according to your file structure

import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Navbar from "./Navbar";
import { CircularProgress } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/authContext";

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.1 },
  }),
  exit: { opacity: 0, x: 20 },
};
const topicsContainer = {
  hidden: { opacity: 0, y: 300 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      delayChildren: 1,
      staggerChildren: 0.4,
    },
  },
  exit: { opacity: 0 },
};

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    transition: { delay: (index % 8) * 0.1 },
  }),
  exit: { opacity: 0, y: -20 },
};

const mockCategories = [
  {
    id: "Adolescent and Child Health",
    items: [
      "Section1",
      "Section2",
      "Section1",
      "Section2",
      "Section1",
      "Section2",
    ],
  },
  {
    id: "Adult Health",
    items: [
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3,",
      "Section3",
      "Section1",
      "Section2",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3,",
      "Section3",
      "Section1",
      "Section2",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3,",
      "Section3",
      "Section1",
      "Section2",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3,",
      "Section3",
      "Section1",
      "Section2",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3,",
      "Section3",
      "Section1",
      "Section2",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3",
      "Section3,",
      "Section3",
      "Section1",
      "Section2",
    ],
  },
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
  { id: "Child Health9", items: ["Section1", "Section2"] },
  { id: "Child Health10", items: ["Section1", "Section2"] },
];

const mockSections = [
  "Section1",
  "Section2",
  "Section3",
  "Section3",
  "Section4",
  "Section5",
  "Section1",
  "Section2",
  "Section3",
  "Section3",
  "Section4",
  "Section5",
  "Section1",
  "Section2",
  "Section3",
  "Section3",
  "Section4",
  "Section5",
  "Section1",
  "Section2",
  "Section3",
  "Section3",
  "Section4",
  "Section5",
  "Section1",
  "Section2",
  "Section3",
  "Section3",
  "Section4",
  "Section5",
  "Section1",
  "Section2",
  "Section3",
  "Section3",
  "Section4",
  "Section5",
];

export default function DisplaySections() {
  const [sections, setSections] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    "Adolescent and Child Health"
  );
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sectionDisplayCap, setSectionDisplayCap] = useState(8);
  const [showSideBar, setShowSideBar] = useState(false);
  const [userID, setUserID] = useState(null);
  const [completed, setCompleted] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    console.log(currentUser);
    if (currentUser) setUserID(currentUser.uid);
  }, [currentUser]);

  useEffect(() => {
    console.log(userID);
    if (userID) {
      const fetchUserData = async () => {
        const docRef = doc(db, `users/${userID}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          let data = docSnap.data();
          let completedArray = data.completed;
          setCompleted(completedArray);
        }
      };
      fetchUserData();
    }
  }, [userID]);

  useEffect(() => {
    console.log(completed);
  }, [completed]);

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

    fetchSectionData();
    fetchCategoryData();
    // setSections(mockSections);
    // setCategories(mockCategories);
  }, []);

  const memoizedCategories = useMemo(() => categories, [categories]);
  const memoizedSections = useMemo(() => sections, [sections]);

  const groupedSections = useMemo(() => {
    return memoizedSections.reduce((acc, section) => {
      const firstLetter = section[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(section);
      return acc;
    }, {});
  }, [memoizedSections]);

  useEffect(() => {
    console.log(memoizedCategories);
  }, [memoizedSections, memoizedCategories]);

  const handlePrevious = () => {
    console.log(categoryIndex);
    if (categoryIndex <= 0) {
      return;
    }
    setCategoryIndex(categoryIndex - 1);
  };
  const handleNext = () => {
    console.log(selectedCategory);
    console.log(categories);
    console.log(JSON.stringify(categories));
    console.log(categoryIndex * 4 + 4, memoizedCategories.length);
    if (categoryIndex * 4 + 4 <= memoizedCategories.length) {
      setCategoryIndex(categoryIndex + 1);
    }
  };
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSectionDisplayCap(8);
  };
  const toggleSidebar = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <div className="flex flex-col select-none	 calcPageHeight max-h-[100vh] w-[100vw] max-w-[100vw] overflow-hidden">
      <Navbar />

      {memoizedSections.length > 0 && memoizedCategories.length > 0 ? (
        <div className="flex flex-row gap-x-8 h-full w-full bg-white">
          {/* Left Container - List All Sections Here */}
          <div
            className={`fixed z-[99] left-0 top-[65px] w-[450px] calcPageHeight flex flex-col gap-y-10 pb-8 bg-white pl-6 pt-8 text-black transition-transform duration-300 ${
              showSideBar ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div
              onClick={toggleSidebar}
              className="h-20 w-14 bg-[#242638] absolute rounded-r-full top-1/2 right-[-56px] cursor-pointer flex items-center justify-center"
            >
              <img
                src="/images/right-arrow.png"
                className={`p-3 invert ${
                  showSideBar ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {showSideBar && (
              <div className="flex flex-col gap-y-6">
                <h2 className="text-3xl">All Topics</h2>
                <ul className="flex flex-col sidebarHeight overflow-y-scroll pr-4">
                  {Object.keys(groupedSections).map((letter) => (
                    <div key={letter}>
                      <h3 className="text-4xl font-bold mt-4">{letter}</h3>
                      {groupedSections[letter].map((section) => (
                        <Link
                          key={section}
                          href={`/section/${section}`}
                          className="rounded-md"
                        >
                          <li
                            className={`${
                              completed.includes(section) ? "bg-green-500 text-white" : "hover:bg-[#242638] hover:text-white"
                            } text-lg font-semibold cursor-pointer text-nowrap overflow-hidden text-ellipsis border-b p-2  rounded-md`}
                          >
                            {section}
                          </li>
                        </Link>
                      ))}
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Side Container */}
          <div className="w-full flex flex-col gap-y-8 bg-white ">
            {/* Top Category Slider */}
            <div className="w-fit text-nowrap flex flex-row gap-x-2 32px] mx-auto pt-8">
              <button
                onClick={handlePrevious}
                className=" text-white w-12 m-4 text-2xl font-semibold p-2 px-4 rounded-md cursor-pointer bg-[#242638] hover:bg-gray-500 duration-300 hover:scale-105"
                disabled={categoryIndex === 0}
              >
                {`<`}
              </button>
              <div className="relative overflow-hidden w-[1248px]">
                <ul
                  className="flex flex-row transition-transform duration-300 ease-in-out gap-x-4"
                  style={{
                    transform: `translateX(-${
                      categoryIndex * (300 + 16) * 4
                    }px)`,
                  }} // (width of category + gap) *  number of cards displayed
                >
                  {memoizedCategories.map((category, index) => (
                    <motion.li
                      onClick={() => handleCategoryChange(category.id)}
                      key={index}
                      className={`${
                        selectedCategory === category.id
                          ? "bg-[#595D89] text-white"
                          : "bg-[#242638] text-white"
                      } text-nowrap text-lg font-semibold cursor-pointer rounded-md p-3 h-[80px]  text-center w-[300px] border flex-shrink-0 flex items-center justify-center hover:scale-105 duration-200`}
                      style={{ outline: "none" }}
                      custom={index}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      {category.id}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <button
                onClick={handleNext}
                className=" text-white w-12 m-4 text-2xl font-semibold p-2 px-4 rounded-md cursor-pointer bg-[#242638] hover:bg-gray-500 duration-300 hover:scale-105"
                disabled={
                  categoryIndex > 0 &&
                  categoryIndex >= memoizedCategories.length - 5
                }
              >
                {`>`}
              </button>
            </div>

            {/* Sections In Selected Category */}
            <motion.div
              variants={topicsContainer}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full overflow-y-auto flex flex-col gap-y-12 pt-12 bg-[#737487] h-full pb-12"
            >
              <h2 className="text-6xl font-bold text-white text-center">
                {selectedCategory}
              </h2>
              <div className="w-full ">
                {memoizedCategories
                  .filter((category) => category.id === selectedCategory)
                  .map((category, index) => (
                    <div key={index} className="flex flex-col gap-y-4 px-36">
                      <ul className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-y-6 gap-x-12 w-full pb-4">
                        <AnimatePresence>
                          {category.items.map(
                            (item, index) =>
                              index < sectionDisplayCap && (
                                <motion.div
                                  className={`${completed.includes(item) ? "bg-green-400 text-white" : "bg-white" } h-20 w-full p-1 px-4 content-center rounded-md`}
                                  custom={index}
                                  variants={containerVariants}
                                  initial="hidden"
                                  animate="visible"
                                  exit="exit"
                                  key={index}
                                >
                                  <Link
                                    key={index}
                                    href={`/section/${item}`}
                                    className=""
                                  >
                                    <li
                                      key={index}
                                      className=" text-lg"
                                    >
                                      {item}
                                    </li>
                                  </Link>
                                </motion.div>
                              )
                          )}
                        </AnimatePresence>
                      </ul>
                    </div>
                  ))}
              </div>

              {categories.find((element) => element.id === selectedCategory)
                ?.items.length > sectionDisplayCap && (
                <button
                  onClick={() => setSectionDisplayCap(sectionDisplayCap + 8)}
                  className="bg-[#20AC58] text-white text-2xl font-semibold text-center p-2 px-4 rounded-lg border border-black w-[200px] mx-auto hover:scale-110 duration-200"
                >
                  Show More
                </button>
              )}
            </motion.div>
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

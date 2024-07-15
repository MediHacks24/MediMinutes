import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "../contexts/authContext";
import { db } from "../firebase"; // Make sure to import your Firebase configuration
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { CircularProgress } from "@mui/material";

export default function User() {
  const [section, setSection] = useState("Completed");
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [completed, setCompleted] = useState([]);
  const [userDoc, setUserDoc] = useState("");
  const { logout, currentUser } = useAuth();
  const [error, setError] = useState("");

  const [categories, setCategories] = useState([]);
  const [allStrings, setAllStrings] = useState(null);

  useEffect(() => {
    console.log(userDoc);
  }, [userDoc]);

  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    } else {
      // Fetch additional user data (username) from Firestore
      async function fetchUserData() {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          console.log(JSON.stringify(userDoc));

          if (userDoc.exists()) {
            setUserDoc(userDoc);
            setUsername(userDoc.data().username);
            setCompleted(userDoc.data().completed);
          } else {
            setUsername("Username not found");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUsername("Error fetching username");
        }
      }

      const fetchCategoryData = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, "categories"));
          const categoriesList = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              items: doc.data().items || [],
            };
          });

          const allStrings = categoriesList
            .flatMap((category) => category.items)
            .sort((a, b) => a.localeCompare(b));

          setCategories(categoriesList);
          setAllStrings(allStrings);
        } catch (error) {
          console.error("Error fetching category data: ", error);
        }
      };
      fetchCategoryData();
      fetchUserData();
    }
  }, [currentUser, router]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      router.push("/login");
    } catch {
      setError("Failed to logout");
    }
  }

  if (!currentUser) {
    return null; // Or a loading spinner
  }

  return (
    <div className="h-[100vh] w-[100vw] max-w-[100vw] max-h-[100vh] overflow-hidden">
      <Navbar />
      <div className="pt-[65px] flex flex-col h-full">
        <div className="h-60 bg-[#242638] 
        ">
          <img className="bg-cover min-h-60 w-screen" src="/images/profilePageBanner.png" alt="MediMinutes Logo" />
        </div>
        {/*  Bototm container */}
        <div className="flex flex-row h-full">
          {/*  Left Bottom container */}
          <div className="flex-1 bg-[#242638] text-white">
            <div className="flex flex-col gap-y-20 items-center">
              <img
                src="/images/account_circle.png"
                alt="MediMinutes Logo"
                className="bg-[#E1E1EA] size-60 rounded-full mt-[-120px]"
              ></img>
              <div className="flex flex-col gap-y-8 text-2xl w-[70%] min-w-[200px]">
                <strong className="bg-[#242638] border-b-2 border-l-2 p-2 text-white border-[#20AC58]">
                  {currentUser ? currentUser.email : "Loading..."}
                </strong>
                <strong className="bg-[#242638] border-b-2 border-l-2 p-2 text-white border-[#20AC58]">
                  {username ? username : "Loading..."}
                </strong>
                <Link
                  href="/updateprofile"
                  className="bg-[#20AC58] text-center text-white p-2 rounded-lg hover:scale-105 cursor-pointer"
                >
                  Update Profile
                </Link>
              </div>
            </div>
          </div>
          {/*  Right Bottom container */}
          <div className="flex-[3] bg-[#E1E1EA]">
            <div className="flex flex-col gap-y-10">
              <div className="flex flex-row justify-between text-2xl pl-12 pr-24 pt-10 ">
                <div className="flex flex-row gap-x-10">
                  <h1
                    onClick={() => setSection("Completed")}
                    className={`${
                      section === "Completed" ? "underline" : ""
                    } hover:cursor-pointer`}
                  >
                    Completed
                  </h1>
                  <h1
                    onClick={() => setSection("In progress")}
                    className={`${
                      section === "In progress" ? "underline" : ""
                    } hover:cursor-pointer`}
                  >
                    Incomplete
                  </h1>
                  <h1
                    onClick={() => setSection("All")}
                    className={`${
                      section === "All" ? "underline" : ""
                    } hover:cursor-pointer`}
                  >
                    All
                  </h1>
                </div>

                <button
                  variant="link"
                  onClick={handleLogout}
                  className=" p-2 bg-[rgb(32,172,88)] text-white px-2 py-2 rounded-xl w-[20%] max-w-[200px]  "
                >
                  Log Out
                </button>
              </div>
              {allStrings ? (
              <div
                className="pl-12 pr-20 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 max-h-[520px] overflow-y-auto pb-8 
                "
              >
                    {section === "In progress" &&
                      allStrings
                        .filter((allStrings) => !completed.includes(allStrings))
                        .map((item, index) => (
                          <Link
                            href={`/section/${item}`}
                            key={index}
                            className="hover:bg-[#3d405e] bg-[#242638] flex flex-row rounded-lg justify-between w-full pr-4"
                          >
                            <h1
                              key={index}
                              className="text-3xl  text-white px-10 h-20 flex items-center rounded-lg"
                            >
                              {item}
                            </h1>
                            <img
                              src={`/images/incomplete.png`}
                              alt="MediMinutes Logo"
                              className="bg-cover h-12 self-center"
                            />
                          </Link>
                        ))}

                    {section === "Completed" &&
                      completed.map((item, index) => (
                        <Link
                          href={`/section/${item}`}
                          key={index}
                          className="hover:bg-[#3d405e] bg-[#242638] flex flex-row rounded-lg justify-between w-full pr-4"
                        >
                          <h1
                            key={index}
                            className="text-3xl  text-white px-10 h-20 flex items-center rounded-lg"
                          >
                            {item}
                          </h1>
                          <img
                            src={`/images/greenCheck.png`}
                            alt="MediMinutes Logo"
                            className="bg-cover h-12 self-center "
                          />
                        </Link>
                      ))}

                    {section === "All" &&
                      allStrings.map((item, index) => (
                        <Link href={`/section/${item}`} key={index} className="hover:bg-[#3d405e] bg-[#242638] rounded-lg flex flex-row justify-between">
                          <h1
                            key={index}
                            className=" text-3xl  text-white px-10 h-20 flex items-center rounded-lg"
                          >
                            {item}
                          </h1>
                          <img src={`${completed.includes(item) ? "/images/greenCheck.png" : "/images/incomplete.png"}`} alt="MediMinutes Logo" className="bg-cover h-12 self-center pr-4" />
                        </Link>
                      ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full scale-150" >
                    <CircularProgress color="success" />
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

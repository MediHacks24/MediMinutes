import Navbar from "@/components/Navbar";
import React, { useState, useEffect } from "react";

const all = [
    "Abuse", "Abortion", "Adolescent Pregnancy", "Adoption", "Aging", "Alcohol", "Anxiety", "Autism", "Bipolar Disorder", "Bullying", "Cancer", "Caregiving", "Child Abuse", "Chronic Illness", "Chronic Pain", "Cognitive Disorders", "College Mental Health", "Coping", "Cultural Competence", "Depression", "Disability", "Disaster", "Divorce", "Domestic Violence", "Eating Disorders", "Elderly", "Emotional Health", "Family Conflict", "Family Stress", "Financial Stress", "Grief", "Happiness", "Healthy Living", "HIV/AIDS", "Homelessness", "Infertility", "Learning Disabilities", "LGBTQ", "Loneliness"
]
const completed = [
    "Abuse", "Adolescent Pregnancy", "Adoption",  "Alcohol", "Anxiety", "Bipolar Disorder", "Cancer", "Caregiving", "Child Abuse", "Chronic Illness", "Chronic Pain", "Cognitive Disorders", "College Mental Health", "Coping", "Cultural Competence", "Depression", "Disability", "Disaster", "Divorce", "Domestic Violence", "Eating Disorders", "Elderly", "Emotional Health", "Family Conflict", "Family Stress", "Financial Stress", "Grief", "Happiness", "Healthy Living", "HIV/AIDS", "Homelessness", "Infertility", "Learning Disabilities", "LGBTQ", "Loneliness"
]
const incompleted = [
    "Abortion", "Bullying", "Autism"
]

export default function user() {
    const [section, setSection] = useState("In progress");

  return (
    <div className="h-[100vh] w-[100vw] max-w-[100vw] max-h-[100vh] overflow-hidden">
      <Navbar />
      <div className="pt-[65px] flex flex-col h-full">
        <div className="h-60 bg-[#242638] 
        ">
          <img className="bg-cover min-h-60" src="/images/healthImage.png" alt="MediMinutes Logo" />
        </div>
        {/*  Bototm container */}
        <div className="flex flex-row h-full">
          {/*  Left Bottom container */}
          <div className="flex-1 bg-[#242638] text-white">
            <div className="flex flex-col gap-y-20 items-center">
              <img src="/images/account_circle.png" alt="MediMinutes Logo"  
              className="bg-[#E1E1EA] size-60 rounded-full mt-[-120px]"></img>
              <div className="flex flex-col gap-y-8 text-3xl w-[70%] min-w-[200px]">
                <input type='text' placeholder="Username" className=" bg-none border-b-2 border-l-2 p-2 text-white bg-[#242638] border-[#20AC58]"/>
                <input type='email' placeholder="Email" className=" bg-none border-b-2 border-l-2 p-2 text-white bg-[#242638] border-[#20AC58]"/>
                <input type='password' placeholder="Edit Password" className=" bg-none border-b-2 border-l-2 p-2 text-white bg-[#242638] border-[#20AC58]"/>
                <button className="bg-[#20AC58] text-white p-2 rounded-lg hover:scale-105 cursor-pointer">Save Changes</button>
              </div>
            </div>
          </div>
            {/*  Right Bottom container */}
          <div className="flex-[3] bg-[#E1E1EA]">
            <div className="flex flex-col gap-y-10">
                <div className="flex flex-row gap-x-10 text-2xl px-10 pt-10 underline">
                    <h1 onClick={() => setSection("All")} className="hover:cursor-pointer">All</h1>
                    <h1 onClick={() => setSection("In progress")} className="hover:cursor-pointer">In progress</h1>
                    <h1 onClick={() => setSection("Completed")} className="hover:cursor-pointer">Completed</h1>
                </div>
                <div className="pl-12 pr-20 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 max-h-[550px] overflow-y-auto pb-8 
                ">
                    { section === "In progress" && 
                        incompleted.map((item) => (
                        <h1 className="text-3xl bg-[#242638] text-white px-10 h-20 flex items-center rounded-lg">{item}</h1>
                    ))}

                    { section === "Completed" && 
                        completed.map((item) => (
                        <h1 className="text-3xl bg-[#242638] text-white px-10 h-20 flex items-center rounded-lg">{item}</h1>
                    ))}

                    { section === "All" &&
                        all.map((item) => (
                        <h1 className="text-3xl bg-[#242638] text-white px-10 h-20 flex items-center rounded-lg">{item}</h1>
                    ))}
                
                   
                
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

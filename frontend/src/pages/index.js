import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DisplaySections from "@/components/DisplaySections";
import FetchData from "@/components/FetchData";
import Navbar from "@/components/Navbar";
import TestComponent from "@/components/TestComponent";
import HomePage from "@/components/HomePage";
import AboutPage from "@/components/AboutPage";

export default function Home() {
  const router = useRouter();

  // Gets the sectionn from the URL and loads it into view - this is for scrolling to the proper section when on a different page
  useEffect(() => {
    const section = router.query.section;
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [router.query]);
//yaaaaaaaaaaa
  return (
    <main className="">
      <Navbar />
      
      <div id="Home" className="h-[100vh] pt-[70px]">
        <HomePage />
      </div>

      {/* Make an About component and render in this div */}
      <div id="About" className="pt-[70px]">
        <AboutPage />
      </div>
      
      {/* Make a Features component and render in this div */}
      <div id="Features" className="h-[100vh] pt-[70px]">
        <h2>Features section</h2>
      </div>
    </main>
  );
}

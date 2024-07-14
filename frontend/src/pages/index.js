import { useEffect } from 'react';
import { useRouter } from 'next/router';
import DisplaySections from "@/components/DisplaySections";
import FetchData from "@/components/FetchData";
import Navbar from "@/components/Navbar";
import TestComponent from "@/components/TestComponent";
import HomePage from "@/components/HomePage";
import AboutPage from "@/components/AboutPage";
import OurTeam from '@/components/OurTeam';

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
      
      <div id="Home" className="h-[100vh] pt-[65px]">
        <HomePage />
      </div>

      {/* Make an About component and render in this div */}
      <div id="About" className="pt-[0px] min-h-[100vh] bg-[#e1e1ea]">
        <AboutPage />
      </div>
      
      {/* Make a Features component and render in this div */}
      <div id="OurTeam" className="h-[100vh] max-w-[100vw] bg-[#e1e1ea] pt-[65px]">
        <OurTeam />
      </div>
      
    </main>
  );
}

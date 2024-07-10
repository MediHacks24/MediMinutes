import DisplaySections from "@/components/DisplaySections";
import FetchData from "@/components/FetchData";
import Navbar from "@/components/Navbar";
import TestComponent from "@/components/TestComponent";

export default function Home() {
  return (
    <main className="">
      <Navbar />
      <div className="pt-[100px]">
        <DisplaySections />
      </div>
    </main>
  );
}

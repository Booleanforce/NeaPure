import CustomerExperience from "./components/CustomerExperience/CustomerExperience";
import PurificationJourney from "./components/Purification/PurificationJourney";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import ProblemSection from "./components/ProblemSection/ProblemSection";
import OurProduct from "./components/OurProduct/OurProduct";
import GenuineFilters from "./components/GenuineFilters/GenuineFilters";
import AskQuestion from "./components/AskQustion/AskQustion";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ProblemSection />
      <PurificationJourney />
      <CustomerExperience />
      <OurProduct />
      <GenuineFilters />
      <AskQuestion />
    </>
  );
}
import CustomerExperience from "./components/CustomerExperience/CustomerExperience";
import PurificationJourney from "./components/Purification/PurificationJourney";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import ProblemSection from "./components/ProblemSection/ProblemSection";
import OurProduct from "./components/OurProduct/OurProduct";
import GenuineFilters from "./components/GenuineFilters/GenuineFilters";
import AskQuestion from "./components/AskQustion/AskQustion";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import DashboardPage from "./components/Dashboard/DashboardPage";
// import WhyChooseNeaPure from "./components/WhyChooseNeaPure/WhyChooseNeaPure";



export default function Home() {
  return (
    <>
      <HeroBanner />
      <ProblemSection />
      <PurificationJourney />
      <CustomerExperience />
      <OurProduct />
      <GenuineFilters />
      {/* <WhyChooseNeaPure /> */}
      <AskQuestion />
      <Login />
      <Register />

      {/* <DashboardPage /> */}

    </>
  );
}
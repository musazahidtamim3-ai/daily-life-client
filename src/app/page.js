import BenefitsSection from "./components/BenefitsSection";
import MostSavedLessons from "./components/dashboard/MostSavedLessons";
import FeaturedCards from "./components/Featured";
import PlatformSlider from "./components/PlatformSlider";
import TopContributors from "./components/TopContributor";

export default function Home() {
  return (
    <div>
      <PlatformSlider />
      <FeaturedCards />
      <BenefitsSection />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5 max-w-7xl mx-auto">
        <TopContributors />
        <MostSavedLessons />
      </div>
    </div>
  );
}

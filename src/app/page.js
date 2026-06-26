import BenefitsSection from "./components/BenefitsSection";
import FeaturedCards from "./components/Featured";
import PlatformSlider from "./components/PlatformSlider";
import TopContributors from "./components/TopContributor";

export default function Home() {
  return (
    <div>
      <PlatformSlider />
      <FeaturedCards />
      <BenefitsSection />
      <TopContributors/>
    </div>
  );
}

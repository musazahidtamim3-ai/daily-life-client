import BenefitsSection from "./components/BenefitsSection";
import FeaturedCards from "./components/Featured";
import PlatformSlider from "./components/PlatformSlider";

export default function Home() {
  return (
    <div>
      <PlatformSlider />
      <FeaturedCards />
      <BenefitsSection/>
    </div>
  );
}

import BannerSlider from "@/components/Hero Section/BannerSlider";
import FindDonorHome from "@/components/FindDonorHome/FindDonorHome";
import HomePageSEO from "@/components/HomePageSEO/HomePageSEO";
import SiteStats from "@/components/SiteStats/SiteStats";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import Loading from "./loading";

export default function Home() {
  return (
    <main>
      <BannerSlider></BannerSlider>
      <FindDonorHome></FindDonorHome>
      <HomePageSEO></HomePageSEO>
      <SiteStats></SiteStats>
      <HowItWorks></HowItWorks>
    </main>
  );
}

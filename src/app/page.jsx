import FindDonor from "@/components/Find Donor/FindDonor";
import Footer from "@/components/footer/Footer";
import BannerSlider from "@/components/Hero Section/BannerSlider";
import Navbar from "@/components/navBar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <BannerSlider></BannerSlider>
      <FindDonor></FindDonor>
      <Footer></Footer>
    </main>
  );
}

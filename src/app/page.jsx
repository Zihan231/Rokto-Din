import Footer from "@/components/footer/Footer";
import BannerSlider from "@/components/Hero Section/BannerSlider";
import Navbar from "@/components/navBar/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar></Navbar>
      <BannerSlider></BannerSlider>
      <Footer></Footer>
    </main>
  );
}

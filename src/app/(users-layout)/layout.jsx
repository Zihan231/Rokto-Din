import Navbar from "@/components/navBar/Navbar";
import Footer from "@/components/footer/Footer";

export const metadata = {
  title: "Rokto Din - Home",
  description: "Rokto Din Blood Donation Platform",
};

export default function UsersLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  );
}
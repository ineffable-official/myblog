import Footer from "./Footer";
import Navbar from "./Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function MainLayout({ children }) {
  return (
    <>
      <div
        className="w-screen h-screen overflow-y-scroll"
        style={poppins.style}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
}

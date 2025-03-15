import "@/assets/styles/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Inconsolata } from "next/font/google";

export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real state",
  description: "Find the perfect rental property",
};

const inconsolata = Inconsolata({ subsets: ["latin"] });

const MainLayout = ({ children }) => {
  return (
    <html>
      <body className={inconsolata.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default MainLayout;

import { Poppins } from "next/font/google";
import "@/app/globals.css"; 
import LayoutWrapper from "./components/LayoutWrapper";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['300', '400', '600', '700']
});

export const metadata = {
  title: "Daily Life Lessons - Share Your Wisdom",
  description: "A premium platform to share and reflect on real-life lessons.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning={true}
      className={`${poppins.className} h-full antialiased`}>
      
      <body className="bg-[#09090b] text-white">
        <LayoutWrapper>
          {children}
          <ToastContainer />
        </LayoutWrapper>

      </body>
    </html>
  );
}

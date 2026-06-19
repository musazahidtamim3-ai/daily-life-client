import { Poppins } from "next/font/google";
import "@/app/globals.css"; // আপনার গ্লোবাল সিএসএস পাথ
import LayoutWrapper from "./components/LayoutWrapper";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ['300', '400', '600', '700']
});

// 👑 আপনার মেটাডাটা এখন এখানে শান্তিতে থাকবে, কোনো এরর আসবে না!
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
        {/* ক্লায়েন্ট র‍্যাপার দিয়ে নেভিগেশন বার ও ফুটোর হ্যান্ডেল করা হচ্ছে */}
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}

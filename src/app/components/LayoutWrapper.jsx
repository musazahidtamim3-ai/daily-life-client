"use client";

import { usePathname } from "next/navigation";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

export default function LayoutWrapper({ children }) {
     const pathname = usePathname();
     const isDashboard = pathname.startsWith("/dashboard");

     return (
          <>
               <Navbar/>
               {children}
               {/* ড্যাশবোর্ড পেজ না হলে কেবল ফুটোর দেখাবে */}
               {!isDashboard && <Footer/>}
          </>
     );
}
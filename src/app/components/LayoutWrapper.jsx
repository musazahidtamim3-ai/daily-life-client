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
               {!isDashboard && <Footer/>}
          </>
     );
}
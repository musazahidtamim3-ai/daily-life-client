"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutList, Plus, BookOpen, Heart, Person, Xmark, Bars } from "@gravity-ui/icons";

export default function DashboardLayout({ children }) {
     const pathname = usePathname();
     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

     const menuItems = [
          { label: "Overview", href: "/dashboard", icon: <LayoutList className="w-5 h-5" /> },
          { label: "Add Lesson", href: "/dashboard/add-lesson", icon: <Plus className="w-5 h-5" /> },
          { label: "My Lessons", href: "/dashboard/my-lessons", icon: <BookOpen className="w-5 h-5" /> },
          { label: "My Favorites", href: "/dashboard/my-favorites", icon: <Heart className="w-5 h-5" /> },
          { label: "Profile", href: "/dashboard/profile", icon: <Person className="w-5 h-5" /> },
     ];

     return (
          /* 💡 h-screen এর বদলে min-h-screen এবং flex-col নিশ্চিত করা হয়েছে */
          <div className="min-h-screen bg-[#09090b] text-white flex flex-col relative">

               {/* 📱 মোবাইল স্ক্রিনের জন্য ফ্লোটিং ড্রয়ার টগল বাটন */}
               <div className="md:hidden fixed bottom-6 right-6 z-50">
                    <button
                         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                         className="flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl shadow-purple-600/30 border border-purple-500/30 focus:outline-none active:scale-95 transition-transform"
                    >
                         {isSidebarOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
                    </button>
               </div>

               {/* 💡 flex-1 এবং h-full দিয়ে কন্টেন্ট প্যানেলকে ডায়নামিক করা হয়েছে */}
               <div className="flex flex-1 relative h-full">

                    {/* 🔹 ১. ডেক্সটপ সাইডবার এবং মোবাইল ড্রয়ার */}
                    <aside
                         className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-neutral-800 bg-[#09090b]/95 backdrop-blur-md pt-24 px-4 transition-transform duration-300 md:translate-x-0 md:bg-[#09090b]
                              ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
                    >
                         {/* মোবাইল ভিউতে মেনু শিরোনাম ও ক্লোজ বাটন */}
                         <div className="flex items-center justify-between mb-6 md:hidden px-2">
                              <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">Dashboard Menu</span>
                              <button
                                   onClick={() => setIsSidebarOpen(false)}
                                   className="p-1 rounded-lg text-neutral-400 hover:bg-neutral-900"
                              >
                                   <Xmark className="w-5 h-5" />
                              </button>
                         </div>

                         {/* মেনু লিংকসমূহ */}
                         <div className="space-y-1">
                              {menuItems.map((item) => {
                                   const isActive = pathname === item.href;
                                   return (
                                        <Link
                                             key={item.href}
                                             href={item.href}
                                             onClick={() => setIsSidebarOpen(false)}
                                             className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                  ? "bg-linear-to-l from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-600/20"
                                                  : "text-neutral-400 hover:bg-neutral-900 hover:text-white"
                                                  }`}
                                        >
                                             {item.icon}
                                             {item.label}
                                        </Link>
                                   );
                              })}
                         </div>
                    </aside>

                    {/* 📱 মোবাইলের জন্য ব্যাকড্রপ ওভারলে */}
                    {isSidebarOpen && (
                         <div
                              onClick={() => setIsSidebarOpen(false)}
                              className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden transition-opacity"
                         />
                    )}

                    {/* 🔹 ২. মেইন কন্টেন্ট এরিয়া (ফুটোরের ওপরে ওঠার সমস্যা সম্পূর্ণ ফিক্সড) */}
                    {/* 💡 এখানে flex-grow এবং min-h-[calc(100vh-80px)] ব্যবহার করা হয়েছে যা ফুটোরকে ধাক্কা দিয়ে নিচে রাখবে */}
                    <div className="flex-1 md:pl-64 pt-20 flex flex-col min-w-0 min-h-[calc(100vh-80px)]">
                         <main className="flex-grow p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24">
                              {children}
                         </main>
                    </div>

               </div>
          </div>
     );
}
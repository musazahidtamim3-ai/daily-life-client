"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sun, Moon, Bars, Xmark } from "@gravity-ui/icons";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
     const pathname = usePathname();
     const router = useRouter();
     const [isMenuOpen, setIsMenuOpen] = useState(false);
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
     const [mounted, setMounted] = useState(false); 
     const dropdownRef = useRef(null);

     const { data: sessionData, isPending } = authClient.useSession();

     const session = sessionData?.session;
     const user = sessionData?.user;
     console.log(user)

     const isLoggedIn = !!session && !!user;

     useEffect(() => {
          setMounted(true);
     }, []);

     const navLinks = [
          { label: "Home", href: "/" },
          { label: "Public Lessons", href: "/public-lessons" },
          ...(isLoggedIn && user?.isPremium === false ? [{ label: "Pricing", href: "/pricing" }] : []),
     ];

     useEffect(() => {
          function handleClickOutside(event) {
               if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsDropdownOpen(false);
               }
          }
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     const handleLogout = async () => {
          try {
               setIsDropdownOpen(false);
               setIsMenuOpen(false);
               await authClient.signOut({
                    fetchOptions: {
                         onSuccess: () => {
                              toast.success("Logged out successfully");
                              router.push("/auth/login");
                              router.refresh();
                         }
                    }
               });
          } catch (err) {
               toast.error("Failed to logout. Try again.");
          }
     };

     return (
          <nav className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-[#09090b]/80 backdrop-blur-md text-white">
               <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between">

                         <div className="flex items-center gap-4">
                              <button
                                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                                   type="button"
                                   className="inline-flex items-center justify-center rounded-md p-2 text-neutral-400 hover:bg-neutral-900 hover:text-white focus:outline-none sm:hidden"
                                   aria-controls="mobile-menu"
                                   aria-expanded={isMenuOpen}
                              >
                                   <span className="sr-only">Open main menu</span>
                                   {isMenuOpen ? <Xmark className="h-6 w-6" /> : <Bars className="h-6 w-6" />}
                              </button>

                              <Link href="/" className="flex items-center gap-2 group">
                                   <h1 className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent text-xl font-bold">Daily Life Lessons</h1>
                              </Link>
                         </div>

                         <div className="hidden sm:flex sm:items-center sm:gap-6">
                              {navLinks.map((item, index) => {
                                   const isActive = pathname === item.href;
                                   return (
                                        <Link
                                             key={index}
                                             href={item.href}
                                             className={`text-sm font-medium relative py-2 transition-colors duration-200 ${isActive ? "text-purple-400" : "text-neutral-400 hover:text-white"}`}
                                        >
                                             {item.label}
                                             {isActive && (
                                                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                                             )}
                                        </Link>
                                   );
                              })}
                         </div>

                         <div className="flex items-center gap-4">
                              {isLoggedIn ? user?.isPremium === true ? (
                                   /* 👑 গর্জিয়াস গ্লোয়িং প্রিমিয়াম ব্যাজ (High Visibility) */
                                   <span className="inline-flex items-center gap-2 bg-linear-to-r from-amber-500 to-yellow-500 text-neutral-950 px-3 py-1.5 text-xs font-black rounded-full shadow-[0_0_15px_rgba(245,158,11,0.4)] border border-amber-400 animate-in fade-in duration-200 select-none uppercase tracking-wide">
                                        {/* ✨ Premium Crown Icon */}
                                        <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 24 24"
                                             fill="currentColor"
                                             className="w-3.5 h-3.5 text-neutral-950"
                                        >
                                             <path d="M2 19h20v2H2v-2zM2 5l3.5 4.5L12 3l6.5 6.5L22 5v12H2V5z" />
                                        </svg>
                                        Premium
                                   </span>
                              ) : (
                                   <span className="inline-flex items-center gap-2 bg-neutral-900 border-2 border-neutral-700 text-neutral-200 px-3 py-1.5 text-xs font-bold rounded-full shadow-md select-none tracking-wide">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                                        Free Plan
                                   </span>
                              ) : []}

                              {/* 🎯 ডেস্কটপ অথেনটিকেশন ব্লক (ফিক্সড ও অপ্টিমাইজড) */}
                              <div className="hidden sm:flex items-center">
                                   {!mounted || isPending ? (
                                        // লোডিং স্টেট বা মাউন্ট হওয়ার আগের কঙ্কাল (Skeleton)
                                        <div className="h-8 w-24 rounded-full bg-neutral-800/60 animate-pulse" />
                                   ) : !isLoggedIn ? (
                                        // লগইন না থাকলে এই বাটনগুলো দেখাবে
                                        <div className="flex items-center gap-4 animate-in fade-in duration-200">
                                             <Link href="/auth/login" className="text-sm font-medium text-neutral-300 hover:text-white transition-colors">
                                                  Login
                                             </Link>
                                             <Link
                                                  href="/auth/register"
                                                  className="rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5"
                                             >
                                                  Sign Up
                                             </Link>
                                        </div>
                                   ) : (
                                        // 👑 সাকসেসফুলি লগইন থাকলে নিখুঁত ড্রপডাউন ব্লক
                                        <div className="relative animate-in fade-in duration-200" ref={dropdownRef}>
                                             <button
                                                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                                  type="button"
                                                  className="flex items-center gap-2 bg-neutral-900/50 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 p-1.5 pr-3 rounded-full transition-all focus:outline-none"
                                             >
                                                  <Image
                                                       height={30}
                                                       width={30}
                                                       className={`h-7 w-7 rounded-full object-cover border ${user?.isPremium === true ? "border-amber-400" : "border-neutral-700"}`}
                                                       src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                                                       alt={user?.name || "User Avatar"}
                                                  />
                                                  <div className="flex items-center gap-1">
                                                       <span className="text-xs font-medium text-neutral-300">Hi, {user?.name?.split(" ")[0]}</span>
                                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3 h-3 text-neutral-500 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                       </svg>
                                                  </div>
                                             </button>

                                             {isDropdownOpen && (
                                                  <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl border border-neutral-800 bg-[#121214] p-1.5 shadow-xl z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                                                       <div className="flex items-center gap-3 px-3 py-2.5 border-b border-neutral-800 mb-1">
                                                            <Image
                                                                 height={30}
                                                                 width={30}
                                                                 className={`h-8 w-8 rounded-full object-cover border ${user?.plan === "premium" ? "border-amber-400" : "border-neutral-700"}`}
                                                                 src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                                                                 alt=""
                                                            />
                                                            <div className="flex flex-col min-w-0">
                                                                 <p className="truncate text-sm font-semibold text-white">{user?.name}</p>
                                                                 <p className={`text-[11px] font-medium tracking-wide uppercase ${user?.plan === "premium" ? "text-amber-400" : "text-neutral-400"}`}>
                                                                      {user?.isPremium===true ? "Premium Plan" : "Free Plan"}
                                                                 </p>
                                                            </div>
                                                       </div>

                                                       <Link href="/dashboard/profile" onClick={() => setIsDropdownOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800/60 rounded-lg transition-colors">Profile</Link>
                                                       <Link href="/dashboard/my-lessons" onClick={() => setIsDropdownOpen(false)} className="block px-3 py-2 text-sm text-neutral-300 hover:bg-neutral-800/60 rounded-lg transition-colors">Dashboard</Link>
                                                       <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">Logout</button>
                                                  </div>
                                             )}
                                        </div>
                                   )}
                              </div>
                         </div>

                    </div>
               </div>

               {/* Mobile Menu */}
               {isMenuOpen && mounted && !isPending && (
                    <div id="mobile-menu" className="sm:hidden border-t border-neutral-900 bg-[#09090b]/98 backdrop-blur-md px-4 pt-4 pb-6 space-y-3">
                         {isLoggedIn && (
                              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-4 mb-4 flex items-center gap-4">
                                   <Image
                                        height={45}
                                        width={45}
                                        className={`h-11 w-11 rounded-full object-cover border ${user?.plan === "premium" ? "border-amber-400" : "border-neutral-700"}`}
                                        src={user?.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb"}
                                        alt=""
                                   />
                                   <div className="flex flex-col min-w-0 flex-grow">
                                        <p className="truncate text-base font-semibold text-white">{user?.name}</p>
                                        <p className={`text-xs font-medium tracking-wide uppercase ${user?.plan === "premium" ? "text-amber-400" : "text-neutral-400"}`}>
                                             {user?.plan === "premium" ? "Premium Member" : "Free Plan User"}
                                        </p>
                                   </div>
                              </div>
                         )}

                         <div className="space-y-1">
                              {navLinks.map((item, index) => (
                                   <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className={`block rounded-lg px-3 py-2.5 text-base font-medium ${pathname === item.href ? "text-purple-400 bg-purple-500/5" : "text-neutral-300 hover:bg-neutral-900"}`}
                                   >
                                        {item.label}
                                   </Link>
                              ))}
                         </div>

                         {!isLoggedIn ? (
                              <div className="mt-4 border-t border-neutral-800 pt-4 space-y-2">
                                   <Link
                                        href="/auth/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block w-full text-center rounded-lg border border-neutral-700 px-3 py-2.5 text-base font-medium text-white hover:bg-neutral-900"
                                   >
                                        Login
                                   </Link>
                                   <Link
                                        href="/auth/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block w-full text-center rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-2.5 text-base font-medium text-white"
                                   >
                                        Sign Up
                                   </Link>
                              </div>
                         ) : (
                              <div className="mt-2 border-t border-neutral-800 pt-3 space-y-1">
                                   <Link
                                        href="/dashboard/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block rounded-lg px-3 py-2.5 text-base font-medium text-neutral-300 hover:bg-neutral-900"
                                   >
                                        My Profile
                                   </Link>
                                   <button
                                        onClick={handleLogout}
                                        className="block w-full text-left rounded-lg px-3 py-2.5 text-base font-medium text-red-400 hover:bg-red-500/10 transition-colors"
                                   >
                                        Logout
                                   </button>
                              </div>
                         )}
                    </div>
               )}
          </nav>
     );
}
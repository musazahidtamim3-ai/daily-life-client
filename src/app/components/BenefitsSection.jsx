"use client";

import React from "react";

export default function BenefitsSection() {
     const benefits = [
          {
               title: "Preserve Your Wisdom",
               description: "Capture your experiences so you never forget the lessons that shaped you.",
               icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-purple-200">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                    </svg>
               ),
          },
          {
               title: "Fuel Personal Growth",
               description: "Reflect, learn, and grow continuously by revisiting your past lessons.",
               icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-purple-200">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a1.195 1.195 0 0 0 1.801 0L21.75 4.5M21.75 4.5H16.5M21.75 4.5v5.25" />
                    </svg>
               ),
          },
          {
               title: "Inspire Others",
               description: "Share your journey and help others who are walking the same path.",
               icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-purple-200">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
               ),
          },
          {
               title: "Build a Meaningful Legacy",
               description: "Leave behind your wisdom for the world and create a lasting impact.",
               icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-purple-200">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
               ),
          },
     ];

     return (
          <section className="relative w-full bg-[#040406] py-24 px-4 overflow-hidden">

               {/* ব্যাকগ্রাউন্ড গ্লো */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[300px] bg-purple-900/5 blur-[140px] rounded-full pointer-events-none z-0" />

               <div className="max-w-7xl mx-auto relative z-10">

                    {/* সেকশন হেডার */}
                    <div className="text-center space-y-3 mb-20">
                         <div className="flex items-center justify-center gap-3">
                              <span className="hidden sm:inline-block text-purple-500/40 text-xl tracking-widest">✦ ──</span>
                              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
                                   Why Learning From Life Matters
                              </h2>
                              <span className="hidden sm:inline-block text-purple-500/40 text-xl tracking-wider">── ✦</span>
                         </div>
                         <p className="text-sm sm:text-base text-neutral-400 font-medium max-w-2xl mx-auto">
                              Every lesson shapes a better you. Here&apos;s why preserving wisdom is life-changing.
                         </p>
                    </div>

                    {/* বেনিফিট কার্ডস গ্রিড */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                         {benefits.map((item, index) => (
                              <article
                                   key={index}
                                   className="group relative rounded-2xl border border-neutral-800/80 bg-neutral-950/40 backdrop-blur-md p-6 pt-12 text-center transition-all duration-500 shadow-[0_0_15px_rgba(168,85,247,0.02)] hover:border-purple-500/40 hover:bg-neutral-900/30 hover:shadow-[0_0_35px_rgba(168,85,247,0.12)] flex flex-col items-center"
                              >

                                   {/* ফ্লোটিং আইকন বক্সের চারপাশেও নিওন গ্লো */}
                                   <div className="absolute top-0 -translate-y-1/2 w-14 h-14 rounded-full bg-linear-to-b from-purple-500 to-indigo-600 p-px shadow-[0_0_15px_rgba(147,51,234,0.3)] group-hover:shadow-[0_0_22px_rgba(147,51,234,0.6)] transition-all duration-500 group-hover:scale-105">
                                        <div className="w-full h-full rounded-full bg-[#0d0b14] flex items-center justify-center">
                                             {item.icon}
                                        </div>
                                   </div>

                                   {/* কন্টেন্ট */}
                                   <div className="space-y-3 mt-2 flex-1 flex flex-col justify-between">
                                        <h3 className="text-base sm:text-lg font-semibold text-amber-400/90 tracking-wide transition-colors duration-300 group-hover:text-amber-400">
                                             {item.title}
                                        </h3>
                                        <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                                             {item.description}
                                        </p>
                                   </div>

                                   {/* কার্ডের নিচে একটি ছোট ইন্টারনাল লাইট স্ট্রিপ গ্লো (Extra Touch) */}
                                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/0 to-transparent group-hover:via-purple-500/40 transition-all duration-700" />

                              </article>
                         ))}
                    </div>

               </div>
          </section>
     );
}
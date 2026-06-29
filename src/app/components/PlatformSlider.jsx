"use client";

import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

export default function PlatformSlider() {
     const [selectedIndex, setSelectedIndex] = useState(0);

     // Initialize Embla with a loop configuration and the Autoplay plugin
     const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
          Autoplay({ delay: 5000, stopOnInteraction: false }),
     ]);

     const scrollPrev = useCallback(() => {
          if (emblaApi) emblaApi.scrollPrev();
     }, [emblaApi]);

     const scrollNext = useCallback(() => {
          if (emblaApi) emblaApi.scrollNext();
     }, [emblaApi]);

     const scrollTo = useCallback((index) => {
          if (emblaApi) emblaApi.scrollTo(index);
     }, [emblaApi]);

     const onSelect = useCallback((emblaApi) => {
          setSelectedIndex(emblaApi.selectedScrollSnap());
     }, []);

     useEffect(() => {
          if (!emblaApi) return;
          onSelect(emblaApi);
          emblaApi.on("reInit", onSelect);
          emblaApi.on("select", onSelect);
     }, [emblaApi, onSelect]);

     const slides = [
          {
               badge: "Welcome to Digital Life Lessons",
               title: "Capture Today. Inspire Tomorrow.",
               description:
                    "A platform to save your life lessons, share your wisdom, and grow together with a community that learns from real experiences.",
               imageSrc: "/slider-01.png", 
               primaryBtnText: "Start Your Journey",
               primaryBtnHref: "/signup",
               secondaryBtnText: "Explore Lessons",
               secondaryBtnHref: "/public-lessons",
          },
          {
               badge: "Knowledge Sharing",
               title: "Learn From Real Human Experiences",
               description:
                    "Bypass generic AI advice and algorithmic fluff. Explore real, hard-earned wisdom shared by creators, entrepreneurs, and thinkers worldwide.",
               imageSrc: "/slider-02.png", 
               primaryBtnText: "Read Lessons",
               primaryBtnHref: "/public-lessons",
               secondaryBtnText: "Pricing Plans",
               secondaryBtnHref: "/pricing",
          },
          {
               badge: "Premium Experience",
               title: "Unlock Deep Insights with Premium",
               description:
                    "Upgrade your account to access advanced lesson categorization, private journaling vaults, interactive dashboards, and seamless cross-device syncing.",
               imageSrc: "/slider-03.png",
               primaryBtnText: "Upgrade Now",
               primaryBtnHref: "/pricing",
               secondaryBtnText: "Dashboard",
               secondaryBtnHref: "/dashboard/my-lessons",
          },
     ];

     return (
          <section className="relative w-full max-w-7xl mx-auto px-4 py-12" aria-label="Platform Highlights">
               {/* Carousel Viewport Container */}
               <div className="overflow-hidden rounded-3xl border border-neutral-800/60 bg-[#060608]" ref={emblaRef}>
                    <div className="flex">
                         {slides.map((slide, index) => (
                              <article
                                   key={index}
                                   className="flex-[0_0_100%] min-w-0 relative"
                              >
                                   <div className="absolute inset-0 w-full h-full z-0">
                                        {slide.imageSrc ? (
                                             <Image
                                                  src={slide.imageSrc}
                                                  alt={slide.title}
                                                  fill
                                                  priority={index === 0}
                                                  className="object-cover"
                                                  sizes="(max-w-1900px) 100vw, 1200px"
                                             />
                                        ) : (
                                             <div className="w-full h-full bg-gradient-to-br from-purple-950/30 via-neutral-950 to-neutral-950" />
                                        )}

                                        <div className="absolute inset-0 bg-black/10 md:bg-gradient-to-r md:from-black/30 md:via-black/20 md:to-black/30 backdrop-blur-[1px]" />
                                   </div>

]                                   <div className="relative w-full min-h-[460px] md:min-h-[500px] p-8 md:p-20 flex flex-col justify-center items-start z-10">
                                        <div className="max-w-xl space-y-6 text-left">

                                             {/* ব্যাজ */}
                                             <span className="inline-block rounded-full bg-purple-950/60 border border-purple-500/30 backdrop-blur-md px-4 py-1.5 text-xs font-semibold text-purple-300 tracking-wide">
                                                  {slide.badge}
                                             </span>

                                             {/* মেইন টাইটেল */}
                                             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-[1.2]">
                                                  {slide.title}
                                             </h2>

                                             {/* ডেসক্রিপশন */}
                                             <p className="text-sm  text-neutral-300 leading-relaxed drop-shadow-sm">
                                                  {slide.description}
                                             </p>

                                             {/* বাটনসমূহ */}
                                             <div className="flex flex-wrap items-center gap-4 pt-2">
                                                  <a
                                                       href={slide.primaryBtnHref}
                                                       className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all hover:-translate-y-0.5"
                                                  >
                                                       {slide.primaryBtnText}
                                                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                                                       </svg>
                                                  </a>
                                                  <a
                                                       href={slide.secondaryBtnHref}
                                                       className="inline-flex items-center rounded-xl border border-neutral-700 bg-black/40 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-neutral-200 hover:text-white hover:bg-black/60 hover:border-neutral-500 transition-all"
                                                  >
                                                       {slide.secondaryBtnText}
                                                  </a>
                                             </div>

                                        </div>
                                   </div>
                              </article>
                         ))}
                    </div>
               </div>

               {/* নেভিগেশন অ্যারো (বামে ও ডানে) */}
               <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between px-2 hidden md:flex pointer-events-none">
                    <button
                         onClick={scrollPrev}
                         type="button"
                         className="p-3.5 rounded-full bg-neutral-950/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all pointer-events-auto backdrop-blur-md shadow-xl"
                         aria-label="Previous Slide"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                         </svg>
                    </button>

                    <button
                         onClick={scrollNext}
                         type="button"
                         className="p-3.5 rounded-full bg-neutral-950/60 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all pointer-events-auto backdrop-blur-md shadow-xl"
                         aria-label="Next Slide"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                         </svg>
                    </button>
               </div>

               {/* নিচের নাম্বার প্রোগ্রেস ইন্ডিকেটর (01 / 02 / 03) */}
               <div className="flex justify-center items-center gap-6 mt-8">
                    {slides.map((_, index) => (
                         <button
                              key={index}
                              onClick={() => scrollTo(index)}
                              type="button"
                              className="group flex flex-col items-center focus:outline-none"
                         >
                              <span className={`text-xs font-bold tracking-widest transition-colors duration-300 ${selectedIndex === index ? "text-purple-400" : "text-neutral-600 hover:text-neutral-400"
                                   }`}>
                                   {String(index + 1).padStart(2, "0")}
                              </span>
                              <div className={`h-[2px] mt-1.5 transition-all duration-300 rounded-full ${selectedIndex === index
                                        ? "w-8 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"
                                        : "w-4 bg-neutral-800 group-hover:bg-neutral-600"
                                   }`} />
                         </button>
                    ))}
               </div>
          </section>
     );
}
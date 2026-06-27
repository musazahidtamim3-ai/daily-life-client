"use client";

import React, { useEffect, useState } from "react";
import { Spinner } from "@heroui/react";
import { Flame, MagnifierPlus } from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { getLessons } from "@/lib/actions/get/lessons";
import { LessonCard } from "../components/LessonCard";

export default function LessonsPage() {
     const [lessons, setLessons] = useState([]);
     const [loading, setLoading] = useState(true);

     const [currentPage, setCurrentPage] = useState(1);
     const [totalPages, setTotalPages] = useState(1);
     const [searchQuery, setSearchQuery] = useState("");
     const [selectedCategory, setSelectedCategory] = useState("");
     const [emotionalTone, setEmotionalTone] = useState("");
     const limit = 4; 

     const { data: sessionData } = authClient.useSession();
     const user = sessionData?.user;

     useEffect(() => {
          async function loadLessons() {
               setLoading(true);
               try {
                    const response = await getLessons(currentPage, limit, searchQuery, selectedCategory, emotionalTone);

                    const incomingData = response?.data || response;
                    const fallbackData = Array.isArray(incomingData) ? incomingData : incomingData ? [incomingData] : [];

                    setLessons(fallbackData);
                    setTotalPages(response?.meta?.totalPages || 1);
               } catch (err) {
                    console.error(err);
               } finally {
                    setLoading(false);
               }
          }

          const delayDebounceFn = setTimeout(() => {
               loadLessons();
          }, 500);

          return () => clearTimeout(delayDebounceFn);
     }, [currentPage, searchQuery, selectedCategory, emotionalTone]);

     const handleSearchChange = (e) => {
          setSearchQuery(e.target.value);
          setCurrentPage(1);
     };

     const handleCategoryChange = (e) => {
          setSelectedCategory(e.target.value);
          setCurrentPage(1);
     };

     const handleEmotionalToneChange = (e) => {
          setEmotionalTone(e.target.value);
          setCurrentPage(1);
     };

     return (
          <div className="w-full min-h-screen bg-[#070709] text-white px-6 md:px-16 py-12">

               {/* Header */}
               <div className="flex flex-col items-center text-center mb-12 space-y-3">
                    <div className="flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-semibold text-purple-400 shadow-lg shadow-purple-500/5">
                         <Flame className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Knowledge Hub
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-white via-neutral-200 to-neutral-500 bg-clip-text text-transparent">
                         Explore Public Life Lessons
                    </h1>
                    <p className="text-neutral-400 text-xs font-light">
                         Real-world knowledge, wisdom, and core life reflections.
                    </p>
               </div>

               {/* Search + Selects */}
               <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 items-end mb-10 bg-[#0c0c10]/40 border border-neutral-900 p-4 rounded-2xl backdrop-blur-md">

                    {/* Search Field */}
                    <div className="space-y-1.5 w-full">
                         <label className="text-xs font-semibold text-neutral-400">Search</label>
                         <div className="relative flex items-center">
                              <MagnifierPlus className="absolute left-4 text-neutral-500 w-4 h-4 pointer-events-none" />
                              <input
                                   type="text"
                                   value={searchQuery}
                                   onChange={handleSearchChange}
                                   placeholder="Search lessons by title or category..."
                                   className="w-full h-11 bg-[#0c0c0e] border border-neutral-800 hover:border-neutral-700 focus:border-purple-500/50 focus:outline-none rounded-xl pl-11 pr-4 text-sm text-white placeholder:text-neutral-500 transition-all"
                              />
                         </div>
                    </div>

                    {/* Category Select */}
                    <div className="space-y-1.5 w-full">
                         <label className="text-xs font-semibold text-neutral-400">Category</label>
                         <select
                              value={selectedCategory}
                              onChange={handleCategoryChange}
                              className="w-full h-11 bg-[#0c0c0e] border border-neutral-800 hover:border-neutral-700 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 text-sm text-neutral-400 transition-all appearance-none cursor-pointer"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                         >
                              <option value="" disabled className="text-neutral-500 bg-[#0c0c0e]">Select Category</option>
                              <option value="Personal Growth" className="text-white bg-[#0c0c0e]">Personal Growth</option>
                              <option value="Career" className="text-white bg-[#0c0c0e]">Career</option>
                              <option value="Mindset" className="text-white bg-[#0c0c0e]">Mindset</option>
                              <option value="Mistakes Learned" className="text-white bg-[#0c0c0e]">Mistakes Learned</option>
                         </select>
                    </div>

                    {/* Emotional Tone Select */}
                    <div className="space-y-1.5 w-full">
                         <label className="text-xs font-semibold text-neutral-400">Emotional Tone</label>
                         <select
                              value={emotionalTone}
                              onChange={handleEmotionalToneChange}
                              className="w-full h-11 bg-[#0c0c0e] border border-neutral-800 hover:border-neutral-700 focus:border-purple-500/50 focus:outline-none rounded-xl px-4 text-sm text-neutral-400 transition-all appearance-none cursor-pointer"
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23737373' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center" }}
                         >
                              <option value="" disabled className="text-neutral-500 bg-[#0c0c0e]">Select Emotional Tone</option>
                              <option value="Motivational" className="text-white bg-[#0c0c0e]">Motivational</option>
                              <option value="Sad" className="text-white bg-[#0c0c0e]">Sad</option>
                              <option value="Realization" className="text-white bg-[#0c0c0e]">Realization</option>
                              <option value="Gratitute" className="text-white bg-[#0c0c0e]">Gratitute</option>
                              
                         </select>
                    </div>

               </div>

               {/* Loader / Grid / Empty */}
               {loading ? (
                    <div className="w-full flex flex-col items-center justify-center py-24 gap-3">
                         <Spinner color="purple" size="lg" />
                         <p className="text-xs text-neutral-500 font-light tracking-wider animate-pulse">Loading insights...</p>
                    </div>
               ) : lessons.length > 0 ? (
                    <div className="max-w-7xl mx-auto space-y-12">
                         {/* Card Grid */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                              {lessons.map((singleLesson, index) => (
                                   <LessonCard
                                        key={singleLesson._id || singleLesson.id || index}
                                        lesson={singleLesson}
                                        user={user}
                                   />
                              ))}
                         </div>

                         {totalPages >= 1 && (
                              <div className="flex items-center justify-center gap-2 pt-6 border-t border-neutral-950">
                                   <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        className="px-4 h-10 text-xs font-semibold rounded-xl border border-neutral-800 text-neutral-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#0c0c10] hover:text-white transition-all duration-200"
                                   >
                                        Previous
                                   </button>

                                   {/* Dynamic Page Numbers */}
                                   {[...Array(totalPages)].map((_, index) => {
                                        const pageNumber = index + 1;
                                        return (
                                             <button
                                                  key={pageNumber}
                                                  onClick={() => setCurrentPage(pageNumber)}
                                                  className={`w-10 h-10 text-xs font-bold rounded-xl border transition-all duration-200 ${currentPage === pageNumber
                                                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-500 text-white shadow-lg shadow-purple-500/20"
                                                            : "border-neutral-800 text-neutral-400 hover:bg-[#0c0c10] hover:text-white"
                                                       }`}
                                             >
                                                  {pageNumber}
                                             </button>
                                        );
                                   })}

                                   {/* Next Button */}
                                   <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        className="px-4 h-10 text-xs font-semibold rounded-xl border border-neutral-800 text-neutral-400 disabled:opacity-20 disabled:cursor-not-allowed hover:bg-[#0c0c10] hover:text-white transition-all duration-200"
                                   >
                                        Next
                                   </button>
                              </div>
                         )}
                    </div>
               ) : (
                    <div className="text-center py-20 text-neutral-500 text-sm font-light">
                         No lessons found matching your criteria.
                    </div>
               )}
          </div>
     );
}
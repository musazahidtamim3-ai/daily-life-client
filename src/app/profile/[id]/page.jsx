"use client";

import React, { useState, useEffect } from "react";
import { Card, Chip } from "@heroui/react";
import { Sparkles, BookOpen, Heart } from "@gravity-ui/icons";
import Image from "next/image";
import { serverFetch } from "@/lib/core/server";

export const getSavedLessons = async (userId) => {
     const res = await fetch(`https://daily-life-server.vercel.app/api/lessons/saved/${userId}`);
     const json = await res.json();
     return json.data || [];
};

export const getLessonByUserId = async (creatorId) => {
     return await serverFetch(`/api/my-lessons/${creatorId}`);
};

export default function CreatorProfile({ params }) {
     const [creatorId, setCreatorId] = useState(null);
     const [userLessons, setUserLessons] = useState([]);
     const [savedLessons, setSavedLessons] = useState([]);
     const [isLessonsLoading, setIsLessonsLoading] = useState(true);

     const [creatorInfo, setCreatorInfo] = useState({
          name: "Creator Profile",
          email: "creator@platform.com",
          image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
          isPremium: true
     });

     useEffect(() => {
          if (params) {
               Promise.resolve(params).then((resolvedParams) => {
                    if (resolvedParams?.id) {
                         setCreatorId(resolvedParams.id);
                    }
               });
          }
     }, [params]);

     useEffect(() => {
          if (!creatorId) return;

          const fetchCreatorData = async () => {
               setIsLessonsLoading(true);
               try {
                    const lessons = await getLessonByUserId(creatorId);
                    setUserLessons(lessons || []);

                    const saved = await getSavedLessons(creatorId);
                    setSavedLessons(saved || []);

                    if (lessons && lessons.length > 0) {
                         setCreatorInfo({
                              name: lessons[0].creatorName || lessons[0].userName || "Jahidul Islam",
                              email: "Verified Creator",
                              image: lessons[0].creatorImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300",
                              isPremium: true
                         });
                    }
               } catch (error) {
                    console.error("Failed to fetch creator profile data:", error);
               } finally {
                    setIsLessonsLoading(false);
               }
          };

          fetchCreatorData();
     }, [creatorId]);

     const stats = [
          { label: "Lessons Created", count: userLessons.length, icon: <BookOpen className="w-5 h-5 text-purple-400" /> },
          { label: "Lessons Saved", count: savedLessons.length, icon: <Heart className="w-5 h-5 text-pink-400" /> },
     ];

     if (!creatorId) {
          return (
               <div className="min-h-[60vh] flex items-center justify-center">
                    <span className="text-sm font-mono text-neutral-500 animate-pulse">Resolving Creator ID...</span>
               </div>
          );
     }

     return (
          <div className="space-y-2 max-w-5xl mx-auto relative z-10 p-4">

               {/* Glow Ambient Design */}
               <div className="absolute left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

               {/* Profile Card */}
               <Card className="border border-neutral-800/80 bg-[#0c0c0e]/80 overflow-hidden backdrop-blur-md rounded-md ">
                    <div className="h-32 w-full bg-gradient-to-r from-indigo-950 via-purple-950 to-neutral-900 border-b border-neutral-800/50" />

                    <div className="px-6 pb-6 sm:px-8 sm:pb-8 relative">
                         <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-12 mb-6">
                              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 text-center sm:text-left">
                                   <Image
                                        height={300}
                                        width={300}
                                        alt={creatorInfo.name}
                                        src={creatorInfo.image}
                                        className="w-24 h-24 rounded-md sm:w-28 sm:h-28 text-large border-4 border-[#0c0c0e] shadow-xl object-cover"
                                   />
                                   <div className="space-y-1.5 pb-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                                             <h2 className="text-2xl font-black text-white">{creatorInfo.name}</h2>
                                             {creatorInfo.isPremium && (
                                                  <Chip color="warning" variant="flat" size="sm" className="font-bold border border-amber-500/20 px-3 py-1 flex items-center justify-center bg-amber-500/10 text-amber-400">
                                                       Premium ⭐
                                                  </Chip>
                                             )}
                                        </div>
                                        <p className="text-xs sm:text-sm text-neutral-400 font-light">{creatorInfo.email}</p>
                                   </div>
                              </div>
                         </div>

                         {/* 📊 Counters */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-neutral-900">
                              {stats.map((stat, i) => (
                                   <div key={i} className="bg-neutral-900/30 border border-neutral-800/40 p-4 rounded-xl flex items-center justify-between">
                                        <div className="space-y-1">
                                             <span className="text-xs text-neutral-400 font-medium">{stat.label}</span>
                                             <p className="text-2xl font-black text-white tracking-tight">{stat.count}</p>
                                        </div>
                                        <div className="p-3 bg-neutral-900/80 border border-neutral-800/60 rounded-xl">
                                             {stat.icon}
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>
               </Card>

               {/* Lessons Section */}
               <div className="space-y-6 pt-6">
                    <div className="flex items-center gap-2 border-b border-neutral-800/60 pb-3">
                         <Sparkles className="w-4 h-4 text-purple-400" />
                         <h3 className="text-lg font-bold text-neutral-200 tracking-tight">Published Lessons</h3>
                         <span className="text-xs font-mono bg-neutral-900 text-neutral-500 px-2 py-0.5 rounded-md">
                              ({userLessons.length})
                         </span>
                    </div>

                    {isLessonsLoading ? (
                         <div className="text-sm font-mono text-neutral-500 animate-pulse py-4">Loading lessons...</div>
                    ) : userLessons.length === 0 ? (
                         <div className="text-sm text-neutral-500 py-4">This creator hasn't published any lessons yet.</div>
                    ) : (
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {userLessons.toReversed().map((lesson) => (
                                   <div
                                        key={lesson._id || lesson.id}
                                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col justify-between shadow-2xl"
                                   >
                                        {/* Top Image Area */}
                                        <div className="relative w-full h-46 rounded-2xl overflow-hidden bg-neutral-900 ">
                                             <Image
                                                  src={lesson.imageUrl || "https://images.unsplash.com/photo-1454649978226-6dd578c28449"}
                                                  alt={lesson.title}
                                                  height={100}
                                                  width={200}
                                                  className="w-full h-full object-cover"
                                             />
                                        </div>

                                        {/* Card Content & Mid Section */}
                                        <div className="flex-1 flex flex-col pt-5 px-1 space-y-4">
                                             <div className="flex flex-wrap items-center gap-2">
                                                  <span className="bg-purple-950/40 border border-purple-900/60 text-purple-400 text-[11px] font-semibold px-3 py-1 rounded-full">
                                                       {lesson.category}
                                                  </span>
                                                  <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[11px] font-semibold px-3 py-1 rounded-full">
                                                       {lesson.emotionalTone}
                                                  </span>
                                             </div>

                                             <div className="space-y-2">
                                                  <div className="flex items-center gap-2">
                                                       <h3 className="text-xl font-extrabold text-white tracking-tight line-clamp-1">
                                                            {lesson.title}
                                                       </h3>
                                                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wide uppercase ${lesson.accessLevel === 'premium'
                                                                 ? "bg-amber-500/10 border-amber-500/30 text-amber-400"
                                                                 : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                                            }`}>
                                                            {lesson.accessLevel || 'free'}
                                                       </span>
                                                  </div>
                                                  <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                                                       {lesson.description}
                                                  </p>
                                             </div>
                                        </div>

                                        {/* Bottom Box */}
                                        <div className="mt-2 rounded-2xl p-3 flex items-center justify-between">
                                             <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                                                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-neutral-800 bg-neutral-900 flex-shrink-0">
                                                       <Image
                                                            src={lesson.creatorImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                                                            alt={lesson.creatorName || "Creator"}
                                                            fill
                                                            sizes="32px"
                                                            className="object-cover"
                                                       />
                                                  </div>
                                                  <p className="text-sm font-medium text-neutral-300 truncate">
                                                       {lesson.creatorName || lesson.userName || "Jahidul Islam"}
                                                  </p>
                                             </div>

                                             <div className="flex items-center gap-1.5 text-sm text-rose-400">
                                                  <Heart className="w-3 h-3 fill-rose-500/10" /> {lesson.likes?.length || 0} Likes
                                             </div>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    )}
               </div>
          </div>
     );
}
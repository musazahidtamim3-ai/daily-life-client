"use client";

import React from "react";
import { Card, CardHeader, Avatar, Button, Chip } from "@heroui/react";
import { Lock, Eye, Calendar } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";

export function LessonCard({ lesson, user }) {
     if (!lesson) return null;

     const { title, description, category, emotionalTone, imageUrl, accessLevel, creatorInfo } = lesson;

     const isUserPremium = user?.isPremium === true;
     const isLessonPremium = user?.isPremium === true;
     const isLocked = isLessonPremium && !isUserPremium;

     const creatorName = creatorInfo?.name || "Jahidul Islam";
     const creatorAvatar = creatorInfo?.image || creatorInfo?.avatar || "https://i.pravatar.cc/150?img=33";

     return (
          <Card className="w-full bg-[#0c0c10]/90 border border-neutral-900 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-300 group flex flex-col justify-between shadow-xl relative">

               {isLocked && (
                    <div className="absolute inset-0 bg-[#070709]/85 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-4 text-center">
                         <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-2 shadow-lg animate-pulse">
                              <Lock className="w-4 h-4" />
                         </div>
                         <h4 className="text-white font-bold text-sm">Premium Content</h4>
                         <p className="text-neutral-400 text-[11px] font-light max-w-[160px] mt-0.5">Upgrade your account to unlock.</p>
                         {
                              !user ? <Link href={'/auth/login'}><Button size="sm" className="mt-3 font-bold bg-linear-to-r from-amber-500 to-amber-400 text-black hover:bg-amber-400 text-xs rounded-lg h-8">Upgrade</Button></Link> : <Link href={'/pricing'}><Button size="sm" className="mt-3 font-bold bg-amber-500 text-black hover:bg-amber-400 text-xs rounded-lg h-8">Upgrade</Button></Link>
                         }
                    </div>
               )}

               <div>
                    {imageUrl && (
                         <div className="relative w-full h-36 overflow-hidden bg-neutral-950">
                              <Image
                                   height={100}
                                   width={200}
                                   src={imageUrl}
                                   alt={title}
                                   className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isLocked ? "blur-sm" : ""}`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c10] to-transparent" />
                              <div className="absolute top-3 right-3 z-20">
                                   <span className={`text-[10px] tracking-wider font-extrabold px-2.5 py-1 rounded-md uppercase backdrop-blur-md shadow-lg border ${isLessonPremium
                                        ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                                        : "bg-purple-500/20 text-purple-400 border-purple-500/30"
                                        }`}>
                                        {accessLevel}
                                   </span>
                              </div>
                         </div>
                    )}

                    <CardHeader className="flex flex-row items-center gap-1.5 pt-3 px-4 pb-1 flex-nowrap overflow-x-auto scrollbar-hide">
                         <Chip size="sm" variant="flat" className="bg-purple-500/10 text-purple-400 border border-purple-500/10 font-semibold text-[10px] rounded-lg h-5 shrink-0">
                              {category}
                         </Chip>
                         <Chip size="sm" variant="flat" className="bg-neutral-900 text-neutral-400 border border-neutral-800 font-semibold text-[10px] rounded-lg h-5 shrink-0">
                              {emotionalTone}
                         </Chip>
                    </CardHeader>

                    <div className="px-4 py-2 space-y-1.5">
                         <h3 className="text-sm font-bold text-white tracking-tight leading-snug group-hover:text-purple-400 transition-colors line-clamp-2">
                              {title}
                         </h3>
                         <p className="text-[11px] text-neutral-400 font-light leading-relaxed line-clamp-2">
                              {description}
                         </p>
                    </div>
               </div>

               <div className="p-3 mx-3 mb-3 flex items-center justify-between border-t border-neutral-900/60 bg-[#121217]/50 rounded-xl mt-3">
                    <div className="flex items-center gap-2">
                         <Avatar src={creatorAvatar} size="sm" className="w-6 h-6 border border-neutral-800" />
                         <div className="flex flex-col">
                              <span className="text-[11px] font-medium text-neutral-300 leading-none">{creatorName}</span>
                              <span className="text-[9px] text-neutral-500 font-light mt-0.5 flex items-center gap-0.5">
                                   <Calendar className="w-2.5 h-2.5" /> Recent
                              </span>
                         </div>
                    </div>
                    <Link href={`/public-lessons/${lesson._id}`}>
                         <Button
                              size="sm"
                              radius="lg"
                              endContent={<Eye className="w-3 h-3" />}
                              className="bg-linear-to-l from-indigo-500 to-purple-500 hover:bg-purple-600 text-white font-semibold text-[10px] h-7 px-3 transition-all hover:scale-95"
                         >
                              See Details
                         </Button>
                    </Link>
               </div>
          </Card>
     );
}
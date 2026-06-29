import React from 'react';
import Image from 'next/image';
import { Flame, Heart } from "@gravity-ui/icons";
import { getFeaturedLessons } from '@/lib/actions/get/lessons';

const FeaturedCards = async () => {
     const lessons = await getFeaturedLessons();
     ;
     const featuredLessons = Array.isArray(lessons) ? lessons : [];

     if (featuredLessons.length === 0) return null;

     return (
          <section className="w-full max-w-7xl mx-auto md:px-16 py-16 space-y-10">

               {/* Section Header */}
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-900 pb-6">
                    <div className="space-y-2">
                         <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-[11px] font-bold text-amber-400 tracking-wider uppercase">
                              <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Editor's Choice
                         </div>
                         <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white">
                              Featured Life Wisdom
                         </h2>
                         <p className="text-neutral-400 text-xs md:text-sm font-light max-w-xl">
                              Handpicked core lessons and highly insightful reflections to accelerate your personal transformation.
                         </p>
                    </div>
               </div>

               {/* 🎴 Cards Grid */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredLessons.map((lesson) => {
                         const lessonId = lesson._id?.$oid || lesson._id;
                         const isPremium = lesson.accessLevel === "premium" ;

                         return (
                              <div
                                   key={lessonId}
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

                                        <div className="absolute top-3 right-3 bg-black/30 text-amber-200 text-[10px] font-black px-3 py-1.5 rounded-xl tracking-wider ">
                                             FEATURED
                                        </div>
                                   </div>

                                   {/* Card Content & Mid Section */}
                                   <div className="flex-1 flex flex-col pt-5 px-1 space-y-4">

                                        {/* Badges row: Category, Tone & Moved AccessLevel */}
                                        <div className="flex flex-wrap items-center gap-2">
                                             <span className="bg-purple-950/40 border border-purple-900/60 text-purple-400 text-[11px] font-semibold px-3 py-1 rounded-full">
                                                  {lesson.category}
                                             </span>
                                             <span className="bg-neutral-900 border border-neutral-800 text-neutral-400 text-[11px] font-semibold px-3 py-1 rounded-full">
                                                  {lesson.emotionalTone}
                                             </span>
                                        </div>

                                        {/* Title & Description Preview */}
                                        <div className="space-y-2">
                                             <div className="flex items-center gap-2">
                                                  <h3 className="text-xl font-extrabold text-white tracking-tight line-clamp-1">
                                                       {lesson.title}
                                                  </h3>
                                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wide uppercase ${isPremium
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

                                   {/* Inner Bottom Box (Creator Info & Action Button) */}
                                   <div className=" mt-2 rounded-2xl p-3 flex items-center justify-between">
                                        {/* Creator Info */}
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
                                             <Heart className="w-3 h-3 fill-rose-500/10" /> {lesson.likes.length || 0} Likes
                                        </div>
                                   </div>

                              </div>
                         );
                    })}
               </div>
          </section>
     );
};

export default FeaturedCards;
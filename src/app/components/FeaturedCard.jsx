"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart } from "@gravity-ui/icons";

const containerVariants = {
     hidden: {},
     visible: {
          transition: {
               staggerChildren: 0.12,
          },
     },
};

const cardVariants = {
     hidden: { opacity: 0, y: 32, scale: 0.96 },
     visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
     },
};

const FeaturedCardsGrid = ({ featuredLessons }) => {
     return (
          <motion.div
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.2 }}
          >
               {featuredLessons.map((lesson) => {
                    const lessonId = lesson._id?.$oid || lesson._id;
                    const isPremium = lesson.accessLevel === "premium";

                    return (
                         <motion.div
                              key={lessonId}
                              variants={cardVariants}
                              whileHover={{ y: -6, scale: 1.015 }}
                              transition={{ type: "spring", stiffness: 260, damping: 20 }}
                              className="w-full bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col justify-between shadow-2xl"
                         >
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

                              <div className=" mt-2 rounded-2xl p-3 flex items-center justify-between">
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

                         </motion.div>
                    );
               })}
          </motion.div>
     );
};

export default FeaturedCardsGrid;
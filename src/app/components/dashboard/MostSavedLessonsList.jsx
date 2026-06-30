"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Bookmark } from '@gravity-ui/icons';

const rankConfig = [
     {
          label: 'MOST SAVED',
          icon: '🥇',
          border: 'border-amber-500/30',
          bg: 'bg-amber-500/5',
          badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-400',
          countColor: 'text-amber-400',
     },
     {
          label: 'TOP SAVED',
          icon: '🥈',
          border: 'border-zinc-600/40',
          bg: 'bg-zinc-800/10',
          badgeBg: 'bg-zinc-700/40 border-zinc-600/30 text-zinc-400',
          countColor: 'text-emerald-400',
     },
];

const containerVariants = {
     hidden: {},
     visible: {
          transition: {
               staggerChildren: 0.12,
          },
     },
};

const itemVariants = {
     hidden: { opacity: 0, x: -20 },
     visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
     },
};

export default function MostSavedLessonsList({ lessons }) {
     return (
          <motion.div
               className="space-y-4"
               variants={containerVariants}
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }}
          >
               {lessons.map((lesson, index) => {
                    const config = rankConfig[index];
                    const savesCount = lesson.saves?.length || 0;

                    return (
                         <motion.div
                              key={lesson._id}
                              variants={itemVariants}
                              whileHover={{ scale: 1.015, x: 4 }}
                              transition={{ type: "spring", stiffness: 280, damping: 22 }}
                              className={`flex items-center gap-4 p-4 rounded-2xl border ${config.border} ${config.bg} transition hover:bg-zinc-800/20 group`}
                         >
                              <div className="hidden lg:flex relative w-20 h-14 rounded-xl overflow-hidden border border-zinc-700/50 shrink-0">
                                   {lesson.imageUrl ? (
                                        <Image
                                             src={lesson.imageUrl}
                                             alt={lesson.title}
                                             fill
                                             className="object-cover"
                                        />
                                   ) : (
                                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-600 text-xl">
                                             📖
                                        </div>
                                   )}
                              </div>

                              <div className="flex flex-col min-w-0 flex-1 gap-1.5">
                                   <h3 className="font-bold text-zinc-100 text-sm line-clamp-1 group-hover:text-blue-400 transition">
                                        {lesson.title}
                                   </h3>
                                   <div className="flex items-center gap-2 flex-wrap">
                                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${config.badgeBg}`}>
                                             {config.icon} {config.label}
                                        </span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
                                             {lesson.category}
                                        </span>
                                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                                             {lesson.emotionalTone}
                                        </span>
                                   </div>
                              </div>

                              <div className="flex flex-col items-end gap-2 shrink-0">
                                   <span className={`flex items-center gap-1 text-sm font-black ${config.countColor}`}>
                                        <Bookmark className="w-3.5 h-3.5" /> {savesCount}
                                        <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider ml-0.5">saves</span>
                                   </span>
                              </div>

                         </motion.div>
                    );
               })}
          </motion.div>
     );
}
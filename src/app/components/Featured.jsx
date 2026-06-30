import React from 'react';
import { Flame } from "@gravity-ui/icons";
import { getFeaturedLessons } from '@/lib/actions/get/lessons';
import FeaturedCardsGrid from './FeaturedCard';

const FeaturedCards = async () => {
     const lessons = await getFeaturedLessons();
     const featuredLessons = Array.isArray(lessons) ? lessons : [];

     if (featuredLessons.length === 0) return null;

     return (
          <section className="w-full max-w-7xl mx-auto md:px-16 py-16 space-y-10">

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

               <FeaturedCardsGrid featuredLessons={featuredLessons} />

          </section>
     );
};

export default FeaturedCards;
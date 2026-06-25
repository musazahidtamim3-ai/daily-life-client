import { getUserSession } from '@/lib/core/session';
import React from 'react';
import Link from 'next/link';

import {
     Eye,
     Calendar,
     Clock,
     ArrowRight
} from '@gravity-ui/icons';
import { getLessonById } from '@/lib/actions/get/lessons';
import Image from 'next/image';
import { LessonInteractions } from '@/app/components/LessonsInteractions';

export const dynamic = 'force-dynamic';

const LessonDetailsPage = async ({ params }) => {
     const { id } = await params;
     const lesson = await getLessonById(id); 

     if (!lesson) {
          return (
               <div className="flex items-center justify-center min-h-[60vh] bg-zinc-950">
                    <p className="text-sm font-semibold tracking-widest text-zinc-500 uppercase">Lesson Not Found</p>
               </div>
          );
     }

     const user = await getUserSession();
     const isPremiumUser = user?.isPremium;
     const isAuthor = user?.id === lesson.creatorId;

     // ⭐ Premium Member Lock - Ultra Premium Glassmorphism View
     if (lesson.isPremium && !isPremiumUser && !isAuthor) {
          return (
               <div className="relative min-h-[80vh] flex items-center justify-center px-6 bg-zinc-950">
                    <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-72 h-72 bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />

                    <div className="relative max-w-sm w-full bg-zinc-900/60 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.4)] text-center">
                         <div className="w-12 h-12 bg-gradient-to-l from-amber-500 to-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-5 text-xl shadow-lg shadow-amber-500/20">
                              ⭐
                         </div>
                         <h2 className="text-xl font-bold tracking-tight text-white mb-2">Premium Member Lock</h2>
                         <p className="text-xs text-zinc-400 mb-6 leading-relaxed px-2">
                              "{lesson.title}" is only for premium users
                         </p>
                         <Link
                              href="/pricing"
                              className="block w-full text-center text-xs tracking-wider uppercase font-bold bg-gradient-to-r from-amber-500 to-yellow-500 hover:opacity-90 text-zinc-950 py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md shadow-amber-500/10"
                         >
                              Unlock Membership
                         </Link>
                    </div>
               </div>
          );
     }

     const wordCount = lesson.description?.split(/\s+/).length || 0;
     const readingTime = Math.max(1, Math.ceil(wordCount / 200));
     const viewsCount = lesson.viewsCount || Math.floor(Math.random() * 10000);

     return (
          <main className="min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
               {/* Background Ambient Light Effect */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-indigo-500/5 via-transparent to-transparent blur-[140px] pointer-events-none" />

               <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">

                    {/* 1. HEADER SECTION */}
                    <header className=" mb-12 space-y-5">
                         <div className="flex flex-wrap items-center gap-2.5">
                              <span className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                                   {lesson.category || "Career"}
                              </span>
                              <span className="text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                                   🎭 {lesson.emotionalTone || "Realization"}
                              </span>
                              {lesson.isPremium && (
                                   <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 shadow-md shadow-amber-500/10">
                                        ⭐ Premium
                                   </span>
                              )}
                         </div>

                         <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-[1.15]">
                              {lesson.title}
                         </h1>
                    </header>

                    {/* FEATURED BANNER IMAGE (If exists) */}
                    {lesson.imageUrl && (
                         <div className="w-full h-[280px] md:h-[460px] relative rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-zinc-900 mb-12 group">
                              <Image src={lesson.imageUrl} alt={lesson.title} width={1000} height={280} className="object-cover w-full h-full" />
                              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/40 via-transparent to-transparent" />
                         </div>
                    )}

                    {/* CORE CONTENT & SIDEBAR GRID */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

                         {/* LEFT COLUMN: Lesson Details & Interactions */}
                         <div className="lg:col-span-2 space-y-10">

                              {/* 2. LESSON INFORMATION SECTION */}
                              <article className="text-zinc-300 text-[17px] md:text-lg leading-relaxed font-normal whitespace-pre-line bg-zinc-900/20 border border-zinc-900/60 p-6 md:p-8 rounded-3xl shadow-sm">
                                   {lesson.description}
                              </article>

                              {/* 4 & 5. STATS & INTERACTION BUTTONS */}
                              <LessonInteractions lesson={lesson} viewsCount={viewsCount} />

                              {/* 6. COMMENT SECTION */}
                              <section className="space-y-5 bg-zinc-900/10 border border-zinc-900 p-6 rounded-3xl">
                                   <div className="flex items-center justify-between">
                                        <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400">Discussion Forum</h3>
                                        <span className="text-[10px] bg-zinc-900 px-2.5 py-1 rounded-md text-zinc-500 border border-zinc-800">0 Comments</span>
                                   </div>

                                   {user ? (
                                        <div className="relative flex items-center border border-zinc-800 focus-within:border-zinc-700 focus-within:ring-1 focus-within:ring-zinc-700 rounded-2xl bg-zinc-950 p-2 transition-all duration-200">
                                             <input
                                                  type="text"
                                                  placeholder="Add your insight to this lesson..."
                                                  className="w-full px-4 py-2 text-sm bg-transparent text-zinc-100 focus:outline-none placeholder-zinc-500"
                                             />
                                             <button className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 text-zinc-950 rounded-xl transition shadow-md">
                                                  Post
                                             </button>
                                        </div>
                                   ) : (
                                        <div className="text-xs text-zinc-400 bg-zinc-950/60 p-4 rounded-xl border border-zinc-900 text-center tracking-wide">
                                             Please log in to participate in the conversation.
                                        </div>
                                   )}
                                   <div className="text-xs text-zinc-500 py-4 text-center tracking-wide font-medium">No insights shared yet. Start the thread!</div>
                              </section>
                         </div>

                         {/* RIGHT COLUMN: SIDEBAR MODULES (Beautifully Contained) */}
                         <div className="lg:col-span-1 space-y-6">

                              {/* 3. AUTHOR / CREATOR SECTION */}
                              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-5 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                                   <h3 className="text-[10px] font-black tracking-widest uppercase text-zinc-400">Storyteller</h3>

                                   <div className="flex items-center gap-4">
                                        <div className="relative w-12 h-12 rounded-full overflow-hidden border border-zinc-700 bg-zinc-800">
                                             <Image
                                                  src={lesson.creatorImage || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                                                  height={20}
                                                  width={20}
                                                  alt={lesson.creatorName}
                                                  className="object-cover w-full h-full"
                                             />
                                        </div>
                                        <div>
                                             <h4 className="font-bold text-sm text-white tracking-tight">
                                                  {lesson.creatorName || "Anonymous Creator"}
                                             </h4>
                                             <p className="text-[10px] text-zinc-500 uppercase font-semibold tracking-wider mt-0.5">
                                                  {lesson.creatorPlan === 'premium' ? '💎 Premium Tier' : 'Standard Member'}
                                             </p>
                                        </div>
                                   </div>

                                   <div className="h-[1px] bg-zinc-800" />

                                   <div className="text-xs text-zinc-400 flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-900">
                                        <span>Published Portfolio</span>
                                        <span className="font-mono text-white font-bold bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                                             {lesson.creatorTotalLessons || 1}
                                        </span>
                                   </div>

                                   <Link
                                        href={`/profile/${lesson.creatorId}`}
                                        className="flex items-center justify-center gap-2 w-full text-xs font-bold bg-zinc-900 hover:bg-zinc-850 text-white py-3 px-4 border border-zinc-800 rounded-xl transition-all duration-200 group"
                                   >
                                        Creator Profile
                                        <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white transition-colors" />
                                   </Link>
                              </div>

                              {/* 2. LESSON METADATA */}
                              <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-2xl space-y-4 text-xs text-zinc-400 shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
                                   <h3 className="text-[10px] font-black tracking-widest uppercase text-zinc-400 mb-1">Timeline</h3>

                                   <div className="flex items-center justify-between py-2 border-b border-zinc-800/60">
                                        <span className="flex items-center gap-2 text-zinc-500"><Calendar className="w-4 h-4" /> Date Published</span>
                                        <span className="font-bold text-zinc-200">{new Date(lesson.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                   </div>

                                   <div className="flex items-center justify-between py-2 border-b border-zinc-800/60">
                                        <span className="flex items-center gap-2 text-zinc-500"><Clock className="w-4 h-4" /> Read Length</span>
                                        <span className="font-bold text-zinc-200">{readingTime} min read</span>
                                   </div>

                                   <div className="flex items-center justify-between py-1.5">
                                        <span className="flex items-center gap-2 text-zinc-500"><Eye className="w-4 h-4" /> Visibility</span>
                                        <span className="font-extrabold text-emerald-400 uppercase tracking-widest text-[10px]">Public</span>
                                   </div>
                              </div>

                         </div>
                    </div>

                    {/* 7. SIMILAR & RECOMMENDED LESSONS */}
                    <section className="mt-20 pt-12 border-t border-zinc-900 space-y-6">
                         <div>
                              <h2 className="text-[10px] font-black tracking-widest uppercase text-zinc-500">Curated For You</h2>
                              <p className="text-xl font-bold text-white mt-1">More Life Lessons & Insights</p>
                         </div>

                         {/* Card Layout Target Area */}
                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                              <div className="text-xs text-zinc-500 col-span-full py-12 text-center border border-dashed border-zinc-800 rounded-3xl bg-zinc-900/10">
                                   Filter from DB matching category: <code className="bg-zinc-950 px-2 py-0.5 rounded text-zinc-300 font-mono border border-zinc-800">"{lesson.category}"</code> to render up to 6 gorgeous cards.
                              </div>
                         </div>
                    </section>

               </div>
          </main>
     );
};

export default LessonDetailsPage;
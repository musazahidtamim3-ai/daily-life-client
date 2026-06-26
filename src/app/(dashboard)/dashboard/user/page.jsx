"use client";

import React from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { BookOpen, Heart, Flame, ArrowUpRight, Plus, Sparkles } from "@gravity-ui/icons";

export default function DashboardHome() {
     const { data: sessionData } = authClient.useSession();
     const user = sessionData?.user;

     const stats = [
          {
               label: "Lessons Contributed",
               count: 14,
               icon: <BookOpen className="w-6 h-6 text-purple-400" />,
               glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)] border-purple-500/20",
               barColor: "bg-purple-500"
          },
          {
               label: "Saved Revelations",
               count: 28,
               icon: <Heart className="w-6 h-6 text-pink-400" />,
               glow: "shadow-[0_0_20px_rgba(236,72,153,0.15)] border-pink-500/20",
               barColor: "bg-pink-500"
          },
          {
               label: "Daily Streak & Impact",
               count: "92%",
               icon: <Flame className="w-6 h-6 text-amber-400" />,
               glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)] border-amber-500/20",
               barColor: "bg-amber-500"
          },
     ];

     const recentLessons = [
          { id: 1, title: "Embracing Mistakes in Your 20s", category: "Mistakes Learned", date: "2 mins ago", status: "Public" },
          { id: 2, title: "How Silence Heals Burnout", category: "Mindset", date: "1 day ago", status: "Premium" },
     ];

     return (
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-500 relative">

               <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[130px] pointer-events-none" />
               <div className="absolute top-40 right-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

               {/* Header Section */}
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-800/60 pb-6 relative z-10">
                    <div>
                         <div className="flex items-center gap-2 text-purple-400 text-xs font-mono tracking-widest uppercase mb-1">
                              <Sparkles className="w-4 h-4 animate-spin duration-3000" /> Internal Workspace
                         </div>
                         <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                              Welcome back, <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">{user?.name?.split(" ")[0] || "Learner"}</span> ✨
                         </h1>
                         <p className="text-neutral-400 text-sm mt-1">Your personal dashboard for life reflections and growth.</p>
                    </div>

                    {/* Quick Action Button */}
                    <Link
                         href="/dashboard/user/add-lesson"
                         className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                         <Plus className="w-4 h-4" /> Share New Lesson
                    </Link>
               </div>

               {/* Stats Grid with Neon Glow Borders */}
               <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative z-10">
                    {stats.map((stat, i) => (
                         <div
                              key={i}
                              className={`relative overflow-hidden rounded-2xl border bg-[#0c0c0e]/80 backdrop-blur-md p-6 transition-all duration-300 hover:scale-[1.02] ${stat.glow}`}
                         >
                              <div className="flex items-center justify-between">
                                   <p className="text-sm font-medium text-neutral-400">{stat.label}</p>
                                   <div className="p-2 bg-neutral-900/80 rounded-xl border border-neutral-800">
                                        {stat.icon}
                                   </div>
                              </div>
                              <p className="text-4xl font-black mt-4 text-white tracking-tight">{stat.count}</p>

                              {/* Animated Mini-Progress Bar for premium look */}
                              <div className="w-full h-[3px] bg-neutral-800 rounded-full mt-4 overflow-hidden">
                                   <div className={`h-full ${stat.barColor} w-2/3 rounded-full animate-pulse`} />
                              </div>
                         </div>
                    ))}
               </div>

               {/* Bottom Section: Recent Activities & Quote Block */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">

                    {/* Left: Beautiful List of Recent Lessons */}
                    <div className="lg:col-span-2 rounded-2xl border border-neutral-800/80 bg-[#0c0c0e]/60 backdrop-blur-md p-6 shadow-xl">
                         <div className="flex items-center justify-between mb-6">
                              <h3 className="text-lg font-bold text-neutral-200 tracking-tight">Your Recent Insights</h3>
                              <Link href="/dashboard/my-lessons" className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                                   View all <ArrowUpRight className="w-3 h-3" />
                              </Link>
                         </div>

                         <div className="space-y-4">
                              {recentLessons.map((lesson) => (
                                   <div key={lesson.id} className="flex items-center justify-between p-4 bg-neutral-900/30 hover:bg-neutral-900/60 border border-neutral-800/50 rounded-xl transition-all group">
                                        <div className="flex flex-col min-w-0">
                                             <h4 className="text-sm font-semibold text-white truncate group-hover:text-purple-400 transition-colors">{lesson.title}</h4>
                                             <div className="flex items-center gap-3 mt-1.5 text-xs text-neutral-500">
                                                  <span className="px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-400">{lesson.category}</span>
                                                  <span>•</span>
                                                  <span>{lesson.date}</span>
                                             </div>
                                        </div>
                                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${lesson.status === "Premium" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-purple-500/10 text-purple-400 border border-purple-500/20"}`}>
                                             {lesson.status}
                                        </span>
                                   </div>
                              ))}
                         </div>
                    </div>

                    {/* Right: Premium "Quote of the Day / System Card" */}
                    <div className="flex flex-col justify-between rounded-2xl border border-neutral-800/80 bg-gradient-to-b from-[#121215] to-[#0c0c0e] p-6 shadow-xl relative overflow-hidden group">
                         {/* Border Top Accent line */}
                         <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500" />

                         <div>
                              <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-3">Daily Reflection</span>
                              <p className="text-sm text-neutral-300 italic leading-relaxed font-light">
                                   "We don't learn from experience... we learn from reflecting on experience."
                              </p>
                              <p className="text-xs text-purple-400 font-medium mt-3 not-italic">— John Dewey</p>
                         </div>

                         <div className="mt-8 pt-4 border-t border-neutral-800/60 space-y-2">
                              <div className="flex justify-between text-xs text-neutral-400">
                                   <span>Account Status</span>
                                   {
                                        user?.isPremium === true ? <span className="text-amber-400 font-semibold flex items-center gap-1">Premium ⭐</span> : <span className="text-blue-400 font-semibold flex items-center gap-1">Free</span>
                                   }
                              </div>
                              <div className="w-full bg-neutral-900 rounded-lg p-2.5 border border-neutral-800 text-[11px] text-neutral-500 text-center">
                                   🚀 Keep writing. You are in the top 5% creators this week!
                              </div>
                         </div>
                    </div>

               </div>
          </div>
     );
}
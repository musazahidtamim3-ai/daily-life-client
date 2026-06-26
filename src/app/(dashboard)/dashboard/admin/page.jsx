'use client';

import React from 'react';
import {
     Persons,
     Layers,
     ShieldExclamation,
     MagicWand,
     Calendar,
     GraphNode,
     ArrowUpRight
} from '@gravity-ui/icons';
import {
     ResponsiveContainer,
     AreaChart,
     Area,
     XAxis,
     YAxis,
     Tooltip,
     CartesianGrid,
     BarChart,
     Bar,
     Legend
} from 'recharts';
import { getUsers } from '@/lib/actions/get/users';
import { getLessons, getReportedLessons } from '@/lib/actions/get/lessons';
import TopContributors from '@/app/components/TopContributor';

// 📊 1. DEMO DATA FOR GRAPHS (Lesson & User Growth)
const growthData = [
     { name: 'Jan', users: 400, lessons: 240 },
     { name: 'Feb', users: 700, lessons: 380 },
     { name: 'Mar', users: 1200, lessons: 600 },
     { name: 'Apr', users: 1900, lessons: 850 },
     { name: 'May', users: 2500, lessons: 1100 },
     { name: 'Jun', users: 3100, lessons: 1450 },
];

// 🕒 3. DEMO DATA FOR TODAY'S NEW LESSONS
const todaysLessons = [
     { id: '1', title: 'Overcoming the Fear of Failure', author: 'Niaz Ahmed', category: 'Mindset', time: '2 mins ago' },
     { id: '2', title: 'How I Handled My First Client Rejection', author: 'Sajid Hasan', category: 'Career', time: '15 mins ago' },
     { id: '3', title: 'The Power of Saying NO in Relationships', author: 'Fariha Alam', category: 'Relationships', time: '1 hour ago' },
];

const users = await getUsers();
const lessons = await getLessons();
const reportedLessons = await getReportedLessons();

export default function AdminDashboardHome() {

     // 💡 Stats Card Data Helper
     const stats = [
          { title: 'Total Users', value: users.length, icon: <Persons className="w-5 h-5 text-blue-500" /> },
          { title: 'Public Lessons', value: lessons.length, icon: <Layers className="w-5 h-5 text-emerald-500" />},
          { title: 'Reported / Flagged', value: reportedLessons.length, icon: <ShieldExclamation className="w-5 h-5 text-rose-500" /> },
          { title: "Today's New Lessons", value: '27', icon: <Calendar className="w-5 h-5 text-purple-500" />},
     ];

     return (
          <div className="w-full text-zinc-100 p-4 md:p-8 space-y-8 bg-zinc-950 min-h-screen">

               {/* 👑 HEADER */}
               <div>
                    <h1 className="text-2xl md:text-3xl font-black bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
                         Admin Overview
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Platform-wide analytics and real-time monitoring dashboard.</p>
               </div>

               {/* 📊 GRID 1: ANALYTICS CARDS */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                         <div
                              key={index}
                              className={`bg-zinc-900/40 border ${stat.warning ? 'border-rose-500/20' : 'border-zinc-800/80'} rounded-2xl p-5 flex flex-col justify-between backdrop-blur-md relative overflow-hidden`}
                         >
                              <div className="flex items-center justify-between">
                                   <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{stat.title}</span>
                                   <div className="p-2 bg-zinc-950 border border-zinc-800 rounded-xl">
                                        {stat.icon}
                                   </div>
                              </div>
                                   <h3 className="text-3xl font-black tracking-tight text-zinc-100 mt-2">{stat.value}</h3>
                         </div>
                    ))}
               </div>

               {/* 📈 GRID 2: GRAPHS / CHARTS */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Graph 1: User & Lesson Growth Area Chart */}
                    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md">
                         <div className="flex items-center justify-between mb-6">
                              <div>
                                   <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                                        <GraphNode className="w-4 h-4 text-indigo-500" /> Platform Growth
                                   </h2>
                                   <p className="text-[11px] text-zinc-500">Cumulative growth analysis over the last 6 months</p>
                              </div>
                         </div>
                         <div className="w-full h-72 text-xs">
                              <ResponsiveContainer width="100%" height="100%">
                                   <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                             <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                             </linearGradient>
                                             <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                                                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                                                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                             </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                        <XAxis dataKey="name" stroke="#71717a" />
                                        <YAxis stroke="#71717a" />
                                        <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }} />
                                        <Legend />
                                        <Area type="monotone" dataKey="users" name="Total Users" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                                        <Area type="monotone" dataKey="lessons" name="Total Lessons" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorLessons)" />
                                   </AreaChart>
                              </ResponsiveContainer>
                         </div>
                    </div>

                    {/* Graph 2: Comparison Bar Chart */}
                    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md">
                         <div className="flex items-center justify-between mb-6">
                              <div>
                                   <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                                        <GraphNode className="w-4 h-4 text-emerald-500" /> Monthly Signups vs Uploads
                                   </h2>
                                   <p className="text-[11px] text-zinc-500">Comparing user engagement rates</p>
                              </div>
                         </div>
                         <div className="w-full h-72 text-xs">
                              <ResponsiveContainer width="100%" height="100%">
                                   <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                        <XAxis dataKey="name" stroke="#71717a" />
                                        <YAxis stroke="#71717a" />
                                        <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }} />
                                        <Legend />
                                        <Bar dataKey="users" name="New Registrations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="lessons" name="Lessons Published" fill="#10b981" radius={[4, 4, 0, 0]} />
                                   </BarChart>
                              </ResponsiveContainer>
                         </div>
                    </div>

               </div>

               {/* 👥 GRID 3: CONTRIBUTORS & TODAY'S LESSONS */}
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Most Active Contributors (2 Cols wide on desktop) */}
                    <div className=" lg:col-span-2 space-y-4">
                         <TopContributors/>
                    </div>

                    {/* Today's New Lessons (1 Col wide) */}
                    <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md space-y-4">
                         <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
                              <div>
                                   <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-purple-500" /> Today's Live Feed
                                   </h2>
                                   <p className="text-[11px] text-zinc-500">Recently published stories</p>
                              </div>
                         </div>

                         <div className="space-y-3">
                              {todaysLessons.map((lesson) => (
                                   <div key={lesson.id} className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl hover:border-zinc-700 transition group cursor-pointer">
                                        <div className="flex items-start justify-between gap-2">
                                             <h4 className="text-xs font-bold text-zinc-200 line-clamp-1 group-hover:text-blue-400 transition">{lesson.title}</h4>
                                             <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-400 flex-shrink-0" />
                                        </div>
                                        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-500">
                                             <span>By {lesson.author}</span>
                                             <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800/60 rounded text-zinc-400">{lesson.category}</span>
                                             <span className="text-zinc-600">{lesson.time}</span>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

               </div>

          </div>
     );
}
import {
     Persons,
     Layers,
     ShieldExclamation,
     Calendar,
} from '@gravity-ui/icons';
import TopContributors from '@/app/components/TopContributor';
import AdminCharts from '@/app/components/AdminCharts';
import { getUsers } from '@/lib/actions/get/users';
import { getLessons, getReportedLessons } from '@/lib/actions/get/lessons';

export default async function AdminDashboardHome() {

     const users = await getUsers() || [];
     const lessons = await getLessons() || [];
     const publicLessons = lessons.data.filter(l => l.visibility === 'public');
     const reportedLessons = await getReportedLessons();
     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/today`);
     const { data: todayLessons } = await res.json();

     const res2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/stats/growth`);
     const { data: growthData } = await res2.json();

     const stats = [
          { title: 'Total Users', value: users.length, icon: <Persons className="w-5 h-5 text-blue-500" /> },
          { title: 'Public Lessons', value: publicLessons.length, icon: <Layers className="w-5 h-5 text-emerald-500" /> },
          { title: 'Reported / Flagged', value: reportedLessons.length, icon: <ShieldExclamation className="w-5 h-5 text-rose-500" /> },
          { title: "Today's New Lessons", value: todayLessons.length, icon: <Calendar className="w-5 h-5 text-purple-500" /> },
     ];

     return (
          <div className="w-full text-zinc-100 p-4 md:p-8 space-y-8 bg-zinc-950 min-h-screen">

               <div>
                    <h1 className="text-2xl md:text-3xl font-black bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
                         Admin Overview
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Platform-wide analytics and real-time monitoring dashboard.</p>
               </div>

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

               <AdminCharts growthData={growthData} />

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 space-y-4">
                         <TopContributors />
                    </div>

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
                              {todayLessons.slice(0, 2).map((lesson) => (
                                   <div key={lesson._id} className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl hover:border-zinc-700 transition group cursor-pointer">
                                        <div className="flex items-start justify-between gap-2">
                                             <h4 className="text-xs font-bold text-zinc-200 line-clamp-1 group-hover:text-blue-400 transition">{lesson.title}</h4>
                                        </div>
                                        <div className="flex items-center justify-between mt-2 text-[10px] text-zinc-500">
                                             <span>By {lesson.creatorName}</span>
                                             <span className="px-1.5 py-0.5 bg-zinc-900 border border-zinc-800/60 rounded text-zinc-400">{lesson.category}</span>
                                             <span className="text-zinc-600">{new Date(lesson.createdAt).toLocaleDateString()}</span>
                                        </div>
                                   </div>
                              ))}
                         </div>
                    </div>

               </div>

          </div>
     );
}
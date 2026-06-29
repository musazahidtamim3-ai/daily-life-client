import LessonsTable from '@/app/components/dashboard/lessonsTable';
import { getLessonByUserId } from '@/lib/actions/get/lessons';
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';

export const metadata = {
     title: "My Lessons | Dashboard",
     description: "Manage your created lessons, visibility, access control and view stats.",
};

const MyLessonsPage = async () => {
     const user = await getUserSession();

     if (!user) {
          return redirect('/login');
     }

     const creatorId = user.id;
     const isUserPremium = user.isPremium || user?.role==="admin" || false;
     const myLessons = await getLessonByUserId(creatorId);

     return (
          <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-10 select-none relative overflow-hidden">
               {/* Ambient background blur */}
               <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
               <div className="absolute bottom-10 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

               <div className="max-w-7xl mx-auto space-y-8 relative z-10">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800/60 pb-6">
                         <div>
                              <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                                   My Created Lessons
                              </h1>
                              <p className="text-zinc-400 text-sm mt-1">
                                   Manage, update, and track performance of your workspaces.
                              </p>
                         </div>
                         <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl shadow-sm">
                              <span className="text-xs text-zinc-400 font-medium">Total Workspaces:</span>
                              <span className="text-sm font-bold bg-zinc-800 text-blue-400 px-2 py-0.5 rounded-md">
                                   {myLessons?.length || 0}
                              </span>
                         </div>
                    </div>

                    {/* Interactive Tabular Client Component */}
                    <LessonsTable
                         initialLessons={JSON.parse(JSON.stringify(myLessons))}
                         isUserPremium={isUserPremium}
                    />
               </div>
          </div>
     );
};

export default MyLessonsPage;
import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import CreateLessons from '@/app/components/dashboard/CreateLessons';

export const metadata = {
     title: "Add Life Lesson | Dashboard",
     description: "Share a new life lesson, story, or insight.",
};

const AddLessonPage = async () => {
     const user = await getUserSession();

     if (!user) {
          return redirect('/auth/login');
     }

     const userId = user.id;
     const userName = user.name;
     const userImage = user.image;
     const isUserPremium = user.isPremium || user?.role === "admin" || false;

     return (
          <div className="w-full min-h-screen bg-zinc-950 text-zinc-50 p-6 md:p-10 select-none relative overflow-hidden">
               {/* Glowing Background Ambiance */}
               <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
               <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

               <div className="max-w-3xl mx-auto relative z-10 space-y-6">
                    <div className="border-b border-zinc-800/60 pb-5">
                         <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-50 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
                              Add Life Lesson
                         </h1>
                         <p className="text-zinc-400 text-sm mt-1">
                              Share your story, insight, or mistakes learned with the world.
                         </p>
                    </div>

                    {/* Updated Client Form */}
                    <CreateLessons userId={userId} isUserPremium={isUserPremium} userName={userName} userImage={userImage} />
               </div>
          </div>
     );
};

export default AddLessonPage;
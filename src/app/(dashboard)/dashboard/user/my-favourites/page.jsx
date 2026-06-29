import SavedLessonsTable from "@/app/components/SavedLessonsTable";
import { getUserSession } from "@/lib/core/session";

export default async function MyFavouritesPage() {
     const session = await getUserSession();
     const userId = session?.id || session?._id;
     console.log("userId:", userId);
     console.log("session:", JSON.stringify(session));


     const res = await fetch(`https://daily-life-server.vercel.app/api/lessons/saved/${userId}`);

     const { data: savedLessons } = await res.json();
     console.log(savedLessons);

     return (
          <div className="w-full space-y-6">
               <div>
                    <h1 className="text-2xl font-bold text-zinc-100">My Saved Lessons</h1>
                    <p className="text-zinc-500 text-sm mt-1">Lessons you've bookmarked for later.</p>
               </div>
               <SavedLessonsTable initialLessons={savedLessons} userId={userId} />
          </div>
     );
}
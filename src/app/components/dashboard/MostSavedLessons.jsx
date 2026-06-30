import { getMostSavedLessons } from '@/lib/actions/get/lessons';
import MostSavedLessonsList from './MostSavedLessonsList';

export default async function MostSavedLessons() {
     const lessons = await getMostSavedLessons();

     return (
          <div className="rounded-2xl  border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-6 shadow-xl">

               <div className="flex items-center gap-2 mb-6">
                    <span className="text-xl">🔖</span>
                    <h2 className="text-lg font-bold text-zinc-100">Most Saved Lessons</h2>
               </div>

               {lessons.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500 text-sm">No data available.</div>
               ) : (
                    <MostSavedLessonsList lessons={lessons} />
               )}

          </div>
     );
}
import Image from 'next/image';
import { Bookmark } from '@gravity-ui/icons';
import { getMostSavedLessons } from '@/lib/actions/get/lessons';

export default async function MostSavedLessons() {
     const lessons = await getMostSavedLessons();

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

     return (
          <div className="rounded-2xl  border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md p-6 shadow-xl">

               {/* Header */}
               <div className="flex items-center gap-2 mb-6">
                    <span className="text-xl">🔖</span>
                    <h2 className="text-lg font-bold text-zinc-100">Most Saved Lessons</h2>
               </div>

               {lessons.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500 text-sm">No data available.</div>
               ) : (
                    <div className="space-y-4">
                         {lessons.map((lesson, index) => {
                              const config = rankConfig[index];
                              const savesCount = lesson.saves?.length || 0;
                              console.log(lesson.imageUrl)

                              return (
                                   <div
                                        key={lesson._id}
                                        className={`flex items-center gap-4 p-4 rounded-2xl border ${config.border} ${config.bg} transition hover:bg-zinc-800/20 group`}
                                   >
                                        {/* Lesson Image */}
                                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-zinc-700/50 shrink-0">
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

                                        {/* Info */}
                                        <div className="flex flex-col min-w-0 flex-1 gap-1.5">
                                             <h3 className="font-bold text-zinc-100 text-sm line-clamp-1 group-hover:text-blue-400 transition">
                                                  {lesson.title}
                                             </h3>
                                             <div className="flex items-center gap-2 flex-wrap">
                                                  {/* Badge */}
                                                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${config.badgeBg}`}>
                                                       {config.icon} {config.label}
                                                  </span>
                                                  {/* Category */}
                                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 font-medium">
                                                       {lesson.category}
                                                  </span>
                                                  {/* Tone */}
                                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-medium">
                                                       {lesson.emotionalTone}
                                                  </span>
                                             </div>
                                        </div>

                                        {/* Saves Count + View */}
                                        <div className="flex flex-col items-end gap-2 shrink-0">
                                             <span className={`flex items-center gap-1 text-sm font-black ${config.countColor}`}>
                                                  <Bookmark className="w-3.5 h-3.5" /> {savesCount}
                                                  <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider ml-0.5">saves</span>
                                             </span>
                                        </div>

                                   </div>
                              );
                         })}
                    </div>
               )}
          </div>
     );
}
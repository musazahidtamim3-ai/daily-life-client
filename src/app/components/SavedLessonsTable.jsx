'use client';

import React, { useState } from 'react';
import { Heart, Bookmark, TrashBin, ArrowChevronRight } from '@gravity-ui/icons';
import Link from 'next/link';

export default function SavedLessonsTable({ initialLessons, userId }) {
     const [lessons, setLessons] = useState(initialLessons || []);
     const [deleteTargetId, setDeleteTargetId] = useState(null);
     const [isRemoving, setIsRemoving] = useState(false);

     const handleUnsave = async () => {
          if (!deleteTargetId) return;
          setIsRemoving(true);

          setLessons(prev => prev.filter(l => l._id !== deleteTargetId));

          try {
               await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/${deleteTargetId}/save`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ userId }),
               });
          } catch (err) {
               console.error("Failed to unsave", err);
          } finally {
               setIsRemoving(false);
               setDeleteTargetId(null);
          }
     };

     return (
          <div className="w-full">
               {lessons.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-zinc-800 bg-zinc-900/10 rounded-2xl">
                         <p className="text-zinc-500 text-sm">You haven't saved any lessons yet.</p>
                    </div>
               ) : (
                    <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-xl">
                         <table className="w-full text-left border-collapse min-w-[700px]">
                              <thead>
                                   <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider bg-zinc-900/60">
                                        <th className="py-4 px-5">Lesson / Details</th>
                                        <th className="py-4 px-5 text-center">Category</th>
                                        <th className="py-4 px-5 text-center">Tone</th>
                                        <th className="py-4 px-5 text-center">Stats</th>
                                        <th className="py-4 px-5 text-right">Action</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-800/50 text-sm">
                                   {lessons.map((lesson) => (
                                        <tr key={lesson._id} className="hover:bg-zinc-900/40 transition group">

                                             <td className="py-4 px-5 max-w-xs">
                                                  <div className="flex flex-col space-y-1">
                                                       <span className="font-bold text-zinc-200 group-hover:text-blue-400 transition line-clamp-1">
                                                            {lesson.title}
                                                       </span>
                                                       <span className="text-zinc-500 text-xs line-clamp-1">
                                                            {lesson.description || "No description provided."}
                                                       </span>
                                                       <Link href={`/public-lessons/${lesson._id}`}>
                                                       <span className="text-blue-500 flex items-center gap-1">See Details <ArrowChevronRight className="w-3 h-3" /></span>
                                                       </Link>
                                                  </div>
                                             </td>

                                             <td className="py-4 px-5 text-center">
                                                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium border bg-blue-500/10 border-blue-500/20 text-blue-400">
                                                       {lesson.category}
                                                  </span>
                                             </td>

                                             <td className="py-4 px-5 text-center">
                                                  <span className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-medium border bg-purple-500/10 border-purple-500/20 text-purple-400">
                                                       {lesson.emotionalTone}
                                                  </span>
                                             </td>

                                             <td className="py-4 px-5">
                                                  <div className="flex flex-col items-center gap-1.5 text-xs text-zinc-400">
                                                       <div className="flex items-center gap-4 bg-zinc-950/40 border border-zinc-800/80 px-2.5 py-1 rounded-lg">
                                                            <span className="flex items-center gap-1 text-rose-400">
                                                                 <Heart className="w-3 h-3" /> {lesson.likes.length || 0}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-amber-400">
                                                                 <Bookmark className="w-3 h-3" /> {lesson.saves.length || 0}
                                                            </span>
                                                       </div>
                                                  </div>
                                             </td>

                                             <td className="py-4 px-5 text-right">
                                                  <button
                                                       onClick={() => setDeleteTargetId(lesson._id)}
                                                       className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl transition border border-rose-500/20 cursor-pointer"
                                                       title="Remove from Saved"
                                                  >
                                                       <TrashBin className="w-3.5 h-3.5" />
                                                  </button>
                                             </td>

                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}

               {/* Confirm Modal */}
               {deleteTargetId && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
                              <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                                   <Bookmark className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-bold text-zinc-100">Remove from saved?</h3>
                              <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                                   This lesson will be removed from your saved list.
                              </p>
                              <div className="mt-6 flex items-center gap-3">
                                   <button
                                        onClick={() => setDeleteTargetId(null)}
                                        disabled={isRemoving}
                                        className="flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleUnsave}
                                        disabled={isRemoving}
                                        className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                                   >
                                        {isRemoving ? 'Removing...' : 'Yes, Remove'}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}
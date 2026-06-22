'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
     Eye, EyeSlash, Key, Lock, TrashBin,
     Pencil, ChevronRight, Calendar, Heart, Bookmark
} from '@gravity-ui/icons'; 

export default function LessonsTable({ initialLessons, isUserPremium }) {
     const [lessons, setLessons] = useState(initialLessons || []);
     const [deleteTargetId, setDeleteTargetId] = useState(null);
     const [isDeleting, setIsDeleting] = useState(false);

     const toggleVisibility = async (id, currentStatus) => {
          const updatedStatus = currentStatus === 'public' ? 'private' : 'public';

          
          setLessons(prev => prev.map(l => l._id === id ? { ...l, visibility: updatedStatus } : l));

          try {
               await fetch(`/api/lessons/${id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ visibility: updatedStatus })
               });
          } catch (err) {
               console.error("Failed to update visibility", err);
               setLessons(initialLessons);
          }
     };

     const toggleAccess = async (id, currentAccess) => {
          if (!isUserPremium) {
               alert("⚠️ Only Premium Members can toggle access level to Premium plans!");
               return;
          }

          const updatedAccess = currentAccess === 'premium' ? 'free' : 'premium';
          setLessons(prev => prev.map(l => l._id === id ? { ...l, access: updatedAccess } : l));

          try {
               await fetch(`/api/lessons/${id}/status`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ access: updatedAccess })
               });
          } catch (err) {
               console.error("Failed to update access level", err);
               setLessons(initialLessons);
          }
     };

     const handleDelete = async () => {
          if (!deleteTargetId) return;
          setIsDeleting(true);

          try {
               const res = await fetch(`/api/lessons/${deleteTargetId}`, { method: 'DELETE' });
               if (res.ok) {
                    setLessons(prev => prev.filter(l => l._id !== deleteTargetId));
               }
          } catch (err) {
               console.error("Error deleting lesson", err);
          } finally {
               setIsDeleting(false);
               setDeleteTargetId(null);
          }
     };

     return (
          <div className="w-full">
               {lessons.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-zinc-800 bg-zinc-900/10 rounded-2xl">
                         <p className="text-zinc-500 text-sm">You haven't generated any lessons yet.</p>
                    </div>
               ) : (
                    /* High Quality Glassmorphic Responsive Table Wrapper */
                    <div className="w-full overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-900/30 backdrop-blur-md shadow-xl">
                         <table className="w-full text-left border-collapse min-w-[900px]">
                              <thead>
                                   <tr className="border-b border-zinc-800 text-zinc-400 text-xs font-semibold uppercase tracking-wider bg-zinc-900/60">
                                        <th className="py-4 px-5">Lesson / Details</th>
                                        <th className="py-4 px-5 text-center">Visibility</th>
                                        <th className="py-4 px-5 text-center">Access Level</th>
                                        <th className="py-4 px-5 text-center">Stats Dashboard</th>
                                        <th className="py-4 px-5 text-right">Actions</th>
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
                                                       <Link
                                                            href={`/lessons/${lesson._id}`}
                                                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-500 hover:text-blue-400 transition w-fit pt-1"
                                                       >
                                                            View Full Details <ChevronRight className="w-3 h-3" />
                                                       </Link>
                                                  </div>
                                             </td>

                                             <td className="py-4 px-5 text-center">
                                                  <button
                                                       onClick={() => toggleVisibility(lesson._id, lesson.visibility)}
                                                       className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${lesson.visibility === 'public'
                                                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                                                            : 'bg-zinc-800/60 border-zinc-700/50 text-zinc-400 hover:bg-zinc-800'
                                                            }`}
                                                  >
                                                       {lesson.visibility === 'public' ? (
                                                            <>
                                                                 <Eye className="w-3.5 h-3.5" /> Public
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <EyeSlash className="w-3.5 h-3.5" /> Private
                                                            </>
                                                       )}
                                                  </button>
                                             </td>

                                             <td className="py-4 px-5 text-center">
                                                  <button
                                                       onClick={() => toggleAccess(lesson._id, lesson.access)}
                                                       className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition cursor-pointer ${lesson.access === 'premium'
                                                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
                                                            : 'bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20'
                                                            }`}
                                                  >
                                                       {lesson.access === 'premium' ? (
                                                            <>
                                                                 <Lock className="w-3.5 h-3.5" /> Premium
                                                            </>
                                                       ) : (
                                                            <>
                                                                 <Key className="w-3.5 h-3.5" /> Free
                                                            </>
                                                       )}
                                                  </button>
                                             </td>

                                             <td className="py-4 px-5">
                                                  <div className="flex flex-col items-center gap-1.5 text-xs text-zinc-400">
                                                       <div className="flex items-center gap-4 bg-zinc-950/40 border border-zinc-800/80 px-2.5 py-1 rounded-lg">
                                                            <span className="flex items-center gap-1 text-rose-400">
                                                                 <Heart className="w-3 h-3" /> {lesson.likesCount || 0}
                                                            </span>
                                                            <span className="flex items-center gap-1 text-amber-400">
                                                                 <Bookmark className="w-3 h-3" /> {lesson.savesCount || 0}
                                                            </span>
                                                       </div>
                                                       <span className="text-[10px] text-zinc-500 inline-flex items-center gap-1">
                                                            <Calendar className="w-2.5 h-2.5" /> {new Date(lesson.createdAt).toLocaleDateString()}
                                                       </span>
                                                  </div>
                                             </td>

                                             <td className="py-4 px-5 text-right">
                                                  <div className="flex items-center justify-end gap-2">

                                                       <Link
                                                            href={`/dashboard/my-lessons/update/${lesson._id}`}
                                                            className="p-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl transition border border-zinc-700/30"
                                                            title="Update Lesson"
                                                       >
                                                            <Pencil className="w-3.5 h-3.5" />
                                                       </Link>

                                                       <button
                                                            onClick={() => setDeleteTargetId(lesson._id)}
                                                            className="p-2 bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white rounded-xl transition border border-rose-500/20 cursor-pointer"
                                                            title="Delete Permanently"
                                                       >
                                                            <TrashBin className="w-3.5 h-3.5" />
                                                       </button>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}

               {deleteTargetId && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl scale-in-95 duration-200">
                              <div className="w-12 h-12 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                                   <TrashBin className="w-5 h-5" />
                              </div>
                              <h3 className="text-lg font-bold text-zinc-100">Are you absolutely sure?</h3>
                              <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                                   This action is permanent and cannot be undone. This lesson will be erased from our global database forever.
                              </p>
                              <div className="mt-6 flex items-center gap-3">
                                   <button
                                        onClick={() => setDeleteTargetId(null)}
                                        disabled={isDeleting}
                                        className="flex-1 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleDelete}
                                        disabled={isDeleting}
                                        className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold transition cursor-pointer disabled:opacity-50"
                                   >
                                        {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </div>
     );
}
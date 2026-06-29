'use client';

import { useState } from 'react';
import { TrashBin, Eye, Check, Xmark, TriangleExclamation } from '@gravity-ui/icons';
import Image from 'next/image';
import { deleteReport, deleteReportedLesson } from '@/lib/actions/delete/lessons';
import { toast } from 'react-toastify';
import { authClient } from '@/lib/auth-client';

export default function ReportedLessonsTable({ initialLessons }) {
     const { data: sessionData } = authClient.useSession();
     const [isLoading, setIsLoading] = useState(false);
     const [isOpen, setIsOpen] = useState(false);
     const [lessons, setLessons] = useState(initialLessons);
     const [selectedLesson, setSelectedLesson] = useState(null);
     const [isModalOpen, setIsModalOpen] = useState(false); 

     const handleDelete = async () => {
          if (!selectedLesson) return;

          setIsLoading(true);
          try {
               const data = await deleteReportedLesson(selectedLesson.lessonId);

               if (data?.success) {
                    toast.success("Lesson permanently removed");
                    setLessons(prev => prev.filter(l => l && l.lessonId && l.lessonId !== selectedLesson.lessonId));                    setIsOpen(false); 
               } else {
                    toast.error(data?.error || "Failed to delete lesson");
               }
          } catch (error) {
               console.error("Delete Error:", error);
               toast.error("Failed to delete lesson");
          } finally {
               setIsLoading(false);
          }
     };

     const handleIgnore = async (lesson) => {
          if (!lesson) return;

          setIsLoading(true);
          try {
               const data = await deleteReport(lesson.lessonId);
               if (data?.success) {
                    toast.success("Reports cleared. Lesson kept live.");

                    setLessons(prev => prev.filter(l => l && l.lessonId && l.lessonId !== lesson.lessonId));
                    setIsOpen(false);
               } else {
                    toast.error("Failed to clear reports");
               }
          } catch (error) {
               toast.error("Failed to ignore reports");
          } finally {
               setIsLoading(false); 
          }
     };

     return (
          <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
               {lessons.length === 0 ? (
                    <div className="p-12 text-center text-zinc-500">
                         <Check className="w-8 h-8 mx-auto text-green-500 mb-2" />
                         <p className="font-medium">No reported lessons found. Platform is safe!</p>
                    </div>
               ) : (
                    <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse">
                              <thead>
                                   <tr className="border-b border-zinc-800 bg-zinc-950/50 text-xs font-bold uppercase tracking-wider text-zinc-400">
                                        <th className="px-6 py-4">Lesson Title</th>
                                        <th className="px-6 py-4 text-center">Reports Count</th>
                                        <th className="px-6 py-4 text-center">Details</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-800 text-sm">
                                        {lessons.filter(l => l && l.lessonId).map((lesson) => (
                                        <tr key={lesson._id} className="hover:bg-zinc-800/30 transition">
                                             <td className="px-6 py-4 font-medium text-zinc-200 max-w-md truncate">
                                                  <div className="flex items-center gap-2">
                                                       {lesson.lessonImageUrl && (
                                                            <div className="shrink-0">
                                                                 <Image src={lesson.lessonImageUrl} alt={lesson.lessonTitle || "Image"} width={60} height={40} className="rounded-md object-cover" />
                                                            </div>
                                                       )}
                                                       <div className="truncate">
                                                            {lesson.lessonTitle || "Untitled Lesson"}
                                                            <span className="block text-xs text-zinc-500 font-mono mt-0.5">ID: {lesson.lessonId}</span>
                                                       </div>
                                                  </div>
                                             </td>
                                             <td className="px-6 py-4 text-center">
                                                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-950/50 text-red-400 border border-red-900/30">
                                                       {lesson.reportCount || 1} Reports
                                                  </span>
                                             </td>
                                             <td className="px-6 py-4 text-center">
                                                  <button
                                                       onClick={() => { setSelectedLesson(lesson); setIsModalOpen(true); }}
                                                       className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition"
                                                  >
                                                       <Eye className="w-3.5 h-3.5" /> View Reasons
                                                  </button>
                                             </td>
                                             <td className="px-6 py-4 text-right space-x-2">
                                                  <button
                                                       onClick={()=>handleIgnore(lesson)}
                                                       className="px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-900/30 rounded-xl text-xs font-bold uppercase tracking-wider transition"
                                                  >
                                                       Ignore
                                                  </button>
                                                  <button
                                                       onClick={() => { setSelectedLesson(lesson); setIsOpen(true); }}
                                                       className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition"
                                                  >
                                                       <TrashBin className="w-3.5 h-3.5" /> Delete
                                                  </button>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </table>
                    </div>
               )}

               {/* DELETE CONFIRMATION MODAL */}
               {isOpen && selectedLesson && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                         <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                         <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] space-y-6">
                              <button
                                   onClick={() => setIsOpen(false)}
                                   className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition"
                              >
                                   <Xmark className="w-4 h-4" />
                              </button>

                              <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-900/50 flex items-center justify-center shrink-0">
                                        <TriangleExclamation className="w-5 h-5 text-red-400" />
                                   </div>
                                   <div className='text-left'>
                                        <h2 className="text-lg font-black text-white tracking-tight">Delete Lesson</h2>
                                        <p className="text-xs text-zinc-500 mt-0.5">Help us keep the community safe</p>
                                   </div>
                              </div>

                              <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-left">
                                   <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Deleting</p>
                                   <p className="text-sm text-zinc-300 font-medium truncate">{selectedLesson.lessonTitle || "Untitled Lesson"}</p>
                              </div>

                              <div className="flex gap-3 pt-2">
                                   <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-3 text-xs font-bold uppercase tracking-wider border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 rounded-xl transition"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleDelete}
                                        disabled={isLoading}
                                        className="flex-1 py-3 text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition"
                                   >
                                        {isLoading ? "Deleting..." : "Delete Lesson"}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

               {/* REASONS MODAL */}
               {isModalOpen && selectedLesson && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

                         <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition">
                                   <Xmark className="w-5 h-5" />
                              </button>

                              <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                                   <TriangleExclamation className="w-5 h-5 text-red-400" />
                                   <h3 className="text-base font-black text-white">Report Details & Logs</h3>
                              </div>

                              <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
                                   {selectedLesson.reports?.map((report, idx) => (
                                        <div key={idx} className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                                             <div className="flex justify-between items-start">
                                                  <p className="text-xs font-bold text-red-400">{report.reason}</p>
                                                  <span className="text-[10px] text-zinc-500">{new Date(report.createdAt).toLocaleDateString()}</span>
                                             </div>
                                             <p className="text-xs text-zinc-400">Reporter ID: <span className="font-mono text-zinc-500">{report.reporterUserId || "Anonymous"}</span></p>
                                             <p className="text-xs text-zinc-400">Email: <span className="text-zinc-300">{report.reporterEmail || "N/A"}</span></p>
                                        </div>
                                   )) || (
                                             <div className="p-3 bg-zinc-950 border border-zinc-800 rounded-xl space-y-1">
                                                  <p className="text-xs font-bold text-red-400">{selectedLesson.reason}</p>
                                                  <p className="text-xs text-zinc-400">Email: <span className="text-zinc-300">{selectedLesson.reporterEmail}</span></p>
                                             </div>
                                        )}
                              </div>

                              <button
                                   onClick={() => setIsModalOpen(false)}
                                   className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-bold uppercase tracking-wider text-zinc-300 rounded-xl transition"
                              >
                                   Close Window
                              </button>
                         </div>
                    </div>
               )}
          </div>
     );
}
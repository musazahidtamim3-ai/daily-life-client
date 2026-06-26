'use client';

import { useState } from 'react';
import { TrashBin, Eye, Check, Xmark, TriangleExclamation } from '@gravity-ui/icons';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ReportedLessonsTable({ initialLessons }) {
     const [lessons, setLessons] = useState(initialLessons);
     const [selectedLesson, setSelectedLesson] = useState(null);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const handleDelete = async (lessonId) => {
          if (!confirm("Are you sure you want to PERMANENTLY delete this lesson?")) return;

          try {
               const res = await fetch(`http://localhost:5000/api/lessons/${lessonId}`, {
                    method: 'DELETE',
               });
               const data = await res.json();

               if (data.success || res.ok) {
                    toast.success("Lesson permanently removed");
                    setLessons(lessons.filter(l => l.lessonId !== lessonId));
               }
          } catch (error) {
               toast.error("Failed to delete lesson");
          }
     };

     const handleIgnore = async (lessonId) => {
          try {
               const res = await fetch(`http://localhost:5000/api/lessons/report/${lessonId}`, {
                    method: 'DELETE',
               });

               toast.success("Reports cleared. Lesson kept live.");
               setLessons(lessons.filter(l => l.lessonId !== lessonId));
          } catch (error) {
               toast.error("Failed to ignore reports");
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
                                   {lessons.map((lesson) => (
                                        <tr key={lesson._id} className="hover:bg-zinc-800/30 transition">
                                             <td className="px-6 py-4 font-medium text-zinc-200 max-w-md truncate">
                                                  <div className="flex items-center gap-2">
                                                       <div>
                                                            <Image src={lesson.lessonImageUrl} alt={lesson.lessonTitle} width={60} height={40} className="rounded-md object-cover" />
                                                       </div>
                                                       <div>
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
                                                       onClick={() => handleIgnore(lesson.lessonId)}
                                                       className="px-3 py-1.5 bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-400 border border-emerald-900/30 rounded-xl text-xs font-bold uppercase tracking-wider transition"
                                                  >
                                                       Ignore
                                                  </button>
                                                  <button
                                                       onClick={() => handleDelete(lesson.lessonId)}
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

               {/* REASONS MODAL */}
               {isModalOpen && selectedLesson && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                         <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />

                         <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-4">
                              {/* Close */}
                              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition">
                                   <Xmark className="w-5 h-5" />
                              </button>

                              {/* Header */}
                              <div className="flex items-center gap-3 border-b border-zinc-800 pb-3">
                                   <TriangleExclamation className="w-5 h-5 text-red-400" />
                                   <h3 className="text-base font-black text-white">Report Details & Logs</h3>
                              </div>

                              {/* Reports List */}
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
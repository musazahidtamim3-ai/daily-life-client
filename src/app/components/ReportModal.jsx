'use client';

import { useState } from 'react';
import { TriangleExclamation, Xmark } from '@gravity-ui/icons';
import { authClient } from '@/lib/auth-client';
import { reportLesson } from '@/lib/actions/submit/lessons';
import { toast } from 'react-toastify';

const reasons = [
     "Inappropriate content",
     "Spam or misleading",
     "Harassment or hate speech",
     "False information",
     "Copyright violation",
     "Other"
];

export function ReportModal({ lesson }) {
     const { data: session } = authClient.useSession();
     const user = session?.user;

     const [isOpen, setIsOpen] = useState(false);
     const [reason, setReason] = useState('');
     const [isLoading, setIsLoading] = useState(false);

     const handleReport = async () => {
          if (!reason) return toast.error("Please select a reason");

          setIsLoading(true);
          try {
               const data = await reportLesson({
                    lessonId: lesson._id || lesson.id,
                    lessonTitle: lesson.title,
                    lessonImageUrl: lesson.imageUrl,
                    reason: reason,
                    reporterUserId: user?.id,
                    reporterEmail: user?.email,
                    createdAt: new Date(),
               });
               if (data.success) {
                    toast.success("Report submitted!");
                    setIsOpen(false);
                    setReason('');
               }
          } catch {
               toast.error("Something went wrong. Please try again.");
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <>
               {/* Trigger Button */}
               <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-900/50 hover:bg-red-950/30 text-zinc-500 hover:text-red-400 border border-zinc-800 hover:border-red-900/50 transition-all duration-200"
               >
                    <TriangleExclamation className="w-4 h-4" />
               </button>

               {/* Modal */}
               {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                         {/* Backdrop */}
                         <div
                              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                              onClick={() => setIsOpen(false)}
                         />

                         {/* Modal Box */}
                         <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)] space-y-6">

                              {/* Close */}
                              <button
                                   onClick={() => setIsOpen(false)}
                                   className="absolute top-4 right-4 p-1.5 rounded-lg text-zinc-500 hover:text-white hover:bg-zinc-800 transition"
                              >
                                   <Xmark className="w-4 h-4" />
                              </button>

                              {/* Header */}
                              <div className="flex items-center gap-4">
                                   <div className="w-12 h-12 rounded-2xl bg-red-950/50 border border-red-900/50 flex items-center justify-center shrink-0">
                                        <TriangleExclamation className="w-5 h-5 text-red-400" />
                                   </div>
                                   <div>
                                        <h2 className="text-lg font-black text-white tracking-tight">Report Lesson</h2>
                                        <p className="text-xs text-zinc-500 mt-0.5">Help us keep the community safe</p>
                                   </div>
                              </div>

                              {/* Lesson title */}
                              <div className="bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3">
                                   <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Reporting</p>
                                   <p className="text-sm text-zinc-300 font-medium truncate">{lesson.title}</p>
                              </div>

                              {/* Reason Dropdown */}
                              <div className="space-y-2">
                                   <label className="text-xs font-bold uppercase tracking-widest text-zinc-400">Reason</label>
                                   <select
                                        value={reason}
                                        onChange={e => setReason(e.target.value)}
                                        className="w-full bg-zinc-950 border border-zinc-800 text-zinc-300 text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-600 transition"
                                   >
                                        <option value="">Select a reason...</option>
                                        {reasons.map(r => (
                                             <option key={r} value={r}>{r}</option>
                                        ))}
                                   </select>
                              </div>

                              {/* Buttons */}
                              <div className="flex gap-3 pt-2">
                                   <button
                                        onClick={() => setIsOpen(false)}
                                        className="flex-1 py-3 text-xs font-bold uppercase tracking-wider border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-600 rounded-xl transition"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        onClick={handleReport}
                                        disabled={isLoading || !reason}
                                        className="flex-1 py-3 text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl transition"
                                   >
                                        {isLoading ? "Submitting..." : "Submit Report"}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}
          </>
     );
}
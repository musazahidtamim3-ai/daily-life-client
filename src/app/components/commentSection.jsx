'use client';

import { useState } from 'react';
import Image from 'next/image';
import { authClient } from '@/lib/auth-client';
import { addComment } from '@/lib/actions/update/lesson';
import { toast } from 'react-toastify';

export function CommentSection({ lesson }) {
     const { data: session } = authClient.useSession();
     const user = session?.user;

     const [comments, setComments] = useState(lesson?.comments || []);
     const [text, setText] = useState('');
     const [isLoading, setIsLoading] = useState(false);

     const handleComment = async () => {
          if (!text.trim() || isLoading) return;

          setIsLoading(true);
          try {
               const data = await addComment(lesson._id, text, user);

               if (data?.success) {
                    setComments(prev => [...prev, data.comment]);
                    setText('');
                    toast.success("Comment added!");
               }
          } catch (error) {
               toast.error("Something went wrong");
          } finally {
               setIsLoading(false);
          }
     };

     return (
          <section className="space-y-5 bg-zinc-900/10 border border-zinc-900 p-6 rounded-3xl">
               <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black tracking-widest uppercase text-zinc-400">Discussion Forum</h3>
                    <span className="text-[10px] bg-zinc-900 px-2.5 py-1 rounded-md text-zinc-500 border border-zinc-800">
                         {comments.length} Comments
                    </span>
               </div>

               {/* Input */}
               {user ? (
                    <div className="relative flex items-center border border-zinc-800 focus-within:border-zinc-700 rounded-2xl bg-zinc-950 p-2">
                         <input
                              type="text"
                              value={text}
                              onChange={e => setText(e.target.value)}
                              onKeyDown={e => e.key === 'Enter' && handleComment()}
                              placeholder="Add your insight to this lesson..."
                              className="w-full px-4 py-2 text-sm bg-transparent text-zinc-100 focus:outline-none placeholder-zinc-500"
                         />
                         <button
                              onClick={handleComment}
                              disabled={isLoading || !text.trim()}
                              className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-white hover:bg-zinc-200 disabled:opacity-50 text-zinc-950 rounded-xl transition"
                         >
                              {isLoading ? "..." : "Post"}
                         </button>
                    </div>
               ) : (
                    <div className="text-xs text-zinc-400 bg-zinc-950/60 p-4 rounded-xl border border-zinc-900 text-center">
                         Please log in to participate in the conversation.
                    </div>
               )}

               {/* Comments List */}
               <div className="space-y-4">
                    {comments.length === 0 ? (
                         <p className="text-xs text-zinc-500 py-4 text-center">No insights shared yet. Start the thread!</p>
                    ) : (
                         comments.map(comment => (
                              <div key={comment.id} className="flex items-start gap-3 p-4 bg-zinc-900/40 rounded-2xl border border-zinc-800">
                                   <Image
                                        src={comment.userImage || 'https://i.pravatar.cc/40'}
                                        alt={comment.userName}
                                        width={36}
                                        height={36}
                                        className="rounded-full object-cover border border-zinc-700 shrink-0"
                                   />
                                   <div>
                                        <p className="text-xs font-bold text-white">{comment.userName}</p>
                                        <p className="text-sm text-zinc-300 mt-1">{comment.text}</p>
                                        <p className="text-[10px] text-zinc-500 mt-1">
                                             {new Date(comment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                   </div>
                              </div>
                         ))
                    )}
               </div>
          </section>
     );
}
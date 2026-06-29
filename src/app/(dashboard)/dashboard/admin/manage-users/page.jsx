'use client';

import React, { useState, useEffect } from 'react';
import {
     Persons, ShieldCheck, Person, ArrowLeft
} from '@gravity-ui/icons';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { getUsers } from '@/lib/actions/get/users';
import Image from 'next/image';
import { updateUserRole } from '@/lib/actions/update/users';
import { serverFetch } from '@/lib/core/server';

const getLessonByUserId = async (creatorId,) => {
     return await serverFetch(`/api/my-lessons/${creatorId}`);
};


export default function ManageUsers() {
     const [users, setUsers] = useState([]);
     const [lessonCounts, setLessonCounts] = useState({});
     const [loading, setLoading] = useState(false);
     const [selectedUser, setSelectedUser] = useState(null);
     const [isModalOpen, setIsModalOpen] = useState(false);
     
     useEffect(() => {
          const fetchUsers = async () => {
               if(!users) return;
               try {
                    const data = await getUsers();
                    const userList = Array.isArray(data) ? data : data?.data || [];
                    setUsers(userList);

                    const counts = {};
                    await Promise.all(
                         userList.map(async (user) => {
                              try {
                                   const lessons = await getLessonByUserId(user.id || user._id);
                                   counts[user.id || user._id] = Array.isArray(lessons) ? lessons.length : 0;
                              } catch {
                                   counts[user.id || user._id] = 0;
                              }
                         })
                    );
                    setLessonCounts(counts);
               } catch (err) {
                    console.error("Failed to load users:", err);
                    toast.error("Failed to load users list.");
               }
          };
          fetchUsers();
     }, []);

     const handleConfirmRoleUpdate = async () => {
          if (!selectedUser) return;
          setLoading(true);

          const newRole = selectedUser.role === 'user' ? 'admin' : 'user';
          const result = await updateUserRole(selectedUser._id || selectedUser.id, newRole);

          if (result?.success || result) {
               setUsers(prev =>
                    prev.map(u =>
                         (u._id || u.id) === (selectedUser._id || selectedUser.id)
                              ? { ...u, role: newRole }
                              : u
                    )
               );
               toast.success(`${selectedUser.name} is now ${newRole.toUpperCase()}!`, {
                    style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
               });
          } else {
               toast.error(result?.error || "Failed to update role.");
          }

          setLoading(false);
          setIsModalOpen(false);
          setSelectedUser(null);
     };

     return (
          <div className="w-full text-zinc-100 p-4 md:p-8 space-y-6 bg-zinc-950 min-h-screen select-none">

               <div>
                    <Link
                         href="/dashboard/admin"
                         className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition mb-2"
                    >
                         <ArrowLeft className="w-3.5 h-3.5" /> Back to Admin Overview
                    </Link>
                    <h1 className="text-2xl md:text-3xl font-black bg-linear-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight flex items-center gap-2.5">
                         <Persons className="w-7 h-7 text-blue-500" /> Manage Platform Users
                    </h1>
                    <p className="text-xs text-zinc-500 mt-1">Monitor user access levels, track activity, and control system roles.</p>
               </div>

               <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse">
                              <thead>
                                   <tr className="bg-zinc-900/70 border-b border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                        <th className="py-4 px-6">User Information</th>
                                        <th className="py-4 px-6">System Role</th>
                                        <th className="py-4 px-6 text-center">Lessons Created</th>
                                        <th className="py-4 px-6 text-right">Actions</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-800/50 text-xs">
                                   {users.length > 0 ? (
                                        users.map((user) => {
                                             const uid = user._id || user.id;
                                             return (
                                                  <tr key={uid} className="hover:bg-zinc-900/20 transition group">

                                                       <td className="py-4 px-6">
                                                            <div className="flex gap-4 items-center">
                                                                 {user.image ? (
                                                                      <Image src={user.image} alt="user photo" height={40} width={40} className="rounded-full object-cover border border-zinc-800 w-10 h-10" />
                                                                 ) : (
                                                                      <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                                                                           <Person className="w-5 h-5" />
                                                                      </div>
                                                                 )}
                                                                 <div className="flex flex-col gap-0.5">
                                                                      <span className="font-bold text-zinc-200 group-hover:text-blue-400 transition">{user.name}</span>
                                                                      <span className="text-[11px] text-zinc-500">{user.email}</span>
                                                                      
                                                                 </div>
                                                            </div>
                                                       </td>

                                                       <td className="py-4 px-6">
                                                            {user.role === 'admin' ? (
                                                                 <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                                      <ShieldCheck className="w-3.5 h-3.5" /> Admin
                                                                 </span>
                                                            ) : (
                                                                 <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-950 border border-zinc-800 text-zinc-400 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                                                      <Person className="w-3.5 h-3.5" /> User
                                                                 </span>
                                                            )}
                                                       </td>

                                                       <td className="py-4 px-6 text-center">
                                                            <span className="inline-block min-w-8 text-center px-2 py-0.5 rounded-md font-bold bg-zinc-950 border border-zinc-800 text-zinc-300">
                                                                 {lessonCounts[uid] ?? '...'}
                                                            </span>
                                                       </td>

                                                       <td className="py-4 px-6 text-right">
                                                            <button
                                                                 onClick={() => { setSelectedUser(user); setIsModalOpen(true); }}
                                                                 title={user.role === 'user' ? "Promote to Admin" : "Demote to User"}
                                                                 className={`p-2 rounded-xl border transition cursor-pointer ${user.role === 'user'
                                                                      ? 'bg-zinc-950 border-zinc-800 hover:border-purple-500/50 hover:text-purple-400'
                                                                      : 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-zinc-950 hover:border-zinc-800 hover:text-zinc-400'
                                                                      }`}
                                                            >
                                                                 <ShieldCheck className="w-4 h-4" />
                                                            </button>
                                                       </td>

                                                  </tr>
                                             );
                                        })
                                   ) : (
                                        <tr>
                                             <td colSpan="4" className="py-12 text-center text-zinc-600 font-medium tracking-wide">
                                                  No users found.
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>

               {/* Confirm Modal */}
               {isModalOpen && selectedUser && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
                              <div className="flex flex-col items-center text-center space-y-2 border-b border-zinc-800/50 pb-4 mb-4">
                                   <div className="bg-purple-500/10 border border-purple-500/20 text-purple-400 p-2 rounded-full">
                                        <ShieldCheck className="w-6 h-6" />
                                   </div>
                                   <h3 className="text-base font-bold text-zinc-100">Modify Account Role</h3>
                              </div>

                              <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 text-center mb-6">
                                   <p className="text-xs text-zinc-400 leading-relaxed">
                                        Are you sure you want to change the role of{' '}
                                        <span className="text-blue-400 font-bold">"{selectedUser.name}"</span> to
                                        <span className="text-purple-400 font-bold uppercase block text-sm mt-2 tracking-wide">
                                             {selectedUser.role === 'user' ? '🚀 ADMIN PRIVILEGES' : '👤 REGULAR USER'}
                                        </span>
                                   </p>
                              </div>

                              <div className="flex items-center gap-3">
                                   <button
                                        onClick={() => { setIsModalOpen(false); setSelectedUser(null); }}
                                        className="flex-1 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-medium text-xs rounded-xl transition cursor-pointer"
                                   >
                                        Cancel
                                   </button>
                                   <button
                                        disabled={loading}
                                        onClick={handleConfirmRoleUpdate}
                                        className={`flex-1 py-2.5 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer disabled:opacity-50 ${selectedUser.role === 'user'
                                             ? 'bg-gradient-to-l from-indigo-500 to-purple-500 text-white'
                                             : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950'
                                             }`}
                                   >
                                        {loading ? 'Updating...' : selectedUser.role === 'user' ? 'Make Admin' : 'Remove Admin'}
                                   </button>
                              </div>
                         </div>
                    </div>
               )}

          </div>
     );
}
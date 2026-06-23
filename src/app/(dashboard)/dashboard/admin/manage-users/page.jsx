'use client';

import React, { useState, useEffect } from 'react';
import {
     Persons,
     TrashBin,
     ShieldCheck,
     Person,
     MagnifierPlus,
     ArrowLeft
} from '@gravity-ui/icons';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { getUsers } from '@/lib/actions/get/users';
import Image from 'next/image';

import { Button, Modal } from "@heroui/react";
import { updateUserRole } from '@/lib/actions/update/users';

export default function ManageUsers() {
     const [users, setUsers] = useState([]);
     const [loading, setLoading] = useState(false);
     const [searchQuery, setSearchQuery] = useState('');

     const [selectedUser, setSelectedUser] = useState(null);

     useEffect(() => {
          const fetchUsers = async () => {
               try {
                    const data = await getUsers();
                    setUsers(data || []);
               } catch (err) {
                    console.error("Failed to load users:", err);
                    toast.error("Failed to load users list.");
               }
          };
          fetchUsers();
     }, []);

     const filteredUsers = users.filter(user =>
          user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchQuery.toLowerCase())
     );

     const handleConfirmRoleUpdate = async () => {
          if (!selectedUser) return;

          setLoading(true);
          const newRole = selectedUser.role === 'user' ? 'admin' : 'user';

               const result = await updateUserRole(selectedUser._id, newRole);

               if (result?.success || result) {
                    setUsers(users =>
                         users.map(user => user._id === selectedUser._id ? { ...user, role: newRole } : user)
                    );

                    toast.success(`${selectedUser.name} is now an ${newRole.toUpperCase()}!`, {
                         style: { background: '#18181b', color: '#fff', border: '1px solid #27272a' }
                    });
               } else {
                    toast.error(result?.error || "Failed to update role.");
               }
     };

     return (
          <div className="w-full text-zinc-100 p-4 md:p-8 space-y-6 bg-zinc-950 min-h-screen select-none">

               {/* BACK TO DASHBOARD & HEADER */}
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/60 pb-5">
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

                    {/* SEARCH BAR */}
                    <div className="relative w-full sm:w-72">
                         <MagnifierPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                         <input
                              type="text"
                              placeholder="Search by name or email..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full bg-zinc-900/40 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition"
                         />
                    </div>
               </div>

               {/* TABLE CONTAINER */}
               <div className="bg-zinc-900/30 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
                    <div className="overflow-x-auto">
                         <table className="w-full text-left border-collapse">
                              <thead>
                                   <tr className="bg-zinc-900/70 border-b border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                                        <th className="py-4 px-6">User Information</th>
                                        <th className="py-4 px-6">System Role</th>
                                        <th className="py-4 px-6 text-center">Lessons Created</th>
                                        <th className="py-4 px-6 text-right">Actions / Controls</th>
                                   </tr>
                              </thead>
                              <tbody className="divide-y divide-zinc-800/50 text-xs">
                                   {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                             <tr key={user._id} className="hover:bg-zinc-900/20 transition group">

                                                  {/* User Name & Email */}
                                                  <td className="py-4 px-6">
                                                       <div className='flex gap-4 items-center'>
                                                            {user.image ? (
                                                                 <Image src={user.image} alt='user photo' height={40} width={40} className='rounded-full object-cover border border-zinc-800 w-10 h-10' />
                                                            ) : (
                                                                 <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400"><Person className="w-5 h-5" /></div>
                                                            )}
                                                            <div className="flex flex-col gap-0.5">
                                                                 <span className="font-bold text-zinc-200 group-hover:text-blue-400 transition">{user.name}</span>
                                                                 <span className="text-[11px] text-zinc-500">{user.email}</span>
                                                                 <span className="text-[9px] text-zinc-600 font-mono tracking-tight mt-0.5">UserID: {user._id}</span>
                                                            </div>
                                                       </div>
                                                  </td>

                                                  {/* Role Badge */}
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

                                                  {/* Total Lessons Created */}
                                                  <td className="py-4 px-6 text-center">
                                                       <span className={`inline-block min-w-8 text-center px-2 py-0.5 rounded-md font-bold ${user.totalLessons > 0 ? 'bg-zinc-950 border border-zinc-800 text-zinc-300' : 'text-zinc-600'}`}>
                                                            {user.totalLessons || 0}
                                                       </span>
                                                  </td>

                                                  {/* Action Buttons */}
                                                  <td className="py-4 px-6 text-right">
                                                       <div className="flex items-center justify-end gap-2">

                                                            {/* HeroUI Compound Modal Structure */}
                                                            <Modal>
                                                                 {/* Modal.Trigger */}
                                                                 <Modal.Trigger
                                                                      onClick={() => setSelectedUser(user)}
                                                                      title={user.role === 'user' ? "Promote to Admin" : "Demote to User"}
                                                                      className={`p-2 rounded-xl border transition cursor-pointer ${user.role === 'user' ? 'bg-zinc-950 border-zinc-800 hover:border-purple-500/50 hover:text-purple-400' : 'bg-purple-500/10 border-purple-500/30 text-purple-400 hover:bg-zinc-950 hover:border-zinc-800 hover:text-zinc-400'}`}
                                                                 >
                                                                      <ShieldCheck className="w-4 h-4" />
                                                                 </Modal.Trigger>

                                                                 {/* Backdrop and container*/}
                                                                 <Modal.Backdrop className="bg-black/70 backdrop-blur-xs">
                                                                      <Modal.Container>
                                                                           <Modal.Dialog className="sm:max-w-[400px] bg-zinc-900 border border-zinc-800 rounded-2xl p-6 text-zinc-100 shadow-2xl">
                                                                                <Modal.CloseTrigger className="text-zinc-400 hover:text-zinc-200" />

                                                                                <Modal.Header className="flex flex-col items-center text-center space-y-2 border-b border-zinc-800/50 pb-3">
                                                                                     <Modal.Icon className="bg-purple-500/10 border border-purple-500/20 text-purple-400 p-1 rounded-full flex items-center">
                                                                                          <ShieldCheck className="size-6" />
                                                                                     </Modal.Icon>
                                                                                     <Modal.Heading className="text-base font-bold text-zinc-100">Modify Account Role</Modal.Heading>
                                                                                </Modal.Header>

                                                                                <Modal.Body className="py-4">
                                                                                     {selectedUser && (
                                                                                          <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 text-center">
                                                                                               <p className="text-xs text-zinc-400 leading-relaxed">
                                                                                                    Are you sure you want to change the role of <span className="text-blue-400 font-bold">"{selectedUser.name}"</span> to
                                                                                                    <span className="text-purple-400 font-bold uppercase block text-sm mt-2 tracking-wide">
                                                                                                         {selectedUser.role === 'user' ? '🚀 ADMIN PRIVILEGES' : '👤 REGULAR USER'}
                                                                                                    </span>
                                                                                               </p>
                                                                                          </div>
                                                                                     )}
                                                                                </Modal.Body>

                                                                                <Modal.Footer className="flex items-center gap-3 border-t border-zinc-800/50 pt-4">
                                                                                     <Button slot="close" variant="secondary" className="flex-1 py-2.5 bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-zinc-200 font-medium text-xs rounded-xl transition cursor-pointer">
                                                                                          Cancel
                                                                                     </Button>
                                                                                     <Button
                                                                                          slot="close"
                                                                                          disabled={loading}
                                                                                          onClick={handleConfirmRoleUpdate}
                                                                                          className={`flex-1 py-2.5 font-bold text-xs rounded-xl shadow-lg transition cursor-pointer ${selectedUser?.role === 'user'
                                                                                                    ? 'bg-linear-to-l from-indigo-500 to-purple-500 hover:bg-purple-500 text-white'
                                                                                                    : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950'
                                                                                               }`}
                                                                                     >
                                                                                          {loading ? 'Updating...' : selectedUser?.role === 'user' ? 'Make Admin' : 'Remove Admin'}
                                                                                     </Button>
                                                                                </Modal.Footer>
                                                                           </Modal.Dialog>
                                                                      </Modal.Container>
                                                                 </Modal.Backdrop>
                                                            </Modal>

                                                            {/* Delete Button */}
                                                            <button
                                                                 onClick={() => handleDeleteUser(user._id, user.name)}
                                                                 title="Delete User Account"
                                                                 className="p-2 bg-zinc-950 border border-zinc-800 hover:border-rose-500/50 text-zinc-400 hover:text-rose-400 rounded-xl transition cursor-pointer"
                                                            >
                                                                 <TrashBin className="w-4 h-4" />
                                                            </button>

                                                       </div>
                                                  </td>

                                             </tr>
                                        ))
                                   ) : (
                                        <tr>
                                             <td colSpan="4" className="py-12 text-center text-zinc-600 font-medium tracking-wide">
                                                  No users found matching your search query.
                                             </td>
                                        </tr>
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div>

          </div>
     );
}
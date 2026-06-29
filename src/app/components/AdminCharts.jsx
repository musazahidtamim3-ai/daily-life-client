'use client';

import {
     ResponsiveContainer,
     AreaChart,
     Area,
     XAxis,
     YAxis,
     Tooltip,
     CartesianGrid,
     BarChart,
     Bar,
     Legend
} from 'recharts';
import { GraphNode } from '@gravity-ui/icons';

export default function AdminCharts({ growthData }) {
     return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

               <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-6">
                         <div>
                              <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                                   <GraphNode className="w-4 h-4 text-indigo-500" /> Platform Growth
                              </h2>
                              <p className="text-[11px] text-zinc-500">Cumulative growth analysis over the last 6 months</p>
                         </div>
                    </div>
                    <div className="w-full h-72 text-xs">
                         <ResponsiveContainer width="100%" height="100%">
                              <AreaChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                   <defs>
                                        <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                             <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                             <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                                             <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                                             <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                        </linearGradient>
                                   </defs>
                                   <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                   <XAxis dataKey="name" stroke="#71717a" />
                                   <YAxis stroke="#71717a" />
                                   <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }} />
                                   <Legend />
                                   <Area type="monotone" dataKey="users" name="Total Users" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
                                   <Area type="monotone" dataKey="lessons" name="Total Lessons" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorLessons)" />
                              </AreaChart>
                         </ResponsiveContainer>
                    </div>
               </div>

               <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 backdrop-blur-md">
                    <div className="flex items-center justify-between mb-6">
                         <div>
                              <h2 className="text-sm font-bold text-zinc-200 flex items-center gap-2">
                                   <GraphNode className="w-4 h-4 text-emerald-500" /> Monthly Signups vs Uploads
                              </h2>
                              <p className="text-[11px] text-zinc-500">Comparing user engagement rates</p>
                         </div>
                    </div>
                    <div className="w-full h-72 text-xs">
                         <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={growthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                   <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                   <XAxis dataKey="name" stroke="#71717a" />
                                   <YAxis stroke="#71717a" />
                                   <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', color: '#f4f4f5' }} />
                                   <Legend />
                                   <Bar dataKey="users" name="New Registrations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                   <Bar dataKey="lessons" name="Lessons Published" fill="#10b981" radius={[4, 4, 0, 0]} />
                              </BarChart>
                         </ResponsiveContainer>
                    </div>
               </div>

          </div>
     );
}
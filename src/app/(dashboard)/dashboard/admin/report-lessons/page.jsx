import { getReportedLessons } from '@/lib/actions/get/lessons';
import React from 'react';
import ReportedLessonsTable from '@/app/components/ReportedLessonsTable';

export const dynamic = 'force-dynamic';

const ReportedLessonsPage = async () => {
     const reportedLessons = await getReportedLessons() || [];

     return (
          <div className="min-h-screen bg-zinc-950 text-white p-8">
               <div className="max-w-7xl mx-auto space-y-6">
                    <div>
                         <h1 className="text-2xl font-black tracking-tight">Reported Lessons</h1>
                         <p className="text-sm text-zinc-500 mt-1">
                              Manage flagged content and community reports ({reportedLessons.length} items)
                         </p>
                    </div>

                    <ReportedLessonsTable initialLessons={reportedLessons} />
               </div>
          </div>
     );
};

export default ReportedLessonsPage;
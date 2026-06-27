import LessonUpdateForm from '@/app/components/LessonUpdateForm';
import { getUserSession } from '@/lib/core/session';

export default async function UpdateLessonPage({ params }) {
     const { id } = await params;
     const user = await getUserSession();

     const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/lessons/${id}`, {
          cache: 'no-store',
     });

     if (!res.ok) return <p className="text-zinc-400 text-center mt-20">Lesson not found.</p>;

     const lesson = await res.json();

     return <LessonUpdateForm lesson={lesson} isUserPremium={user.isPremium} />;
}
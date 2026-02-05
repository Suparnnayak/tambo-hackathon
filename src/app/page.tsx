'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to StudyGenie app
    router.push('/study-genie');
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin">
          <span className="text-6xl">🎓</span>
        </div>
        <h1 className="text-3xl font-bold text-white">Loading StudyGenie...</h1>
        <p className="text-purple-300">Get ready to turn your syllabus into an epic adventure</p>
      </div>
    </div>
  );
}

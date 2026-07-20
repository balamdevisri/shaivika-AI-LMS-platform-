import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AIAssistantWidget } from '@/components/ai/AIAssistantWidget';
import { LoadingScreen } from '@/components/common/LoadingScreen';

export const PublicLayout: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <div className="min-h-screen flex flex-col bg-[#020617] text-white selection:bg-[#10B981] selection:text-white">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <AIAssistantWidget />
      </div>
    </>
  );
};

import { Outlet } from 'react-router-dom';

export const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="h-16 border-b border-border flex items-center px-6">Header Placeholder</header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="h-16 border-t border-border flex items-center px-6">Footer Placeholder</footer>
    </div>
  );
};

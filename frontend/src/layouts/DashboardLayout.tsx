import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      <aside className="w-64 border-r border-border p-4">Sidebar Placeholder</aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center px-6">Header Placeholder</header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="w-full max-w-md p-8 bg-surface rounded-lg shadow-lg border border-border">
        <Outlet />
      </div>
    </div>
  );
};

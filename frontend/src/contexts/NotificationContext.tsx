import { createContext } from 'react';
import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

export const NotificationContext = createContext({});
export const NotificationProvider = ({ children }: { children: ReactNode }) => (
  <NotificationContext.Provider value={{}}>
    {children}
    <Toaster position="top-right" richColors />
  </NotificationContext.Provider>
);

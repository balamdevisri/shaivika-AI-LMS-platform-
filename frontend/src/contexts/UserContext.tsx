import { createContext } from 'react';
import type { ReactNode } from 'react';

export const UserContext = createContext({});
export const UserProvider = ({ children }: { children: ReactNode }) => <UserContext.Provider value={{}}>{children}</UserContext.Provider>;

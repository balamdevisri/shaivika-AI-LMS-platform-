import { createContext } from 'react';
import type { ReactNode } from 'react';

export const CourseContext = createContext({});
export const CourseProvider = ({ children }: { children: ReactNode }) => <CourseContext.Provider value={{}}>{children}</CourseContext.Provider>;

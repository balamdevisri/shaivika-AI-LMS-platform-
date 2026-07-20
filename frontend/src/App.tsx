import { AppRouter } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { Toaster } from 'sonner';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <Toaster position="top-right" richColors />
          <AppRouter />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;

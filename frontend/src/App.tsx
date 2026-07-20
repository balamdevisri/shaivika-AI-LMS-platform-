import { AppRouter } from './routes';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;

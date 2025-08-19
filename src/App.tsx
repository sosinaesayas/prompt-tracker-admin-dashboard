
import { AuthProvider } from './contexts/auth_context';
import { AppRoutes } from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;

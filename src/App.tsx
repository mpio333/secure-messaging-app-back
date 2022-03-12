import { Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';
import Register from './components/Register';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import Messages from './components/Messages';

const App = () => {
  return (
    <AuthProvider>
      <Navigation />

      <Routes>
        <Route index element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route
          path="messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;

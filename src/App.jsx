import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoginPage from './pages/LoginPage';
import StudentsPage from './pages/StudentsPage';
import Sidebar from './components/Sidebar';
import { auth } from './firebaseConfig';

const App = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {user && <Sidebar />}
        <div style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/students" element={user ? <StudentsPage /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={user ? "/students" : "/login"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

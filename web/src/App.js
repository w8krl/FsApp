import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Header, Sidebar, MainContent, GridContainer } from './components/layout';
import ProtectedRoute from './components/auth/ProtectedRoute'; // Import ProtectedRoute
import Login from './components/pages/Login'; // Import Login component

function App() {
  const isLoggedIn = /* logic to check if user is logged in */ false;

  return (
    <Router>
      <Routes>
        {/* Separate Route for login layout */}
        <Route path="/login" element={<Login />} />
        
        {/* Route for the main layout */}
        <Route
          path="/*"
          element={
            <GridContainer>
              <Header />
              <Sidebar />
              <Routes>
                <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn} element={<MainContent />} />} />
                {/* Add more Route components here as needed */}
              </Routes>
            </GridContainer>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

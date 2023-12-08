import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContextProvider } from './components/AuthContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Tasks from './components/Task';
import NewCars from './components/NewCars';
import ProtectedRoute from './components/ProtectedRoute';

const style = {
  bg: `h-screen w-screen bg-gradient-to-r from-[#ffdec7] to-[#fff6f0]`
}

const App = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className={style.bg}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-cars" element={<ProtectedRoute><NewCars /></ProtectedRoute>} />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </AuthContextProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Tasks from './components/Task';
import NewCars from './components/NewCars';

const style = {
  bg: `h-screen w-screen bg-gradient-to-r from-[#ffdec7] to-[#fff6f0]`
}

function App() {
  return (
    <Router>
      <NavBar />
      <div className={style.bg}>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-cars" element={<NewCars />} />
            <Route path="/tasks" element={<Tasks />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

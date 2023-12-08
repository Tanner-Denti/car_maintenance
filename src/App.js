import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Tasks from './components/Task';
import NewCars from './components/NewCars';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#ffdec7] to-[#fff6f0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`
}

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        {/* <Route path="/" exact component={Home} />
        <Route path="/new-cars" component={NewCars} /> */}
        <Route path="/tasks" component={Tasks} />
      </Switch>
    </Router>
  );
}

export default App;

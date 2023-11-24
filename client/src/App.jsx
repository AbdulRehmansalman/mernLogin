import React, { createContext, useReducer } from 'react';
import Navbar from './components/navbar/navbar';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Login from './components/login/Login';
import Register from './components/Register/Regsiter';
import Page404 from './components/404page/Page404';
import Logout from './components/logout/logout';

import { Route, Routes } from 'react-router-dom';
import { reducer, initialState } from '../src/Reducer/useReducer';

export const UserContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
        ;
      </UserContext.Provider>
    </>
  );
};

export default App;

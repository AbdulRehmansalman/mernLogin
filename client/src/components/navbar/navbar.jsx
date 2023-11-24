import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { UserContext } from '../../App';

import './navbar.css';
//* If my state is false: tu register and log in show ho;Warna na ho
const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);

  const RenderMenu = () => {
    console.log(state);
    if (state) {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/logout">
              Logout
            </NavLink>
          </li>
        </>
      );
    } else {
      return (
        <>
          <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about">
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register">
              Registration
            </NavLink>
          </li>
        </>
      );
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <NavLink className="navbar-brand" href="/">
            <img src={logo} alt="logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse mx-auto" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <RenderMenu />
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

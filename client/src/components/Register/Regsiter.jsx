import React, { useState } from 'react';
import { SquareAsterisk } from 'lucide-react';
import { FileLock } from 'lucide-react';
import { ShieldPlus } from 'lucide-react';
import { PhoneCall } from 'lucide-react';
import { Mail } from 'lucide-react';
import { UserCircle2 } from 'lucide-react';
import signup from '../../assets/signup-image.jpg';
import { NavLink, useNavigate } from 'react-router-dom';
import './register.css';
const Regsiter = () => {
  const navigate = useNavigate();
  // todo For Data(forms) Storing in Objects:Store user Data in Front End;
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    work: '',
    password: '',
    cpassword: '',
  });
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //* console.log({ ...user }); user ki individual properties require kar li hai :store it in new Object
    //* Dynamically add name fields: and its value:
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { name, email, phone, work, password, cpassword } = user;
    const res = await fetch('http://localhost:8000/registered', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
      }),
    });
    //? check if data is valid or not
    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      window.alert('Registeration failed');
      console.log('InValid Registration');
    } else {
      window.alert('Registeration Success');
      console.log('Valid Registration');
      navigate('/login');
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="sign-up">
          <div className="container mt-3">
            <div className="signup-content">
              <div className="sign-left">
                <div className="register">
                  <h2>Sign Up</h2>
                </div>
                <form method="POST" className="register-form" id="registerForm">
                  <div className="form-group">
                    <label htmlFor="name">
                      <UserCircle2 color="#4edfc2" size={32} className="user" />
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      value={user.name}
                      onChange={handleInputs}
                      placeholder=" Your Name"
                    />
                  </div>
                  <div className="line"></div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <Mail color="#4edfc2" size={32} className="user" />
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInputs}
                      placeholder=" Your Email"
                    />
                  </div>
                  <div className="line"></div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <PhoneCall color="#4edfc2" size={32} className="user" />
                    </label>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      autoComplete="off"
                      value={user.phone}
                      onChange={handleInputs}
                      placeholder=" Your Phone No"
                    />
                  </div>
                  <div className="line"></div>
                  <div className="form-group">
                    <label htmlFor="profession">
                      <ShieldPlus color="#4edfc2" size={32} className="user" />
                    </label>
                    <input
                      type="text"
                      name="work"
                      id="work"
                      autoComplete="off"
                      value={user.work}
                      onChange={handleInputs}
                      placeholder=" Your Profession"
                    />
                  </div>
                  <div className="line"></div>
                  <div className="form-group">
                    <label htmlFor="password">
                      <FileLock color="#4edfc2" size={32} className="user" />
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInputs}
                      placeholder=" Your Password"
                    />
                  </div>
                  <div className="line"></div>
                  <div className="form-group">
                    <label htmlFor="cpassword">
                      <SquareAsterisk
                        color="#4edfc2"
                        size={32}
                        className="user"
                      />
                    </label>
                    <input
                      type="password"
                      name="cpassword"
                      id="cpassword"
                      autoComplete="off"
                      value={user.cpassword}
                      onChange={handleInputs}
                      placeholder=" Your Confirm Password"
                    />
                  </div>
                  <div className="line"></div>
                  <div className="btn mt-2">
                    <button
                      onClick={postData}
                      type="submit"
                      className="btn btn-primary"
                      id="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
              <div className="sign-right">
                <figure>
                  <img src={signup} loading="lazy" />
                </figure>
                <NavLink to="/login" className="sign-inLink">
                  {' '}
                  I am already register
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Regsiter;

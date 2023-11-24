import React, { useContext, useState } from 'react';
import { Mail } from 'lucide-react';
import { FileLock } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import signin from '../../assets/signin-image.jpg';
import '../Register/register.css';
import { UserContext } from '../../App';
const Login = () => {
  // * Jo app pe state,dispatch lo login or logout k page pe:consumer k badlay useContext
  // abb jab bhi login karoo tu state true hona chahiye:
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/signin', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      //todo Server String samjta hai : and name:name ko{name} bhi likh saktai
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      window.alert('InValid Credentials');
    } else {
      //* type matlab kon sa action perform karna cha rhe or payload extra msg kis pas kar rhe action k sath
      dispatch({ type: 'USER', payload: true });
      window.alert('Login SuccessFull');
      navigate('/');
    }
  };
  return (
    <>
      <div className="wrapper">
        <div className="sign-up">
          <div className="container mt-5">
            <div className="signup-content">
              <div className="sign-left">
                <figure>
                  <img src={signin} loading="lazy" />
                </figure>
                <NavLink to="/register" className="sign-inLink">
                  {' '}
                  Create an Account
                </NavLink>
              </div>
              <div className="sign-right">
                <div className="register mt-2">
                  <h2>Sign In</h2>
                </div>
                <form method="POST" className="register-form" id="registerForm">
                  <div className="form-group">
                    <label htmlFor="email">
                      <Mail color="#4edfc2" size={32} className="user" />
                    </label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=" Your Email"
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder=" Your Password"
                    />
                  </div>
                  <div className="line"></div>
                  <div className="btn mt-1.5">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3"
                      id="submit"
                      onClick={loginUser}
                    >
                      Login{' '}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

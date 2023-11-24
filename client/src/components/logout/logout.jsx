import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';

const logout = () => {
  const { state, dispatch } = useContext(UserContext);

  const navigate = useNavigate();
  useEffect(() => {
    const callAboutPage = async () => {
      let res;
      try {
        //* Abb backend ka data call kar k yahan dekhana chahta:
        res = await fetch('http://localhost:8000/logout', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include', // iss se token ya cokie backend ma chali jai
        });

        if (res.status !== 200) {
          const error = new Error(res.error);
          throw error;
        }
        if (res.status === 200);
        {
          dispatch({ type: 'USER', payload: false });
          navigate('/login', { replace: true });
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };
    callAboutPage();
  }, []);
  return <div>logout Page</div>;
};

export default logout;

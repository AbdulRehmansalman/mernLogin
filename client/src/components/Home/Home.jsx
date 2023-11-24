import React, { useState, useEffect } from 'react';
import './home.css';
const Home = () => {
  const [UserNAME, setUserNAME] = useState('');
  const [show, setShow] = useState(false);

  // todo page ko refresh karte hy wo automaticfunction chahiye:: aGar login ho ga tu about ka page show ho ga:

  useEffect(() => {
    const userHome = async () => {
      let res;
      try {
        //* Abb backend( api ko req baje ge) ka data call kar k yahan dekhana chahta:
        res = await fetch('http://localhost:8000/getdata', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        // todo: rootuser k pass sara data jata hai: hum ne req ma store kar dia and res se send kar dia:
        //* Wo data send ho kar yahan aya:

        if (res.status === 400) {
          console.log('no credential found');
          return;
        }
        //* if data is found
        if (res.status === 200);
        {
          const data = await res.json();
          //* is data ma sarraa user ka data aa jay ga
          setUserNAME(data.name);
          console.log(data);
          // console.log(Userdata);
          setShow(true);
        }
      } catch (err) {
        console.log(err);
      }
    };
    userHome();
  }, []);
  return (
    <>
      <div className="homepage">
        <div className="home-container">
          <p>WELCOME</p>
          <h1>{UserNAME}</h1>
          <h2>
            {show ? 'HAPPY, TO SEE YOU BACK ' : 'WE ARE MERN STACK DEVELOPER'}
          </h2>
        </div>
      </div>
    </>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import './about.css';
import logo from '../../assets/signup-image.jpg';
import { useNavigate } from 'react-router-dom';
const About = () => {
  const [Userdata, setData] = useState({});

  //todo Jo Data a rha ause useState ma rakh rhe:
  const navigate = useNavigate();

  // todo page ko refresh karte hy wo automaticfunction chahiye:: aGar login ho ga tu about ka page show ho ga:

  useEffect(() => {
    const callAboutPage = async () => {
      let res;
      try {
        //* Abb backend ka data call kar k yahan dekhana chahta:
        res = await fetch('http://localhost:8000/aboutUs', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: 'include', // iss se token ya cokie backend ma chali jai
        });
        // todo: rootuser k pass sara daata jata hai: hum ne req ma store kar dia and res se send kar dia:
        //* Wo data se send ho kar yahan aya:

        if (res.status === 400) {
          console.log('no credential found');
          navigate('/Login');
          return;
        }
        //* if data is found
        if (res.status === 200);
        {
          const data = await res.json();
          //* is data ma sarraa user ka data aa jay ga
          setData(data);
          // console.log(Userdata);
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };
    callAboutPage();
  }, []);

  return (
    <>
      <div className="card-container mt-5">
        <form>
          <div className="row">
            <div className="col-md-4 col-sm-6">
              <div className="img">
                <img src={logo} alt="Picture" />
              </div>
            </div>
            <div className="col-md-6 col-sm-6">
              <div className="info">
                <div className="name">
                  <h4>{Userdata.name}</h4>
                  <h6>{Userdata.work}</h6>
                </div>
                <div className="ranking">
                  <p>
                    RANKINGS: <span> 1/10</span>
                  </p>
                </div>
              </div>
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                    href="#home"
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                    href="#profile"
                  >
                    TimeLine
                  </a>
                </li>
              </ul>
            </div>
            <div className="btn col-md-2 mt-3">
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 ">
              <div className="profile-work">
                <a href="#">
                  <p style={{ color: 'black' }}>Youtube</p>
                </a>
                <a href="#">
                  <p style={{ color: 'black' }}>Instagram</p>
                </a>

                <p style={{ color: 'black' }}>Abdul Rehman</p>
                <a href="#">
                  <p style={{ color: 'black' }}>Youtube</p>
                </a>
                <p style={{ color: 'black' }}>Software Engineer</p>
              </div>
            </div>
            <div className="col-md-8 pl-4 about-user">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tab-panel"
                  aria-labelledby="home-tab"
                >
                  <div className="row mt-1">
                    <div className="col-md-6">
                      <label htmlFor="User Id">User ID</label>
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <p> {Userdata._id}</p>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-md-6">
                      <label htmlFor="name">Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{Userdata.name}</p>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-md-6">
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{Userdata.email}</p>
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-md-6">
                      <label htmlFor="Phone">Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p>{Userdata.phone}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label htmlFor="Profession">Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p>{Userdata.work}</p>
                    </div>
                  </div>
                </div>
                <div
                  className="about-profile tab-pane fade"
                  id="profile"
                  role="tab-panel"
                  aria-labelledby="profile-tab"
                >
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label htmlFor="experience">Experience</label>
                    </div>
                    <div className="col-md-6">
                      <p>Expert</p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label htmlFor="hourly Rate">Hourly Rate</label>
                    </div>
                    <div className="col-md-6">
                      <p>$500</p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label htmlFor="total projects">Total Projects</label>
                    </div>
                    <div className="col-md-6">
                      <p>245</p>
                    </div>
                  </div>
                  <div className="row mt-2">
                    <div className="col-md-6">
                      <label htmlFor="avail">Availability</label>
                    </div>
                    <div className="col-md-6">
                      <p>6 months</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;

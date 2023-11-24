import React, { useState, useEffect } from 'react';
import './contatc.css';
const Contact = () => {
  const [Userdata, setData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // todo page ko refresh karte hy wo automaticfunction chahiye:: aGar login ho ga tu about ka page show ho ga:

  useEffect(() => {
    const userContact = async () => {
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
          setData({
            ...Userdata,
            name: data.name,
            email: data.email,
            phone: data.phone,
          });
          console.log(data);
          // console.log(Userdata);
        }
      } catch (err) {
        console.log(err);
      }
    };
    userContact();
  }, []);
  // to handle controlled Inputs:
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...Userdata, [name]: value });
  };

  // todo Send data to Backend:
  const contactForm = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = Userdata;
    const res = await fetch('http://localhost:8000/contactUs', {
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
        message,
      }),
    });
    //? check if data is valid or not; ta k wo pending state ma na rhe:
    const data = await res.json();
    if (!data) {
      console.log('Message Not Send');
    } else {
      alert('Message Send');
      setData({ ...Userdata, message: '' });
    }
  };

  return (
    <>
      <div className="container contact-form">
        <div className="contact-image">
          <img
            src="https://image.ibb.co/kUagtU/rocket_contact.png"
            alt="rocket_contact"
          />
        </div>
        <form method="post">
          <h3>Drop Us a Message</h3>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Your Name *"
                  onChange={handleInputs}
                  value={Userdata.name}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  name="email"
                  className="form-control"
                  placeholder="Your Email *"
                  onChange={handleInputs}
                  value={Userdata.email}
                />
              </div>
              <div className="form-group">
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  placeholder="Your Phone Number *"
                  onChange={handleInputs}
                  value={Userdata.phone}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btnContact"
                  value="Send Message"
                  onClick={contactForm}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <textarea
                  name="message"
                  className="form-control"
                  placeholder="Your Message *"
                  value={Userdata.message}
                  onChange={handleInputs}
                  style={{ width: '100%', height: '150px' }}
                ></textarea>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Contact;

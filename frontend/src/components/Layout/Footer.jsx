import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillYoutube,
  AiOutlineTwitter,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  
  footerProductLinks,
  footerSupportLinks,
} from "../../static/data";


const Footer = () => {
  return (
    <div className="bg-dark text-white">
      <div className="container py-5">
        <div className="row text-center text-md-start">
          <div className="col-md-3 mb-3">
            {/* <p>The home and elements needed to create beautiful products.</p> */}
            <div className="d-flex justify-content-center justify-content-md-start">
              <AiFillFacebook size={25} className="me-3 cursor-pointer" />
              <AiOutlineTwitter size={25} className="me-3 cursor-pointer" />
              <AiFillInstagram size={25} className="me-3 cursor-pointer" />
              <AiFillYoutube size={25} className="cursor-pointer" />
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <h5 className="mb-2">Company</h5>
            {footerProductLinks.map((link, index) => (
              <div key={index}>
                <Link to={link.link} className="text-secondary d-block mb-1">
                  {link.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="col-md-3 mb-3">
         
          </div>

          <div className="col-md-3">
            <h5 className="mb-2">Support</h5>
            {footerSupportLinks.map((link, index) => (
              <div key={index}>
                <Link to={link.link} className="text-secondary d-block mb-1">
                  {link.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-light-dark text-secondary text-center py-3">
        <div className="container">
          <div className="row">
           
            <div className="col-12 col-md-4">
              <img
                src="https://hamart-shop.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-payment.a37c49ac.png&w=640&q=75"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;


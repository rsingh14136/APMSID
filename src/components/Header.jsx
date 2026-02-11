import { useState } from "react";
import logo from "../assets/images/logo.jpg";
import emblemlogo from "../assets/images/emblem.jpg";
import nhmlogo from "../assets/images/nhm.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-regular-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-regular-svg-icons";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* Top Bar */}
      <div className="topbar ms-xl-5">
        <div className="container-fluid">
          <div className="row py-2">
            <div className="col-md-4 col-lg-5 col-xl-5 col-xxl-5 text-white">
            <p className="mb-0 pb-0">  
           Andhra Pradesh Medical Services And Infrastructure Development Corporation </p>
            </div>
            <div className="col-md-8 text-lg-end col-lg-7 col-xl-7 col-xxl-7">
              <a href="tel: +91-987654321" className="text-white px-lg-2 text-decoration-none">
              <FontAwesomeIcon icon={faMobileScreen} size="lg" className="ms-lg-2" />  +91040-24656688
              </a> <span className="text-white"> | </span>
              <a href="mailto:apmsidc[dot]itcell[at]gmail.com" className="text-white text-decoration-none  px-lg-2">
              <FontAwesomeIcon icon={faEnvelope} size="lg" /> apmsidc.itcell@gmail.com
              </a> <span className="text-white"> | </span> 
               <a href="#" className="text-white text-decoration-none ps-lg-2">
           <FontAwesomeIcon icon={faClock} size="lg" /> Working : 8 AM - 5 PM
              </a>
            </div>
          </div>
        </div>
      </div>

      {/*Logo and Main Menu */}
    
<div className="container-fluid">
  <div className="row d-flex align-items-center">
    <div className="col-md-3 col-lg-4 col-xl-3">
 <div className="logo ps-xl-4 pt-1"> 
  <div className="clogo d-flex align-items-center">  <img src={logo} alt="e-Aushadhi Logo" className="img-fluid"/>
  <div className="cname ps-1"> <h1 className="fw-semibold">e-Aushadhi</h1>
 <h2 className="">Government of Andhra Pradesh</h2></div>
  </div>


 </div>

    </div>
    <div className="col-md-7 col-xl-7 col-lg-6">
   <nav className="navbar navbar-expand-lg">
     <button
            className="navbar-toggler"
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          <div
            id="main-menu"
            className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav w-100 d-flex justify-content-end ">
              <li><a className="nav-link d-flex align-items-center" href="#home"> <FontAwesomeIcon icon={faHome} size="lg" className="me-1" /> Home</a></li>
              <li><a className="nav-link" href="#about">About Us</a></li>
              <li><a className="nav-link" href="#services">Services</a></li>
                    <li><a className="nav-link" href="#services">Features</a></li>
                       <li><a className="nav-link" href="#">Dashboard</a></li>
              <li><a className="nav-link" href="#footer">Contact Us</a></li>
            </ul>
          </div>
        
      </nav></div>
      <div className="col-md-2">
        <div className="logos d-none align-items-center justify-content-end d-md-flex">
          <img src={emblemlogo} className="me-3 img-fluid"/>
             <img src={nhmlogo} className="img-fluid"/>
        </div>
      </div>
 





</div>

      </div>
     
    </header>
  );
}

export default Header;

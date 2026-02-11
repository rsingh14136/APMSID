import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-regular-svg-icons";
import { faMobileScreen, faCheck } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import ScrollToTop from "./ScrollToTop";
import logo from "../assets/images/logo.jpg";

function Footer() {
  return (
     <>
  <footer id="footer" className="pt-5 pb-1 text-white">
             <div className="footer-top">
            <div className="container">
                <div className="row">
                    <div className="col-lg-5 col-md-6 footer-contact">
<div className="logo pt-1 mb-3"> 
  <div className="clogo d-flex align-items-center">  <img src={logo} alt="e-Aushadhi Logo"/>
  <div className="cname ps-1"> <h1 className="fw-semibold text-white">e-Aushadhi</h1>
 <h2 className="text-white">Government of Andhra Pradesh</h2></div>
  </div>


 </div>

                 <div className="address contact-details mb-4">
                    <div className="d-flex align-items-center mb-2">  <FontAwesomeIcon icon={faHome} aria-hidden="true" className="me-2" /> <h3 className="fw-regular">Address</h3></div>
                             <p className="fw-light">APMSIDC, Plot No. 9, Survey No. 49, IT Park, mangalapuri, <br></br>Guntur District - 522503</p>
</div>
                <div className="email contact-details mb-4">
                     <div className="d-flex align-items-center mb-1"> 
                            <a href="mailto:test@example.com"> <FontAwesomeIcon icon={faEnvelope} aria-hidden="true" className="me-2" /> 
      </a>

                      <h3 className="fw-regular">Email</h3></div>
                    <a href="mailto:apmsidc[dot]itcell[at]gmail.com"
                        className="text-decoration-none fw-light">apmsidc.itcell@gmail.com</a>
                </div>
                <div className="phone contact-details mb-4">
                     <div className="d-flex align-items-center mb-2">  <FontAwesomeIcon icon={faMobileScreen} aria-hidden="true" className="me-2" />
                    <h3 className="fw-regular">Phone</h3></div>
                    <a href="tel:02222626124" className="text-decoration-none fw-light">+91040-24656688</a>
                </div>


                    </div>
                    <div className="col-lg-3 col-md-3 footer-links mt-4">
                        <h4>Useful Links</h4>
                        <ul className="list-unstyled">
                            <li><a className="fw-bold text-decoration-none" href="#"><FontAwesomeIcon icon={faCheck} className="me-1"/>Home</a></li>
                                <li><a className="fw-regular text-decoration-none" href="#about"><FontAwesomeIcon icon={faCheck} className="me-1"/>About Us</a></li>
                                <li><a className="fw-regular text-decoration-none" href="#services"><FontAwesomeIcon icon={faCheck} className="me-1"/>Services</a></li>
                                <li><a className="fw-regular text-decoration-none" href="#photogallery"><FontAwesomeIcon icon={faCheck} className="me-1"/>Gallery</a>
                                </li>
                                <li><a className="fw-regular text-decoration-none" href="#footer"><FontAwesomeIcon icon={faCheck} className="me-1"/>Contact</a></li>
                                <li><a className="fw-regular text-decoration-none" href="#"><FontAwesomeIcon icon={faCheck} className="me-1"/>Dashboard</a></li>
                                <li><a className="fw-regular text-decoration-none" href="#"><FontAwesomeIcon icon={faCheck} className="me-1"/>Tutorials</a></li>
                        </ul>
                    </div>
                                   <div className="col-lg-4 col-md-6 mt-4">
                        <h4>Our Location </h4>
                        
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3827.082216291848!2d80.55777977505785!3d16.420650329934464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f14c160a7ee1%3A0xc3a871a195294eda!2sAPMSIDC%20head%20office!5e0!3m2!1sen!2sin!4v1767008040575!5m2!1sen!2sin" width="100%" height="270"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                        <div className="social-links mt-3"> </div>
                    </div>
                </div>
                <div className="copyright border-top border-1 border-light border-opacity-25">
            <div
                className="container-fluid copyright text-white fw-regylar py-3">
                <div className="text-center">
Website owned & maintained by: Centre for Development of Advanced Computing (C-DAC) © 2026 C-DAC. All rights reserved.</div>
              
            </div>
        </div>

            </div>
        </div>
    </footer> 
<ScrollToTop />
    </>
    
  );
}

export default Footer;

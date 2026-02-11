import { useState } from "react";
import ministersimage from "../assets/images/ministers.png";
import medicinesbottle from "../assets/images/slider/medicines-bottle.png";
import supplychain from "../assets/images/slider/supply-chain.png";
import captcha from "../assets/images/captcha.jpg";
import medicineicon from "../assets/images/medicines-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLockOpen } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router";



function Slider() {
    const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
    const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy credentials
    const dummyUser = "admin";
    const dummyPass = "123456";
    const dummyCaptcha = "46219Q";

    if (
      username === dummyUser &&
      password === dummyPass &&
      captchaValue === dummyCaptcha
    ) {
      alert("Login successful ✅");
       navigate("/dashboard");

    } else {
      alert("Invalid credentials or captcha ❌");
    }
  };
    
  return (
     <section id="slider">
<div className="container-fluid px-md-0">
<div className="row">
  <div className="col-lg-4 col-xl-3 col-md-4">
    <img src={ministersimage} className="ministerimage"/>
  </div>
  <div className="col-md-8 col-xl-6 col-lg-8"> <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0"
                                    className="active" aria-current="true" aria-label="Slide 1"></button>
                                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"
                                    className="" aria-current="true" aria-label="Slide 2"></button>
                                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"
                                    className="" aria-current="true" aria-label="Slide 3"></button>
                        
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active" data-bs-interval="10000">
                                    <div className="row">
                                        <div className="col-md-9 d-flex align-items-center">
                                            <div
                                                className="carousel-caption text-center position-relative pt-lg-5 pt-2 start-0 top-0 ps-lg-5">
                                                  <h4 className="d-flex align-items-center fw-light text-uppercase mb-0 highlighttext text-white text-center px-lg-5 px-1 py-2 m-auto mb-2"><img src={medicineicon} className="me-lg-2"/>Supply Chain Management System</h4>
                                                <h5 className="mb-lg-3 pb-2 border-bottom border-light fw-semibold">
                                                    e-Aushadhi<span className="fw-light punchline"> - Smarter Supply Management</span>
                                                </h5>

                                                <p className="fw-light d-none d-sm-block">Seamless tracking, distribution, and management of drugs, sutures, and surgical equipment for district warehouses across Andhra Pradesh.</p>


                                            </div>
                                        </div>
                                        <div
                                            className="col-md-3 px-md-0 mt-lg-5 d-flex col-12 text-center justify-content-center justify-content-lg-start align-items-start">
                                              <img src={medicinesbottle} className="position-relative mt-lg-5"/>
                                        </div>

                                    </div>


                                </div>
                     
                           <div className="carousel-item" data-bs-interval="2000">
                                    <div className="row">
                                        <div className="col-md-9 d-flex align-items-center">
                                     <div
                                                className="carousel-caption text-center position-relative pt-lg-5 pt-2 start-0 top-0 ps-lg-5">
                                                  <h4 className="d-flex align-items-center fw-light text-uppercase mb-0 highlighttext text-white text-center px-lg-5 px-1 py-2 m-auto mb-2"><img src={medicineicon} className="me-lg-2"/>Supply Chain Management System</h4>
                                                <h5 className="mb-lg-3 pb-2 border-bottom border-light fw-semibold">
                                                    e-Aushadhi<span className="fw-light punchline"> - Smarter Supply Management</span>
                                                </h5>

                                                <p className="fw-light d-none d-sm-block">Seamless tracking, distribution, and management of drugs, sutures, and surgical equipment for district warehouses across Andhra Pradesh.</p>


                                            </div>
                                        </div>
                                        <div
                                            className="col-md-3 px-md-0 mt-lg-5 d-flex col-12 text-center justify-content-center justify-content-lg-start align-items-start">
                                              <img src={supplychain} className="position-relative mt-lg-5"/>
                                        </div>

                                    </div>


                                </div>
                     
                           <div className="carousel-item" data-bs-interval="4000">
                                    <div className="row">
                                        <div className="col-md-9 d-flex align-items-center">
                                           <div
                                                className="carousel-caption text-center position-relative pt-lg-5 pt-2 start-0 top-0 ps-lg-5">
                                                  <h4 className="d-flex align-items-center fw-light text-uppercase mb-0 highlighttext text-white text-center px-lg-5 px-1 py-2 m-auto mb-2"><img src={medicineicon} className="me-lg-2"/>Supply Chain Management System</h4>
                                                <h5 className="mb-lg-3 pb-2 border-bottom border-light fw-semibold">
                                                    e-Aushadhi<span className="fw-light punchline"> - Smarter Supply Management</span>
                                                </h5>

                                                <p className="fw-light d-none d-sm-block">Seamless tracking, distribution, and management of drugs, sutures, and surgical equipment for district warehouses across Andhra Pradesh.</p>


                                            </div>
                                        </div>
                                        <div
                                            className="col-md-3 px-md-0 mt-lg-5 d-flex col-12 text-center justify-content-center justify-content-lg-start align-items-start">
                                              <img src={medicinesbottle} className="position-relative mt-lg-5"/>
                                        </div>

                                    </div>


                                </div>
                     

                            </div>


                        </div></div>
     <div className="col-xl-3 col-lg-12 col-md-12 loginform">
                    <div id="header-form" className="position-relative">
                        <div className="card-body m-0 px-2" id="login">
                            <h1 className="mb-0 pb-1 fw-semibold mt-4">Log In</h1><span className="fw-light d-block">Sign in
                                into your account</span>
                            <form className="mt-4 mb-4" onSubmit={handleSubmit}>
                                <div className=" form-outline mb-3 position-relative"><input type="text" id=""
                                        className="form-control form-control-lg" placeholder="* Username" required="true" value={username}
                  onChange={(e) => setUsername(e.target.value)}
/>
                                      <FontAwesomeIcon icon={faUser} className="position-absolute"/>
                                </div>
                                <div className="form-outline mb-3 position-relative"> <input type={showPassword ? "text" : "password"} id=""
                                        className="form-control form-control-lg" placeholder="* Password" required="true" value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                                       
                                </div>
                                <div className="form-outline mb-3 text-start position-relative"> <input type="text" id=""
                                        className="form-control form-control-lg" placeholder="Enter Captcha"
                                        required="true" value={captchaValue}
                  onChange={(e) => setCaptchaValue(e.target.value)}/>
                                    <p className="text-decoration-underline">Captcha is case
                                        sensitive
                                    </p> <img src={captcha}/>
                                </div>
                                <div className="submitbutton btn position-relative p-0 me-2"> <input type="submit" className="border-0 bg-transparent text-white"
                                        value="GET STARTED"/>
                                    {/* <div className="icon position-absolute bg-white rounded-circle text-center "><FontAwesomeIcon icon={faArrowRight} /></div> */}
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
</div>

</div>


    </section>
  );
}

export default Slider;

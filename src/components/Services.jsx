
import drug from "../assets/images/services/drugs.jpg";
import procurement from "../assets/images/services/procurement.jpg";
import warehouse from "../assets/images/services/warehouse.jpg";
import dashboard from "../assets/images/services/dashboard.jpg";
import reports from "../assets/images/services/reports.jpg";
import logistics from "../assets/images/services/logistics.jpg";
import qa from "../assets/images/services/qa.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

function Services() {
  return (
      <section id="services" className="position-relative ">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-lg-12">
              <div className="serviceheading position-relative text-white text-center   mt-5">
                <h2 className="fw-semibold position-relative">Services</h2>
             <p className="mt-2 px-5">It supports annual demand planning, procurement, inventory management, and distribution.</p>

              </div>
            </div>
            <div className="col-md-12 col-lg-12 position-relative">

              <Swiper
                modules={[Navigation, Autoplay]}
                navigation
                autoplay={{ delay: 3000 }}
                spaceBetween={20}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  576: { slidesPerView: 2 },
                  992: { slidesPerView:5 },
                  1200: { slidesPerView: 5 },
                   1600: { slidesPerView:5 }
                }} 
                className="services-carousel mt-5" style={{ paddingBottom: "77px"}}>
                <SwiperSlide>
                  <div className="item text-center bg-white px-2 py-2">
                    <img src={drug} alt="Drug Section" className="img-fluid"  />
                    <figcaption className="py-4">
                      <h6 className="fw-semibold">Drug Section</h6>
                      <p className="fw-light">Carry out procurement of drugs</p>
                    </figcaption>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="item text-center bg-white px-2 py-2">
                    <img src={dashboard} alt="Dashboard"  className="img-fluid"/>
                    <figcaption className="py-4">
                      <h6 className="fw-semibold">Dashboard</h6>
                      <p className="fw-light">Statistical Maintenance of Data</p>
                    </figcaption>
                  </div>
                </SwiperSlide>

  <SwiperSlide>

                <div  className="item text-center bg-white px-2 py-2">
                  <img src={warehouse} alt="Warehouse"  className="img-fluid"/>



                  <figcaption className="py-4 px-2 position-relative">
                    <h6 className="fw-semibold mb-2">Warehouse</h6>
                    <p className="fw-light mb-0 pb-0 ">Storage and Distribution of drugs to State.
                    </p>

                  </figcaption>

                </div>
   </SwiperSlide>
                  <SwiperSlide>
                <div
                  className="item text-center bg-white px-2 py-2">
                  <img src={procurement} alt="Procurement"  className="img-fluid" />

                  <figcaption className="py-4 px-2 position-relative">
                    <h6 className="fw-semibold mb-2">Procurement</h6>
                    <p className="fw-light mb-0 pb-0 ">To facilitate the procurement of medicines that
                      meet prescribed safety and health standards
                    </p>

                  </figcaption>

                </div>
   </SwiperSlide>
                  <SwiperSlide>
                <div
                  className="item text-center bg-white px-2 py-2">
                  <img src={logistics} alt="Logistics"  className="img-fluid"/>


                  <figcaption className="py-4 px-2 position-relative">
                    <h6 className="fw-semibold mb-2">Logistics</h6>
                    <p className="fw-light mb-0 pb-0 ">Plans the efficient flow and storage of drugs
                    </p>

                  </figcaption>

                </div>   </SwiperSlide>
  <SwiperSlide>
                <div
                  className="item text-center bg-white px-2 py-2">
                  <img src={reports} alt="Reports"  className="img-fluid"/>


                  <figcaption className="py-4 px-2 position-relative">
                    <h6 className="fw-semibold mb-2">Reports Section</h6>
                    <p className="fw-light mb-0 pb-0 ">To generate reports based on user requirements
                    </p>

                  </figcaption>

                </div> </SwiperSlide>
  <SwiperSlide>
                <div
                  className="item text-center bg-white px-2 py-2">
                  <img src={qa} alt="QA"   className="img-fluid"/>



                  <figcaption className="py-4 px-2 position-relative">
                    <h6 className="fw-semibold mb-2">
                      QA Section</h6>
                    <p className="fw-light mb-0 pb-0 ">To ensure the quality of drugs
                    </p>

                  </figcaption>

                </div> </SwiperSlide>
  <SwiperSlide>
                <div
                  className="item text-center bg-white px-2 py-2">
                  <img src={drug} alt="Payment"  className="img-fluid"/>



                  <figcaption className="py-4 px-2 position-relative">
                    <h6 className="fw-semibold mb-2">

                      Account Section</h6>
                    <p className="fw-light mb-0 pb-0 ">Payment of Bills, Preparation of Accounts
                    </p>

                  </figcaption>

                </div>
 </SwiperSlide>
                {/* Repeat for other slides */}
              </Swiper>


            </div>
          </div></div>
      </section>
  );
}

export default Services;
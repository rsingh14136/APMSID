
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faFileSignature, faMagnifyingGlassChart, faList } from "@fortawesome/free-solid-svg-icons";

function About() {
  return (
    <section id="about" className="pt-md-2 pt-lg-2 pt-xl-4 pt-xxl-2 pt-2">
        <div className="container-fluid px-md-2 px-lg-4 px-xl-5 px-xxl-5">

          <div className="row aboutus py-4 px-xl-3">
            <div className="col-lg-4 col-md-12">
              <div className="mt-3">
                <h4 className="">Why e-Aushadhi</h4>
                <h3 className="mt-2 fw-light">Ensuring Quality in Services and Providing affordable Healthcare Services in the State of Andhra Pradesh</h3>
                <p className=" fw-regular mt-3 text-justify">e-Aushadhi - Andhra Pradesh is a web based supply chain management application software solution for managing Annual Demand, Purchase, Inventory & Distribution of various drugs and Consumables to various District Drug Warehouses (DWH) of State, District Hospitals (DH) their sub stores like Community Health+ Center (CHC) and Primary Health Center (PHC) to distribute drugs to patient, the final consumer of the supply chain.</p>


              </div>
            </div>



            <div className="col-lg-8 col-md-12">
              <div className="row boxespanel mb-5 ps-lg-5 ps-0 position-relative">
                <div className="col-lg-6 col-sm-12">
                  <div className="content"></div>
                  <div className="box pe-2 py-1 py-lg-2  position-relative">
                    <div className="icon text-center rounded-circle position-absolute start-0"><FontAwesomeIcon icon={faBell} /></div>
                    <h3 className="mb-1 ps-3 pt-1 fw-semibold">Alert Management</h3>
                    <p className="fw-light pt-1 ps-3">A utility purposed to broadcast information, managing
                      event based and job based
                      alerts and governing the pending tasks as soon as user login into system.</p>
                  </div></div>
                <div className="col-lg-6 col-sm-12">
                  <div className="box pe-2 py-1  py-lg-2  position-relative">
                    <div className="icon text-center rounded-circle position-absolute start-0"><FontAwesomeIcon icon={faMagnifyingGlassChart} />
                    </div>
                    <h3 className="mb-1 ps-3 pt-1 fw-semibold">Data Analysis</h3>
                    <p className="fw-light pt-1 ps-3">A utility purposed to broadcast information, managing
                      event based and job based alerts and governing the pending tasks as soon as user
                      login into system.</p>
                  </div></div>

                <div className="col-lg-6 col-sm-12">
                  <div className="box pe-2 py-1  py-lg-2  position-relative">
                    <div className="icon text-center rounded-circle position-absolute start-0"><FontAwesomeIcon icon={faFileSignature} /></div>
                    <h3 className="mb-1 ps-3 pt-1 fw-semibold">Digital Signature</h3>
                    <p className="fw-light pt-1 ps-3">A utility purposed to broadcast information, managing
                      event
                      based and job based alerts
                      and governing the pending tasks as soon as user login into system.</p>
                  </div>
                </div>
                <div className="col-lg-6 col-sm-12">
                  <div className="box pe-2 py-1  py-lg-2   position-relative">
                    <div className="icon text-center rounded-circle position-absolute start-0"><FontAwesomeIcon icon={faList} /></div>
                    <h3 className="mb-1 ps-3 pt-1 fw-semibold">Dynamic Reports</h3>
                    <p className="fw-light pt-1 ps-3">A utility purposed to broadcast information, managing
                      event
                      based and job based alerts
                      and governing the pending tasks as soon as user login into system.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
     
  );
}

export default About;
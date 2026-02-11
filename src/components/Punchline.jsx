
import medicines from "../assets/images/medicines.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Punchline() {
  return (
   <div id="punchline" className="container position-relative py-5 px-5">
<img src={medicines} className="position-absolute"/>

<div className="row py-4">
    <div className="col-md-6">
        <h5 className="">Unified Medical<br></br>Supply Chain Management System</h5>
    </div>

    <div className="col-md-6 d-flex justify-content-end">
        <button className="bg-dark text-white px-3 border-0 rounded-2 d-flex align-items-center " >Get In Touch <FontAwesomeIcon icon={faArrowRight} className="ms-1" /></button>
    </div>
</div>
   </div>
  );
}

export default Punchline;
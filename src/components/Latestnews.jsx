
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-regular-svg-icons";


function Latestnews() {
  return (
      <section id="latest-news">
        <div class="container-fluid px-lg-0">
          <div id="latestnews" class="mt-md-0 mt-2">
            <div class="row">
              <div class="col-md-5 col-lg-4 col-xl-3 px-md-0">
                <div class="heading position-relative px-3 py-2 d-flex align-items-center justify-content-center">
                  <FontAwesomeIcon icon={faNewspaper} className="bg-white rounded-circle px-2 py-2" />
                  <div className="headingcontent ps-2"> <h2 class="fw-semibold">Notifications &amp; Circulars</h2>
                    <p class="fw-light mb-0 ">Explore our latest news</p></div>
                </div>
              </div>
              <div class="col-md-7 col-lg-8 col-xl-9 d-flex align-items-center bg-light px-md-0">
                <div class="ticker-wrapper py-2 py-md-0">
                  <div class="ticker">
                    <span>📰 Breaking: HTML5 News Ticker Created Without Marquee!</span>
                    <span>⚡ Update: CSS Animations Make It Smooth and Modern.</span>
                    <span>📊 Market: Stock Prices Reach All-Time High Today.</span>
                    <span>🌍 World: Technology Brings People Closer Than Ever.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
  

  );
}

export default Latestnews;
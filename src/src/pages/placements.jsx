import React from "react";
import Header from "../components/header";
import FooterCredit from "../components/footerCredit";
function Placements() {
  return (
    <div>
      <Header />
      {/*  Section  */}
      <section className="card" id="year">
        <div className="container  align-items-center ">
          <div className="row justify-content-center heading border-bottom">
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 ">
              <h1 className="sp">Placements</h1>
            </div>
          </div>
          <div className="row ">
            <div
              className="row justify-content-center heading "
              style={{ marginLeft: "0px", marginRight: "0px" }}
            >
              <h2 style={{ fontSize: "70px", marginTop: "20%" }}>
                Coming soon...
              </h2>
            </div>
          </div>
        </div>
      </section>
      {/* End Section */}
      <FooterCredit />
    </div>
  );
}

export default Placements;

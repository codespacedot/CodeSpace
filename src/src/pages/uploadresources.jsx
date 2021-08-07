import React from "react";
import Header from "../components/header";
import FooterCredit from "../components/footerCredit";
function UploadResources() {
  return (
    <div>
      <Header />
      {/*  Section  */}
      <section className="form" id="form">
        <div className="d-flex align-items-center justify-content-center">
          <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
            <div className="row justify-content-center disable-select">
              <div className="col-lg-6 col-md-12" style={{ marginTop: "15%" }}>
                <h1 className="sptext">Connect.</h1>
                <h1 className="sptext" style={{ color: "#0761d1" }}>
                  Code.
                </h1>
                <h1 className="sptext">Execute.</h1>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-8 col-sm-8 d-flex align-items-center justify-content-center center-block">
            <form className="row g-2 needs-validation center-block" noValidate>
              <div
                className="justify-content-center col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 heading bottom"
                style={{ marginTop: "7%" }}
              >
                <h1 className="sp">Upload Resourses</h1>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <div className="form-outline ">
                  <select className="form-select">
                    <option selected>Select Semister</option>
                    <option value={3}>Three</option>
                    <option value={4}>Four</option>
                    <option value={5}>Five</option>
                    <option value={6}>Six</option>
                    <option value={7}>Seven</option>
                    <option value={8}>Eight</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <div className="form-outline ">
                  <select className="form-select">
                    <option selected>Select Subject</option>
                    <option value="CG">CG</option>
                    <option value="DS">DS</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <div className="form-outline ">
                  <select
                    className="form-select"
                    id="Category"
                    onchange="showDiv(this)"
                  >
                    <option selected>Select Category</option>
                    <option value="Library">Library</option>
                    <option value="Exam">Exam</option>
                  </select>
                </div>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <div className="form-outline ">
                  <input
                    type="text"
                    className="form-control"
                    id="library"
                    placeholder="Enter a Title"
                    required
                  />
                </div>
              </div>
              <div id="exam">
                <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                  <div className="form-outline ">
                    <select className="form-select">
                      <option selected>Select Exam</option>
                      <option value="CG">CG</option>
                      <option value="DS">DS</option>
                    </select>
                  </div>
                </div>
                <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                  <div className="form-outline ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter a Year"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a Year.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <div className="form-outline ">
                  <input
                    type="file"
                    className="form-control"
                    placeholder="Upload File"
                    required
                  />
                  <div className="invalid-feedback">Please provide a file.</div>
                </div>
              </div>
              <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
                <button className="submit-btn btn" type="submit">
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* End Section */}
      <FooterCredit />
    </div>
  );
}

export default UploadResources;

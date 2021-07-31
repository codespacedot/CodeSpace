import React from "react";
import Header from "../components/header";
import FooterCredit from "../components/footerCredit";

function Aboutus() {
  return (
    <div>
      <Header />
      {/*  Section  */}
      <section
        className="d-flex align-items-center justify-content-center"
        id="about"
      >
        <div className="container  align-items-center ">
          <div className="row justify-content-center">
            <div className="col-10 about " style={{ marginTop: "45px" }}>
              <h1 className="logo  sp ">
                <a className="splogo" href="/">
                  &lt;/&gt;
                </a>
                <a href="/"> CodeSpace</a>
              </h1>
            </div>
            <div className="col-10 about" style={{ marginTop: "25px" }}>
              {" "}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="col-10 about sp" style={{ marginTop: "80px" }}>
              <h2>Developed By</h2>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
                <div className="team text-center rounded p-3 py-4">
                  <a href="/">
                    {" "}
                    <img
                      src="/assets/img/avatar.png"
                      className="img-fluid avatar avatar-medium shadow rounded-pill"
                      alt=""
                    />
                  </a>
                  <div className="content mt-3">
                    <a href="/">
                      {" "}
                      <h4 className="title mb-0">FristName LastName</h4>
                    </a>
                    <small className="text-muted">Role</small>
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
                <div className="team text-center rounded p-3 py-4">
                  <a href="/">
                    {" "}
                    <img
                      src="/assets/img/avatar.png"
                      className="img-fluid avatar avatar-medium shadow rounded-pill"
                      alt=""
                    />
                  </a>
                  <div className="content mt-3">
                    <a href="/">
                      {" "}
                      <h4 className="title mb-0">FristName LastName</h4>
                    </a>
                    <small className="text-muted">Role</small>
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
                <div className="team text-center rounded p-3 py-4">
                  <a href="/">
                    {" "}
                    <img
                      src="/assets/img/avatar.png"
                      className="img-fluid avatar avatar-medium shadow rounded-pill"
                      alt=""
                    />
                  </a>
                  <div className="content mt-3">
                    <a href="/">
                      {" "}
                      <h4 className="title mb-0">FristName LastName</h4>
                    </a>
                    <small className="text-muted">Role</small>
                  </div>
                </div>
              </div>
              {/*end col*/}
              <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2">
                <div className="team text-center rounded p-3 py-4">
                  <a href="/">
                    {" "}
                    <img
                      src="/assets/img/avatar.png"
                      className="img-fluid avatar avatar-medium shadow rounded-pill"
                      alt=""
                    />
                  </a>
                  <div className="content mt-3">
                    <a href="/">
                      {" "}
                      <h4 className="title mb-0">FristName LastName</h4>
                    </a>
                    <small className="text-muted">Role</small>
                  </div>
                </div>
              </div>
              {/*end col*/}
            </div>
            {/*end row*/}
          </div>
        </div>
      </section>
      {/* End Section */}
      <FooterCredit />
    </div>
  );
}

export default Aboutus;

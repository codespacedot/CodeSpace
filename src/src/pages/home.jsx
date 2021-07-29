import React, { Component } from "react";

import Header from "../components/header";
import Footer from "../components/footer";

class home extends Component {
  //render of home
  render() {
    return (
      <div>
        {/* Calling header component */}
        <Header />

        {/* body of header page */}
        <section
          id="hero"
          className="d-flex align-items-center justify-content-center"
        >
          <div className="container">
            <div className="row justify-content-center disable-select">
              <div
                className="col-xl-6 col-lg-6 col-md-8 col-sm-8"
                style={{ marginTop: "7%", marginBottom: "6%" }}
              >
                <h1 className="sptext">Connect.</h1>
                <h1 className="sptext" style={{ color: "#0761d1" }}>
                  Code.
                </h1>
                <h1 className="sptext">Execute.</h1>
              </div>
            </div>
            {sessionStorage.getItem("CS_TOKEN") !== null ? null : (
              <a
                href="/signup"
                className="get-started-btn2"
                style={{ marginBottom: "2%" }}
              >
                Sign Up
              </a>
            )}
            <div className="row justify-content-center">
              <div className="col-xl-10 col-lg-8">
                <h6 className="spmes">
                  A place for Department Of Technology's Computer Science and
                  Technology students, <br />
                  to share resources &amp; publish articles.
                </h6>
              </div>
            </div>
          </div>
        </section>

        {/* Calling footer for home screen */}
        <Footer />
      </div>
    );
  }
}
export default home;

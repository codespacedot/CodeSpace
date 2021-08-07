import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="text footer-info">
                  <h3>
                    <a className="splogo text" href="index.html">
                      {" "}
                      &lt;/&gt;{" "}
                    </a>
                    <a className="sp text" href="/">
                      {" "}
                      CodeSpace{" "}
                    </a>
                  </h3>
                  <h4 className="sp">
                    Connect.<span style={{ color: "#0761d1" }}> Code.</span>
                    Execute.
                  </h4>
                  <div className="social-links text">
                    <a
                      href="https://github.com/codespacedot/CodeSpace"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github text"
                    >
                      <i className="fa fa-github large fa-2x" />
                    </a>
                  </div>
                </div>
              </div>
              <div class="col-lg-2 col-md-6 footer-links">
                <h4>Links</h4>
                <ul>
                  <li>
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web Design
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Product Management
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Marketing
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Graphic Design
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-2 col-md-6 footer-links">
                <h4>Academics</h4>
                <ul>
                  <li
                    onClick={() => {
                      sessionStorage.setItem("year", 4);
                    }}
                  >
                    <a href="/academics">Final Year</a>
                  </li>
                  <li
                    onClick={() => {
                      sessionStorage.setItem("year", 3);
                    }}
                  >
                    <a href="/academics">Third Year</a>
                  </li>
                  <li
                    onClick={() => {
                      sessionStorage.setItem("year", 4);
                    }}
                  >
                    <a href="/academics">SecondYear</a>
                  </li>
                  <li>
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Upload Resource
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-2 col-md-6 footer-links">
                <h4>Made With</h4>
                <ul>
                  <li>
                    <a
                      href="https://fastapi.tiangolo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FastAPI
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.heroku.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Heroku
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://deta.sh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Deta
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://reactjs.org/docs/getting-started.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://vercel.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Vercel
                    </a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-3 col-md-6">
                <h4>Contact Us</h4>
                <p>
                  Department of Technology <br />
                  Shivaji University, Vidya Nagar <br />
                  Kolhapur, Maharashtra <br />
                  India <br />
                  416004 <br />
                  <br />
                  <a href="mailto:codespacedot@gmail.com">
                    codespacedot@gmail.com
                  </a>
                  <br />
                </p>
              </div>{" "}
            </div>
          </div>
          <div className="copyright">
            Copyright © 2021 CodeSpace. All Rights Reserved
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            className="back-to-top d-flex align-items-center justify-content-center"
          >
            <i className="fa fa-arrow-up" />
          </button>
        </div>
      </footer>
    );
  }
}
export default Footer;

import React, { Component } from "react";

class Footer extends Component {
  render() {
    return (
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="footer-info">
                  <h3>
                    <a className="splogo" href="index.html">
                      &lt;/&gt;
                    </a>
                    <a className="sp" href="index.html">
                      CodeSpace
                    </a>
                  </h3>
                  <h4 className="sp">
                    Connect.<span style={{ color: "#0761d1" }}> Code.</span>
                    Execute.
                  </h4>
                  <div className="social-links">
                    <a href className="github">
                      <i className="fa fa-github large fa-2x" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Links</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right" />

                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web Design
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Web Development
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Product Management
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />

                    <a
                      href="https://csdot.ml"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Marketing
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
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
              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Made With</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right" />{" "}
                    <a
                      href="https://fastapi.tiangolo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      FastAPI
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                    <a
                      href="https://www.heroku.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Heroku
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                    <a
                      href="https://deta.sh"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Deta
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
                    <a
                      href="https://reactjs.org/docs/getting-started.html"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      React
                    </a>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right" />
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
              <div className="col-lg-3 col-md-6">
                <h4>Contact Us</h4>
                <p>
                  Kolhapur <br />
                  India <br />
                  <br />
                  codespacedot@gmail.com
                  <br />
                </p>
              </div>
            </div>
          </div>
          <div className="copyright">
            Copyright © 2021
            <strong>
              <span> CodeSpace</span>
            </strong>
            . All Rights Reserved
          </div>
        </div>
        <div>
          <div id="preloader">
            <span> &lt;/&gt; </span>
          </div>
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

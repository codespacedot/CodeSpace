//import "./App.css";

function header() {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center justify-content-lg-between">
        <h1 className="logo me-auto sp me-lg-0">
          <a className="splogo" href="index.html">
            &lt;/&gt;
          </a>
          <a href="index.html">CodeSpace</a>
        </h1>
        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
            <li>
              <a className="nav-link" href="#">
                Home
              </a>
            </li>
            <li className="dropdown">
              <a href="#">
                <span>Academics</span>
              </a>
              <ul>
                <li>
                  <a href="#">Final Year</a>
                </li>
                <li>
                  <a href="#">Third Year</a>
                </li>
                <li>
                  <a href="#">Second Year</a>
                </li>
                <li>
                  <a href="#">Upload Resources</a>
                </li>
              </ul>
            </li>
            <li>
              <a className="nav-link" href="#">
                Placements
              </a>
            </li>
            <li>
              <a className="nav-link" href="#">
                Certification
              </a>
            </li>
          </ul>
          <i className="fa fa-bars mobile-nav-toggle" />
        </nav>
        <div className="d-flex align-items-right justify-content-lg-end">
          <button
            className="d-flex align-items-center justify-content-center"
            id="theme-toggle"
            aria-label="Switch to dark theme"
            style={{ height: "42px", left: "0px" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={22}
              height={22}
              viewBox="0 0 22.39 22.39"
            >
              <g className="toggle-sun">
                <path d="M19.13,7.93V3.28H14.46L11.21,0,7.93,3.28H3.28V7.93L0,11.21l3.28,3.25V19.1H7.93l3.28,3.29,3.25-3.26H19.1V14.46l3.29-3.29Zm-7.94,9.39a6.16,6.16,0,0,1-6.13-6.19,5.92,5.92,0,0,1,.48-2.35,5.73,5.73,0,0,1,3.38-3.3,6.2,6.2,0,0,1,7.65,8.79,5.63,5.63,0,0,1-5,3.05Z" />
              </g>
              <g className="toggle-circle">
                <circle className="cls-1" cx="11.19" cy="11.19" r="4.93" />
              </g>
            </svg>
          </button>
        </div>
        <a href className="get-started-btn">
          Log In
        </a>
      </div>
    </header>
  );
}

export default header;

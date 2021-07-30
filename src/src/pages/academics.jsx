import React, { useState, useEffect } from "react";
import Header from "../components/header";
import axios from "axios";
import Preloader from "../components/preloader";
import FooterCredit from "../components/footerCredit";
import { Offline, Online } from "react-detect-offline";

//Academics component starts

function Academics() {
  const [isLoading, setIsLoading] = useState(true);
  const [yearName, setYearName] = useState("");
  const [year, setYear] = useState(sessionStorage.getItem("year"));
  const [oddSem, setOddSem] = useState(0);
  const [evenSem, setEvenSem] = useState(0);
  const [yearData, setYearData] = useState([]);
  const gitLabLink = "https://github.com/codespacedot/";

  //calling api based on selected year
  useEffect(() => {
    if (year !== null) {
      //function to call api
      axios
        .get(`https://csdot.herokuapp.com/api/academics/year/${year}`)
        .then((res) => {
          if (year === "4") {
            setYearName("Final Year");
            setOddSem("VII");
            setEvenSem("VIII");
          } else if (year === "3") {
            setYearName("Third Year");
            setOddSem("V");
            setEvenSem("VI");
          } else if (year === "2") {
            setYearName("Second Year");
            setOddSem("III");
            setEvenSem("IV");
          }
          if (res.status === 200) {
            const result = res.data;
            setYearData(result);
            setIsLoading(false);
          }
        })
    } else {
      setYear(0);
      setIsLoading(false);
    }
  }, [year]);

  //render of academics
  return (
    <div>
      <Online>
        <Header />

        {/* Calling pre-loader component */}
        {isLoading ? (
          <div>
            <Preloader />
          </div>
        ) : (
          <section class="card" id="year">
            <div class="container  align-items-center ">
              <div class="row justify-content-center heading border-bottom">
                <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 ">
                  <h1 class="sp">{yearName}</h1>
                </div>
              </div>

              <div class="row ">
                <div
                  class="row justify-content-center heading "
                  style={{ marginLeft: "0px", marginRight: "0px" }}
                >
                  <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 ">
                    <h2 class="sp">Semester {oddSem}</h2>
                  </div>
                </div>

                {/* Mapping of academics data */}
                {yearData.ODD_SEMESTER.SUBJECTS.map((odd) => {
                  return (
                    <div
                      key={odd.key}
                      class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace"
                    >
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a href="/">{odd.abbreviation}</a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a href="/">{odd.name}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {yearData.ODD_SEMESTER.LABS.map((odd) => {
                  return (
                    <div
                      key={odd.key}
                      class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace"
                    >
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a
                              href={gitLabLink + odd.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {odd.abbreviation} Lab
                            </a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a
                              href={gitLabLink + odd.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {odd.name}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div
                  class="row justify-content-center heading "
                  style={{ marginLeft: "0px", marginRight: "0px" }}
                >
                  <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6 ">
                    <h2 class="sp">Semester {evenSem}</h2>
                  </div>
                </div>

                {yearData.EVEN_SEMESTER.SUBJECTS.map((even) => {
                  return (
                    <div
                      key={even.key}
                      class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace"
                    >
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a href="/">{even.abbreviation}</a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a href="/">{even.name}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {yearData.EVEN_SEMESTER.LABS.map((even) => {
                  return (
                    <div
                      key={even.key}
                      class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace"
                    >
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a
                              href={gitLabLink + even.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {even.abbreviation} Lab
                            </a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a
                              href={gitLabLink + even.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {even.name}
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
        {/* calling footer component for academics screen */}
        <FooterCredit />
      </Online>
      <Offline>
        <center>
          <h1 style={{ color: "blue" }}>
            You're offline right now. Check your internet connection.
          </h1>
        </center>
      </Offline>
    </div>
  );
}

export default Academics;

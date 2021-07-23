import React, { useState, useEffect } from "react";
import Header from "../components/header";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import FooterCred from "../components/foot-cred";
import { Offline, Online } from "react-detect-offline";

//To set width of loading bar
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));

function Academics() {
  const [isLoading, setisLoading] = useState(true);
  const [yearName, setyearName] = useState("");
  const [year, setyear] = useState(sessionStorage.getItem("year"));
  const [oddSem, setoddSem] = useState(0);
  const [evenSem, setevenSem] = useState(0);
  const [yearData, setyearData] = useState([]);
  const gitLabLink = "https://github.com/codespacedot/";

  const classes = useStyles();

  useEffect(() => {
    console.log("year is", year);
    console.log("year data in ue is", yearData);
    getYear();
    console.log(yearData);
  });
  const getYear = () => {
    console.log(year);
    if (year !== null) {
      axios
        .get(`https://csdot.herokuapp.com/api/academics/year/${year}`)
        .then((res) => {
          if (year === "4") {
            setyearName("Final Year");
            setoddSem("VII");
            setevenSem("VIII");
          } else if (year === "3") {
            setyearName("Third Year");
            setoddSem("V");
            setevenSem("VI");
          } else if (year === "2") {
            setyearName("Second Year");
            setoddSem("III");
            setevenSem("IV");
          }
          console.log("responce is", res);
          if (res.status === 200) {
            console.log("res is", res.data);
            const result = res.data;
            setyearData(result);
            setisLoading(false);
            sessionStorage.removeItem("year");
          } else if (res.status === 500) {
            window.location("/");
          }
        })
        .catch((error) => {
          console.log("errorrr", error);
          window.location("/");
        });
    } else {
      setyear(0);
      setisLoading(false);
    }
  };
  return (
    <div>
      <Online>
        <Header />
        {year === 0 ? (
          (window.location = "/")
        ) : isLoading ? (
          <div className={classes.root}>
            <LinearProgress color="primary" />
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
                    <h2 class="sp">Semister {oddSem}</h2>
                  </div>
                </div>

                {yearData.ODD_SEMESTER.SUBJECTS.map((e) => {
                  console.log(e.abbreviation);
                  console.log(e.name);
                  return (
                    <div class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace">
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a href="/">{e.abbreviation}</a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a href="/">{e.name}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {yearData.ODD_SEMESTER.LABS.map((e) => {
                  return (
                    <div class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace">
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a
                              href={gitLabLink + e.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {e.abbreviation} Lab
                            </a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a
                              href={gitLabLink + e.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {e.name}
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
                    <h2 class="sp">Semister {evenSem}</h2>
                  </div>
                </div>

                {yearData.EVEN_SEMESTER.SUBJECTS.map((e) => {
                  console.log(e.abbreviation);
                  console.log(e.name);
                  return (
                    <div class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace">
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a href="/">{e.abbreviation}</a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a href="/">{e.name}</a>
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {yearData.EVEN_SEMESTER.LABS.map((e) => {
                  return (
                    <div class="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace">
                      <div class="icon-box">
                        <div class="icon">
                          {" "}
                          <h4>
                            <a
                              href={gitLabLink + e.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {e.abbreviation} Lab
                            </a>
                          </h4>{" "}
                        </div>

                        <div class="none">
                          {" "}
                          <p>
                            <a
                              href={gitLabLink + e.abbreviation}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {e.name}
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
        {/* calling footer component from src-components-footer.js */}
        <FooterCred />
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

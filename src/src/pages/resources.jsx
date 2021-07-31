import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Preloader from "../components/preloader";
import FooterCredit from "../components/footerCredit";
import axios from "axios";

function Resources() {
  const [isLoading, setIsLoading] = useState(true);
  const selectedSubject = sessionStorage.getItem("SELECTED_SUBJECT");
  const [libraryData, setLibraryData] = useState([]);
  const [examData, setExamData] = useState([]);
  //Taking environment variables
  const { REACT_APP_CS_API } = process.env;

  //calling api based on selected subject
  useEffect(() => {
    if (selectedSubject) {
      //function to call api
      axios
        .get(`${REACT_APP_CS_API}/api/academics/resources/${selectedSubject}`)
        .then((res) => {
          setIsLoading(false);
          setLibraryData(res.data.LIBRARY);
          setExamData(res.data.EXAM);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    } else {
      window.history.back();
    }
  }, [REACT_APP_CS_API, selectedSubject]);
  return (
    <div>
      {selectedSubject === null || selectedSubject === "" ? (
        window.history.back()
      ) : (
        <div>
          <Header />
          {/* Calling pre-loader component */}
          {isLoading ? (
            <div>
              <Preloader />
            </div>
          ) : (
            <section className="card" id="year">
              <div className="container  align-items-center ">
                <div className="row justify-content-center heading ">
                  <div className="col-xl-4 col-lg-4 col-md-6 col-sm-6 ">
                    <h1 className="sp">Subject Name</h1>
                  </div>
                </div>
                <div className="row " style={{ marginTop: "20px" }}>
                  <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                      <button
                        style={{ marginLeft: "25px" }}
                        className="nav-link active"
                        id="nav-notes-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-notes"
                        type="button"
                        role="tab"
                        aria-controls="nav-notes"
                        aria-selected="true"
                      >
                        Library
                      </button>
                      <button
                        className="nav-link"
                        id="nav-papers-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-papers"
                        type="button"
                        role="tab"
                        aria-controls="nav-papers"
                        aria-selected="false"
                      >
                        Exam
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-notes"
                      role="tabpanel"
                      aria-labelledby="nav-notes-tab"
                    >
                      <div className="row ">
                        {libraryData.length < 1 ? (
                          <div className="container">
                            <div className="col-lg-12 col-md-12 col-sm-6 justify-content-center disable-select">
                              <h2
                                className="sp"
                                style={{
                                  fontSize: "40px",
                                  marginTop: "80px",
                                }}
                              >
                                {" "}
                                <span>
                                  {" "}
                                  <i class="fa fa-folder-open-o"></i>
                                </span>{" "}
                                No resources
                              </h2>
                            </div>
                          </div>
                        ) : (
                          libraryData.map((data) => {
                            return (
                              <div
                                key={data.url}
                                className="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace"
                              >
                                <div className="icon-box">
                                  <div
                                    className="none s-text"
                                    style={{ marginTop: "7%" }}
                                  >
                                    {" "}
                                    <p>
                                      <a
                                        href={data.url}
                                        download
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        {" "}
                                        {data.title}
                                      </a>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="nav-papers"
                      role="tabpanel"
                      aria-labelledby="nav-papers-tab"
                    >
                      <div className="row ">
                        {examData.length < 1 ? (
                          <div className="container">
                            <div className="col-lg-12 col-md-12 col-sm-6 justify-content-center disable-select">
                              <h2
                                className="sp"
                                style={{
                                  fontSize: "40px",
                                  marginTop: "80px",
                                }}
                              >
                                <span>
                                  {" "}
                                  <i class="fa fa-folder-open-o"></i>
                                </span>{" "}
                                No resources
                              </h2>
                            </div>
                          </div>
                        ) : (
                          examData.map((data) => {
                            return (
                              <div>
                                <div
                                  key={data.url}
                                  className="col-lg-4 col-md-4 d-flex align-items-stretch  cardspace"
                                >
                                  <div className="icon-box">
                                    <div
                                      className="none s-text"
                                      style={{ marginTop: "7%" }}
                                    >
                                      {" "}
                                      <p>
                                        <a
                                          href={data.url}
                                          download
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {data.title}
                                        </a>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* End Section */}
          <FooterCredit />
        </div>
      )}
    </div>
  );
}

export default Resources;

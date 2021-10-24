import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { emptyData } from "../constants";
import axios from "axios";
import Preloader from "../components/preloader";

function Profile() {
  const userData = sessionStorage.getItem("USER_PROFILE");
  const [isLoading, setIsLoading] = useState(true);
  const parseUserData = JSON.parse(userData);
  const userToken = sessionStorage.getItem("CS_TOKEN");

  //Taking environment variables
  const { REACT_APP_CS_API } = process.env;

  useEffect(() => {
    getUserInfo();
  });
  const getUserInfo = async () => {
    await axios
      .request({
        method: "GET",
        url: `${REACT_APP_CS_API}/api/users/me`,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((resUser) => {
        const userData = JSON.stringify(resUser.data);
        sessionStorage.setItem("USER_PROFILE", userData);
        setIsLoading(false);
      })
      .catch((_) => {});
  };
  return (
    <div>
      {userToken !== null ? (
        <div>
          {isLoading ? (
            <div>
              <Preloader />
            </div>
          ) : (
            <div>
              <Header />
              <section className="form" id="form">
                <div className=" container d-flex align-items-center justify-content-center">
                  <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
                    <div className="row justify-content-center disable-select">
                      <div className="col-lg-6 col-md-12">
                        <h1 className="sptext">Connect.</h1>
                        <h1 className="sptext" style={{ color: "#0761d1" }}>
                          Code.
                        </h1>
                        <h1 className="sptext">Execute.</h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-10 col-sm-10 col-12 d-flex align-items-center justify-content-center center-block card-profile">
                    <div
                      className="row align-items-center justify-content-center"
                      style={{ marginTop: "0%" }}
                    >
                      <div className=" d-flex align-items-center justify-content-center cardspace">
                        <div className="icon-box ">
                          <div
                            className="gear"
                            style={{ textAlign: "end", paddingRight: "1%" }}
                          >
                            <a
                              href="/edit-profile"
                              style={{ textAlign: "right" }}
                            >
                              <i className="fa fa-cog fa-2x " />
                            </a>
                          </div>
                          <div className="profile">
                            <div>
                              <img
                                src={
                                  parseUserData.profile_pic === "NA" ||
                                  parseUserData.profile_pic === null
                                    ? "assets/img/avatar.png"
                                    : parseUserData.profile_pic
                                }
                                className="img-fluid avatar avatar-medium shadow rounded-pill"
                                alt=""
                              />
                            </div>
                            <h2>{parseUserData.name}</h2>
                            <div className>
                              <a
                                href={
                                  parseUserData.github === emptyData
                                    ? null
                                    : parseUserData.github
                                }
                                title={
                                  parseUserData.github === emptyData
                                    ? "No Link Available"
                                    : null
                                }
                              >
                                <i className="fa fa-github large fa-2x" />
                              </a>
                              <a
                                href={
                                  parseUserData.linkedin === emptyData
                                    ? null
                                    : parseUserData.linkedin
                                }
                                title={
                                  parseUserData.linkedin === emptyData
                                    ? "No Link Available"
                                    : null
                                }
                              >
                                <i className="fa fa-linkedin-square large fa-2x" />
                              </a>
                            </div>
                            <div>
                              {parseUserData.bio === emptyData ? (
                                <h5>Bio: {emptyData}</h5>
                              ) : (
                                <h5>{parseUserData.bio}</h5>
                              )}
                            </div>
                            <h5>Batch: {parseUserData.batch}</h5>
                          </div>
                        </div>
                      </div>
                      <div className=" d-flex align-items-center justify-content-center cardspace">
                        <div className="icon-box ">
                          <div className="profile">
                            <h4 className="sp border-bottom">Skills</h4>
                            <div className="grid-container">
                              {parseUserData.skills.length === 0 ? (
                                <p>Please add skills.</p>
                              ) : (
                                parseUserData.skills.map((element) => {
                                  return (
                                    <div key={element}>
                                      <button className="skills">
                                        {element}
                                      </button>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              {/* End Section */}
              <Footer />
            </div>
          )}
        </div>
      ) : (
        window.history.back()
      )}
    </div>
  );
}

export default Profile;

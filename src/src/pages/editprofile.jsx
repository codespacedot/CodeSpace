import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Modal from "@material-ui/core/Modal";
//To set width of loading bar
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    "& > * + *": {
      marginTop: theme.spacing(0),
    },
  },
}));
function EditProfile() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [passModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const userData = sessionStorage.getItem("USER_PROFILE");
  const parseUserData = JSON.parse(userData);
  //   console.log("user data is : ", parseUserData);
  const userToken = sessionStorage.getItem("CS_TOKEN");
  const { REACT_APP_CS_API } = process.env;

  const deleteAccount = () => {
    setIsLoading(true);
    axios
      .delete(`${REACT_APP_CS_API}/api/users/delete`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          sessionStorage.removeItem("CS_TOKEN");
          sessionStorage.removeItem("USER_PROFILE");
          window.location = "/login";
        }
      })
      .catch((_) => {});
  };

  return (
    <div>
      {userToken !== null ? (
        <div>
          <div className={classes.root}>
            <LinearProgress
              color="primary"
              className={isLoading ? "d-block" : "d-none"}
            />
          </div>
          <Header />
          {/*  Section  */}
          <section className="form" id="form">
            <div className="container" style={{ marginTop: "1%" }}>
              <a href="/profile" style={{ marginLeft: "10%" }}>
                &lt;&nbsp; Back
              </a>
            </div>
            <div className=" container d-flex align-items-center justify-content-center ">
              <div className="row">
                <div className="col-lg-1" />
                <div className="col-lg-4 col-md-12 col-sm-12 col-12 d-flex align-items-center justify-content-center center-block card-profile">
                  <div
                    className="row align-items-center justify-content-center"
                    style={{ marginTop: "0%" }}
                  >
                    <div className=" d-flex align-items-center justify-content-center cardspace">
                      <div className="icon-box ">
                        <div className="profile">
                          <div>
                            <button
                              className="profile-button"
                              onClick={() => {
                                console.log("modal open");
                                setShowModal(true);
                              }}
                            >
                              <img
                                src="assets/img/avatar.png"
                                className="img-fluid avatar avatar-medium shadow rounded-pill"
                                alt=""
                              />
                            </button>
                          </div>
                          <div className>
                            <button
                              className="skills-change col-10 "
                              onClick={() => setShowModal(true)}
                            >
                              Change Profile Picture
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex align-items-center justify-content-center cardspace">
                      <div className="icon-box  col-lg-10 col-xl-10 d-none d-lg-block">
                        <div className="profile ">
                          <button
                            className="skills-change col-12 col-lg-10 col-md-12"
                            onClick={() => setPasswordModal(true)}
                          >
                            Change Password
                          </button>
                          <button
                            className="skills-delete col-12 col-lg-10 col-md-12"
                            onClick={() => setDeleteModal(true)}
                          >
                            Delete Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12 d-flex align-items-center justify-content-center center-block card-profile">
                  <div
                    className="row align-items-center justify-content-center"
                    style={{ marginTop: "0%" }}
                  >
                    <form className="row g-2 align-items-center justify-content-center needs-validation">
                      <div className="align-items-center justify-content-center ">
                        <div
                          className="col-12 bottom"
                          style={{ textAlign: "center" }}
                        >
                          <h1 className="sp">Edit Profile</h1>
                        </div>
                      </div>
                      <div className=" col-6 col-lg-5 col-md-6 bottom ">
                        <div className="form-outline ">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom01"
                            placeholder="Frist Name"
                            pattern="[a-z]{2,}"
                            required
                          />
                          <div className="invalid-feedback">
                            Please Provide valid First Name.
                          </div>
                        </div>
                      </div>
                      <div className="col-6 col-lg-5 col-md-6 bottom ">
                        <div className="form-outline ">
                          <input
                            type="text"
                            className="form-control"
                            id="validationCustom02"
                            placeholder="Last Name"
                            pattern="[a-z]{2,}"
                            required
                          />
                          <div className="invalid-feedback">
                            Please Provide valid Last Name.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-10 col-md-12 bottom">
                        <div className="form-outline ">
                          <input
                            type="email"
                            className="form-control"
                            id="validationCustom05"
                            placeholder="Email Address"
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a valid Email Address.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-10 col-md-12 bottom">
                        <div className="input-group mb-2">
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows={2}
                            placeholder="Bio"
                            minLength={10}
                            required
                            defaultValue={""}
                          />
                          <div className="invalid-feedback" id="inval-mess1">
                            Bio should be 10 Character long.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-10 col-md-12 bottom">
                        <div className="input-group form-outline ">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            github.com/
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Github Profile"
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a valid link.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-10 col-md-12 bottom">
                        <div className="input-group form-outline ">
                          <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            linkedin.com/in/
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="LinkedIn Profile"
                            required
                          />
                          <div className="invalid-feedback">
                            Please provide a valid link.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-10 col-md-12 bottom">
                        <div className="form-outline ">
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Batch"
                            required
                          />
                          <div className="invalid-feedback">
                            Batch should be 4 Character long.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-10 col-md-12 bottom">
                        <div className="input-group mb-2">
                          <textarea
                            className="form-control"
                            rows={2}
                            placeholder="Add Skills, separated by comma"
                            minLength={10}
                            required
                            defaultValue={""}
                          />
                          <div className="invalid-feedback" id="inval-mess1">
                            Skills should be 10 Character long.
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-lg-10 col-md-12 bottom">
                        <button
                          className="submit-btn btn"
                          id="signup"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                    <div className="   d-flex align-items-center justify-content-center cardspace">
                      <div className="icon-box col-sm-12 col-md-12 col-xs-12 d-xl-none d-lg-none d-md-bock d-sm-block d-xs-block">
                        <div className="profile">
                          <button
                            className="skills-change col-10"
                            onClick={() => setPasswordModal(true)}
                          >
                            Change Password
                          </button>
                          <button
                            className="skills-delete col-10"
                            onClick={() => setDeleteModal(true)}
                          >
                            Delete Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1" />
                {/* Modal Pass reset */}
                <Modal open={passModal}>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="mod-head">
                          <h5 className="sp">Change Password </h5>
                        </div>
                        <button
                          type="button"
                          className="close-btn"
                          onClick={() => setPasswordModal(false)}
                        >
                          <i className="fa fa-times fa-2x" />{" "}
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className=" col-12 d-flex align-items-center justify-content-center center-block">
                          <form
                            className="row g-2 needs-validation center-block"
                            noValidate
                            id="resetpass"
                          >
                            <div
                              className="col-12  bottom"
                              style={{ paddingTop: "2vh" }}
                            >
                              <div
                                className="input-group mb-2"
                                id="show_hide_password"
                              >
                                <input
                                  type="password"
                                  className="form-control"
                                  id="pass-input"
                                  placeholder="Old Password"
                                  minLength={8}
                                  maxLength={12}
                                  required
                                />
                                <span className="input-group-text ">
                                  {" "}
                                  <button
                                    className="pass-link"
                                    type="button"
                                    id="show_hide_pass"
                                  >
                                    <i
                                      id="pass-show"
                                      className="fa fa-eye-slash"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </span>
                                <div className="invalid-feedback" id="message2">
                                  Password should be 8 Character long.
                                </div>
                              </div>
                            </div>
                            <div className="col-12  bottom">
                              <div className="input-group mb-2">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="New Password"
                                  minLength={8}
                                  maxLength={12}
                                  required
                                />
                                <span className="input-group-text ">
                                  {" "}
                                  <button className="pass-link" type="button">
                                    <i
                                      className="fa fa-eye-slash"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </span>
                                <div className="invalid-feedback" id="message2">
                                  Password should be 8 Character long.
                                </div>
                              </div>
                            </div>
                            <div className="col-12  bottom">
                              <div className="input-group mb-2">
                                <input
                                  type="password"
                                  className="form-control"
                                  placeholder="Confirm New Password"
                                  minLength={8}
                                  maxLength={12}
                                  required
                                />
                                <span className="input-group-text ">
                                  {" "}
                                  <button className="pass-link" type="button">
                                    <i
                                      className="fa fa-eye-slash"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </span>
                                <div className="invalid-feedback" id="message2">
                                  Password should be 8 Character long.
                                </div>
                              </div>
                            </div>
                            <div className="col-12  bottom">
                              <button
                                className="submit-btn btn"
                                id="reset-pass"
                                type="submit"
                              >
                                Reset Password
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                {/* Modal delete Accout */}
                <Modal open={deleteModal}>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="mod-head">
                          <h5 style={{ paddingTop: "2px" }} className="splogo">
                            {" "}
                            &lt;/&gt;{" "}
                          </h5>
                          <h5 className="sp">&nbsp;CodeSpace </h5>
                        </div>
                        <button
                          type="button"
                          className="close-btn"
                          onClick={() => setDeleteModal(false)}
                        >
                          <i className=" fa fa-times fa-2x" />{" "}
                        </button>
                      </div>
                      <div className="modal-body">
                        <div
                          id="modal-message"
                          className=" fail align-items-center justify-content-center"
                        >
                          {" "}
                          <i className="fa fa-exclamation-circle  fa-2x ">
                            <h4> Warning</h4>
                          </i>
                          <h5>Do you really want to Delete your account?</h5>
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ fontSize: "20px" }}
                          >
                            <button
                              className="skills-change col-6 "
                              onClick={() => setDeleteModal(true)}
                            >
                              Cancel
                            </button>
                            <button className="skills-delete col-6">
                              Yes, Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
                {/* Modal Change Profile Pic */}
                <Modal open={showModal}>
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <div className="mod-head">
                          <h5 className="sp">Change Profile Picture</h5>
                        </div>
                        <button
                          type="button"
                          className="close-btn"
                          onClick={() => setShowModal(false)}
                        >
                          <i className=" fa fa-times fa-2x" />{" "}
                        </button>
                      </div>
                      <div className="modal-body">
                        <div
                          id="modal-message"
                          className="fail  align-items-center justify-content-center"
                        >
                          <div>
                            <button className="profile-button">
                              <img
                                src="assets/img/avatar.png"
                                className="img-fluid avatar avatar-medium shadow rounded-pill"
                                alt=""
                              />
                            </button>
                          </div>
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              paddingRight: "15px",
                              paddingLeft: "15px",
                            }}
                          >
                            <button className="skills-delete col-4">
                              Remove
                            </button>
                            <button className="skills-change col-4 ">
                              New
                            </button>
                            <button className="confirm  col-4">Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>
              </div>
            </div>
          </section>
          {/* End Section */}
          <Footer />
        </div>
      ) : (
        window.history.back()
      )}
    </div>
  );
}

export default EditProfile;

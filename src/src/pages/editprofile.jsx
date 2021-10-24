import React, { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";
import Preloader from "../components/preloader";
import Modal from "@material-ui/core/Modal";
import Toast from "../components/toast";
import { sha256 } from "js-sha256";
import {
  confirmationMessage,
  emptyData,
  githubLink,
  errorForBatch,
  linkedinLink,
  passwordNotMatches,
  passwordChangeSuccessfully,
  errorTryAgain,
} from "../constants";
import {
  invalidEmail,
  regEmail,
  editProfileFormMessage,
  formPasswordError,
  changeDetailsError,
  changesSaved,
  profilePictureUpdated,
  removeProfile,
} from "../constants";

function EditProfile() {
  // const classes = useStyles();
  const userData = sessionStorage.getItem("USER_PROFILE");
  const parseUserData = JSON.parse(userData);

  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    parseUserData.profile_pic
  );
  const [previewImg, setPreviewImg] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updatedFirstname, setUpdatedFirstname] = useState(emptyData);
  const [updatedLastname, setUpdatedLastname] = useState(emptyData);
  const [updatedemail, setUpdatedEmail] = useState(emptyData);
  const [updatedBio, setUpdatedBio] = useState(emptyData);
  const [password, setPassword] = useState(emptyData);
  const [confirmPassword, setConfirmPassword] = useState(emptyData);
  const [updatedGithubLink, setUpdatedGithubLink] = useState(emptyData);
  const [updatedLinkedLink, setUpdatedLinkedLink] = useState(emptyData);
  const [updatedSkills, setUpdatedSkills] = useState("");
  const [invalidEmailId, setInvalidEmail] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [batchError, setBatchError] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const date = new Date();
  const maxYear = date.getFullYear() + 4;

  const name = parseUserData.name;
  var fullName = name.split(" "),
    firstName = fullName[0],
    lastName = fullName[fullName.length - 1];
  const convertBatch = parseUserData.batch;
  const batch = parseInt(convertBatch);
  const [updatedBatch, setUpdatedBatch] = useState(batch);
  const userToken = sessionStorage.getItem("CS_TOKEN");

  //Preview image
  useEffect(() => {
    if (previewImg) {
      setProfilePicture(URL.createObjectURL(previewImg));
      parseUserData.profile_pic = profilePicture;
    }
    // eslint-disable-next-line
  }, [previewImg, parseUserData.profile_pic]);

  //Taking environment variables
  const { REACT_APP_CS_API, REACT_APP_SHA_KEY } = process.env;
  // https://csdot.herokuapp.com/drive/image/20210731125912du8sufdcyhya.jpg

  const deleteAccount = async () => {
    setIsLoading(true);
    await axios
      .delete(`${REACT_APP_CS_API}/api/users/delete`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res.status === 200) {
          setDeleteModal(false);
          setIsLoading(false);
          sessionStorage.removeItem("CS_TOKEN");
          sessionStorage.removeItem("USER_PROFILE");
          window.location = "/login";
        }
      })
      .catch((_) => {});
  };
  const removeProfilePicture = async () => {
    setIsLoading(true);
    await axios
      .delete(`${REACT_APP_CS_API}/api/users/profile_pic/delete`, {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        if (res) {
          setToastVisible(true);
          setToastMessage(removeProfile);
          setTimeout(() => {
            setShowProfileModal(false);
            setToastVisible(false);
          }, 2500);
          window.location = "/profile";
        }
      });
  };
  const saveUpdates = async () => {
    setIsLoading(true);
    if (
      updatedFirstname.length > 0 &&
      updatedLastname.length > 0 &&
      updatedemail.match(regEmail) &&
      invalidEmailId !== ""
    ) {
      setIsLoading(false);
      setToastVisible(true);
      setToastMessage(editProfileFormMessage);
      setTimeout(() => {
        setToastVisible(false);
      }, 2500);
    } else if (
      updatedBatch !== batch &&
      (updatedBatch < 2013 || updatedBatch > maxYear)
    ) {
      setIsLoading(false);
      setBatchError(errorForBatch);
    } else if (
      updatedFirstname === emptyData &&
      updatedLastname === emptyData &&
      updatedemail === emptyData &&
      updatedBio === emptyData &&
      updatedBatch === batch &&
      updatedGithubLink === emptyData &&
      updatedLinkedLink === emptyData &&
      updatedSkills.length === emptyData
    ) {
      setIsLoading(false);
      setToastVisible(true);
      setToastMessage(changeDetailsError);
      setTimeout(() => {
        setToastVisible(false);
      }, 2500);
    } else {
      setBatchError("");
      var elements = updatedSkills.split(",");
      // setIsLoading(false);
      await axios
        .request({
          method: "PUT",
          url: `${REACT_APP_CS_API}/api/users/update`,
          data: {
            first_name:
              updatedFirstname === emptyData ? firstName : updatedFirstname,
            last_name:
              updatedLastname === emptyData ? lastName : updatedLastname,
            email:
              updatedemail === emptyData ? parseUserData.email : updatedemail,
            bio: updatedBio !== emptyData ? updatedBio : parseUserData.bio,
            batch:
              updatedBatch !== emptyData ? updatedBatch : parseUserData.batch,
            linkedin:
              updatedLinkedLink !== emptyData
                ? updatedLinkedLink
                : parseUserData.linkedin,
            github:
              updatedGithubLink !== emptyData
                ? updatedGithubLink
                : parseUserData.github,
            skills: elements.length !== 0 ? elements : ["str"],
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          setIsLoading(false);
          setToastVisible(true);
          setToastMessage(changesSaved);
          setTimeout(() => {
            setToastVisible(false);
            window.location = "/profile";
          }, 2500);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  };
  const changePassword = async () => {
    setIsLoading(true);
    if (
      passwordError === "" &&
      confirmpasswordError === "" &&
      password.length > 8 &&
      confirmPassword.length > 8
    ) {
      //Generating hash key for password field
      const hash = sha256.create();
      hash.update(REACT_APP_SHA_KEY);
      hash.update(confirmPassword);
      const encryptedPassword = hash.hex();
      await axios
        .request({
          method: "PUT",
          url: `${REACT_APP_CS_API}/api/users/password/change`,
          data: {
            new_password: encryptedPassword,
          },
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          if (res) {
            setIsLoading(false);
            setToastVisible(true);
            setToastMessage(passwordChangeSuccessfully);
            setTimeout(() => {
              setPasswordModal(false);
              setToastVisible(false);
            }, 2500);
          } else {
            setIsLoading(false);
            setToastVisible(true);
            setToastMessage(errorTryAgain);
            setTimeout(() => {
              setPasswordModal(false);
              setToastVisible(false);
            }, 2500);
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setToastVisible(true);
          setToastMessage(errorTryAgain);
          setTimeout(() => {
            setPasswordModal(false);
            setToastVisible(false);
          }, 2500);
        });
    } else {
      setIsLoading(false);
      setConfirmPasswordError(passwordNotMatches);
    }
  };
  const checkPassword = (e) => {
    setConfirmPassword(e);
    if (password !== confirmPassword) {
      setConfirmPasswordError(passwordNotMatches);
    } else {
      setConfirmPasswordError("");
    }
  };

  const updateProfile = async () => {
    setIsLoading(true);
    if (profilePicture === emptyData) {
      setProfilePicture(parseUserData.profile_pic);
    }
    var formData = new FormData();
    formData.append("image", previewImg);
    await axios
      .request({
        method: "PUT",
        url: `${REACT_APP_CS_API}/api/users/profile_pic/update`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          window.location = "/profile";
        }
      })
      .catch((err) => {
        setIsLoading(false);
      });
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
                                    setShowProfileModal(true);
                                  }}
                                >
                                  <img
                                    src={
                                      profilePicture === emptyData
                                        ? "assets/img/avatar.png"
                                        : profilePicture
                                    }
                                    className="img-fluid avatar avatar-medium shadow rounded-pill"
                                    alt=""
                                  />
                                </button>
                              </div>
                              <div className>
                                <button
                                  className="skills-change col-10 "
                                  onClick={() => setShowProfileModal(true)}
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
                                defaultValue={firstName}
                                placeholder="First Name"
                                pattern="[a-z]{2,}"
                                required
                                onChange={(e) =>
                                  setUpdatedFirstname(e.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div className="col-6 col-lg-5 col-md-6 bottom ">
                            <div className="form-outline ">
                              <input
                                type="text"
                                className="form-control"
                                id="validationCustom02"
                                defaultValue={lastName}
                                placeholder="Last Name"
                                pattern="[a-z]{2,}"
                                required
                                onChange={(e) =>
                                  setUpdatedLastname(e.target.value)
                                }
                              />
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
                                style={
                                  invalidEmailId !== ""
                                    ? { borderColor: "#dc3545" }
                                    : updatedemail.match(regEmail) &&
                                      updatedemail.length > 0
                                    ? { borderColor: "#198754" }
                                    : null
                                }
                                defaultValue={parseUserData.email}
                                onChange={(e) => {
                                  if (e.target.value.match(regEmail)) {
                                    setUpdatedEmail(e.target.value);
                                    setInvalidEmail("");
                                  } else {
                                    setInvalidEmail(invalidEmail);
                                  }
                                }}
                              />
                              <div
                                style={
                                  invalidEmailId !== ""
                                    ? { color: "#dc3545" }
                                    : null
                                }
                              >
                                {invalidEmailId}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-10 col-md-12 bottom">
                            <div className="input-group mb-2">
                              <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows={2}
                                placeholder={
                                  parseUserData.bio === emptyData ? "Bio" : null
                                }
                                minLength={10}
                                defaultValue={
                                  parseUserData.bio === emptyData
                                    ? null
                                    : parseUserData.bio
                                }
                                onChange={(e) => {
                                  setUpdatedBio(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-10 col-md-12 bottom">
                            <div className="input-group form-outline ">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend"
                              >
                                {githubLink}
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={
                                  parseUserData.github === emptyData
                                    ? "Github Profile"
                                    : null
                                }
                                defaultValue={
                                  parseUserData.github === emptyData
                                    ? null
                                    : parseUserData.bio
                                }
                                onChange={(e) => {
                                  setUpdatedGithubLink(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-10 col-md-12 bottom">
                            <div className="input-group form-outline ">
                              <span
                                className="input-group-text"
                                id="inputGroupPrepend"
                              >
                                {linkedinLink}
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={
                                  parseUserData.linkedin === emptyData
                                    ? "LinkedIn Profile"
                                    : null
                                }
                                defaultValue={
                                  parseUserData.linkedin === emptyData
                                    ? null
                                    : parseUserData.linkedin
                                }
                                onChange={(e) => {
                                  setUpdatedLinkedLink(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-10 col-md-12 bottom">
                            <div className="form-outline ">
                              <input
                                type="number"
                                className="form-control"
                                placeholder={
                                  isNaN(updatedBatch) ? "Batch" : null
                                }
                                defaultValue={
                                  isNaN(updatedBatch) ? null : updatedBatch
                                }
                                min={2013}
                                max={maxYear}
                                onChange={(e) =>
                                  setUpdatedBatch(e.target.value)
                                }
                              />
                              <div
                                style={
                                  batchError !== ""
                                    ? { color: "#dc3545" }
                                    : null
                                }
                              >
                                {batchError}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-10 col-md-12 bottom">
                            <div className="input-group mb-2">
                              <textarea
                                className="form-control"
                                rows={2}
                                placeholder={
                                  parseUserData.skills.length === 0
                                    ? "Add Skills, separated by comma"
                                    : null
                                }
                                minLength={10}
                                required
                                defaultValue={
                                  parseUserData.skills.length === 0
                                    ? null
                                    : parseUserData.skills
                                }
                                onChange={(e) => {
                                  setUpdatedSkills(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-lg-10 col-md-12 bottom">
                            <input
                              className="submit-btn btn"
                              type="button"
                              id="signup"
                              value="Save"
                              onClick={saveUpdates}
                            />
                          </div>
                        </form>
                        <div>
                          {toastVisible ? (
                            <div>
                              <Toast
                                open={toastVisible}
                                backgroundColor="#e00"
                                type="error"
                                message={toastMessage}
                              />
                            </div>
                          ) : null}
                          {toastVisible && toastMessage === changesSaved ? (
                            <div>
                              <Toast
                                open={toastVisible}
                                backgroundColor="#0761d1"
                                type="success"
                                message={toastMessage}
                              />
                            </div>
                          ) : null}
                          {toastVisible &&
                          toastMessage === passwordChangeSuccessfully ? (
                            <div>
                              <Toast
                                open={toastVisible}
                                backgroundColor="#0761d1"
                                type="success"
                                message={toastMessage}
                              />
                            </div>
                          ) : toastVisible && toastMessage === errorTryAgain ? (
                            <div>
                              <Toast
                                open={toastVisible}
                                backgroundColor="#e00"
                                type="error"
                                message={toastMessage}
                              />
                            </div>
                          ) : null}
                          {toastMessage && toastMessage === removeProfile ? (
                            <div>
                              <Toast
                                open={toastVisible}
                                backgroundColor="#0761d1"
                                type="success"
                                message={toastMessage}
                              />
                            </div>
                          ) : null}
                          {toastMessage &&
                          toastMessage === profilePictureUpdated ? (
                            <div>
                              <Toast
                                open={toastVisible}
                                backgroundColor="#0761d1"
                                type="success"
                                message={toastMessage}
                              />
                            </div>
                          ) : null}
                        </div>
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
                    <Modal open={passwordModal}>
                      {/* <div class="modal"> */}
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
                                ></div>
                                <div className="col-12  bottom">
                                  <div className="input-group mb-2">
                                    <input
                                      type={!showPassword ? "password" : "text"}
                                      className="form-control"
                                      placeholder="New Password"
                                      style={
                                        password.length < 7 &&
                                        passwordError !== ""
                                          ? { borderColor: "#dc3545" }
                                          : password.length > 7 &&
                                            passwordError === ""
                                          ? { borderColor: "#198754" }
                                          : null
                                      }
                                      minLength={8}
                                      maxLength={12}
                                      required
                                      onChange={(e) => {
                                        if (e.target.value.length > 7) {
                                          setPassword(e.target.value);
                                          setPasswordError("");
                                        } else {
                                          setPasswordError(formPasswordError);
                                        }
                                      }}
                                    />
                                    <span className="input-group-text ">
                                      {" "}
                                      <button
                                        className="pass-link"
                                        type="button"
                                        onClick={() =>
                                          setShowPassword(!showPassword)
                                        }
                                      >
                                        <i
                                          className={
                                            !showPassword
                                              ? "fa fa-eye-slash"
                                              : "fa fa-eye"
                                          }
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </span>
                                  </div>
                                  <div
                                    style={
                                      passwordError !== ""
                                        ? { color: "#dc3545" }
                                        : null
                                    }
                                  >
                                    {passwordError}
                                  </div>
                                </div>
                                <div className="col-12  bottom">
                                  <div className="input-group mb-2">
                                    <input
                                      type={
                                        !showConfirmPassword
                                          ? "password"
                                          : "text"
                                      }
                                      className="form-control"
                                      style={
                                        confirmPassword.length < 7 &&
                                        confirmpasswordError !== ""
                                          ? { borderColor: "#dc3545" }
                                          : confirmPassword.length > 7 &&
                                            confirmpasswordError === ""
                                          ? { borderColor: "#198754" }
                                          : null
                                      }
                                      placeholder="Confirm New Password"
                                      minLength={8}
                                      maxLength={12}
                                      required
                                      onChange={(e) => {
                                        if (
                                          e.target.value.length > 7 &&
                                          password === e.target.value
                                        ) {
                                          checkPassword(e.target.value);
                                          setConfirmPasswordError("");
                                        } else {
                                          setConfirmPasswordError(
                                            passwordNotMatches
                                          );
                                        }
                                      }}
                                    />
                                    <span className="input-group-text ">
                                      {" "}
                                      <button
                                        className="pass-link"
                                        type="button"
                                        onClick={() =>
                                          setShowConfirmPassword(
                                            !showConfirmPassword
                                          )
                                        }
                                      >
                                        <i
                                          className={
                                            !showConfirmPassword
                                              ? "fa fa-eye-slash"
                                              : "fa fa-eye"
                                          }
                                          aria-hidden="true"
                                        />
                                      </button>
                                    </span>
                                  </div>
                                  <div
                                    style={
                                      confirmpasswordError !== ""
                                        ? { color: "#dc3545" }
                                        : null
                                    }
                                  >
                                    {confirmpasswordError}
                                  </div>
                                </div>
                                <div className="col-12  bottom">
                                  <input
                                    className="submit-btn btn"
                                    type="button"
                                    id="reset-pass"
                                    value="Reset Password"
                                    onClick={changePassword}
                                  />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* </div> */}
                    </Modal>
                    {/* Modal delete Accout */}
                    <Modal open={deleteModal}>
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="mod-head">
                              <h5
                                style={{ paddingTop: "2px" }}
                                className="splogo"
                              >
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
                              <h5>{confirmationMessage}</h5>
                              <div
                                className="d-flex align-items-center justify-content-center"
                                style={{ fontSize: "20px" }}
                              >
                                <button
                                  className="skills-change col-6 "
                                  onClick={() => setDeleteModal(false)}
                                >
                                  Cancel
                                </button>
                                <input
                                  type="button"
                                  className="skills-delete col-6"
                                  onClick={deleteAccount}
                                  value="Yes, Delete"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Modal>
                    {/* Modal Change Profile Pic */}
                    <Modal open={showProfileModal}>
                      <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                          <div className="modal-header">
                            <div className="mod-head">
                              <h5 className="sp">Change Profile Picture</h5>
                            </div>
                            <button
                              type="button"
                              className="close-btn"
                              onClick={() => setShowProfileModal(false)}
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
                                    src={
                                      profilePicture === emptyData
                                        ? "assets/img/avatar.png"
                                        : profilePicture
                                    }
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
                                <input
                                  type="button"
                                  value="Remove"
                                  className="skills-delete col-4"
                                  onClick={removeProfilePicture}
                                />
                                <div
                                  className="skills-change col-4 "
                                  id="changeProfile"
                                >
                                  <input
                                    type="file"
                                    accept="image/*"
                                    title="New"
                                    onChange={(e) => {
                                      if (
                                        e.target.files &&
                                        e.target.files.length > 0
                                      ) {
                                        const selectedImg = e.target.files[0];
                                        setPreviewImg(selectedImg);
                                      }
                                    }}
                                  />
                                </div>
                                <button
                                  className="confirm  col-4"
                                  onClick={updateProfile}
                                >
                                  Save
                                </button>
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
          )}
        </div>
      ) : (
        window.history.back()
      )}
    </div>
  );
}

export default EditProfile;

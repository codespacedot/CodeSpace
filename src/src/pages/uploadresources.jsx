import React,{useEffect,useState} from "react";
import Header from "../components/header";
import FooterCredit from "../components/footerCredit";
import axios from "axios";
import FormData from "form-data";
import Preloader from "../components/preloader";
import { resourceSuccess } from "../constants";
import Toast from "../components/toast";
function UploadResources() {
  const [selectedSem, setSelectedSem] = useState(0);
  const [allSubjects, setAllSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [examYear, setSelectedExamYear] = useState(0);
  const [selectedFile, setSelectedFile] = useState('');
  const [fileTitle, setFileTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const userToken = sessionStorage.getItem("CS_TOKEN");

    //Taking environment variables
    const { REACT_APP_CS_API } = process.env;

    //get current year
    var year = (new Date()).getFullYear();
    //for taking exam yearn till present
    var allYears =[];
    for (let i = 2016; i <= year; i++) {
      allYears.push(i)
    }
  useEffect(() => {
    if(selectedSem !== 0 && selectedSem !== "Select Semester"){
      axios
       .get(`${REACT_APP_CS_API}/api/academics/subjects?semester=${selectedSem}`, {
         headers: { Authorization: `Bearer ${userToken}` },
       })
       .then((res) => {
         if (res.status === 200) {
           setAllSubjects(res.data)
         }
       })
       .catch((_) => {});   
    }
  }, [selectedSem, selectedCategory, selectedExam, examYear, fileTitle, selectedFile, REACT_APP_CS_API, userToken])
  
  //function to add resources
  const addResources =() =>{
    if(selectedCategory !== '' && selectedCategory !== "Select Category" && 
       selectedSem !== 0 && selectedSem !== "Select Semester"&& 
       selectedSubject !== 0 && selectedSubject !== 'Select Subject' &&
        ((fileTitle !== '' && selectedFile !== '') || 
         (selectedExam !== '' && selectedExam !== 'Select Exam' &&
        examYear !== 'Select Exam Year'))
       ){
      setIsLoading(true);
      const examTitle = examYear +" "+ selectedExam;
      const apiData = new FormData();
      apiData.append("document",selectedFile);
      apiData.append("subject",selectedSubject);
      apiData.append("category",selectedCategory);
      apiData.append("title",selectedCategory === 'exam' ? examTitle :fileTitle);
      axios
      .post(`${REACT_APP_CS_API}/api/academics/resources/upload`, 
      apiData,
      {
        headers: { 
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false)
          setToastVisible(true);
          setToastMessage(resourceSuccess);
        }
      })
      .catch((_) => {}); 
      
    }
  }
  return (
    <div>
      <Header />
      {
        isLoading ?
        <div>
          <Preloader/>
        </div>
        :
        <>
<section className="form" id="form">
<div className="d-flex align-items-center justify-content-center">
  <div className="col-lg-6 col-xl-6 d-none d-lg-block   left-content">
    <div className="row justify-content-center disable-select">
      <div className="col-lg-6 col-md-12" style={{ marginTop: "15%" }}>
        <h1 className="sptext">Connect.</h1>
        <h1 className="sptext" style={{ color: "#0761d1" }}>
          Code.
        </h1>
        <h1 className="sptext">Execute.</h1>
      </div>
    </div>
  </div>
  <div className="col-lg-6 col-md-8 col-sm-8 d-flex align-items-center justify-content-center center-block">
    <form className="row g-2 needs-validation center-block" noValidate>
      <div
        className="justify-content-center col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 heading bottom"
        style={{ marginTop: "7%" }}
      >
        <h1 className="sp">Upload Resources</h1>
      </div>
      <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
        <div className="form-outline ">
          <select className="form-select" onChange={(e)=> setSelectedSem(e.target.value)}>
            <option selected>Select Semester</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
            <option value={6}>Six</option>
            <option value={7}>Seven</option>
            <option value={8}>Eight</option>
          </select>
        </div>
      </div>
      <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
        <div className="form-outline ">
          <select className="form-select" onChange={(e)=>{setSelectedSubject(e.target.value)}}>
            <option selected>Select Subject</option>
            {
              allSubjects.map((res)=>{
                return <option value={res.key}>{res.name}</option>
              })
            }
          </select>
        </div>
      </div>
      <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
        <div className="form-outline ">
          <select
            className="form-select"
            id="Category"
            onChange={(e)=> setSelectedCategory(e.target.value)}
          >
            <option selected>Select Category</option>
            <option value="library">Library</option>
            <option value="exam">Exam</option>
          </select>
        </div>
      </div>
      {
        selectedCategory === "exam" ?
        (<div>
        <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
          <div className="form-outline ">
            <select className="form-select" onChange={(e)=> setSelectedExam(e.target.value)}>
              <option selected>Select Exam</option>
              <option value="Unit Test 1">Unit Test 1</option>
              <option value="Unit Test 2">Unit Test 2</option>
              <option value="Semester">Semester</option>
            </select>
          </div>
        </div>
        <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
          <div className="form-outline ">
          <select className="form-select" onChange={(e)=> setSelectedExamYear(e.target.value)}>
              <option selected>Select Exam Year</option>
              {
                allYears.map((res) => {
                return  <option value={res}>{res}</option>
                })
              }
            </select>
            {/* <div className="invalid-feedback">
              Please provide a Year.
            </div> */}
          </div>
        </div>
        <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
        <div className="form-outline ">
          <input
            type="file"
            className="form-control"
            placeholder="Upload File"
            required
            onChange={(e)=>{setSelectedFile(e.target.files[0])}}
          />
          <div className="invalid-feedback">Please provide a file.</div>
        </div>
        </div>
        </div>
        ) 
      :
     (
       <> 
     <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
        <div className="form-outline ">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a Title"
            onChange={(e)=> setFileTitle(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
        <div className="form-outline ">
          <input
            type="file"
            className="form-control"
            placeholder="Upload File"
            required
            onChange={(e)=>{setSelectedFile(e.target.value)}}
          />
          <div className="invalid-feedback">Please provide a file.</div>
        </div>
      </div>
      </>
      )
      }
      <div className="col-12 col-xl-8 col-lg-8 col-md-12 col-sm-12 bottom">
        {/* <button type="submit" className="submit-btn btn" onClick={addResources}>
          Upload
        </button> */}
        <input type="button" value="Upload" className="submit-btn btn" onClick={addResources} />
      </div>
    </form>
  </div>
</div>
      {toastVisible ? (
         <div>
        <Toast
        open={toastVisible}
        backgroundColor="#0761d1"
        type="success"
        message={toastMessage}
         />
        </div>
     ) : null}
</section>
<FooterCredit />
</>
      }
      
    </div>
  );
}

export default UploadResources;

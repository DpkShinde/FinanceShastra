import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineEdit } from "react-icons/md";
import williamImage from "../../assest/men3.jpg";
import Navbar from "../../Navbar/Navbar";
import './Userupdatedpage.css'
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import { API_BASE_URL } from "../../config";
import { UserProfileContext } from "../../Portfoilo/context/UserProfileContext";
import Cookies from 'js-cookie'

const UserDetailsupdate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {userEmail} = useContext(UserProfileContext)

  // Initial state (can be overwritten by updated data passed through location.state)
  const [emaillocal, setEmail]= useState('')
  const [profileImage, setProfileImage] = useState(williamImage);
  const [personalDetails, setPersonalDetails] = useState({
    
    firstName: "-",
    lastName: "-",
    email: userEmail,
    gender: "-",
    dob: "-",
    ageGroup: "25 - 35",
    country: "India",
    
    state: "-",
    city: "-",
    address: "-",
    phoneNumber: "-",
    pincode: ''
  });

  const [professionalDetails, setProfessionalDetails] = useState({
    
    occupation: "-",
    industry: "-",
    incomeRange: "-",
  });

  const [investmentDetails, setInvestmentDetails] = useState({
    householdSavings: "₹1,00,000",
    termInsurance: "₹4,00,000",
    healthInsurance: "₹15,00,000",
    currentInvestments: "₹24,00,500",
    interestedToInvest: "-",
  });

  const [showPopupforLogin, setShowPopupforLogin]= useState(false)
  
  const formatDate = (dob) => {
    const date = new Date(dob); // Ensure dob is a Date object
    if (isNaN(date)) return "Invalid Date"; // Handle invalid date cases
    return date.toISOString().split("T")[0];
  };

  // Update state when new data is passed from EditProfile
  useEffect(() => {
    if (!Cookies.get("jwtToken")){
      setShowPopupforLogin(true)
    }else{
      const localStore= localStorage.getItem("user")
      const localtoken= Cookies.get("jwtToken")
      console.log('token: ', localtoken)
      const parsed = (JSON.parse(localStore))
      console.log(parsed.email)
      setEmail(parsed.email)
      setPersonalDetails((prevDetails) => ({
      ...prevDetails,
      email: parsed.email,
    }));

    const fetchfunc= async ()=>{
      const url= `${API_BASE_URL}/userdetails`
      //const url= 'http://localhost:3000/userdetails'
      const options={
        method: "GET",
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${localtoken}`
        }
      }
      
      const response= await fetch(url, options)
      console.log(response)
      if (response.ok=== true){
        const data= await response.json()
        console.log(data)
        const formatedDate= formatDate(data[0].dob)
        let dataupdated= {
          personal: {
            firstName: data[0].first_name,
            lastName: data[0].last_name,
            email: parsed.email,
            gender: data[0].gender,
            dob: formatedDate,
            ageGroup: data[0].age_group,
            country: data[0].country,
            state: data[0].state,
            city: data[0].city,
            address: data[0].address,
            phoneNumber: data[0].phone_number,
            pincode: data[0].pincode,
            username: data[0].username
          },
          professional:{
            occupation: data[0].occupation,
            industry: data[0].industry,
            incomeRange: data[0].income,
          }
        }
        console.log(dataupdated)
        setPersonalDetails((prev) => ({ ...prev, ...dataupdated.personal }));
        
        setProfessionalDetails((prev) => ({ ...prev, ...dataupdated.professional }));
       
        setInvestmentDetails((prev) => ({ ...prev, ...dataupdated.investment }));
        
      }
      
    }
    fetchfunc()


    }

    

    /*if (location.state && location.state.updatedData) {
      const { updatedData } = location.state;

      if (updatedData.personal) {
        setPersonalDetails((prev) => ({ ...prev, ...updatedData.personal }));
      }
      if (updatedData.professional) {
        setProfessionalDetails((prev) => ({ ...prev, ...updatedData.professional }));
      }
      if (updatedData.investment) {
        setInvestmentDetails((prev) => ({ ...prev, ...updatedData.investment }));
      }
    }*/
  }
 , [location.state]);

  const onlogin = () => {
    navigate('/login')
  }

  const handleNavigation = (section) => {
    // Pass the updated data to the EditProfile page for further editing
    navigate("/editProfile", { 
      state: { 
        section, 
        updatedData: { 
          personal: personalDetails,
          professional: professionalDetails,
          investment: investmentDetails
        } 
      } 
    });
  };

  const uploadImage=(e)=>{
    const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setProfileImage(reader.result);
        };
        reader.readAsDataURL(file);

      }
  }

  return (
    <div>
    <div className="userDetailss">
      <h1 className="profilepage-title">My profile</h1>
      <div className="profilepage-tabsorderusers">
        <span className="profilepage-tabb"
        style={{
          borderBottom: "2px solid #24b676",
          fontWeight: "bold",
          color: "#24b676",
        }}>My Account</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/orderTable")}
        >
          Orders
        </span>
        <span className="profilepage-tabb" onClick={() => navigate("/billingSubscriptionPages")} >Billing & Subscription</span>
        <span className="profilepage-tabb"onClick={() => navigate("/riskAnalysisDashboard")}>Risk Profile Report</span>
        <span
          className="profilepage-tabb"
          onClick={() => navigate("/managealert")}
        >
          Manage Alert
        </span>

        <span
          className="profilepage-tabb"
          onClick={() => navigate("/accountSettings")}
        >
          Password & Security
        </span>
        <span className="profilepage-tabb" onClick={() => navigate('/sessionHistory')}>Active Devices</span>
        <span className="profilepage-tabb" onClick={() => navigate('/myReferalPage')}>My referrals</span>
      </div>


      <div className="profileContainer">
        <div className="userwilliamimg">
          <img src={profileImage} alt="William Rober" className="profileImage" />
          <MdOutlineEdit
            className="editIcon"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              uploadImage(e)
            }}
          />
        </div>
        <div className="profileInfo">
          <h1 className="profileName"> {personalDetails.firstName} {personalDetails.lastName}</h1>
          <p className="profileOccupation">{professionalDetails.occupation}</p>
        </div>
      </div>

      {/* Personal Details Section */}
      <h2 className="sectionTitle">Personal Details</h2>
      <div className="allpersonal">
        <div className="personalDetailAll">
          {Object.entries(personalDetails).map(([key, value]) => (
            <p key={key} className="detailRow">
              <strong className="labelprofiledetail">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              <span className="value">{value}</span>
            </p>
          ))}
        </div>
        <div className="editiconprofile" onClick={() => handleNavigation("Personal")}>
          <BiSolidEdit />
        </div>
      </div>

      {/* Professional Details Section */}
      <h2 className="sectionTitle">Professional Details</h2>
      <div className="allpersonall">
        <div className="personalDetailAll">
          {Object.entries(professionalDetails).map(([key, value]) => (
            <p key={key} className="detailRow">
              <strong className="labelprofiledetail">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              <span className="value">{value}</span>
            </p>
          ))}
        </div>
        <div className="editiconprofileee" onClick={() => handleNavigation("Professional")}>
          <BiSolidEdit />
        </div>
      </div>

      {/* Investment Details Section */}
      <h2 className="sectionTitle">Investment Details</h2>
      <div className="allpersonal">
        <div className="personalDetailAll">
          {Object.entries(investmentDetails).map(([key, value]) => (
            <p key={key} className="detailRow">
              <strong className="labelprofiledetail">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}:
              </strong>
              <span className="value">{value}</span>
            </p>
          ))}
        </div>
        <div className="editiconprofilee" onClick={() => handleNavigation("Investment")}>
          <BiSolidEdit />
        </div>
      </div>

      <Navbar />
    </div>
    <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
  {showPopupforLogin && (
        <div className="payment-popup">
          <div className="payment-popup-content">
            <h2>You Are not Logged in!</h2>
            <p className="amount-paid">Please Login</p>
            <button  onClick={onlogin}
              className="loginbtnpopupnot">Login</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsupdate;
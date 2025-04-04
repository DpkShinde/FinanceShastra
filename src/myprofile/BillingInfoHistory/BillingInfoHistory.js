import  { useState, useEffect } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { API_BASE_URL } from "../../config";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useNavigate } from "react-router-dom";  
import Cookies from 'js-cookie'
import "./BillingInfoHistory.css";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";
import ClipLoader from "react-spinners/ClipLoader";
import Billingavailableplan from "../Billingavailableplan/Billingavailableplan";
import AccountBar from "../AccountBar";

const override = {
  display: "block",
  textAlign: "center",
};

const BillingInfoHistory = () => {
    const navigate = useNavigate(); 
    const [isLoading, setisLoading]= useState(false)
    const [isSubed, setisSubed]= useState(false)

    const [billingInfo, setBillingInfo] = useState({});
  
    const handleNavigation = () => {
      navigate("/editProfile", { state: { billingInfo } });
    };

    const formatedDate = (dateString) => {
      const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    const [plan, setPlan]= useState('')
    const [endingDate, setEndingDate]= useState('')
    const [payedDate, setpayedDate]= useState('')
    const [BillingCycle, setBillingCycle]= useState('')
    const [price, setpricePayed]= useState('')
    const [ordersData, setordersData] = useState([])

    useEffect(()=>{
      setisLoading(true)
          const CookieToken = Cookies.get("jwtToken");
          if (CookieToken) {
            const fetchdata = async () => {
              const options = {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${CookieToken}`,
                },
              };
              const url = `${API_BASE_URL}/userPayment/usertoken`;
      
              try {
                const response = await fetch(url, options);
                const data = await response.json(); // Convert response to JSON
                console.log("data from subscriptio and billing page:", data)
                if (data.length === 0) {
                  setisSubed(false);
                } else {
                  setisSubed(true);
                  
                  const formatedData= data.map((e)=>({
                    planId: e.plan_id,
                    endingDate: e.ending_date,
                    paymentDate: e.payment_date_time,   
                    billingCycle: e.billing_cycle   
    
                  }))
                  setPlan(formatedData[0].planId === 1 ? "Elite": "Premium")
                  setEndingDate(formatedDate(formatedData[0].endingDate))
                  setpayedDate(formatedDate(formatedData[0].paymentDate))
                  setBillingCycle(formatedData[0].billingCycle)

                  if (formatedData[0].planId === 1 & formatedData[0].billingCycle === "half yearly"){
                    setpricePayed("1,999")
                  }else if (formatedData[0].planId === 1 & formatedData[0].billingCycle === 'yearly'){
                    setpricePayed("2,999")
                  }else if (formatedData[0].planId === 2 & formatedData[0].billingCycle === 'yearly'){
                    setpricePayed("7,999")
                  }else if (formatedData[0].planId === 1 & formatedData[0].billingCycle === "half yearly"){
                    setpricePayed("5,999")
                  }
                }
                setisLoading(false)
              } catch (error) {
                console.error("Error fetching user payment details:", error);
              }
            };
            fetchdata();

            const fetchuserData= async ()=>{
              const urluserData= `${API_BASE_URL}/userdetails`
                    const options={
                      method: "GET",
                      headers: {
                        "Content-Type": 'application/json',
                        "Authorization": `Bearer ${CookieToken}`
                      }
                    }
                    
                    const responseUserData= await fetch(urluserData, options)
                    if (responseUserData.ok === true){
                      const data= await responseUserData.json()
                      const usernameLocal= localStorage.getItem('username')
                      let dataupdated= {
                          name: usernameLocal,
                          address: data[0].address,
                          country: "India",
                          state: data[0].state,
                          city: data[0].city,
                          phoneNumber : data[0].phone_number
                      }
                      setBillingInfo(dataupdated)
                    }
            }
            fetchuserData()

            const formatDateforOrders=(orderDate)=>{
              const date = new Date(orderDate);
              return date.toISOString().split("T")[0]; // "2025-03-08"
            }

            const fetOrders = async () => {
                  const options = {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${CookieToken}`,
                    },
                  };
                  const url = `${API_BASE_URL}/orders`;
                  // const urllocal = "http://localhost:3000/orders";
                  const response = await fetch(url, options);
                  if (response.ok === true) {
                    const data = await response.json();
                    console.log("orders Data: ", data);
                    if (data.length !== 0) {
                      const formattedordersData = data.map((e) => ({
                        id: e.order_id,
                        name: e.order_name,
                        purchase: formatDateforOrders(e.order_date),
                        amount: e.Amount,
                        status: e.Status === "Completed" ? "Success" : "Processing",
                        end: formatDateforOrders(e.ending_date),
                        statusClass: e.Status === "Completed" ? "success" : "processing"
                      }));
                      console.log("formattedordersData:", formattedordersData);
                      setordersData(formattedordersData);
                    }
                  }
                  setisLoading(false)
                };
                fetOrders();


          }
     }, [])

  const handleDownload = (planName) => {
    // Create a sample file blob
    const blob = new Blob([`Invoice for ${planName}`], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Create a temporary download link
    const a = document.createElement("a");
    a.href = url;
    a.download = `${planName.replace(/\s+/g, "_")}_invoice.txt`; // Filename format
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
 
  // Function to show PDF preview
  const handleViewInvoice = (plan) => {
    window.scrollTo(0, 0); 
    navigate(`/invoicePage?plan=${encodeURIComponent(plan.name)}
    &purchase=${encodeURIComponent(plan.purchase)}
    &amount=${encodeURIComponent(plan.amount)}
    &username=${encodeURIComponent(billingInfo.name)}
    &address=${encodeURIComponent(billingInfo.address)}
    &city=${encodeURIComponent(billingInfo.city)}
    &state=${encodeURIComponent(billingInfo.state)}
    &country=${encodeURIComponent(billingInfo.country)}
    &number=${encodeURIComponent(billingInfo.phoneNumber)}
    `);
  };
 
  

  return (
    <div className="outer-cont">{isLoading ? <div className='loader-cont'><ClipLoader
      cssOverride={override}
      size={35}
      data-testid="loader"
      loading={isLoading}
      speedMultiplier={1}
      color="green"
    /></div>: 
    <>
    <div className="profilepagee-container">

<h1 className="profilepage-titleorder" style={{ fontFamily: 'Calibri' }}>
    My Billing & Subscription
</h1>
<AccountBar/>

{isSubed? <div className="billinginfohistory-container"><div>
<div className="billinginfohistory-row">
<div className="billinginfohistory-plan billinginfohistory-wide">
  <h2>Current Plan</h2>
  <div className="billinginfohistorycard">
    <p className="billinginfohistorypara"><strong>Plan Type:</strong> {plan} {BillingCycle}</p>
    <p className="billinginfohistorypara"><strong>Plan Pricing:</strong> {price} billed {BillingCycle}</p>
    <p className="billinginfohistory-switch">Switch to annual & save ₹3,999/-</p>
    <p className="billinginfohistorypara"><strong>Next Charge:</strong> {endingDate} </p>
    <button className="billinginfohistory-btn"
    onClick={() => {
      navigate("/pricehalf"); 
      window.scrollTo(0, 0); // Scroll to top after navigation
    }}
  >View Other Plans</button>
  </div>
</div>

<div className="billinginfohistory-billing billinginfohistory-wide">
<h2>Billing Information</h2>
<div className="billinginfohistory-card">
<p className="billinginfohistorypara"><strong>Name: </strong> {billingInfo.name}</p>
<p className="billinginfohistorypara"><strong>Address: </strong> {billingInfo.address}</p>
<p className="billinginfohistorypara"><strong>City, State: </strong> {billingInfo.city}, {billingInfo.state}</p>
<p className="billinginfohistorypara"><strong>Country: </strong> {billingInfo.country}</p>
<button 
  className="billinginfohistorybtn" 
  onClick={handleNavigation}
>
  Update Billing Address
</button>
</div>
</div>
</div>

<div className="billinginfohistory-history">
<h2 className="billinginfohistory-historyh2">Billing History</h2>
<div className="billinginfohistory-history-scroll">
<table className="billinginfohistory-historytable">
<thead>
  <tr>
    <th>Plan Name</th>
    <th>Amount</th>
    <th>Purchase Date</th>
    <th>End Date</th>
    <th>Status</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {ordersData.map((plan, index) => (
    <tr key={index}>
      <td>{plan.name}</td>
      <td>{plan.amount}</td>
      <td>{plan.purchase}</td>
      <td>{plan.end}</td>
      <td className={`billinginfohistory-${plan.statusClass}`}>
        <span className={`status-icon ${plan.statusClass}`}>●</span> {plan.status}
      </td>
      <td>
        <button className="billinginfohistory-download" onClick={() => handleDownload(plan.name)}>
          <HiOutlineDownload />
        </button>
        <button className="billinginfohistory-view" onClick={() => handleViewInvoice(plan)}>
<MdOutlineRemoveRedEye />
</button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>
</div>
</div>
</div>: 
<Billingavailableplan/>
}



<Navbar/>
</div>
<div className="foooterpagesaupdate">
        <FooterForAllPage/>
    </div>
    </>}
    
    </div>
  );
};

export default BillingInfoHistory;
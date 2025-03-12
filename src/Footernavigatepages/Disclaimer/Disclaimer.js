
import "./Disclaimer.css"; // Import the CSS file
import disclaimerImage from "../../assest/disclamer.png"; // Update with the actual image path

import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Navbar from "../../Navbar/Navbar";
import React, {useContext} from "react"
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";



const Disclaimer = () => {
   const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div>
    <div className={darkMode ? "disclaimerdarkmode" :"disclaimer"}>
      <h1 className={darkMode ? "disclaimer-titledarkmode" :"disclaimer-title"}>FinanceShastra Disclaimer</h1>
      <div className={darkMode ? "disclaimer-introdarkmode" :"disclaimer-intro"}>
        <img src={disclaimerImage} alt="Disclaimer" className={darkMode ? "disclaimer-imagedarkmode" :"disclaimer-image"}/>
        <p>
        FinanceShastra Co. is a private limited company having its registered office at Vishrantwadi, Pune-15.
         FinanceShastra is an investment advisory offering a range of tools and resources to assist users in making informed 
         investment decisions. The following "Disclaimers" apply to the
         information collected on and services provided by FinanceShastra on/through  <a href="https://www.financeshastra.com">https://www.financeshastra.com</a>
        </p>
      </div>
      <div className={darkMode ? "disclaimer-sectiondarkmode" :"disclaimer-section"}>
        <h2>I. General</h2>
        <p>
        The Site publishes information related to financial and investment issues. All information disseminated 
        on the Site, including blogs, calculators, tools, recommendations, newsletters, and other features, is intended solely for informational and educational purposes to assist users in making prudent investment decisions. 
        Users availing paid membership services offered by FinanceShastra may receive recommendations,
         opinions, and suggestions for their decision-making. Such information is for assistance only and should not be used as the sole basis for investment decisions
        </p>
        <p>
        FinanceShastra assumes no responsibility for risks associated with the use of the information. The information, tools, and content on the Site may not be suitable for all investors. Reproduction or redistribution 
        of this information in any form without prior written permission from FinanceShastra is prohibited. 
        </p>
        <p>
       
The content on the Site is not directed or intended for distribution to any person or entity in jurisdictions where such use would be contrary to law or regulations or subject FinanceShastra to any registration or licensing requirements. 
The information is intended for personal use only and not for any commercial purposes without prior written consent from FinanceShastra. The content is relevant at the time of publication and is based on facts, analysis, and opinions available at that time. FinanceShastra does not guarantee future results or events will align with this information. 
The content and tools provided on the Site may utilize data from third-party sources, including research reports, company websites, and news items. FinanceShastra believes the data to be accurate but does not warrant its reliability. 

        </p>
        <p>
        FinanceShastra reserves the right to make modifications or alterations to the Site and its content at any time without prior notice. Users are encouraged to perform their 
        own research and consult professionals before making financial decisions. 
        </p>
        <p>Neither FinanceShastra nor its associates, employees, directors, or representatives shall be liable for any losses or damages arising from the use of the information provided. FinanceShastra does not receive fees, commissions, or other benefits from third parties connected to the content on the Site. 
        </p>
        <p>FinanceShastra is not a Portfolio Manager, Broker, or Sub-broker and is not registered with any stock exchange. Users are responsible for their own investment decisions and assume all associated risks. </p>
      </div>

      <div className={darkMode ? "disclaimer-sectiondarkmode" :"disclaimer-section"}>
        <h2>II. No Warranties</h2>
        <p>
          The Site is provided "as is" without any representations or warranties, express or implied. FinanceShastra makes no
          guarantees regarding:
        </p>
        <ul>
          <li>Continuous availability of the Site or services.</li>
          <li>Suitability of the information for users' intended purposes.</li>
          <li>Accuracy, completeness, or timeliness of information sourced from third-party data providers or other external sources.</li>
        </ul>
      </div>

      <div className={darkMode ? "disclaimer-sectiondarkmode" :"disclaimer-section"}>
        <h2>III. Limitation of Liability</h2>
        <p>
          FinanceShastra, its employees, and affiliates shall not be liable for any direct, indirect, incidental, or consequential
          damages resulting from:
        </p>
        <ul>
          <li>Use of or inability to use the Site.</li>
          <li>Errors or inaccuracies in the information provided.</li>
          <li>Actions or opinions taken based on the Site's content.</li>
        </ul>
      </div>

      <div className={darkMode ? "disclaimer-sectiondarkmode" :"disclaimer-section"}>
        <h2>IV. Notices</h2>
        <p>
          All notices related to the Site should be addressed to FinanceShastra's registered office mentioned above. Users are
          encouraged to perform their own research and consult professionals before making financial decisions.
        </p>
      </div>
      <div className={darkMode ? "disclaimer-sectiondarkmode" :"disclaimer-section"}>
        <h2>V. Dispute Resolution</h2>
        <p>
        This Disclaimer and its interpretation shall be governed by the laws of India. All disputes arising hereunder shall be subject to the jurisdiction of the Courts of Pune, Maharashtra, India. 
        </p>
      </div>
      <div className={darkMode ? "disclaimer-sectiondarkmode" :"disclaimer-section"}>
        <h2>VI. Miscellaneous</h2>
        <p>
        If any provision of this Disclaimer is found to be unenforceable under applicable law, the remaining provisions shall remain in effect. 

This Disclaimer constitutes the entire agreement between FinanceShastra and the user concerning the subject matter and supersedes all prior agreements. 
        </p>
      </div>

      <div className={darkMode ? "disclaimer-contactdarkmode" :"disclaimer-contact"}>
        <h3>VII. Contact Us</h3>
        <p>
        If you have any questions regarding this Disclaimer, please contact us:</p>
<p><strong>Email: </strong><a href="https://www.financeshastra.com" >compliance@financeshastra.com</a></p>
<p>
<strong>Phone: +91- 92266 08469</strong></p><p> <strong>Address:  Alandi Road, Vishrantwadi, Pune-411015, Maharashtra, India.</strong> 
        </p>
      </div>
     
      <Navbar/>
 
    </div>
    <div className={darkMode ? "foooterpagesattt" :"foooterpagesaupdate"}>
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default Disclaimer;

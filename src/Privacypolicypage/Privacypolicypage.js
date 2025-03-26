
import priImage from "../assest/privacy.png"; // Update with the actual image path
import './Privacypolicypage.css'
import Navbar from "../Navbar/Navbar";
import FooterForAllPage from "../FooterForAllPage/FooterForAllPage";


const PrivacyPolicypage = () => {
 
  return (
    <div>
    <div className="privacypolicyy">
      <h1>Privacy Policy </h1>
      
      <div className="refundpolicyy-header">
        <img src={priImage} alt="privacy" className="privacyy-image" />
        <p>
        FinanceShastra Co. ("we", "us", "our", "FinanceShastra") is committed to protecting the privacy and 
        security of your personal data. Your privacy is important to us. This Privacy Policy ("Policy") 
        applies to all products and/or services offered by us to all individuals ("you", "your", "user").<br/><br/>
        This Policy explains how we collect, receive, store, disclose, share, and use your personal data for the 
        purpose of your participation and consumption of our products and/or services offered by us through our
         website and/or software application (collectively, “Platform”) or during any interaction with us, 
         and how you can exercise your privacy rights.<br/><br/>
         Before using our Platform or availing of any of our products and/or services,
          you are advised to carefully read this Policy. If you do not agree with the terms of this Policy,
           please do not access this Platform. By visiting and/or using our Platform, 
         you are consenting to the processing of your personal data in the manner as set forth in this Policy.
        </p>
      </div>

      <div className="privacypolicyy-section">
     
        <h2>1. DATA PRIVACY DISCLAIMER </h2>
       <p>The scope of this policy is limited to the products and/or services provided by us within the territory 
        of India and applies to users who request these products and/or services within the Indian territory. </p>

        <h2>2. WHAT PERSONAL DATA DO WE COLLECT ABOUT YOU? </h2>
        <p>We collect different types of information based on your interaction with us. 
            “Personal Data” means any data about an individual who is identifiable by or in relation to such data.<br/><br/>
            We endeavor to collect only such personal data that is reasonably necessary to perform our services for you. When you interact with our Platform or
             otherwise with us, we may collect the following personal data from you directly: </p>
        <ul>
          <li><h3>1. General Data:</h3>
            <p>Name, email, mobile number, address, country, state, gender, age, date of birth, application history, and installation data. </p></li>
         
        </ul>
        <ul>
          <li><h3>2. Government Identification Data:</h3>
            <p>Aadhaar card, PAN card, or any other government-issued identification data. </p></li>
         
        </ul>
        <ul>
          <li><h3>3. Technical and Network Activity Data:</h3>
            <p>Device and usage data including IP address, device ID, user ID, hardware model, mobile network information, operating system, browsing history, search history, access time, and location data. </p></li>
         
        </ul>
        <ul>
          <li><h3>4. Authentication Data:</h3>
            <p>Username, OTP, Captcha, and password. </p></li>
         
        </ul>
        <ul>
          <li><h3>5. Financial Data:</h3>
            <p> Bank details including account name, account number, IFSC code, and credit card (last 4-digit number).</p></li>
         
        </ul>
        <ul>
          <li><h3>6. Employment Data:</h3>
            <p>Education qualification, occupation, designation, company name, resume.</p></li>
         
        </ul>
        <ul>
          <li><h3>7. SMS Data:</h3>
            <p>Transactional SMS data for financial analysis (personal messages or sensitive data are filtered out and not stored). </p></li>
         
        </ul>
      </div>
      <div className="collectpara">
      <h2>3. HOW DO WE COLLECT YOUR PERSONAL DATA? </h2>
       <p>We collect personal data through the following sources:</p>
       <ul>
          <li>
            <p><strong>Directly from you -</strong>When you register, subscribe, interact with our sales representatives, provide feedback, or apply for jobs. </p></li>
            <li>
            <p><strong>Automatically -</strong>strong When you use our Platform, we collect usage data such as search queries, interactions, and device details. </p></li>
            <li>
            <p><strong>From Third Parties -</strong> Public sources, marketing vendors, analytics providers, and social media platforms. </p></li>
         
        </ul>
        </div>
        <div className="collectpara">
      <h2>4. LAWFUL BASIS FOR PROCESSING YOUR PERSONAL DATA  </h2>
       <p>We collect personal data under lawful and fair means with user consent or for legitimate business purposes, including but not limited to: </p>
       <ul>
          <li>
            <p>Providing our products and/or services</p></li>
            <li>
            <p>Compliance with legal obligations </p></li>
            <li>
            <p>Preventing fraud, responding to security threats </p></li>
            <li>
            <p>Research and analysis for service improvement </p></li>
         
        </ul>
        </div>
        <h2>6. HOW DO WE USE PERSONAL DATA WHEN YOU VISIT OUR OFFICES? </h2>
       <p>When you visit our offices, your data is processed per this Policy. Specific provisions regarding visitor data and CCTV monitoring are available at reception. </p>
        <h2>7. HOW DO WE PROTECT YOUR PERSONAL DATA</h2>
       <p>We implement reasonable technical and organizational measures to protect personal data 
        from unauthorized access, disclosure, alteration, or loss. However, due to the inherent nature of the Internet, we cannot guarantee absolute security. </p>

        <div className="collectpara">
      <h2>8. YOUR RIGHTS IN CONNECTION WITH YOUR PERSONAL DATA </h2>
       <p>You have the following rights: </p>
       <ul>
          <li>
            <p><strong>Right to Access -</strong> Request a summary of your data</p></li>
            <li>
            <p><strong>Right to Correction  -</strong>Request correction or updates</p></li>
            <li>
            <p><strong>Right to Erasure -</strong> Request deletion of data unless required by law. </p></li>
            <li>
            <p><strong>Right to Withdraw Consent -</strong>Opt-out of processing by contacting us. </p></li>
         
        </ul>
        <p>For exercising these rights, contact us at <a href="mailto:privacy@financeshastra.com">privacy@financeshastra.com</a>.</p>
        </div>
    
     
        <div className="collectpara">
      <h2>9. SHARING/DISCLOSURE OF PERSONAL DATA </h2>
       <p>We may share your personal data with: </p>
       <ul>
          <li>
            <p><strong>Affiliates and third-party service providers</strong>  for IT, marketing, and analytics purposes. </p></li>
            <li>
            <p><strong>Regulatory and law enforcement agencies </strong>when required by law.</p></li>
            <li>
            <p><strong>Business partners </strong>in case of mergers, acquisitions, or business restructuring.</p></li>
            
         
        </ul>
       
        </div>
        <h2>10. CHANGES TO THIS PRIVACY POLICY </h2>
       <p>We may update this Policy from time to time. Any changes will be posted on this page, and your continued use of our Platform constitutes acceptance of the revised Policy. </p>
       <p><strong>For any queries regarding this Policy, contact us at </strong><a href="mailto:privacy@financeshastra.com">privacy@financeshastra.com</a>.</p>

    
     
    </div>
    <Navbar/>
    <div className="foooterpagesaupdate">
      <FooterForAllPage/>
      </div>
    </div>
  );
};

export default PrivacyPolicypage;

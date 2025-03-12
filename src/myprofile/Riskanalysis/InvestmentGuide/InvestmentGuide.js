import React from "react";
import "./InvestmentGuide.css"; // For styling
import Navbar from "../../../Navbar/Navbar";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";
import { useNavigate } from "react-router-dom";

const ProfileRiskReportInvestment = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="profile-risk-report">
            <header className="headerinvestrisk">
                <h2>Welcome back, William</h2>
                <p>
                    Based on your answers to the questionnaire, here are important
                    guidelines to the investment strategy that will best suit you and how
                    you can implement it.
                </p>
            </header>

            {/* Step 1 */}
            <section className="step">
                <h3>Step 1</h3>
                <div className="things-to-do">
                    <div className="thingstododheader">
                        <h4>Things To Do Before Investing</h4></div>
                    <div className="cardsrisk">
                        <div className="cardrisk">
                            <h5>Term Insurance</h5>
                            <p>
                                Ideally, you should have a Term Insurance of at least 20x your
                                annual income.
                            </p>
                        </div>
                        <div className="cardrisk">
                            <h5>Health Insurance</h5>
                            <p>
                                Though health insurance cannot be generalized, a 10 lakh family
                                floater plan for a young healthy family of four is a good start.
                            </p>
                        </div>
                        <div className="cardrisk">
                            <h5>Emergency Fund</h5>
                            <p>
                                In general, you should have at least six months of your expenses
                                parked in liquid funds for unforeseen emergency situations.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 2 */}
            <section className="step">
                <h3>Step 2</h3>
                <div className="risk-appetite">
                    <div className="risk-appetiteheader">
                        <h4>Know Your Risk Appetite</h4></div>
                    <div className="cardsriskstep2">
                        <div className="cardriskstep2">
                            <h5>Your Risk-taking ability is <strong style={{ color: "red" }}>Medium</strong></h5>
                            <p>
                                Your age, income, financial responsibilities, etc., indicate
                                that you can take medium risk to earn healthy long-term returns.
                            </p>
                            <h6>
                                Take medium risk to earn healthy long-term returns.

                            </h6>
                        </div>
                        <div className="cardriskstep2">
                            <h5>Your Risk willingness is <strong style={{ color: "red" }}>Medium</strong></h5>
                            <p>
                                This indicates that you are not comfortable taking higher risk.</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* Step 3 */}
            <section className="step">
                <h3>Step 3</h3>
                <div className="investment-strategy">
                    <div className="profileinvestheadtop">
                        <h4>Know Your Investment Strategy</h4></div>
                    <p>
                        The 'Moderate' Investment strategy suits you best. The aim of this strategy is to have equal mix across various asset classes, such that the risk is equally distributed.
                        Both your risk willingness and risk taking ability are medium; suggesting a good mix across asset classes. Thus, you can consider shifting your portfolio across equity and fixed asset classes, thus increasing your allocation in equities when they are substantially undervalued and decrease your allocation to fixed income. Similarly, when fixed income assets are available at attractive yields, you can shift a major portion of your portfolio from equities to fixed income.
                        <h5>

                            How much should you invest in each Asset Class ?</h5>
                        <p>Based on your profile, here's how you should allocate your investible surplus as follows: (after accounting for insurance, cash required for 6 months etc.)</p>
                    </p>
                    <div className="alltableriskreport">
                        <div className="allocationprofile">
                            <div className="allocationprofile-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Asset Class</th>
                                            <th>Allocation(%)</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Equity*</td>
                                            <td>45–65%</td>

                                        </tr>
                                        <tr>
                                            <td>Debt*</td>
                                            <td>35–55%</td>

                                        </tr>
                                        <tr>
                                            <td>Gold</td>
                                            <td>5–10%</td>

                                        </tr>
                                    </tbody>
                                </table>
                                <div className="equidebt">
                                    <div>
                                        <p>*Equity: This includes investments in stocks, equity mutual funds, equity exchange traded funds (ETF) and ESOPs.</p>
                                    </div>
                                    <div>
                                        <p>*Debt: This includes investments in stocks, equity mutual funds, equity exchange traded funds (ETF) and ESOPs.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p><strong>Manage risk through diversification: </strong>You should invest some part of your equity allocation in direct stocks and the remaining in Mutual & Index Funds, to diversify risks further. For Direct stocks, remember to invest in quality growth companies at attractive prices.<br/><br/>

                        Also split your mutual fund investments across 4-5 schemes, to allow different investment strategies
                        to work in your portfolio. Quality of the portfolio, consistency of returns, upside potential and expense ratio are
                        few parameters you should look at while choosing a fund.</p>
                    <p><strong>Manage your debt allocation:</strong> You should not to take any risk on the debt component. Keep more than 50+% of your debt investments in the safest of safe debt assets eg SBI, Top banks FD. The rest should also be invested in safe liquid funds.</p>
                    <p><strong> Manage return expectations:</strong> Over the long term this strategy should be able to generate returns above 10% CAGR on your total portfolio (-14%
                        returns from equity investments and 7.5% from debt investments).</p>
                    <p><strong>Real estate as an alternative investment: </strong> You can consider investing in Real estate as an asset class only if your investable surplus is large enough. It also does not make sense to buy real estate on loan, unless you are sure of a 3-4 times capital appreciation in property rates. In most cases the rental income is not sufficient to pay your EMls, property tax and maintenance costs. Some parameters that you should keep in mind are the demand of property in that particular area, clear paperwork and a trusted counterparty.</p>
                    <p className="note">
                        In conclusion, you can get your desired returns and at the same time reduce your risk by following this game plan.
                        Please note that these are guidelines to help you prevent making mistakes. Success depends on proper execution of this investment strategy and you should seek investment advice before investing.
                    </p>
                </div>
            </section>

            {/* Step 4 */}
            <section className="step">
                <h3>Step 4</h3>
                <div className="guidelines">
                    <div className="guidelineheader">
                    <h4>Follow These Guidelines For Successful Implementation</h4></div>
                    <div className="cardsriskguideline">
                        <div className="cardriskguideline">
                            <h5>Manage Risks</h5>
                            <p>
                                In investing, risks need to be managed and controlled. Avoid
                                high-risk investments if you are risk-averse.
                            </p>
                        </div>
                        <div className="cardriskguideline">
                            <h5>Stay Invested</h5>
                            <p>
                                The big opportunity lies in staying invested. Keep your
                                investments over the long term to achieve your goals.
                            </p>
                        </div>
                        </div>
                        <div className="cardsriskguideline">
                        <div className="cardriskguideline">
                            <h5>Manage Allocations</h5>
                            <p>
                                You need to rebalance your equity and debt allocations to
                                maintain the desired risk level over time.
                            </p>
                        </div>
                       
                        <div className="cardriskguideline">
                            <h5>Check Upside Potential</h5>
                            <p>
                                Periodically check your portfolio for potential gains and make
                                adjustments accordingly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Step 5 */}
            <section className="step">
                <h3>Step 5</h3>
                <div className="choose-solution">
                    <div className="choosesolutionheader">
                    <h4>Choose a Solution That Suits You</h4></div>
                    <p>
                        You will need help and guidance to ensure you successfully manage
                        your goals through your investments. It is best to have a fiduciary
                        investment advisor with research capabilities that includes models
                        to guide you as your partner.
                    </p>
                    
                </div>
             
            </section>
            <button
  className="solutionriskbutton"
  onClick={() => navigate("/profileScreenRiskReport")}
>
  Submit
</button>

            <div className="subscribe-footerrmanagealertrisk">
      <h2 className="headingmanagealertrisk">Subscribe Now!</h2>
        <h3>Choose a plan that aligns with your investment goals!</h3>
        <button className="footer-subscribe-buttonmanagerisk">Subscribe</button>
      </div>
        </div>
        <Navbar/>
        <div className="foooterpagesattt">
    <FooterForAllPage/>
  </div>
        </div>
    );
};

export default ProfileRiskReportInvestment;
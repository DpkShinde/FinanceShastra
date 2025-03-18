// App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
 
import Login from "./Login/Login";
 
import Register from "./Register/Register";
import Market from "./Market/Market";
import GoldETF from "./GoldETF/GoldETF";
import Stocktable from "./StockList/StockList";
import ProfitLossTable from "./ProfitLossTable/ProfitLossTable";
import BalanceSheet from "./BalanceSheet/BalanceSheet";
import Header from "./header/header";
import Overview from "./StockOverview/Overview";
 
import Smallcap from "./Smallcappages/Smallcapstock/Smallcapstock";
import Midcap from "./Midcappages/Midcapstock/Midcapstock";
import Largecap from "./Largecappages/Largecapstock/Largecapstock";
import NiftyStocks from "./Nifty50stock/Nifty50stock";
import Highstock from "./Highgrowthpages/Highstock/Highstock";
import Beststock from "./Beststockspages/Beststock/Beststock";
 
import Portfolio from "./Portfoilo/Portfoliomanager/Portfoliomanager";
import NetWorthStocksDashboard from "./Portfoilo/NetWorthStocksDashboard/NetWorthStocksDashboard";
import PortfolioAccountStock from "./Portfoilo/PortfolioAccountStock/PortfolioAccountStock";
import AccountStockfundamental from "./Portfoilo/AccountStockfundamental/AccountStockfundamental";
import AccountStockalert from "./Portfoilo/AccountStockalerts/AccountStockalerts";
import AccountStockreturn from "./Portfoilo/AccountStockreturn/AccountStockreturn";
import Portfoliodonut from "./Portfoilo/Portfoliodonut/Portfoliodonut";
import OverviewPortfolioManager from "./Portfoilo/OverviewPortfoliograph/OverviewPortfoliograph";
import PortfolioStocksector from "./Portfoilo/PortfolioStocksector/PortfolioStocksector";
import PortfolioStockmcap from "./Portfoilo/PortfolioStockmcap/PortfolioStockmcap";
import AddTransactionstock from "./Portfoilo/AddTransactionstock/AddTransactionstock";
import Deletepopupstock from "./Portfoilo/Deletepopupstock/Deletepopupstock";
 
import UpdateTransaction from "./Portfoilo/UpdateTransactionstock/UpdateTransactionstock";
import Mutualnone from "./Portfoilo/Mutualnone/Mutualnone";
import Mutualtypefund from "./Portfoilo/Mutualtypefund/Mutualtypefund";
import Mutualsector from "./Portfoilo/Mutualsector/Mutualsector";
import MutualAccountStock from "./Portfoilo/Mutualtransaction/Mutualtransaction";
import OverviewMutual from "./Portfoilo/Mutualoverview/Mutualoverview";
import Accountmutualperformance from "./Portfoilo/Mutualperformance/Mutualperformance";
 
import StockWatchlist from "./Portfoilo/StockWatchlist/StockWatchlistnone";
 
 
import SubscriptionPlans from "./Subscription/PricingTablehalfyear/PricingTablehalfyear";
import SubscriptionannualPlans from "./Subscription/Subscriptionannualplan/Subscriptionannualplan";
 
import TopRatedFunds from "./MutualFund/TopRatedFunds/TopRatedFunds";
import TopRatedFundsdirect from "./MutualFund/TopRatedFundsdirect/TopRatedFundsdirect";
import GoldWatchportall from "./Portfoilo/Goldwatchlistall/Goldwatchlistall";
import Portfoliogoldaccount from "./Portfoilo/Portfoliogoldaccount/Portfoliogoldaccount";
 
 
import StockWatchportall from "./Portfoilo/StockWatchlistall/StockWatchlistall";
import StockWatchsectormcap from "./Portfoilo/StockWatchlistmcap/StockWatchlistmcap";
import StockWatchsectorlist from "./Portfoilo/StockWatchlistsector/StockWatchlistsector";
import MutualWatchlist from "./Portfoilo/Mutualfundwatchlistportfolio/Mutualfundwatchlistportfolio";
import MutualWatchtypefundlist from "./Portfoilo/Mutualfundwtchlisttypefund/Mutualfundwtchlisttypefund";
import MutualWatchsectorlist from "./Portfoilo/Mutualsectorportwatchlist/Mutualsectorportwatchlist";
import MutualWatchportall from "./Portfoilo/Mutualwatchportall/Mutualwatchportall";
 
import Mutualfund from "./MutualFund/Mutualfund";
import Bestsmallcapregular from "./MutualFund/Bestsmallcapregular/Bestsmallcapregular";
import Bestsmallcapdirect from "./MutualFund/Bestsmallcapdirect/Bestsmallcapdirect";
import MutualFundsSipCalculator from "./MutualFund/MutualFundsSipCalculator/MutualFundsSipCalculator";
 
import RiskoMeter from "./MutualFund/RiskoMutualDashboard/RiskoMutualDashboard";
import Flexregular from "./MutualFund/fundDataregularflex/fundDataregularflex";
import Flexdirect from "./MutualFund/Flexdirect/Flexdirect";
import Fundscreenerregular from "./MutualFund/Fundscreenerregular/Fundscreenerregular";
import Fundscreenerdirect from "./MutualFund/Fundscreenerdirect/Fundscreenerdirect";
import Bestgrowthregular from "./MutualFund/Bestgrowthregular/Bestgrowthregular";
import Etfregular from "./MutualFund/Etfregular/Etfregular";
import Etfdirect from "./MutualFund/Etfdirect/Etfdirect";
import Bestgrowthdirect from "./MutualFund/Bestgrowthdirect/Bestgrowthdirect";
import StockNewsComponent from "./Learn&insight/StockNewsComponent/StockNewsComponent";
 
import ScreenerStockList from "./Stocks/ScreenerStockList/ScreenerStockList";
import ScreenerStockvaluation from "./Stocks/Stockvaluation/Stockvaluation";
import ScreenerStockincome from "./Stocks/Stockincome/Stockincome";
 
import EarningsInsightLearn from './Learn&insight/Quaterlyearning/EarningsInsightLearn/EarningsInsightLearn';
import BlogsComponent from "./Learn&insight/Bolgs/Blogscomponent/Blogscomponent";
import BlogFilter from "./Learn&insight/Bolgs/Blogsfilter/Blogsfilter";
import Bloginvestment from "./Learn&insight/Bolgs/Blogsinvestment/Blogsinvestment";
import Blogpmscard from "./Learn&insight/Bolgs/Pmsblogcard/Pmsblogcard";
import Learncard from "./Learn&insight/Learnall/Learncard/Learncard";
import Learncardaftersignup from "./Learn&insight/Learnall/Learncardaftersignup/Learncardaftersignup";
import LearnCourseDetails from "./Learn&insight/Learnall/Learncoursedetail/Learncoursedetail";
import StocknewsAdanigroup from "./Learn&insight/StocknewsAdanigroup/StocknewsAdanigroup";
import StockNewsCard from "./Learn&insight/StockNewsCard/StockNewsCard";
import ModulecourseDetails from "./Learn&insight/Learnall/Modulelearncourse/Modulelearncourse";
import IpoDetailsubscribe from "./Learn&insight/Ipo/IpoDetailsubscribe/IpoDetailsubscribe";
import IpoDetails from "./Learn&insight/Ipo/IpoDetails/IpoDetails";
import IpoComponent from "./Learn&insight/Ipo/IpoComponent/IpoComponent";
import UnlockscreenerStockList from "./Stocks/unlockscreenerstocklist/unlockscreenerstocklist";
import Nifty50screenerStockList from "./Stocks/Niftystock50/Niftystock50table";
import Quaterlygraphtop from "./Learn&insight/Quaterlyearning/Quaterlygraphtop/Quaterlygraphtop";
import QuaterelyOverview from "./Learn&insight/Quaterlyearning/Quaterlyearningoverview/Quaterlyearningoverview";
import QuaterlynewsList from "./Learn&insight/Quaterlyearning/Quaterlynews/Quaterlynews";
import QuarterlyEarningdetailreport from "./Learn&insight/Quaterlyearning/Quaterlyearningdetailreport/Quaterlyearningdetailreport";
import QuarterlyEarningdetailincome from "./Learn&insight/Quaterlyearning/Quaterlyearningincome/Quaterlyearningincome";
import Quarterlybalancesheet from "./Learn&insight/Quaterlyearning/Quaterlyearnbalancesheet/Quaterlyearnbalancesheet";
import QuarterlyCashflow from "./Learn&insight/Quaterlyearning/Quaterlycashflow/Quaterlycashflow";
import Quarterlyratio from "./Learn&insight/Quaterlyearning/Quaterlyratio/Quaterlyratio";
import Earninginsightheader from "./Learn&insight/Quaterlyearning/Earninginsightdetailheader/Earninginsightdetailheader";
 
import Nifty50all from "./Stocks/Nifty50all";
import Nifty50screenerStockunlockList from "./Stocks/Nifty50screenerStockListunlock/Nifty50screenerStockListunlock";
import SectorWeightageTableniffty50 from "./Stocks/SectorWeightageTableniftty50/SectorWeightageTableniftty50";
 
import FooterForAllPage from "./FooterForAllPage/FooterForAllPage";
import ProfilePage from "./myprofile/ProfilePage/ProfilePage";
 
import SettingsDashboard from "./sidebardash/SettingDashPanel/SettingDashPanel";
import Dashboardchartmain from './Homepagenew/Dashboardgraph/Dashboardgraph';


import Homestockanalyst from "./Homepagenew/Homestockanalyst/Homestockanalyst";


import BestStockIncomeStatement from "./Beststockspages/BestStockIncomeStatement/BestStockIncomeStatement";
import Highstockvaluation from "./Highgrowthpages/Highstockvaluation/Highstockvaluation";
import HighStockIncomeStatement from "./Highgrowthpages/highgrowthStockIncomeStatement/highgrowthStockIncomeStatement";
import Netify100 from "./Nifty100pages/NiftyStocksTable/NiftyStocksTable";
import Netify100valuation from "./Nifty100pages/Netify100valuation/Netify100valuation";
import Netify100IncomeStatement from "./Nifty100pages/Netify100IncomeStatement/Netify100IncomeStatement";
import Smallcapvaluation from "./Smallcappages/Smallcapvaluation/Smallcapvaluation";
import SmallcapIncomeStatement from "./Smallcappages/SmallcapIncomeStatement/SmallcapIncomeStatement";
import Midcapvaluation from "./Midcappages/Midcapvaluation/Midcapvaluation";
import MidcapIncomeStatement from "./Midcappages/MidcapIncomeStatement/MidcapIncomeStatement";
import Largecapvaluation from "./Largecappages/Largecapvaluation/Largecapvaluation";
import LargecapIncomeStatement from "./Largecappages/LargecapIncomeStatement/LargecapIncomeStatement";
import BillingSubscriptionPages from "./myprofile/BillingSubscriptionPages/BillingSubscriptionPages";
import BillingDetailsPage from "./myprofile/BillingDetailsPage/BillingDetailsPage";
import PaypalProfilePage from "./myprofile/PaypalProfilePage/PaypalProfilePage";
import UPIProfilePage from "./myprofile/UPIProfilePage/UPIProfilePage";
import ScanPayProfilePage from "./myprofile/scanAndPayProfilePage/scanAndPayProfilePage";
import BillingDetailsPageannually from "./myprofile/BillingDetailsPageannually/BillingDetailsPageannually";
import MyReferalPage from "./myprofile/MyReferalPage/MyReferalPage";
import ReferMoreProfilePages from "./myprofile/ReferMoreProfilePages/ReferMoreProfilePages";
import EarningCalculatorProfilePage from "./myprofile/EarningCalculatorProfilePage/EarningCalculatorProfilePage";
import ReffeerralProfilePageSSS from "./myprofile/ReffeerralProfilePageSSS/ReffeerralProfilePageSSS";
import FAQS from "./FAQS/FAQS";
 
import SessionHistory from "./myprofile/SessionHistory/SessionHistory";

import OrderTable from "./myprofile/OrderTable/OrderTable";
import Managealert from "./myprofile/Managealert/Managealert";
import ContactFormmanagealert from "./myprofile/ContactFormmanagealert/ContactFormmanagealert";
import EditProfile from "./myprofile/EditProfile/editprofilenew";
import UserDetailsupdate from "./myprofile/Userupdatedpage/Userupdatedpage";
import RiskAnalysisDashboard from "./myprofile/Riskanalysis/RiskAnalysisDashboard/RiskAnalysisDashboard";
import HalfyearlySubscriptionPages from "./Subscription/halfyearlySubscriptionPages/halfyearlySubscriptionPages";
import HalfyearlyPaypalProfilePage from "./Subscription/HalfyearlypaypalSubscriptionPages/HalfyearlypaypalSubscriptionPages";
import HalfyearlyUPIPage from "./Subscription/HalfyearlyupiProfilePage/HalfyearlyupiProfilePage";
import HalfyearlyScanPage from "./Subscription/HalfyearlyScanPage/HalfyearlyScanPage";
import PremiumSubscriptionPages from "./Subscription/PremiumSubscriptionPages/PremiumSubscriptionPages";
import PremiumPaypalProfilePage from "./Subscription/PremiumpaypalPages/PremiumpaypalPages";
import PremiumUPIPage from "./Subscription/PremiumupiProfilePage/Premiumprofilepage";
import PremiumScanPage from "./Subscription/PremiumScanPage/PremiumScanPage";
import AnnuallySubscriptionPages from "./Subscription/AnnuallySubscriptionPages/AnnuallySubscriptionPages";
import AnnuallyPaypalProfilePage from "./Subscription/AnnuallyPaypalProfilePage/AnnuallyPaypalProfilePage";
import AnnuallyUPIPage from "./Subscription/AnnuallyUPIPage/AnnuallyUPIPage";
import AnnuallyScanPage from "./Subscription/AnnuallyScanPage/AnnuallyScanPage";
import AnnuallyPremiumSubscriptionPages from "./Subscription/AnnuallyPremiumSubscriptionPages/AnnuallyPremiumSubscriptionPages";
import AnnuallyPremiumPaypalProfilePage from "./Subscription/AnnuallyPremiumPaypalProfilePage/AnnuallyPremiumPaypalProfilePage";
import AnnuallyPremiumUPIPage from "./Subscription/AnnuallyPremiumUPIPage/AnnuallyPremiumUPIPage";
import AnnuallyPremiumScanPage from "./Subscription/AnnuallyPremiumScanPage/AnnuallyPremiumScanPage";
 
import Lumpsumallpage from "./Accountpages/Lumpsumpage/Lumpsumallpage/Lumpsumallpage";
import Fdallpages from "./Accountpages/Fdpages/Fdallpages/Fdallpages";
import Rdallpages from "./Accountpages/Rdpages/Rdallpages/Rdallpages";
import Ppfallpages from "./Accountpages/Ppfpages/Ppfallpages/Ppfallpages";
import Cagrallpages from "./Accountpages/Cagrpages/Cagrallpages/Cagrallpages";
import RevCagrallpages from "./Accountpages/Reversecagrpages/Revcagrallpages/Revcagrallpages";
import FundTable from "./Accountpages/FundTable/FundTable";
import ElssTable from "./Accountpages/Accountsipallpage/Elsstable/Elsstable";
import Errorpage from "./Errorpage/Errorpage";
import OverviewPortfolioManagergold from "./Portfoilo/Overviewportfoliomanager/Overviewportfoliomanager";
import StocksThemes from "./Stockthemepages/Stockthemes/Stockthemes";
import CargoalPlanner from "./Goalplannerpages/Cargoalcalculator/Cargoalcalculator";
import GoalPlanner from "./Goalplannerpages/GoalPlanner/GoalPlanner";
import Investgoalcalculate from "./Goalplannerpages/Investgoalcalculate/Investgoalcalculate";
import Goalplannersubscribe from "./Goalplannerpages/Goalplannersubscribe/Goalplannersubscribe";
import Goalplannerforallcalculator from "./Goalplannerpages/Goalplannerforallcalculator/Goalplannerforallcalculator";
import HouseGoalPlanner from "./Goalplannerpages/HouseGoalPlanner/HouseGoalPlanner";
 
 
import Accountsipallpage from "./Account/Accountsipallpage";

 
 
import Landingnavbar from "./Landingpages/Landingnavbar/Landingnavbar";
import WhyFinadvanceeducationnn from "./whyfinancespages/whyfinancespages";
import Banksectorstocktheme from "./Stockthemepages/BankSectorStockTheme/BankSectorStockTheme";
import StockThemesSectorPages from "./Stockthemepages/StockThemesSectorPages/StockThemesSectorPages";
import Stockthemeunlocknavbar from "./Stockthemepages/stockthemeunlocknavbar/stockthemeunlocknavbar";
import BankSectorThemePagelock from "./Stockthemepages/BankSectorThemePagelock/BankSectorThemePagelock";
import StockThemesindustriesPages from "./Stockthemepages/stockthemeindustriespage/stockthemeindustriespage";
import StockThemesindustrieslockPages from "./Stockthemepages/StockThemesindustriesPageslock/StockThemesindustriesPageslock";
import LandingPage from "./Landingpages/Landingpage";
 
import EducationGoalPlanner from "./Goalplannerpages/EducationGoalPlanner/EducationGoalPlanner";
import HolidayGoalPlanner from "./Goalplannerpages/HolidayGoalPlanner/HolidayGoalPlanner";
import WeddingGoalPlanner from "./Goalplannerpages/Weddinggoalplanner/Weddinggoalplanner";
import ElectronicGoalPlanner from "./Goalplannerpages/Electronicgoalplanner/Electronicgoalplanner";
import OtherGoalPlanner from "./Goalplannerpages/OtherGoalPlanner/OtherGoalPlanner";
import PortfolioCard from "./Portfolioanalysispages/PortfolioCard/PortfolioCard";
import PortfolioAnalysisnew from "./Portfolioanalysispages/PortfolioAnalysisnew/PortfolioAnalysisnew";
import PortfolioMetrics from "./Portfolioanalysispages/PortfolioMetrics/PortfolioMetrics";
 
import SegmentAnalysis from "./Portfolioanalysispages/SegmentAnalysis/SegmentAnalysis";
import StockTracker from "./Portfolioanalysispages/StockTracker/StockTracker";
import BestPerformers from "./Portfolioanalysispages/BestPerformers/BestPerformers";
import Portfolioanalyticchart from "./Portfolioanalysispages/Portfolioanalyticchart/Portfolioanalyticchart";
 
import Openemailforgotpass from "./Forgotpaswordpages/Openemailforgotpass/Openemailforgotpass";
import Forgetpassword from "./Forgotpaswordpages/Forgetpassword/Forgetpassword";
 
import Stockresearchpages from "./stockresearchpages/stockresearchpages";

import PortfolioAnalysisCorporatePage from "./Portfolioanalysispages/PortfolioAnalysisCorporatePage/PortfolioAnalysisCorporatePage";
import PortfolioAnalysisdividentPage from "./Portfolioanalysispages/PortfolioAnalysisdividentPage/PortfolioAnalysisdividentPage";
import PortfolioAnalysisbonusPage from "./Portfolioanalysispages/PortfolioAnalysisbonusPage/PortfolioAnalysisbonusPage";
import PortfolioAnalysissplitPage from "./Portfolioanalysispages/PortfolioAnalysissplitPage/PortfolioAnalysissplitPage";
import PortfolioAnalysisrightissusePage from "./Portfolioanalysispages/PortfolioAnalysisrightissusePage/PortfolioAnalysisrightissusePage";
import PortfolioAnalysisAGMPage from "./Portfolioanalysispages/PortfolioAnalysisAGMPage/PortfolioAnalysisAGMPage";
 
import PortfolioHoldingdetailPage from "./Portfolioanalysispages/PortfolioHoldingdetailPage/PortfolioHoldingdetailPage";
 
import Porfolioanalysisallpagecall from "./Portfolioanalysispages/Porfolioanalysisallpagecall/Porfolioanalysisallpagecall";
import AnalysisResearchReportblur from "./Portfolioanalysispages/Portfolioanysisstockresearcgblur/Portfolioanysisstockresearcgblur";
import Portfolioanalysisdividendcall from "./Portfolioanalysispages/Portfolioanalysisdividendcall/Portfolioanalysisdividendcall";
import Portfoliobonuscall from "./Portfolioanalysispages/Portfoliobonuscall/Portfoliobonuscall";
import Portfoliosplitcall from "./Portfolioanalysispages/Portfoliosplitcall/Portfoliosplitcall";
import Portfolioanalysisrightscall from "./Portfolioanalysispages/Portfolioanalysisrightscall/Portfolioanalysisrightscall";
import PortfolioAGMcall from "./Portfolioanalysispages/PortfolioanalysisAGMcall/PortfolioanalysisAGMcall";
import Forgotresetpassword from "./Forgotresetpassword/Forgotresetpassword";

 
//Context
 
 
 
import {Provider} from "react-redux";
import { store } from "./Store/store";
import { PortfolioStockProvider } from "./Portfoilo/context/PortfolioStocksContext";
import { PortfolioMutualsProvider } from "./Portfoilo/context/PortfolioMutualsContext";
import { PortfolioDashboardProvider } from "./Portfoilo/context/PortfolioDashboardContext"
import { DarkModeProvider } from "./Portfoilo/context/DarkModeContext";
import {UserProfileProvider } from "./Portfoilo/context/UserProfileContext";


import Disclaimer from "./Footernavigatepages/Disclaimer/Disclaimer";
 
import RefundPolicy from "./Footernavigatepages/Refundpage/Refundpage";


import WhoWeAre from "./Footernavigatepages/WhoWeAre/WhoWeAre";

import TermsAndConditions from "./Footernavigatepages/TermsAndConditions/TermsAndConditions";


import AddTransactionmutual from "./Portfoilo/Addtransactionmutual/Addtransactionmutual";
import AddTransactiongold from "./Portfoilo/Addtransactiongold/Addtransactiongold";
 
import ContactUsnew from "./Contactusssnewlall/ContactUsnew/ContactUsnew";
import ContactCards from "./Contactusssnewlall/ContactCards/ContactCards";
import StocksSmartSIPPS from "./Landingpages/StocksSmartSIPPS/StocksSmartSIPPS";
import DashboardLayout from "./DashboardLayout/DashboardLayout";
import Dashboardall from "./Homepagenew/Dashboardall/Dashboardall";
import BestStockvaluation from "./Beststockspages/Beststockvaluation/Beststockvaluation";
import AccountSettings from "./myprofile/AccountSettings/AccountSettings";


function App() {
  return (  
    <Provider store={store}>
      <DarkModeProvider>
        <UserProfileProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/market" element={<Market />} />
            <Route path="/gold" element={<GoldETF />} />
            <Route path="/stock" element={<Stocktable />} />
            <Route path="/header" element={<Header />} />
            <Route path="/profitloss" element={<ProfitLossTable />} />
            <Route path="/balance-sheet" element={<BalanceSheet />} />
            <Route path="/register" element={<Register />} />
            <Route path="/stockhandle" element={<Overview />} />
            <Route path="/nifty" element={<Netify100 />} />
            <Route path="/smallcap" element={<Smallcap />} />
            <Route path="/midcap" element={<Midcap />} />
            <Route path="/largecap" element={<Largecap />} />
            <Route path="/niftystock" element={<NiftyStocks />} />
            <Route path="/highgrowth" element={<Highstock />} />
            <Route path="/beststock" element={<Beststock />} />
            <Route
              path="/portfolio"
              element={
                <PortfolioDashboardProvider>
                  <Portfolio />
                </PortfolioDashboardProvider>
              }
            />

            <Route
              path="/portfoliostock"
              element={
                <PortfolioDashboardProvider>
                  <NetWorthStocksDashboard />
                </PortfolioDashboardProvider>
              }
            />
            <Route path="/portfoliodonut" element={<Portfoliodonut />} />
            <Route path="/portfoliostockaccount" element={
              <PortfolioDashboardProvider>
                <PortfolioStockProvider>
                  <PortfolioAccountStock />
                </PortfolioStockProvider>
              </PortfolioDashboardProvider>
            } />
            <Route
              path="/accountfund"
              element={
                <PortfolioStockProvider>
                  <AccountStockfundamental />
                </PortfolioStockProvider>
              }
            />
            <Route
              path="/accountalert"
              element={
                <PortfolioStockProvider>
                  <AccountStockalert />
                </PortfolioStockProvider>
              }
            />
            <Route
              path="/accountreturn"
              element={
                <PortfolioStockProvider>
                  <AccountStockreturn />
                </PortfolioStockProvider>
              }
            />
            <Route
              path="/overview"
              element={
                <PortfolioStockProvider>
                  <OverviewPortfolioManager />
                </PortfolioStockProvider>
              }
            />
            <Route path="/stocksector" element={<PortfolioStocksector />} />
            <Route path="/stockmcap" element={<PortfolioStockmcap />} />
            <Route 
              path="/stockadd" 
              element={
                <PortfolioStockProvider>
                  <AddTransactionstock />
                </PortfolioStockProvider>
              } 
            />
            <Route path="/stockupdate" element={<UpdateTransaction />} />
            <Route path="/stockdelete" element={<Deletepopupstock />} />
            <Route path="/mutualsector" element={<Mutualsector />} />
            <Route path="/mutualnone" element={<Mutualnone />} />
            <Route path="/mutualtype" element={<Mutualtypefund />} />
            <Route
              path="/mutualaccount"
              element={
                <PortfolioMutualsProvider>
                  <MutualAccountStock />
                </PortfolioMutualsProvider>
              }
            />
            <Route
              path="/mutualoverview"
              element={
                <PortfolioMutualsProvider>
                  <OverviewMutual />
                </PortfolioMutualsProvider>
              }
            />
            <Route path="/accountperformance" element={<Accountmutualperformance />} />
            <Route path="/stockwatchlist" element={<StockWatchlist />} />
            <Route path="/stockwatchlistsector" element={<StockWatchsectorlist />} />
            <Route path="/stockwatchlistmcap" element={<StockWatchsectormcap />} />
            <Route path="/stockwatchlistall" element={<StockWatchportall />} />
            <Route path="/pricehalf" element={<SubscriptionPlans />} />
            <Route path="/annualplan" element={<SubscriptionannualPlans />} />
            <Route path="/mutualfund" element={<TopRatedFunds />} />
            <Route path="/mutualfunddirect" element={<TopRatedFundsdirect />} />
            <Route path="/goldWatchlistall" element={<GoldWatchportall />} />
            <Route path="/portfoliogoldtoppage" element={<Portfoliogoldaccount />} />

            <Route path="/mutualwatchlist" element={<MutualWatchlist />} />
            <Route path="/mutualwatchlisttype" element={<MutualWatchtypefundlist />} />
            <Route path="/mutualwatchlistsector" element={<MutualWatchsectorlist />} />
            <Route path="/mutualwatchlistall" element={<MutualWatchportall />} />

            <Route path="/mutualfundgrowth" element={<Mutualfund />} />
            <Route path="/bestsmallcapregular" element={<Bestsmallcapregular />} />
            <Route path="/bestsmallcapdirect" element={<Bestsmallcapdirect />} />
            <Route path="/sip" element={<MutualFundsSipCalculator />} />
            <Route path="/risk" element={<RiskoMeter />} />
            <Route path="/flexregular" element={<Flexregular />} />
            <Route path="/flexdirect" element={<Flexdirect />} />
            <Route path="/fundscreenerregular" element={<Fundscreenerregular />} />
            <Route path="/fundscreenerdirect" element={<Fundscreenerdirect />} />
            <Route path="/Bestgrowthregular" element={<Bestgrowthregular />} />
            <Route path="/Bestgrowthdirect" element={<Bestgrowthdirect />} />

            <Route path="/etfregular" element={<Etfregular />} />
            <Route path="/etfdirect" element={<Etfdirect />} />
            <Route path="/stockNewsComponent" element={<StockNewsComponent />} />
            <Route path="/stockScreenerlist" element={<ScreenerStockList />} />
            <Route path="/ScreenerStockvaluation" element={<ScreenerStockvaluation />} />
            <Route path="/IncomeStatement" element={<ScreenerStockincome />} />

            <Route path="/earningsInsightLearn" element={<EarningsInsightLearn />} />
            <Route path="/blogsComponent" element={<BlogsComponent />} />
            <Route path="/blogFilter" element={<BlogFilter />} />
            <Route path="/bloginvestment/:id" element={<Bloginvestment />} />
            <Route path="/blogpmscard/:id" element={<Blogpmscard />} />
            <Route path="/learncard" element={< Learncard />} />
            <Route path="/learncardaftersignup" element={<Learncardaftersignup />} />
            <Route path="/learnCourseDetails" element={<LearnCourseDetails />} />
            <Route path="/stockNewsComponent" element={<StockNewsComponent />} />
            <Route path="/stocknewsAdanigroup/:id" element={<StocknewsAdanigroup />} />
            <Route path="/stockNewsCard/:id" element={<StockNewsCard />} />
            <Route path="/modulecourseDetails" element={<ModulecourseDetails />} />
            <Route path="/ipoComponent" element={<IpoComponent />} />
            <Route path="/ipoDetails/:id" element={<IpoDetails />} />
            <Route path="/ipoDetailsubscribe" element={<IpoDetailsubscribe />} />
            <Route path="/unlockstockscreener" element={<UnlockscreenerStockList />} />
            <Route path="/nifty50screenerStockList" element={<Nifty50screenerStockList />} />

            <Route path="/earninginsightheader" element={<Earninginsightheader />} />
            <Route path="/quaterlygraphtop" element={<Quaterlygraphtop />} />
            <Route path="/earningsInsightLearn" element={<EarningsInsightLearn />} />
            <Route path="/quaterelyOverview" element={<QuaterelyOverview />} />
            <Route path="/quaterlynewsList" element={<QuaterlynewsList />} />
            <Route path="/qquarterlyEarningsReport" element={<QuarterlyEarningdetailreport />} />
            <Route path="/quarterlyEarningdetailincome" element={<QuarterlyEarningdetailincome />} />
            <Route path="/quarterlybalancesheet" element={<Quarterlybalancesheet />} />
            <Route path="/quarterlyCashflow" element={<QuarterlyCashflow />} />
            <Route path="/quarterlyratio" element={<Quarterlyratio />} />
            <Route path="/sectorWeightageTableniffty50" element={<SectorWeightageTableniffty50 />} />
            <Route path="/nifty50screenerStockunlockList" element={<Nifty50screenerStockunlockList />} />
            <Route path="/nifty50pageall" element={<Nifty50all />} />


            <Route path="/footerForAllPage" element={<FooterForAllPage />} />
            <Route path="/profilePage" element={<ProfilePage />} />
            <Route path="/settingDashPanel" element={<SettingsDashboard />} />
            <Route
              path="/home"
              element={
                <PortfolioDashboardProvider>
                  <Dashboardchartmain />
                </PortfolioDashboardProvider>
              }
            />
          
     
            <Route path="/homestockanalyst" element={<Homestockanalyst />} />
           
            <Route path="/bestStockvaluation" element={<BestStockvaluation/>} />
            <Route path="/bestStockIncomeStatement" element={<BestStockIncomeStatement />} />
            <Route path="/highstockvaluation" element={<Highstockvaluation />} />
            <Route path="/highgrowthStockIncomeStatement" element={<HighStockIncomeStatement />} />
            <Route path="/netify100valuation" element={<Netify100valuation />} />
            <Route path="/netify100IncomeStatement" element={<Netify100IncomeStatement />} />
            <Route path="/smallcapvaluation" element={<Smallcapvaluation />} />
            <Route path="/smallcapIncomeStatement" element={<SmallcapIncomeStatement />} />
            <Route path="/midcapvaluation" element={<Midcapvaluation />} />
            <Route path="/midcapIncomeStatement" element={<MidcapIncomeStatement />} />
            <Route path="/largecapvaluation" element={<Largecapvaluation />} />
            <Route path="/largecapIncomeStatement" element={<LargecapIncomeStatement />} />
            <Route path="/billingSubscriptionPages" element={<BillingSubscriptionPages />} />
            <Route path="/billingDetailsPage" element={<BillingDetailsPage />} />
            <Route path="/paypalProfilePage" element={<PaypalProfilePage />} />
            <Route path="/uPIProfilePage" element={<UPIProfilePage />} />

            <Route path="/scanPayProfilePage" element={<ScanPayProfilePage />} />
            <Route path="/billingDetailsPageannually" element={<BillingDetailsPageannually />} />
            <Route path="/myReferalPage" element={<MyReferalPage />} />
            <Route path="/referMoreProfilePages" element={<ReferMoreProfilePages />} />
            <Route path="/earningCalculatorProfilePage" element={<EarningCalculatorProfilePage />} />
            <Route path="/reffeerralProfilePageSSS" element={<ReffeerralProfilePageSSS />} />
            <Route path="/fAQS" element={<FAQS />} />






            <Route path="/sessionHistory" element={<SessionHistory />} />
            <Route path="/accountSettings" element={<AccountSettings/>} />
            <Route path="/orderTable" element={<OrderTable />} />
            <Route path="/managealert" element={<Managealert />} />

            <Route path="/contactFormmanagealert" element={<ContactFormmanagealert />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/userDetailsupdate" element={<UserDetailsupdate />} />
            <Route path="/riskAnalysisDashboard" element={<RiskAnalysisDashboard />} />
            <Route path="/halfyearlySubscriptionPages" element={<HalfyearlySubscriptionPages />} />
            <Route path="/halfyearlyPaypalProfilePage" element={< HalfyearlyPaypalProfilePage />} />
            <Route path="/halfyearlyUPIPage" element={<HalfyearlyUPIPage />} />
            <Route path="/halfyearlyScanPage" element={<HalfyearlyScanPage />} />
            <Route path="/premiumSubscriptionPages" element={<PremiumSubscriptionPages />} />
            <Route path="/premiumPaypalProfilePage" element={<PremiumPaypalProfilePage />} />
            <Route path="/premiumUPIPage" element={< PremiumUPIPage />} />
            <Route path="/premiumScanPage" element={<PremiumScanPage />} />
            <Route path="/annuallySubscriptionPages" element={< AnnuallySubscriptionPages />} />
            <Route path="/annuallyPaypalProfilePage" element={<AnnuallyPaypalProfilePage />} />
            <Route path="/annuallyUPIPage" element={<AnnuallyUPIPage />} />
            <Route path="/annuallyScanPage" element={<AnnuallyScanPage />} />
            <Route path="/annuallyPremiumSubscriptionPages" element={< AnnuallyPremiumSubscriptionPages />} />
            <Route path="/annuallyPremiumPaypalProfilePage" element={<AnnuallyPremiumPaypalProfilePage />} />
            <Route path="/annuallyPremiumUPIPage" element={<AnnuallyPremiumUPIPage />} />
            <Route path="/annuallyPremiumScanPage" element={<AnnuallyPremiumScanPage />} />
            <Route path="/sipCalculatorAccountPages" element={<Accountsipallpage />} />

            <Route path="/stocksSmartSIPPS" element={<StocksSmartSIPPS />} />
           
            <Route path="/" element={<LandingPage />} />
           
            <Route path="/landingnavbar" element={<Landingnavbar />} />
            <Route path="/whyFinadvanceeducationnn" element={<WhyFinadvanceeducationnn />} />
            <Route path="/banksectorstocktheme" element={<Banksectorstocktheme />} />
            <Route path="/stockThemesSectorPages" element={<StockThemesSectorPages />} />
            <Route path="/stockthemeunlocknavbar" element={<Stockthemeunlocknavbar />} />
            <Route path="/bankSectorThemePagelock" element={<BankSectorThemePagelock />} />
            <Route path="/stockThemesindustriesPages" element={< StockThemesindustriesPages />} />
            <Route path="/stockThemesindustrieslockPages" element={<StockThemesindustrieslockPages />} />

            <Route path="/lumpsumallpage" element={<Lumpsumallpage />} />
            <Route path="/fdallpages" element={<Fdallpages />} />
            <Route path="/rdallpages" element={<Rdallpages />} />
            <Route path="/ppfallpages" element={<Ppfallpages />} />
            <Route path="/cagrallpages" element={<Cagrallpages />} />
            <Route path="/revCagrallpages" element={<RevCagrallpages />} />
            <Route path="/fundTable" element={<FundTable />} />
            <Route path="/elssTable" element={<ElssTable />} />
            <Route path="/errorpage" element={<Errorpage />} />
            <Route path="/overviewPortfolioManager" element={< OverviewPortfolioManagergold />} />
            <Route path="/stocksThemes" element={< StocksThemes />} />
            <Route path="/cargoalPlanner" element={< CargoalPlanner />} />
            <Route path="/goalPlanner" element={<GoalPlanner />} />
            <Route path="/investgoalcalculate" element={<Investgoalcalculate />} />
            <Route path="/goalplannersubscribe" element={<Goalplannersubscribe />} />
            <Route path="/goalplannerforallcalculator" element={<Goalplannerforallcalculator />} />
            <Route path="/houseGoalPlanner" element={<HouseGoalPlanner />} />

            <Route path="/educationGoalPlanner" element={<EducationGoalPlanner />} />
            <Route path="/holidayGoalPlanner" element={<HolidayGoalPlanner />} />
            <Route path="/weddingGoalPlanner" element={<WeddingGoalPlanner />} />
            <Route path="/electronicGoalPlanner" element={<ElectronicGoalPlanner />} />
            <Route path="/otherGoalPlanner" element={<OtherGoalPlanner />} />
            <Route path="/portfolioCard" element={<PortfolioCard />} />
            <Route path="/portfolioAnalysisnew" element={<PortfolioAnalysisnew />} />

            <Route path="/portfolioMetrics" element={<PortfolioMetrics />} />

            <Route path="/segmentAnalysis" element={<SegmentAnalysis />} />
            <Route path="/stockTrackerall" element={<StockTracker />} />
            <Route path="/bestPerformers" element={<BestPerformers />} />
            <Route path="/portfolioanalyticchart" element={<Portfolioanalyticchart />} />
            <Route path="/forgetpassword" element={<Forgetpassword />} />
            <Route path="/openemailforgotpass" element={<Openemailforgotpass />} />




            <Route path="/stockresearchpages" element={<Stockresearchpages />} />
        


            <Route path="/portfolioAnalysisCorporatePage" element={<PortfolioAnalysisCorporatePage />} />
            <Route path="/portfolioAnalysisdividentPage" element={<PortfolioAnalysisdividentPage />} />
            <Route path="/portfolioAnalysisbonusPage" element={<PortfolioAnalysisbonusPage />} />
            <Route path="/portfolioAnalysisSplitsPage" element={<PortfolioAnalysissplitPage />} />
            <Route path="/portfolioAnalysisRightsPage" element={<PortfolioAnalysisrightissusePage />} />
            <Route path="/portfolioAnalysisAgmPage" element={<PortfolioAnalysisAGMPage />} />

            <Route path="/portfolioHoldingdetailPage" element={<PortfolioHoldingdetailPage />} />
            <Route path="/porfolioanalysisallpagecall" element={<Porfolioanalysisallpagecall />} />
            <Route path="/analysisResearchReportblur" element={<AnalysisResearchReportblur />} />
            <Route path="/portfolioanalysisdividendcall" element={<Portfolioanalysisdividendcall />} />
            <Route path="/portfoliobonuscall" element={<Portfoliobonuscall />} />
            <Route path="/portfoliosplitcall" element={<Portfoliosplitcall />} />
            <Route path="/portfolioanalysisrightscall" element={<Portfolioanalysisrightscall />} />
            <Route path="/portfolioAGMcall" element={<PortfolioAGMcall />} />
            <Route path="/forgotresetpassword/:token" element={<Forgotresetpassword />} />
          
            <Route path="/disclaimer" element={<Disclaimer />} />
         
            <Route path="/refundPolicy" element={<RefundPolicy />} />
            <Route path="/whoWeAre" element={<WhoWeAre />} />
     
            <Route path="/termsAndConditions" element={<TermsAndConditions />} />   

      <Route path="/educationGoalPlanner" element={<EducationGoalPlanner/>} />
      <Route path="/holidayGoalPlanner" element={<HolidayGoalPlanner/>} />
      <Route path="/weddingGoalPlanner" element={<WeddingGoalPlanner/>} />
      <Route path="/electronicGoalPlanner" element={<ElectronicGoalPlanner/>} />
      <Route path="/otherGoalPlanner" element={<OtherGoalPlanner/>} />
      <Route path="/portfolioCard" element={<PortfolioCard/>} />
      <Route path="/portfolioAnalysisnew" element={<PortfolioAnalysisnew/>} />
     
      <Route path="/portfolioMetrics" element={<PortfolioMetrics/>} />
    
      <Route path="/segmentAnalysis" element={<SegmentAnalysis/>} />
      <Route path="/stockTrackerall" element={<StockTracker/>} />
      <Route path="/bestPerformers" element={<BestPerformers/>} />
      <Route path="/portfolioanalyticchart" element={<Portfolioanalyticchart/>} />
      <Route path="/forgetpassword" element={<Forgetpassword/>} />
      <Route path="/openemailforgotpass" element={<Openemailforgotpass/>} />
      <Route path="/stockresearchpages" element={<Stockresearchpages/>} />

      <Route path="/portfolioAnalysisCorporatePage" element={<PortfolioAnalysisCorporatePage/>} />
      <Route path="/portfolioAnalysisdividentPage" element={<PortfolioAnalysisdividentPage/>} />
      <Route path="/portfolioAnalysisbonusPage" element={<PortfolioAnalysisbonusPage/>} />
      <Route path="/portfolioAnalysisSplitsPage" element={<PortfolioAnalysissplitPage/>} />
      <Route path="/portfolioAnalysisRightsPage" element={<PortfolioAnalysisrightissusePage/>} />
      <Route path="/portfolioAnalysisAgmPage" element={<PortfolioAnalysisAGMPage/>} />
 
      <Route path="/portfolioHoldingdetailPage" element={<PortfolioHoldingdetailPage/>} />
      <Route path="/porfolioanalysisallpagecall" element={<Porfolioanalysisallpagecall/>} />
      <Route path="/analysisResearchReportblur" element={<AnalysisResearchReportblur/>} />
      <Route path="/portfolioanalysisdividendcall" element={<Portfolioanalysisdividendcall/>} />
      <Route path="/portfoliobonuscall" element={<Portfoliobonuscall/>}/>
      <Route path="/portfoliosplitcall" element={<Portfoliosplitcall/>}/>
      <Route path="/portfolioanalysisrightscall" element={<Portfolioanalysisrightscall/>}/>
      <Route path="/portfolioAGMcall" element={<PortfolioAGMcall/>}/> 
      <Route path="/forgotresetpassword/:token" element={<Forgotresetpassword/>}/>

 
      <Route path="/disclaimer" element={<Disclaimer/>}/>
     
      <Route path="/refundPolicy" element={<RefundPolicy/>}/>
  
      <Route path="/whoWeAre" element={<WhoWeAre/>}/>
  
      <Route path="/termsAndConditions" element={<TermsAndConditions/>}/>
   
      <Route path="/addTransactionmutual" element={<AddTransactionmutual/>}/>
      <Route path="/addTransactiongold" element={<AddTransactiongold/>}/>
      <Route path="/contactUsnew" element={<ContactUsnew/>}/>
      <Route path="/contactCards" element={<ContactCards/>}/> 
      <Route path="/stocksSmartSIPPS" element={<StocksSmartSIPPS/>}/>
      <Route path="/dashboardall" element={< Dashboardall/>}/>
     
    




























          </Routes>
        </UserProfileProvider>
      </DarkModeProvider>
    </Provider>
  );
}
 
export default App;
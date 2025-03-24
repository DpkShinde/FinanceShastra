import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import {jwtDecode} from "jwt-decode";
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";
import { FaUserCircle, FaSearch, FaChevronDown, FaUser } from "react-icons/fa";
import { VscBell } from "react-icons/vsc";
import { FaCircleQuestion } from "react-icons/fa6";
import { PiHandCoins } from "react-icons/pi";
import { RiHome5Fill, RiBriefcase4Line } from "react-icons/ri";
import { SlBookOpen } from "react-icons/sl";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../Store/Slices/searchDataSlice";
import { debounce } from "lodash";
import Cookies from "js-cookie";

import logo from "../../assest/Logo design (1).png";
import Darkmodelogo from "../../assest/navlogo.png";
import "./Landingnavbar.css";
import { API_BASE_URL } from "../../config";
import { faBullseye } from "@fortawesome/free-solid-svg-icons";

// Dropdown menu components
const StockDropdownMenu = () => (
  <div className="stockmenu">
    <div className="stockmenu-column">
      <ul>
        <li>
          <div className="dropdown-item">
            <Link to="/StockScreenerList">
              Stock Screener
              <p>
                Discover stocks based on various filters and criteria to make
                informed decisions.
              </p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/beststock">
              Best Stock
              <p>
                Explore the best stocks for investment based on analysis and
                trends.
              </p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/highgrowth">
              High Growth Stocks
              <p>
                Find stocks that are expected to grow rapidly in the upcoming
                years.
              </p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/nifty50pageall">
              Nifty 50 Companies
              <p>
                Track the top 50 companies listed on the National Stock Exchange
                of India.
              </p>
            </Link>
          </div>
        </li>
      </ul>
    </div>
    <div className="stockmenu-column">
      <ul>
        <li>
          <div className="dropdown-item">
            <Link to="/nifty">
              Nifty 100 Companies
              <p>
                Explore all 500 companies listed on the Nifty index to diversify
                your portfolio.
              </p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/smallcap">
              Small Cap
              <p>Invest in smaller companies with high potential for growth.</p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/midcap">
              Mid Cap
              <p>
                Discover mid-sized companies with a strong growth trajectory.
              </p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/largecap">
              Large Cap
              <p>Focus on large, established companies with stable returns.</p>
            </Link>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

const PortfolioDropdownMenu = () => (
  <div className="dropdown-menu">
    <div className="dropdown-item">
      <Link to="/portfolio">
        My Portfolio
        <p>Your financial navigator</p>
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/portfolio-risk">
        Portfolio Risk Analysis
        <p>Risk evaluation and insights</p>
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/stockwatchlist">
        Watchlist
        <p>Monitor, assess, and improve</p>
      </Link>
    </div>
  </div>
);

const LearnDropdownMenu = () => (
  <div className="learn-menu">
    <div className="dropdown-item">
      <Link to="/stockNewsComponent">
        Stock News
        <p>Discover what's happening in the stock markets in real-time</p>
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/blogsComponent">
        Blogs
        <p>Investment Knowledge Hub</p>
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/ipoComponent">
        IPO Details
        <p>Key Information on the Latest IPO Trends</p>
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/stockwatchlist">
        Market Insights
        <p>Keep up with in-depth market insights</p>
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/earningsInsightLearn">
        Quarterly Earnings
        <p>Monitor thorough quarterly earnings summaries</p>
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/learncard">
        Learn
        <p>Knowledge is the key to successful trading—learn, adapt, and grow</p>
      </Link>
    </div>
  </div>
);

const UserDropdownMenu = () => (
  <div className="user-menu">
    <div className="dropdown-item">
      <Link to="/userDetailsupdate">
        <FaUser className="dropdown-icon" />
        My Profile
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/help">
        <FaCircleQuestion className="dropdown-icon" />
        Help Center
      </Link>
    </div>
    <div className="dropdown-item">
      <Link to="/">
        <FaUserCircle className="dropdown-icon" />
        Logout
      </Link>
    </div>
  </div>
);

const MutualFundsDropdownMenu = () => (
  <div className="mutualstockmenu">
    <div className="stockmenu-column">
      <ul>
        <li>
          <div className="dropdown-item">
            <Link to="/mutualfund">
              Top Rated Funds
              <p>Focus on risk management and long-term growth.</p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/fundscreenerregular">
              Fund Screener
              <p>Efficient filter and compare investment options.</p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/bestsmallcapregular">
              Best Small Cap Fund
              <p>Strong returns by investing in high-growth opportunities.</p>
            </Link>
          </div>
          <div className="dropdown-item">
            <Link to="/market">Equity (ETFs)</Link>
          </div>
        </li>
      </ul>
    </div>
    <div className="stockmenu-column">
      <ul>
        <li>
          <div className="dropdown-item">
            <Link to="/bestgrowthregular">
              Best Growth Fund
              <p>Focus on high-potential growth.</p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/flexregular">
              Best Flex Cap Fund
              <p>Invest in companies poised for future and today's growth.</p>
            </Link>
          </div>
        </li>
        <li>
          <div className="dropdown-item">
            <Link to="/etfregular">
              Best ETF Fund
              <p>Diverse and cost-effective investment strategy.</p>
            </Link>
          </div>
          <div className="dropdown-item">
            <Link to="/gold"> Gold (ETFs)</Link>
          </div>
        </li>
      </ul>
    </div>
  </div>
);

const Landingnavbar = () => {
  // State for different dropdowns
  const [dropdowns, setDropdowns] = useState({
    stock: false,
    user: false,
    footerStock: false,
    portfolio: false,
    mutualFunds: false,
    footerMutualFunds: false,
    footerPortfolio: false,
    learn: false,
  });

  const [searchInputText, setSearchInputText] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [isLogedin, setIsLogedin] = useState(false);

  // Refs for handling click outside
  const dropdownRefs = {
    footerPortfolio: useRef(null),
    footerMutualFunds: useRef(null),
    stock: useRef(null),
    user: useRef(null),
    footerStock: useRef(null),
    portfolio: useRef(null),
    mutualFunds: useRef(null),
    learn: useRef(null),
  };

  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Getting data from redux store
  const getDataFromStore = useSelector((store) => store.searchData.searchData);

  // Toggle dropdown functions
  const toggleDropdown = (dropdown) => {
    setDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  // API Call for search data
  const getAllData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/search/allInfo`);
      const data = await response.json();
      dispatch(setSearchData(data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  // Debounced search function
  console.log(getDataFromStore);
  const debounceSearch = useCallback(
    debounce((searchText) => {
      if (searchText) {
        const results = getDataFromStore.filter((item) => {
          const companyName = item.name ? item.name.toLowerCase() : "";
          const schemeName = item.Scheme_Name
            ? item.Scheme_Name.toLowerCase()
            : "";
          const sector = item.sector ? item.sector.toLowerCase() : "";
          const symbol = item.symbol ? item.symbol.toLowerCase() : "";

          return (
            companyName.includes(searchText.toLowerCase()) ||
            schemeName.includes(searchText.toLowerCase()) ||
            sector.includes(searchText.toLowerCase()) ||
            symbol.includes(searchText.toLowerCase())
          );
        });
        setFilterData(results);
      } else {
        setFilterData([]);
      }
    }, 300),
    [getDataFromStore]
  );

  const onLogout= ()=>{
    localStorage.clear()
    Cookies.remove('jwtToken', { path: '/' })
    setIsLogedin(false)
    navigate('/login')

    
  }


  // Get all data on component mount
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    const isTokenExpired = (token) => {
      if (!token) return true; // If no token, consider it expired
    
      try {
        const { exp } = jwtDecode(token);
        if (!exp) return true; // If no expiration time, consider expired
    
        return exp * 1000 < Date.now(); // Compare expiry time with current time
      } catch (error) {
        return true; // If token is invalid, consider it expired
      }
    };
    if (token) {
      if (isTokenExpired(token)){
        onLogout()
        setIsLogedin(false);
      }else{
        setIsLogedin(true);
      }
      
      //setIsLogedin(true);
    }
    getAllData();
  }, []);

  // Apply debounced search when input changes
  useEffect(() => {
    debounceSearch(searchInputText);
    return () => debounceSearch.cancel();
  }, [searchInputText, debounceSearch]);

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.entries(dropdownRefs).forEach(([key, ref]) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setDropdowns((prev) => ({
            ...prev,
            [key]: false,
          }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className={darkMode ? "darkmodenavbar" : "navbar"}>
        <div className="navbar-logo">
          <img
            src={darkMode ? Darkmodelogo : logo}
            alt="FinanceShastra Logo"
            className={darkMode ? "logo-darkimage" : "logo-image"}
          />
        </div>

        <ul className={darkMode ? "navbar-linksdarkerrrrmode" : "navbar-links"}>
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li
            className="stock-dropdown"
            ref={dropdownRefs.stock}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, stock: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, stock: false }))
            }
          >
            <Link to="#" onClick={() => toggleDropdown("stock")}>
              Stocks
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.stock && <StockDropdownMenu />}
          </li>

          <li
            className="mutualfunds-dropdown"
            ref={dropdownRefs.mutualFunds}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, mutualFunds: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, mutualFunds: false }))
            }
          >
            <Link to="#" onClick={() => toggleDropdown("mutualFunds")}>
              Mutual Funds
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.mutualFunds && <MutualFundsDropdownMenu />}
          </li>

          <li
            className="learn-dropdown"
            ref={dropdownRefs.learn}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, learn: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, learn: false }))
            }
          >
            <Link to="#" onClick={() => toggleDropdown("learn")}>
              Learn & Insights
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.learn && <LearnDropdownMenu />}
          </li>

          <li
            className="portfolio-dropdown"
            ref={dropdownRefs.portfolio}
            onMouseEnter={() =>
              setDropdowns((prev) => ({ ...prev, portfolio: true }))
            }
            onMouseLeave={() =>
              setDropdowns((prev) => ({ ...prev, portfolio: false }))
            }
          >
            <Link to="#" onClick={() => toggleDropdown("portfolio")}>
              Portfolio Manager
              <FaChevronDown className="chevron-icon" />
            </Link>
            {dropdowns.portfolio && <PortfolioDropdownMenu />}
          </li>
        </ul>

        <div className={darkMode ? "navbar-darksearch" : "navbar-search"}>
          <input
            type="text"
            placeholder="Search for Stocks, Mutual..."
            value={searchInputText}
            onChange={(e) => setSearchInputText(e.target.value)}
          />
          <FaSearch
            className={darkMode ? "searchdarkicon" : "search-icon"}
            style={darkMode ? { color: "white" } : {}}
          />
          {/* show search results  */}
          <div>
            {filterData.length > 0 ? (
              <ul>
                {filterData.map((data) => {
                  return (
                    <li key={data.id}>
                      {data.name} {data.Scheme_Name} {data.sector} {data.symbol}
                    </li>
                  );
                })}
              </ul>
            ) : (
              searchInputText && <p>No result found</p>
            )}
          </div>
        </div>
        {isLogedin ? (
          <div className="landingnavbar-icons">
            <VscBell className="landingnavbaricon bell-icon" />
            <button
              className="landingnavbar-buttonlogin-button"
              onClick={onLogout}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="landingnavbar-icons">
            
            <button
              className="landingnavbar-buttonregister-button"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="landingnavbar-buttonlogin-button"
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </div>
        )}
      </nav>

      <ul className="footer-nav">
        <li>
          <Link to="/home" className="footer-link">
            <div className="footer-item">
              <i className="footer-icon">
                <RiHome5Fill />
              </i>
              <span>Home</span>
            </div>
          </Link>
        </li>

        <li className="stock-dropdown" ref={dropdownRefs.footerStock}>
          <Link
            to="#"
            onClick={() => toggleDropdown("footerStock")}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <LuChartNoAxesCombined />
              </i>
              <span>Stocks</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </Link>
          {dropdowns.footerStock && <StockDropdownMenu />}
        </li>

        <li className="portfolio-dropdown" ref={dropdownRefs.footerPortfolio}>
          <Link
            to="#"
            onClick={() => toggleDropdown("footerPortfolio")}
            className="footer-link"
          >
            <div className="footer-item selected">
              <i className="footerportfolio-icon">
                <RiBriefcase4Line />
              </i>
              <span>Portfolio</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </Link>
          {dropdowns.footerPortfolio && <PortfolioDropdownMenu />}
        </li>

        <li
          className="mutualfunds-dropdown"
          ref={dropdownRefs.footerMutualFunds}
        >
          <Link
            to="#"
            onClick={() => toggleDropdown("footerMutualFunds")}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <PiHandCoins />
              </i>
              <span>MFs</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </Link>
          {dropdowns.footerMutualFunds && <MutualFundsDropdownMenu />}
        </li>

        <li>
          <Link to="/learn" className="footer-link">
            <div className="footer-item">
              <i className="footer-icon">
                <SlBookOpen />
              </i>
              <span>Learn</span>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Landingnavbar;

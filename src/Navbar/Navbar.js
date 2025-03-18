import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from "react";
import { DarkModeContext } from "../Portfoilo/context/DarkModeContext";
import { UserProfileContext } from "../Portfoilo/context/UserProfileContext";

import {
  FaBell,
  FaUserCircle,
  FaSearch,
  FaChevronDown,
  FaUser,
} from "react-icons/fa";
import { FaCircleQuestion } from "react-icons/fa6";
import "./Navbar.css";
import { PiHandCoins } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { RiHome5Fill } from "react-icons/ri"; // Home Icon
import { SlBookOpen } from "react-icons/sl"; // Book Icon
import { RiBriefcase4Line } from "react-icons/ri";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { LuDot } from "react-icons/lu";
import notiimg1 from "../assest/fst1.webp";
import notiimg2 from "../assest/mobile.png";
import notiimg3 from "../assest/letter.png";
import notiimg4 from "../assest/girl.jpg";
import notiimg5 from "../assest/mm.jpeg";
import notiimg6 from "../assest/smartphone.png";
import notiimg7 from "../assest/video.png";
import notiimg8 from "../assest/ipoo.webp";
import notiimg9 from "../assest/images.jpg";
import notiimg10 from "../assest/portra.webp";
import Cookies from "js-cookie";
import logo from "../assest/Logo design (1).png";
import Darkmodelogo from "../assest/navlogo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { API_BASE_URL } from "../config";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { user } = useContext(UserProfileContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [stockDropdownOpen, setStockDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [footerStockDropdownOpen, setFooterStockDropdownOpen] = useState(false);
  const [portfolioDropdownOpen, setPortfolioDropdownOpen] = useState(false);
  const [mutualFundsDropdownOpen, setMutualFundsDropdownOpen] = useState(false);
  const [searchInputText, setSearchInputText] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [footerMutualFundsDropdownOpen, setFooterMutualFundsDropdownOpen] =
    useState(false);
  const [footerPortfolioDropdownOpen, setFooterPortfolioDropdownOpen] =
    useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);

  const dropdownRef = useRef(null); // Reference for dropdown


  // Get search data from Redux store
  const searchData = useSelector((store) => store.searchData.searchData);

  const notifications = [
    {
      id: 1,
      img: notiimg1,
      title: "Upcoming Quadrant Future Tek IPO analysis",
      date: "Yesterday 11:15 AM",
    },

  
    {
      id: 4,
      img: notiimg4,
      title: "Sara commented on blog",
      date: "01 Jan, 2025 08:15 AM",
    },
    {
      id: 5,
      img: notiimg5,
      title: "Lucas commented on sanathans IPO",
      date: "28 Nov, 2024 11:15 AM",
    },
  
    {
      id: 7,
      img: notiimg7,
      title: "New courses available",
      date: "08 Nov, 2024 10:30 PM",
    },
    {
      id: 8,
      img: notiimg8,
      title: "Upcoming Laxmi Dental IPO",
      date: "05 Nov, 2024 09:03 AM",
    },
    {
      id: 9,
      img: notiimg9,
      title: "Your profile picture updated successfully.",
      date: "27 Oct, 2024 02:23 PM",
    },
    {
      id: 10,
      img: notiimg10,
      title: "Upcoming IGI IPO",
      date: "25 Oct, 2024 08:48 AM",
    },
    
    
    {
      id: 13,
      img: notiimg4,
      title: "Sara commented on blog",
      date: "01 Jan, 2025 08:15 AM",
    },
    {
      id: 14,
      img: notiimg5,
      title: "Lucas commented on sanathans IPO",
      date: "28 Nov, 2024 11:15 AM",
    },
 
  ];

  const displayedNotifications = showAll
    ? notifications
    : notifications.slice(0, 10);

  const footerPortfolioDropdownRef = useRef(null);
  const footerMutualFundsDropdownRef = useRef(null);
  const stockDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);
  const footerStockDropdownRef = useRef(null);
  const portfolioDropdownRef = useRef(null);
  const mutualFundsDropdownRef = useRef(null);
  const learnDropdownRef = useRef(null);
  const searchResultsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  // Debounced search function that only filters existing data from Redux
  const debouncedSearch = useCallback(
    debounce((searchText) => {
      if (!searchText.trim()) {
        setFilterData([]);
        return;
      }

      const lowerSearchText = searchText.toLowerCase().trim();

      // Filter data from Redux without additional API calls
      const results = searchData.filter((item) => {
        const company = (item.company || "").toLowerCase();
        const schemeName = (item.Scheme_Name || "").toLowerCase();
        const sector = (item.sector || "").toLowerCase();
        const symbol = item.symbol ? item.symbol.toLowerCase() : "";

        return (
          company.includes(lowerSearchText) ||
          schemeName.includes(lowerSearchText) ||
          sector.includes(lowerSearchText) ||
          symbol.includes(lowerSearchText)
        );
      });

      setFilterData(results);
    }, 300),
    [searchData] // Only depend on searchData from Redux
  );

  // Handle search input changes
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchInputText(value);
    debouncedSearch(value);
  };

  // Close search results when clicking outside
  useEffect(() => {
    
    const token = Cookies.get("jwtToken");
    if (!token) {
      alert("Session expired, Please login again.");
      navigate("/login");
      return;
    }
    const handleClickOutside = (event) => {
      if (
        searchResultsRef.current &&
        !searchResultsRef.current.contains(event.target) &&
        !event.target.closest(".navbar-search")
      ) {
        setFilterData([]);
        setSearchInputText("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        stockDropdownRef.current &&
        !stockDropdownRef.current.contains(event.target)
      ) {
        setStockDropdownOpen(false);
      }
      if (
        mutualFundsDropdownRef.current &&
        !mutualFundsDropdownRef.current.contains(event.target)
      ) {
        setMutualFundsDropdownOpen(false);
      }
      if (
        footerMutualFundsDropdownRef.current &&
        !footerMutualFundsDropdownRef.current.contains(event.target)
      ) {
        setFooterMutualFundsDropdownOpen(false);
      }
      if (
        footerStockDropdownRef.current &&
        !footerStockDropdownRef.current.contains(event.target)
      ) {
        setFooterStockDropdownOpen(false);
      }
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setUserDropdownOpen(false);
      }
      if (
        portfolioDropdownRef.current &&
        !portfolioDropdownRef.current.contains(event.target)
      ) {
        setPortfolioDropdownOpen(false);
      }
      if (
        footerPortfolioDropdownRef.current &&
        !footerPortfolioDropdownRef.current.contains(event.target)
      ) {
        setFooterPortfolioDropdownOpen(false);
      }
      if (
        learnDropdownRef.current &&
        !learnDropdownRef.current.contains(event.target)
      ) {
        setLearnDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cleanup debounced function on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const onLogout = ()=>{
    Cookies.remove('jwtToken')
    localStorage.clear()
    navigate('/')
  }

  const toggleStockDropdown = () => {
    setStockDropdownOpen(!stockDropdownOpen);
  };

  const toggleFooterStockDropdown = () => {
    setFooterStockDropdownOpen(!footerStockDropdownOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const toggleMutualFundsDropdown = () => {
    setMutualFundsDropdownOpen(!mutualFundsDropdownOpen);
  };

  const toggleFooterMutualFundsDropdown = () => {
    setFooterMutualFundsDropdownOpen(!footerMutualFundsDropdownOpen);
  };

  const togglePortfolioDropdown = () => {
    setPortfolioDropdownOpen(!portfolioDropdownOpen);
  };

  const toggleFooterPortfolioDropdown = () => {
    setFooterPortfolioDropdownOpen(!footerPortfolioDropdownOpen);
  };

  const togglelearnDropdown = () => {
    setLearnDropdownOpen(!learnDropdownOpen);
  };

  const renderStockDropdown = () => (
    <div className={darkMode ? "stockmenudarkerrrrmode" : "stockmenu"}>
      <div
        className={
          darkMode ? "stockmenu-columndarkerrrrmode" : "stockmenu-column"
        }
      >
        <ul>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
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
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
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
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
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
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/nifty50pageall">
                Nifty 50 Companies
                <p>
                  Track the top 50 companies listed on the National Stock
                  Exchange of India.
                </p>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="stockmenu-column">
        <ul>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/nifty">
                Nifty 100 Companies
                <p>
                  Explore all 500 companies listed on the Nifty index to
                  diversify your portfolio.
                </p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/smallcap">
                Small Cap
                <p>
                  Invest in smaller companies with high potential for growth.
                </p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/midcap">
                Mid Cap
                <p>
                  Discover mid-sized companies with a strong growth trajectory.
                </p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/largecap">
                Large Cap
                <p>
                  Focus on large, established companies with stable returns.
                </p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/bankSectorThemePagelock">
                Stock Themes
                <p>Research is key before buying any stock</p>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderPortfolioDropdown = () => (
    <div className={darkMode ? "learn-menudarkerrrrmode" : "dropdown-menu"}>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/portfolio">
          My Portfolio
          <p>Your financial navigator</p>
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/portfolio-risk">
          Portfolio Risk Analysis
          <p>Risk evaluation and insights(coming soon)</p>
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/stockWatchlist">
          Watchlist
          <p>Monitor, assess, and improve</p>
        </Link>
      </div>
    </div>
  );

  const renderlearnDropdown = () => (
    <div className={darkMode ? "learn-menudarkerrrrmode" : "learn-menu"}>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/stockNewsComponent">
          Stock News
          <p>Discover what's happening in the stock markets in real-time</p>
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/blogsComponent">
          Blogs
          <p>Investment Knowledge Hub</p>
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/ipoComponent">
          IPO Details
          <p>Key Information on the Latest IPO Trends</p>
        </Link>
      </div>

      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/earningsInsightLearn">
          Quarterly Earnings
          <p>Monitor thorough quarterly earnings summaries</p>
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/learncard">
          Learn
          <p>
            {" "}
            Knowledge is the key to successful trading—learn, adapt, and grow
          </p>
        </Link>
      </div>
    </div>
  );

  const renderUserDropdown = () => (
    <div className={darkMode ? "user-menudarkerrmode" : "user-menu"}>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/userDetailsupdate">
          <FaUser
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          My Profile
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <Link to="/help">
          <FaCircleQuestion
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          Help Center
        </Link>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <button className="butn" onClick={onLogout} type="button">
          <FaUserCircle
            className={darkMode ? "dropdown-icondarkerrrmode" : "dropdown-icon"}
          />
          Logout
        </button>
      </div>
      <div className={darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"}>
        <div onClick={toggleDarkMode} style={{ cursor: "pointer" }}>
          Dark Mode
        </div>
      </div>
    </div>
  );

  const renderMutualFundsDropdown = () => (
    <div
      className={darkMode ? "mutualstockmenudarkerrrrmode" : "mutualstockmenu"}
    >
      <div className="stockmenu-column">
        <ul>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/mutualfund">
                Top Rated Funds
                <p>Focus on risk management and long-term growth.</p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/fundscreenerregular">
                Fund Screener
                <p>Efficient filter and compare investment options.</p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/bestsmallcapregular">
                Best Small Cap Fund
                <p>Strong returns by investing in high-growth opportunities.</p>
              </Link>
            </div>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/market">Equity (ETFs)</Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="stockmenu-column">
        <ul>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/bestgrowthregular">
                Best Growth Fund
                <p>Focus on high-potential growth.</p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/flexregular">
                Best Flex Cap Fund
                <p>Invest in companies poised for future and today's growth.</p>
              </Link>
            </div>
          </li>
          <li>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/etfregular">
                Best ETF Fund
                <p>Diverse and cost-effective investment strategy.</p>
              </Link>
            </div>
            <div
              className={
                darkMode ? "dropdown-itemdarkerrmode" : "dropdown-item"
              }
            >
              <Link to="/gold"> Gold (ETFs)</Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );

  const navigate = useNavigate();

  return (
    <>
      <nav className={darkMode ? "navbardarkerrrrmode" : "navbar"}>
        <div className="navbar-logo">
          <img
            src={`${darkMode ? Darkmodelogo : logo}`}
            alt="FinanceShastra Logo"
            onClick={() => navigate("/")}
            className="logo-image"
            style={{ cursor: "pointer" }}
          />
        </div>

        <ul className={darkMode ? "navbar-linksdarkerrrrmode" : "navbar-links"}>
          <li>
            <Link to="/home">Home</Link>
          </li>

          <li
            className="stock-dropdown"
            ref={stockDropdownRef}
            onMouseEnter={() => setStockDropdownOpen(true)}
            onMouseLeave={() => setStockDropdownOpen(false)}
          >
            <Link to="#" onClick={toggleStockDropdown}>
              Stocks
              <FaChevronDown className="chevron-icon" />
            </Link>
            {stockDropdownOpen && renderStockDropdown()}
          </li>
          <li
            className="mutualfunds-dropdown"
            ref={mutualFundsDropdownRef}
            onMouseEnter={() => setMutualFundsDropdownOpen(true)}
            onMouseLeave={() => setMutualFundsDropdownOpen(false)}
          >
            <Link to="#" onClick={toggleMutualFundsDropdown}>
              Mutual Funds
              <FaChevronDown className="chevron-icon" />
            </Link>
            {mutualFundsDropdownOpen && renderMutualFundsDropdown()}
          </li>

          <li
            className="learn-dropdown"
            ref={learnDropdownRef}
            onMouseEnter={() => setLearnDropdownOpen(true)}
            onMouseLeave={() => setLearnDropdownOpen(false)}
          >
            <Link to="#" onClick={togglelearnDropdown}>
              Learn & Insights
              <FaChevronDown className="chevron-icon" />
            </Link>
            {learnDropdownOpen && renderlearnDropdown()}
          </li>
          <li
            className="portfolio-dropdown"
            ref={portfolioDropdownRef}
            onMouseEnter={() => setPortfolioDropdownOpen(true)}
            onMouseLeave={() => setPortfolioDropdownOpen(false)}
          >
            <Link to="#" onClick={togglePortfolioDropdown}>
              Portfolio Manager
              <FaChevronDown className="chevron-icon" />
            </Link>
            {portfolioDropdownOpen && renderPortfolioDropdown()}
          </li>
        </ul>

        <div className={darkMode ? "navbar-search" : "navbar-search"}>
          <input
            type="text"
            placeholder="Search for Stocks, Mutual..."
            value={searchInputText}
            onChange={handleSearchInputChange}
          />
          <FaSearch
            className={darkMode ? "searchdarkerrrmodeicon" : "search-icon"}
          />

          {/* Show results only when there is input */}
          {searchInputText && (
            <div
              ref={searchResultsRef}
              className={`search-resultswatchlistsector ${
                filterData.length > 0 ? "active" : ""
              }`}
            >
              {filterData.length > 0 ? (
                <ul>
                  {filterData.map((data, index) => (
                    <li key={data.id || index}>
                      {data.name || ""} {data.Scheme_Name || ""}{" "}
                      {data.sector || ""} {data.symbol || ""}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No result found</p>
              )}
            </div>
          )}
        </div>

        <h4 className="subscritebutton" onClick={() => navigate("/pricehalf")}>
          Subscribe
        </h4>
        <div className="navbar-icons">
          <div className="notificationall"ref={dropdownRef}>
            {/* Bell Icon */}
            <FaBell
              className={
                darkMode ? "icon bell-darkerrmodeicon" : "icon bell-icon"
              }
              onClick={() => setIsOpen(!isOpen)}
            />

            {/* Dropdown Content */}
            {isOpen && (
              <div className="dropdown-contentnoti">
                {displayedNotifications.map((notif) => (
                  <div key={notif.id} className="notification-card">
                    <div className="notification-header">
                      <div className="notificationall-header">
                        <div>
                          <img
                            src={notif.img}
                            alt="Notification"
                            className="notification-img"
                          />
                        </div>
                      </div>
                      <div className="notification-details">
                        <p className="notification-title">{notif.title}</p>
                        <p className="notification-date">{notif.date}</p>
                      </div>
                      <LuDot className="dotnotifyicon" />
                    </div>
                  </div>
                ))}

                {/* View All Button */}
                {!showAll && (
                  <button className="view-all" onClick={() => setShowAll(true)}>
                    View all notifications
                  </button>
                )}
              </div>
            )}
          </div>
          <div className={darkMode ? "psectiondarkmode" : "profile-section"}>
            <li className="" ref={userDropdownRef}>
              <Link to="#" onClick={toggleUserDropdown}>
                <FaUserCircle
                  className={
                    darkMode ? "iconuser-darkerrmodeicon" : "iconuser-icon"
                  }
                />
              </Link>
              <span className={darkMode ? "willamnamedarkmode" : "willamname"}>
                {user}
              </span>
              {userDropdownOpen && renderUserDropdown()}
            </li>
          </div>
        </div>
      </nav>

      <ul className="footer-nav">
        <li>
          <a href="/home" className="footer-link">
            <div className="footer-item">
              <i className="footer-icon">
                <RiHome5Fill />
              </i>
              <span>Home</span>
            </div>
          </a>
        </li>
        <li className="stock-dropdown" ref={footerStockDropdownRef}>
          <a
            href="#"
            onClick={toggleFooterStockDropdown}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <LuChartNoAxesCombined />
              </i>
              <span>Stocks</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </a>
          {footerStockDropdownOpen && renderStockDropdown()}
        </li>
        <li className="portfolio-dropdown" ref={footerPortfolioDropdownRef}>
          <a
            href="#"
            onClick={toggleFooterPortfolioDropdown}
            className="footer-link"
          >
            <div className="footer-item selected">
              <i className="footerportfolio-icon">
                <RiBriefcase4Line />
              </i>
              <span>Portfolio</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </a>
          {footerPortfolioDropdownOpen && renderPortfolioDropdown()}
        </li>
        <li className="mutualfunds-dropdown" ref={footerMutualFundsDropdownRef}>
          <a
            href="#"
            onClick={toggleFooterMutualFundsDropdown}
            className="footer-link"
          >
            <div className="footer-item">
              <i className="footer-icon">
                <PiHandCoins />
              </i>
              <span>MFs</span>
              <FaChevronDown className="chevron-icon" />
            </div>
          </a>
          {footerMutualFundsDropdownOpen && renderMutualFundsDropdown()}
        </li>
        <li>
          <a href="/learn" className="footer-link">
            <div className="footer-item">
              <i className="footer-icon">
                <SlBookOpen />
              </i>
              <span>Learn</span>
            </div>
          </a>
        </li>
      </ul>
    </>
  );
};

export default Navbar;

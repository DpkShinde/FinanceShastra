import React, { useCallback, useEffect, useState,useContext } from "react";
import "./LandingPageUnlockInvest.css";
import landingimg1 from "../../assest/landingimg1.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { setSearchData } from "../../Store/Slices/searchDataSlice";
import { debounce } from "lodash";
import { API_BASE_URL } from "../../config";
import { DarkModeContext } from "../../Portfoilo/context/DarkModeContext";

const LandingPageUnlockInvest = () => {
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const [searchInputText, setSearchInputText] = useState("");
  const [filterData, setFilterData] = useState([]);

  const dispatch = useDispatch();
  // getting data from redux store
  const getDataFromStore = useSelector((store) => store.searchData.searchData);

  //Api Call for getAll Data Related search Option
  const getAllData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/search/allInfo`, {
        method: "GET"
      });
      const data = await response.json();

      //store all data into the redux store
      dispatch(setSearchData(data?.data || []));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //Function Call for All data
    getAllData();
  }, []);

  //Search data from store with using debounce
  const debounceSearch = useCallback(
    debounce((searchText) => {
      // Check if searchText is not empty
      if (searchText) {
        // Filter the data from the store based on searchText
        const results = getDataFromStore.filter((item) => {
          // Convert company, Scheme_Name, and sector to lowercase for case-insensitive comparison
          const company = item.company ? item.company.toLowerCase() : "";
          const schemeName = item.Scheme_Name
            ? item.Scheme_Name.toLowerCase()
            : "";
          const sector = item.sector ? item.sector.toLowerCase() : "";

          return (
            // Check if searchText is included in any of the fields
            company.includes(searchText.toLowerCase()) ||
            schemeName.includes(searchText.toLowerCase()) ||
            sector.includes(searchText.toLowerCase())
          );
        });
        // Update the filtered data state with the results
        setFilterData(results);
      } else {
        // If searchText is empty, clear the filtered data
        setFilterData([]);
      }
    }, 300),
    [getDataFromStore] // Dependency array for useCallback
  );

  // Effect to call the debounced function when input changes
  useEffect(() => {
    // Call the debounced search function with the current searchInputText
    debounceSearch(searchInputText);
    // Cleanup function to cancel the debounced function to prevent unnecessary calls
    return () => debounceSearch.cancel();
  }, [searchInputText, debounceSearch]);

  return (
    <div className={darkMode ? "landingpageunlockinvestdarkcontainer" :"landingpageunlockinvest-container"}>
      <div className="landingpageunlockinvest-background">
        {/* Left Side Content */}
        <div className="landingpageunlockinvest-content">
          <div className="landingpageunlockinvestheadingsearchall">
            <h1 className="landingpageunlockinvest-heading">
              Unlock your Investing with <span>Financeshastra.</span>
            </h1>
            <div className="landingpageunlockinvest-searchbar">
              <input
                type="text"
                placeholder="Search for Stocks, Mutual..."
                className={darkMode ? "landingpageunlockinvestdarkinput" :"landingpageunlockinvest-input"}
                onChange={(e) => setSearchInputText(e.target.value)}
              />
              {/* to display result */}
              <div>
                {filterData.length > 0 ? (
                  <ul>
                    {filterData.map((data) => {
                      return (
                        <li key={data.id}>
                          {data.company} {data.Scheme_Name} {data.sector}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  searchInputText && <p>No result found</p>
                )}
              </div>
            </div>

            <button className="landingpageunlockinvest-button">
              Explore now
            </button>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="landingpageunlockinvest-illustration">
          <img
            src={landingimg1}
            alt="Finance Chart Illustration"
           className={darkMode ? "landingpageunlockinvestdarkimage" :"landingpageunlockinvest-image"}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageUnlockInvest;

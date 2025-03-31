import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css"; // Import FontAwesome CSS
import Navbar from "../../Navbar/Navbar";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import './Mutualfundwatchlistportfolio.css'
import Cookies from 'js-cookie'
import { API_BASE_URL } from "../../config";
import Sidebar from "../../Sidebar/Sidebar";

const MutualWatchlist = ({ children }) => {
  const navigate = useNavigate();
  const getStockData = useSelector((store) => store?.searchData?.searchData || []);

  // Refs for popup containers
  const renamePopupRef = useRef(null);
  const deletePopupRef = useRef(null);
  const deleteWatchlistPopupRef = useRef(null);
  const dropdownRefs = useRef([]);

  // State management
  const [stockInput, setStockInput] = useState({
    name: "",
    selected: null,
    filterResults: []
  });

  const [watchlistState, setWatchlistState] = useState({
    list: [],
    selected: null,
    stockDetails: []
  });

  const [uiState, setUiState] = useState({
    activeDropdown: null,
    renamePopup: false,
    renameIndex: null,
    newWatchlistName: "",
    deletePopup: false,
    deleteIndex: null,
    deleteWatchlistPopup: false,
    activeFilter: "All"
  });

  // Fetch watchlists
  const fetchWatchlists = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/getMutualWatchlists`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      setWatchlistState(prev => ({
        ...prev,
        list: data,
        selected: prev.selected || data[0]?.watchlist_id
      }));
    } catch (error) {
      alert(error.message || "Failed to fetch watchlists.");
    }
  };

  // Fetch watchlist assets
  const fetchWatchlistAssets = useCallback(async () => {
    if (!watchlistState.selected) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/getmutualsAssets?watchlist_id=${watchlistState.selected}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      setWatchlistState(prev => ({
        ...prev,
        stockDetails: data
      }));
    } catch (error) {
      alert(error.message || "Failed to fetch watchlist assets.");
    }
  }, [watchlistState.selected]);

  // Handle stock search
  const debounceSearch = useCallback(
    debounce((searchText) => {
      setStockInput(prev => ({
        ...prev,
        filterResults: searchText
          ? getStockData.filter((item) =>
            item.Scheme_Name?.toLowerCase().includes(searchText.toLowerCase())
          )
          : []
      }));
    }, 300),
    [getStockData]
  );

  // Handle stock selection from search results
  const handleSelectStock = (stock) => {
    setStockInput({
      name: stock.Scheme_Name,
      selected: stock,
      filterResults: []
    });
  };

  // Handle stock name input change
  const handleStockNameChange = (event) => {
    setStockInput(prev => ({
      ...prev,
      name: event.target.value
    }));
  };

  // Add stock to watchlist
  const handleAddStock = async () => {
    if (!stockInput.name.trim()) {
      alert("Scheme name cannot be empty!");
      return;
    }

    const schemeName = stockInput.name;

    if (watchlistState.stockDetails.some((stock) => stock.scheme_name === schemeName)) {
      alert("This scheme is already in your watchlist.");
      return;
    }

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/addMutualToWatchklist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          scheme_name: schemeName,
          watchlist_id: watchlistState.selected,
          asset_type: "Mutual",
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const newStock = await response.json();

      setWatchlistState(prev => ({
        ...prev,
        stockDetails: [
          ...prev.stockDetails,
          { ...newStock, scheme_name: schemeName }
        ]
      }));

      setStockInput(prev => ({
        ...prev,
        name: "",
        selected: null
      }));
    } catch (error) {
      alert(error.message || "Failed to add mutual fund.");
    }
  };

  // Create new watchlist
  const handleCreateWatchlist = async () => {
    // Find the highest number in existing watchlist names
    const existingNumbers = watchlistState.list
      .map(watchlist => {
        const match = watchlist.name.match(/My Watchlist (\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      })
      .filter(num => !isNaN(num));

    // Get the highest number and add 1, or start at 1 if no numbered watchlists exist
    const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
    const newWatchlistName = `My Watchlist ${nextNumber}`;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/CreateMutualWatchList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newWatchlistName }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      const newWatchlist = await response.json();

      setWatchlistState(prev => ({
        ...prev,
        list: [...prev.list, newWatchlist],
        selected: newWatchlist.watchlist_id
      }));
    } catch (error) {
      alert(error.message || "Error creating watchlist");
    }
  };

  // Delete watchlist
  const handleDeleteWatchlist = async () => {
    if (!uiState.deleteWatchlistId) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/deleteMutualWatchlist?watchlist_id=${uiState.deleteWatchlistId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      setWatchlistState(prev => {
        // Filter out the deleted watchlist
        const updatedList = prev.list.filter(watchlist => watchlist.watchlist_id !== uiState.deleteWatchlistId);

        // If we're deleting the currently selected watchlist, select another one
        let newSelectedId = prev.selected;
        if (prev.selected === uiState.deleteWatchlistId) {
          // Find the index of the deleted watchlist in the original list
          const deletedIndex = prev.list.findIndex(w => w.watchlist_id === uiState.deleteWatchlistId);
          // If available, select the next watchlist in the list
          // Otherwise select the previous one, or the first in the list as last resort
          newSelectedId = updatedList[deletedIndex] ?
            updatedList[deletedIndex].watchlist_id :
            updatedList[Math.max(0, deletedIndex - 1)]?.watchlist_id ||
            updatedList[0]?.watchlist_id;
        }

        return {
          ...prev,
          list: updatedList,
          selected: newSelectedId,
          stockDetails: newSelectedId ? prev.stockDetails : []
        };
      });

      setUiState(prev => ({
        ...prev,
        deleteWatchlistPopup: false,
        deleteWatchlistId: null
      }));
    } catch (error) {
      alert(error.message || "Failed to delete watchlist.");
    }
  };

  // Rename watchlist
  const handleRenameWatchlist = (watchlistId) => {
    const watchlist = watchlistState.list.find(w => w.watchlist_id === watchlistId);

    setUiState(prev => ({
      ...prev,
      renameIndex: watchlistId,
      newWatchlistName: watchlist?.name || "",
      renamePopup: true,
      activeDropdown: null // Close dropdown when opening popup
    }));
  };

  const handleRenameConfirm = async () => {
    if (!uiState.newWatchlistName.trim()) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/renameMutualWatchlist`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          watchlist_id: uiState.renameIndex,
          name: uiState.newWatchlistName
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      setWatchlistState(prev => ({
        ...prev,
        list: prev.list.map(w =>
          w.watchlist_id === uiState.renameIndex
            ? { ...w, name: uiState.newWatchlistName }
            : w
        )
      }));

      setUiState(prev => ({
        ...prev,
        renamePopup: false,
        renameIndex: null
      }));
    } catch (error) {
      console.error("Rename error:", error);
      alert(error.message || "Failed to rename watchlist.");
    }
  };

  // Delete stock from watchlist
  const handleDeleteStock = (index) => {
    setUiState(prev => ({
      ...prev,
      deleteIndex: index,
      deletePopup: true
    }));
  };

  // Confirm stock deletion
  const confirmDeleteStock = async () => {
    if (uiState.deleteIndex === null) return;

    const stockToDelete = watchlistState.stockDetails[uiState.deleteIndex];

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/removeMutualFromWatchlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          watchlist_id: watchlistState.selected,
          scheme_name: stockToDelete.scheme_name
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Failed with status: ${response.status}`);
      }

      setWatchlistState(prev => ({
        ...prev,
        stockDetails: prev.stockDetails.filter((_, i) => i !== uiState.deleteIndex)
      }));

      setUiState(prev => ({
        ...prev,
        deletePopup: false,
        deleteIndex: null
      }));
    } catch (error) {
      alert(error.message || "Failed to delete mutual fund.");
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = (index) => {
    setUiState(prev => ({
      ...prev,
      activeDropdown: prev.activeDropdown === index ? null : index
    }));
  };

  // Set watchlist selection
  const selectWatchlist = (watchlistId) => {
    setWatchlistState(prev => ({
      ...prev,
      selected: watchlistId
    }));
  };

  // Set active filter
  const setActiveFilter = (filter) => {
    setUiState(prev => ({
      ...prev,
      activeFilter: filter
    }));
  };

  // Close popups when clicking outside
  const handleClickOutside = useCallback((event) => {
    // Handle rename popup
    if (
      renamePopupRef.current &&
      !renamePopupRef.current.contains(event.target)
    ) {
      setUiState((prev) => ({ ...prev, renamePopup: false }));
    }

    // Handle delete stock popup
    if (
      deletePopupRef.current &&
      !deletePopupRef.current.contains(event.target)
    ) {
      setUiState((prev) => ({ ...prev, deletePopup: false }));
    }

    // Handle delete watchlist popup
    if (
      deleteWatchlistPopupRef.current &&
      !deleteWatchlistPopupRef.current.contains(event.target)
    ) {
      setUiState((prev) => ({ ...prev, deleteWatchlistPopup: false }));
    }

    // Handle dropdown menus
    if (uiState.activeDropdown !== null) {
      const activeDropdownElement =
        dropdownRefs.current[uiState.activeDropdown];
      if (
        activeDropdownElement &&
        !activeDropdownElement.contains(event.target)
      ) {
        setUiState((prev) => ({ ...prev, activeDropdown: null }));
      }
    }
  }, []);

  // Effects
  useEffect(() => {
    fetchWatchlists();
  }, []);

  useEffect(() => {
    debounceSearch(stockInput.name);
    return () => debounceSearch.cancel();
  }, [stockInput.name, debounceSearch]);

  useEffect(() => {
    fetchWatchlistAssets();
  }, [watchlistState.selected, fetchWatchlistAssets]);

  // Add click outside event listener
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // UI Components
  const RenamePopup = () => {
    const [localName, setLocalName] = useState(uiState.newWatchlistName);

    const handleSave = () => {
      setUiState(prev => ({ ...prev, newWatchlistName: localName }));
      handleRenameConfirm();
    };

    return (
      <div className="popup-overlay">
        <div className="popup-container" ref={renamePopupRef}>
          <h3>Rename Watchlist</h3>
          <input
            type="text"
            value={localName}
            onChange={(e) => setLocalName(e.target.value)}
          />
          <div className="watchlistpopup-btn">
            <button className="popup-btnconfirm" onClick={handleSave}>
              Save
            </button>
            <button
              onClick={() =>
                setUiState((prev) => ({ ...prev, renamePopup: false }))
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  const DeleteStockPopup = () => (
    <div className="popup-overlay">
      <div className="popup-container" ref={deletePopupRef}>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this mutual fund?</p>
        <div className="watchlistpopup-btn">
          <button className="popup-btnconfirm" onClick={confirmDeleteStock}>Confirm</button>
          <button onClick={() => setUiState(prev => ({ ...prev, deletePopup: false }))}>Cancel</button>
        </div>
      </div>
    </div>
  );

  const DeleteWatchlistPopup = () => {
    // Get the watchlist being deleted
    const watchlistToDelete = watchlistState.list.find(
      w => w.watchlist_id === uiState.deleteWatchlistId
    );

    return (
      <div className="popup-overlay">
        <div className="popup-container" ref={deleteWatchlistPopupRef}>
          <h3>Confirm Watchlist Deletion</h3>
          <p>Are you sure you want to delete "{watchlistToDelete?.name}"? This action cannot be undone.</p>
          <div className="watchlistpopup-btn">
            <button className="popup-btnconfirm" onClick={handleDeleteWatchlist}>Confirm</button>
            <button onClick={() => setUiState(prev => ({ ...prev, deleteWatchlistPopup: false }))}>Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      <h2 className="newwmutual">Mutual Fund Watchlist</h2>

      {/* Navigation tabs */}
      <div className="networth-tabswatclist">
        <Link to="/stockWatchlist">
          <button
            className="networth-tab"
            style={{ background: "white", color: "black" }}
          >
            Stocks
          </button>
        </Link>
        <Link to="/mutualWatchlist">
          <button
            className="networth-tab"
            style={{ background: "#24b676", color: "white" }}
          >
            Mutual Fund
          </button>
        </Link>
        <Link to="/goldWatchlistall">
          <button
            className="networth-tab"
            style={{ background: "white", color: "black" }}
          >
            Gold
          </button>
        </Link>
      </div>

      <div className="stock-watchlist">
        {/* Watchlist Section */}
        <div className="watchlist-management">
          {watchlistState.list.map((watchlist, index) => (
            <div className="watchlist-item" key={watchlist.watchlist_id}>
              <input
                type="radio"
                name="watchlist"
                checked={watchlistState.selected === watchlist.watchlist_id}
                onChange={() => selectWatchlist(watchlist.watchlist_id)}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              <label className="watchlist-label">{watchlist.name}</label>
              <button
                className="menu-iconwatchlist"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent click from bubbling
                  toggleDropdown(index);
                }}
              >
                ⋮
              </button>
              {uiState.activeDropdown === index && (
                <div
                  className="menu-dropdownwatchlist"
                  ref={el => {
                    // Dynamically add refs to the dropdown elements
                    dropdownRefs.current[index] = el;
                  }}
                >
                  <button
                    className="menu-itemwatchlist"
                    onClick={() => handleRenameWatchlist(watchlist.watchlist_id)}
                  >
                    Rename
                  </button>
                  <button
                    className="menu-itemwatchlist"
                    onClick={() => setUiState(prev => ({
                      ...prev,
                      deleteWatchlistPopup: true,
                      deleteWatchlistId: watchlist.watchlist_id
                    }))}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
          <button className="create-watchlist" onClick={handleCreateWatchlist}>
            + Create Watchlist
          </button>
        </div>

        <h2 style={{ marginLeft: "20px", fontSize: "19px" }}>Add Watchlist</h2>

        {/* Input Section */}
        <div className="watchlist-header">
          <div className="scheme-exchange-cell">
            <div className="input-groupwatchlist">
              <label htmlFor="stockName">Scheme Name</label>
              <input
                id="stockName"
                type="text"
                placeholder="Enter scheme name..."
                value={stockInput.name}
                onChange={handleStockNameChange}
              />

              {/* Search results */}
              {stockInput.name && (
                <div className={`search-resultswatchlist ${stockInput.filterResults.length > 0 ? "active" : ""}`}>
                  {stockInput.filterResults.length > 0 ? (
                    <ul>
                      {stockInput.filterResults.map((data) => (
                        <li
                          key={data.id}
                          onClick={() => handleSelectStock(data)}
                          style={{ cursor: "pointer", padding: "8px" }}
                        >
                          {data.Scheme_Name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p style={{ padding: "8px" }}>No result found</p>
                  )}
                </div>
              )}
            </div>

            <div className="input-groupwatchlist">
              <label htmlFor="exchange">Exchange</label>
              <input
                id="exchange"
                type="text"
                value="NSE"
                readOnly
                style={{
                  backgroundColor: "#f9f9f9",
                  border: "1px solid #ccc",
                  width: "50px",
                }}
              />
            </div>
          </div>

          <button className="add-btnwatchlist" onClick={handleAddStock}>
            + Add
          </button>
        </div>
      </div>

      {/* Content Container */}
      <div className="content-containerwatchlist">
        {/* Top filters section */}
        <div className="top-sectionswatchlistmutual">
          <div className="filters-sectionwatchlist">
            <span className="filter-labelwatchlist">FILTER:</span>
            <button
              className={`filter-buttonwatchlist ${uiState.activeFilter === "All" ? "active" : ""}`}
              onClick={() => setActiveFilter("All")}
            >
              All
            </button>
            <button
              className={`filter-buttonwatchlist ${uiState.activeFilter === "Gainers" ? "active" : ""}`}
              onClick={() => setActiveFilter("Gainers")}
            >
              Gainers
            </button>
            <button
              className={`filter-buttonwatchlist ${uiState.activeFilter === "Losers" ? "active" : ""}`}
              onClick={() => setActiveFilter("Losers")}
            >
              Losers
            </button>
          </div>
          <div className="group-by-sectionwatchlist">
            <label style={{ marginRight: "8px" }}>Group By:</label>
            <input
              type="radio"
              name="groupBywatchlist"
              value="nonewatchlist"
              onClick={() => navigate("/mutualWatchlist")}
              defaultChecked
              style={{
                width: "14px",
                height: "14px",
                accentColor: "#24b676",
              }}
            />
            None
            <input
              type="radio"
              name="groupBywatchlist"
              value="sectorwatchlist"
              onClick={() => navigate("/mutualwatchlistsector")}
              style={{
                width: "14px",
                height: "14px",
                accentColor: "#24b676",
              }}
            />
            AMC
            <input
              type="radio"
              name="groupBywatchlist"
              value="mcapwatchlist"
              onClick={() => navigate("/mutualwatchlisttype")}
              style={{
                width: "14px",
                height: "14px",
                accentColor: "#24b676",
              }}
            />
            Types of Funds
          </div>
        </div>

        {/* Mutual Fund Table */}
        <div className="table-containerwatchlist">
          <table className="stock-tablewatchlist">
            <thead>
              <tr>
                <th>Scheme Name</th>
                <th>NAV 1D change</th>
                <th>52 week High/Low</th>
                <th>1 month</th>
                <th>3 months</th>
                <th>5 Years</th>
                <th>10 years</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {watchlistState.stockDetails.length === 0 ? (
                <tr>
                  <td colSpan="8">No data found</td>
                </tr>
              ) : (
                watchlistState.stockDetails.map((stock, index) => (
                  <tr key={index}>
                    <td>{stock.scheme_name}</td>
                    <td>{stock.nav1dchange || "-"}</td>
                    <td>{stock.fiftytwoweekhighorlow || "-"}</td>
                    <td>{stock.onemonth || "-"}</td>
                    <td>{stock.threemonths || "-"}</td>
                    <td>{stock.fiveyears || "-"}</td>
                    <td>{stock.tenyears || "-"}</td>
                    <td>
                      <button
                        className="delete-btnwatchlist"
                        onClick={() => handleDeleteStock(index)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popups */}
      {uiState.renamePopup && <RenamePopup />}
      {uiState.deletePopup && <DeleteStockPopup />}
      {uiState.deleteWatchlistPopup && <DeleteWatchlistPopup />}


      <div className="layout">
        <Sidebar />
        <div className="main-contentover">
          <div className="contentover">{children}</div>
          <FooterForAllPage />
        </div>
      </div>
    </div>
  );
};

export default MutualWatchlist;
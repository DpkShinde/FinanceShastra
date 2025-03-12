import React, { useCallback, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./StockWatchlistnone.css";
import Navbar from "../../Navbar/Navbar";
import { API_BASE_URL } from "../../config";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import FooterForAllPage from "../../FooterForAllPage/FooterForAllPage";
import Sidebar from "../../Sidebar/Sidebar";

const StockWatchlist = ({children}) => {
  const navigate = useNavigate();
  const getStockData = useSelector((store) => store?.searchData?.searchData || []);

  // Refs for popup containers
  const renamePopupRef = useRef(null);
  const deletePopupRef = useRef(null);
  const deleteWatchlistPopupRef = useRef(null);
  const dropdownRefs = useRef([]);

  // State management with logical grouping
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
    deleteWatchlistPopup: false
  });
  // Fetch watchlists
  const fetchWatchlists = async () => {
    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/`, {
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
      const response = await fetch(`${API_BASE_URL}/Watchlist/getWatchlistAssets?watchlist_id=${watchlistState.selected}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(watchlistState.selected)

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
            item.company?.toLowerCase().includes(searchText.toLowerCase())
          )
          : []
      }));
    }, 300),
    [getStockData]
  );

  // Handle stock selection from search results
  const handleSelectStock = (stock) => {
    setStockInput({
      name: stock.company,
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
      alert("Stock name cannot be empty!");
      return;
    }

    const normalizedStockName = stockInput.name.toUpperCase();

    if (watchlistState.stockDetails.some((stock) => stock.asset_symbol === normalizedStockName)) {
      alert("This stock is already in your watchlist.");
      return;
    }

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/addStockToWatchklist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          asset_symbol: normalizedStockName,
          watchlist_id: watchlistState.selected,
          asset_type: "Stock",
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
          { ...newStock, asset_symbol: normalizedStockName }
        ]
      }));

      setStockInput(prev => ({
        ...prev,
        name: "",
        selected: null
      }));
    } catch (error) {
      alert(error.message || "Failed to add stock.");
    }
  };

  // Create new watchlist
  const handleCreateWatchlist = async () => {
    const newWatchlistName = `My Watchlist ${watchlistState.list.length + 1}`;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/CreateWatchList`, {
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
    if (!watchlistState.selected) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/deleteWatchlist?watchlist_id=${watchlistState.selected}`, {
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
        const updatedList = prev.list.filter(watchlist => watchlist.watchlist_id !== prev.selected);

        // Select the next available watchlist dynamically
        let newSelectedId = null;
        if (updatedList.length > 0) {
          // Find the index of the deleted watchlist in the original list
          const deletedIndex = prev.list.findIndex(w => w.watchlist_id === prev.selected);
          // If available, select the next watchlist in the list
          // Otherwise select the previous one, or the first in the list as last resort
          newSelectedId = updatedList[deletedIndex] ?
            updatedList[deletedIndex].watchlist_id :
            updatedList[Math.max(0, deletedIndex - 1)]?.watchlist_id ||
            updatedList[0].watchlist_id;
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
        deleteWatchlistPopup: false
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
      renamePopup: true
    }));
  };

  const handleRenameConfirm = async () => {
    if (!uiState.newWatchlistName.trim()) return;

    try {
      const token = Cookies.get("jwtToken");
      const response = await fetch(`${API_BASE_URL}/Watchlist/renameWatchlist`, {
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
      const response = await fetch(`${API_BASE_URL}/Watchlist/removeStockFromWatchlist`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          watchlist_id: watchlistState.selected,
          asset_symbol: stockToDelete.asset_symbol
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
      alert(error.message || "Failed to delete stock.");
    }
  };

  // Toggle dropdown menu
  const toggleDropdown = (index) => {
    setUiState(prev => ({
      ...prev,
      activeDropdown: prev.activeDropdown === index ? null : index
    }));
  };

  // Get color for change value
  const getChangeColor = (change) => {
    return change >= 0 ? "green" : "red";
  };

  // Set watchlist selection
  const selectWatchlist = (watchlistId) => {
    setWatchlistState(prev => ({
      ...prev,
      selected: watchlistId
    }));
  };

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
  }, [watchlistState.selected]);

  // Close popups when clicking outside
  const handleClickOutside = useCallback((event) => {
    // Handle rename popup
    if (uiState.renamePopup &&
      renamePopupRef.current &&
      !renamePopupRef.current.contains(event.target)) {
      setUiState(prev => ({ ...prev, renamePopup: false }));
    }

    // Handle delete stock popup
    if (uiState.deletePopup &&
      deletePopupRef.current &&
      !deletePopupRef.current.contains(event.target)) {
      setUiState(prev => ({ ...prev, deletePopup: false }));
    }

    // Handle delete watchlist popup
    if (uiState.deleteWatchlistPopup &&
      deleteWatchlistPopupRef.current &&
      !deleteWatchlistPopupRef.current.contains(event.target)) {
      setUiState(prev => ({ ...prev, deleteWatchlistPopup: false }));
    }

    // Handle dropdown menus
    if (uiState.activeDropdown !== null) {
      const activeDropdownElement = dropdownRefs.current[uiState.activeDropdown];
      if (activeDropdownElement && !activeDropdownElement.contains(event.target)) {
        setUiState(prev => ({ ...prev, activeDropdown: null }));
      }
    }
  }, [uiState.renamePopup, uiState.deletePopup, uiState.deleteWatchlistPopup, uiState.activeDropdown]);

  useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [handleClickOutside]);

  // UI Components
  const RenamePopup = () => (
    <div className="popup-overlay">
      <div className="popup-container" ref={renamePopupRef}>
        <h3>Rename Watchlist</h3>
        <input
          type="text"
          value={uiState.newWatchlistName}
          onChange={(e) => setUiState(prev => ({ ...prev, newWatchlistName: e.target.value }))}
        />
        <div className="watchlistpopup-btn">
          <button className="popup-btnconfirm" onClick={handleRenameConfirm}>Save</button>
          <button onClick={() => setUiState(prev => ({ ...prev, renamePopup: false }))}>Cancel</button>
        </div>
      </div>
    </div>
  );

  const DeleteStockPopup = () => (
    <div className="popup-overlay">
      <div className="popup-container" ref={deletePopupRef}>
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this stock?</p>
        <div className="watchlistpopup-btn">
          <button className="popup-btnconfirm" onClick={confirmDeleteStock}>Confirm</button>
          <button onClick={() => setUiState(prev => ({ ...prev, deletePopup: false }))}>Cancel</button>
        </div>
      </div>
    </div>
  );

  const DeleteWatchlistPopup = () => (
    <div className="popup-overlay">
      <div className="popup-container" ref={deleteWatchlistPopupRef}>
        <h3>Confirm Watchlist Deletion</h3>
        <p>Are you sure you want to delete this watchlist? This action cannot be undone.</p>
        <div className="watchlistpopup-btn">
          <button className="popup-btnconfirm" onClick={handleDeleteWatchlist}>Confirm</button>
          <button onClick={() => setUiState(prev => ({ ...prev, deleteWatchlistPopup: false }))}>Cancel</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar />
      <h2 className="newwmutual">Stock Watchlist</h2>

      {/* Navigation tabs */}
      <div className="networth-tabswatclist">
        <Link to="/stockwatchlist">
          <button
            className="networth-tab"
            style={{ background: "#24b676", color: "white" }}
          >
            Stocks
          </button>
        </Link>
        <Link to="/mutualWatchlist">
          <button
            className="networth-tab"
            style={{ background: "white", color: "black" }}
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

      <div>
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
                  onClick={() => toggleDropdown(index)}
                >
                  ⋮
                </button>
                {uiState.activeDropdown === index && (
                  <div className="menu-dropdownwatchlist"
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
                      onClick={() => setUiState(prev => ({ ...prev, deleteWatchlistPopup: true }))}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
            <button
              className="create-watchlist"
              onClick={handleCreateWatchlist}
            >
              + Create Watchlist
            </button>
          </div>

          <h2 style={{ marginLeft: "20px", fontSize: "19px" }}>
            Add Watchlist
          </h2>

          {/* Input Section */}
          <div className="watchlist-header">
            <div className="scheme-exchange-cell">
              <div className="input-groupwatchlist">
                <label htmlFor="stockName">Stock Name</label>
                <input
                  id="stockName"
                  type="text"
                  placeholder="Enter stock name..."
                  value={stockInput.name}
                  onChange={handleStockNameChange}
                />

                {/* Search results */}
                {stockInput.name && (
                  <div className={`search-resultswatchlistsector ${stockInput.filterResults.length > 0 ? "active" : ""}`}>
                    {stockInput.filterResults.length > 0 ? (
                      <ul>
                        {stockInput.filterResults.map((data) => (
                          <li key={data.id} onClick={() => handleSelectStock(data)}>
                            {data.company}
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
          <div className="top-sectionswatchlistsectorr">
            <div className="filters-sectionwatchlist">
              <span className="filter-labelwatchlist">FILTER:</span>
              <button className="filter-buttonwatchlist">All</button>
              <button className="filter-buttonwatchlist">Gainers</button>
              <button className="filter-buttonwatchlist">Losers</button>
            </div>

            <div className="group-by-sectionwatchlist">
              <label style={{ marginRight: "8px" }}>Group By:</label>
              <input
                type="radio"
                name="groupBywatchlist"
                value="nonewatchlist"
                onClick={() => navigate("/stockwatchlistall")}
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
                onClick={() => navigate("/stockwatchlistsector")}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              Sector
              <input
                type="radio"
                name="groupBywatchlist"
                value="mcapwatchlist"
                onClick={() => navigate("/stockwatchlistmcap")}
                style={{
                  width: "14px",
                  height: "14px",
                  accentColor: "#24b676",
                }}
              />
              M-Cap
            </div>
          </div>

          {/* Stock Table */}
          <div className="table-containerwatchlist">
            <table className="stock-tablewatchlist">
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Live Price</th>
                  <th>Change</th>
                  <th>Change %</th>
                  <th>Volume</th>
                  <th>Today's High</th>
                  <th>Today's Low</th>
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
                      <td>{stock.asset_symbol}</td>
                      <td>{stock.livePrice}</td>
                      <td style={{ color: getChangeColor(stock.change) }}>
                        {stock.change >= 0 ? `+${stock.change}` : stock.change}
                      </td>
                      <td>{stock.changePercent}%</td>
                      <td>{stock.volume}</td>
                      <td>{stock.high}</td>
                      <td>{stock.low}</td>
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

       
      </div>
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

export default StockWatchlist;
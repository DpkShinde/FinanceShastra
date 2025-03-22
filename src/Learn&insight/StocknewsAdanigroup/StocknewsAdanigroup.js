import React, { useState, useEffect } from 'react';

import newsadaniImage from '../../assest/img9.JPG'; // Adjust the path based on your folder structure
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import Navbar from '../../Navbar/Navbar';
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage';



const StocknewsAdanigroup = () => {
    const [stockPrice, setStockPrice] = useState(2504.00);
    const [change, setChange] = useState({ value: 46.75, percentage: 1.90 });
    const newsData = {
        headline: "Adani Group: How The World’s 3rd Richest Man Is Pulling The Largest Con In Corporate History",
        subtext: "Indian conglomerate Adani Group has engaged in a brazen stock manipulation and accounting fraud scheme over the course of decades",
        imageUrl: newsadaniImage, // Use the imported image here
        companyName: "Gland Pharma",
        stockPrice: "₹ 2,504.00",
        change: "+46.75 (1.90%)",
        volume: "25.80lac",
        low: "2,534.80",
        high: "2,446.25",
        description: "Gland Pharma share price will remain in focus after receiving approval from the USFDA for Phytonadione Injectable Emulsion USP, 10 mg/mL single-dose ampules.",
    };


    useEffect(() => {
        const interval = setInterval(() => {
            const newPrice = (stockPrice + (Math.random() * 10 - 5)).toFixed(2); // Random increase or decrease
            const priceChange = (newPrice - stockPrice).toFixed(2);
            const percentageChange = ((priceChange / stockPrice) * 100).toFixed(2);

            setStockPrice(parseFloat(newPrice));
            setChange({
                value: parseFloat(priceChange),
                percentage: parseFloat(percentageChange),
            });
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval); // Cleanup
    }, [stockPrice]);

    const currentDate = new Date().toLocaleString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });


    return (
        <div>
        <div className="stocknewsss">
            <h2 className='stocknewsssheadone'>Stock News</h2>

            <h2 className="stocknewsss-headline">{newsData.headline}</h2>
            <p className="stocknewsss-subtextt">{newsData.subtext}</p>
            <img src={newsData.imageUrl} alt="Stock News" className="stocknewsss-image" />
            <div className="stocknewsss-stock-section">
                <div>
                    <h3 className="stocknewsss-company-name">{newsData.companyName}</h3>

                </div>
                <div className="stocknewsss-trading-info">
                    <div className='newsscolumn'>
                        <p className='nsepara'>NSELIVE</p>
                        <p className="stocknewsss-date">{currentDate}</p> {/* Current Date */}
                        <p><strong>Volume: </strong>{newsData.volume}</p>

                    </div>
                    <div>
                        <div className='newsscolumnn'>
                            <p className="stocknewsss-stock-price">
                                ₹ {stockPrice.toLocaleString()}
                                {change.value >= 0 ? (
                                    <FaCaretUp className="iconnewss" />
                                ) : (
                                    <FaCaretDown className="iconnewss down" />
                                )}
                            </p>
                            <p className={`stocknewsss-change ${change.value >= 0 ? 'positive' : 'negative'}`}>
                                {change.value >= 0 ? `+${change.value} (+${change.percentage}%)` : `${change.value} (${change.percentage}%)`}
                            </p>
                        </div><label>
                            <p><strong>Today L/H:</strong> <span>{newsData.low}</span> / <span>{newsData.high}</span></p>
                        </label>
                    </div>
                </div>
            </div>
            <p className="stocknewsss-description">
                Today we reveal the findings of our 2-year investigation, presenting evidence that the INR 17.8 trillion (U.S. $218 billion) Indian conglomerate Adani Group has engaged in a brazen stock manipulation and accounting fraud scheme over the course of decades.
                Gautam Adani, Founder and Chairman of the Adani Group, has amassed a net worth of roughly $120 billion, adding over $100 billion in the past 3 years largely through stock price appreciation in the group’s 7 key listed companies, which have spiked an average of 819% in that period.<br /><br />
                Our research involved speaking with dozens of individuals, including former senior executives of the Adani Group, reviewing thousands of documents, and conducting diligence site visits in almost half a dozen countries.<br /><br />
                Even if you ignore the findings of our investigation and take the financials of Adani Group at face value, its 7 key listed companies have 85% downside purely on a fundamental basis owing to sky-high valuations.
                Key listed Adani companies have also taken on substantial debt, including pledging shares of their inflated stock for loans, putting the entire group on precarious financial footing. 5 of 7 key listed companies have reported ‘current ratios’ below 1, indicating near-term liquidity pressure.<br /><br />
                Another firm called Monterosa Investment Holdings controls 5 supposedly independent funds that collectively hold over INR 360 billion (U.S. $4.5 billion) in shares of listed Adani companies, according to Legal Entity Identifier (LEI) data and Indian exchange data.
            </p>
            <Navbar />
        </div>
        <FooterForAllPage/>
        </div>
    );
};

export default StocknewsAdanigroup;
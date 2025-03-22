import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Blogscomponent.css";
import { Link } from 'react-router-dom';
import blog1 from "../../../assest/blog1.jpeg";
import blog2 from "../../../assest/blog2.jpeg";
import blog3 from "../../../assest/blog3.jpeg";
import blog4 from "../../../assest/blog4.jpeg";
import blog5 from "../../../assest/blog5.jpeg";
import blog6 from "../../../assest/blog6.jpeg";
import Navbar from "../../../Navbar/Navbar";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";

const BlogsComponent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate(); // Hook for navigation

  const tabs = [
    "All",
    "Trending Blogs",
    "Stock Market",
    "IPOs",
    "Mutual Funds",
    "Commodity",
    "Automated Trading",
    "Equity",
    "Gold",
    "PMS",
   
  ];

  const blogData = [
    {
      id: 1,
      image: blog1,
      title: "Top 30 Best-Performing Equity Mutual Funds in India",
      category: "Mutual Funds",
      trending: true,
    },
    {
      id: 2,
      image: blog2,
      title: "The Fastest-Growing Stocks in the Indian Market in 2024",
      category: "Stock Market",
      trending: true,
    },
    {
      id: 3,
      image: blog3,
      title: "Flipkart IPO and Myntra Profitability: A New Milestone in Indian E-Commerce",
      category: "IPOs",
      trending: false,
    },
    {
      id: 4,
      image: blog4,
      title: "Top Nifty 50 Index Mutual Funds of November 2024: 5-Year CAGR Insights",
      category: "Mutual Funds",
      trending: true,
    },
    {
      id: 5,
      image: blog5,
      title: "Do you want to make Bold Moves for More Money?",
      category: "Stock Market",
      trending: false,
    },
    {
      id: 6,
      image: blog6,
      title: "Elcid Investments: First Indian Stock to Cross Rs 3 Lakh",
      category: "Stock Market",
      trending: true,
    },
  ];

  // Navigate to the specific blog
  const handleBlogClick = (id) => {
    if (id === 1) {
    navigate('/bloginvestment/1');
  };
  }
   
  
  // Filter blogs based on the active tab
  const filteredBlogs =
    activeTab === "All"
      ? blogData
      : activeTab === "Trending Blogs"
      ? blogData.filter((blog) => blog.trending)
      : blogData.filter(
          (blog) => blog.category.toLowerCase() === activeTab.toLowerCase()
        );

  return (
    <div>
    <div className="blogsContainer">
      <h2 className="blogsTitle">Blogs</h2>
      <p className="blogsSubtitle">FinanceShastra’s Knowledge Library</p>
      <h3 className="blogsTagline">Where Knowledge Translates into Profit</h3>
      <ul className="blogsFeatures">
        <li>Accessible and Free</li>
        <li>Simple to Understand</li>
        <li>5,000+ Blogs from Beginner to Advanced</li>
      </ul>

      {/* Tabs */}
      <div className="tabsContainerblogggs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tabButtonblogggs ${activeTab === tab ? "activeTab" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Blog Cards */}
      <div className="blogsGrid">
        {filteredBlogs.map((blog) => (
          <div
            key={blog.id}
            className="blogCard"
            onClick={() => handleBlogClick(blog.id)} // Navigate when clicked
            style={{ cursor: "pointer" }} // Add pointer cursor
          >
            <img src={blog.image} alt={blog.title} className="blogImage" />
            <div className="blogContent">
              <h4 className="blogTitle">{blog.title}</h4>
              <span className="blogCategory">{blog.category}</span>
              <a
                href="#"
                className={`readMoreblogs ${
                  blog.id === 3 ? "marginLeftReadMore" : ""
                }`}
              >
                Read more &gt;
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* View All Blogs Button */}
      <div className="blogbutton">
  <Link to="/blogFilter">
    <button className="checkAllBlogs">
      Check Out All Blogs
    </button>
  </Link>
</div>
      <Navbar />
    </div>
    <div className="foooterpagesaupdate">
     <FooterForAllPage />
   </div>
    </div>
  );
};

export default BlogsComponent;
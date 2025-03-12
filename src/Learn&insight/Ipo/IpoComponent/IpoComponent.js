import React from "react";
import "./IpoComponent.css";
import { useNavigate } from "react-router-dom";
import ipo1 from '../../../assest/ipo1.jpeg';
import ipo2 from '../../../assest/ipo2.jpeg';
import ipo3 from '../../../assest/ipo3.jpeg';
import ipo4 from '../../../assest/ipo4.jpeg';
import ipo5 from '../../../assest/ipo5.jpeg';
import ipo6 from '../../../assest/ipo6.jpeg';
import ipo7 from '../../../assest/ipo7.jpeg';
import ipo9 from '../../../assest/ipo8.jpeg';
import ipo8 from '../../../assest/ipo9.jpeg';
import Navbar from "../../../Navbar/Navbar";
import { CgProfile } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import FooterForAllPage from "../../../FooterForAllPage/FooterForAllPage";


const IpoComponent = () => {
  const navigate = useNavigate();

  const newsArticles = [
    {   id: 1,
        title: "Sanathan Textiles IPO analysis",
        date: "17 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo1,
      },
      {
        id: 2,
        title: "DAM Capital Advisors IPO analysis",
        date: "17 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo2,
      },
      {
        id: 3,
        title: "Concord Enviro IPO analysis",
        date: "16 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo3,
      },
      {
        id: 4,
        title: "Transrail Lighting IPO analysis",
        date: "16 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo4,
      },
      {
        id: 5,
        title: "Mamata Machinery IPO analysis",
        date: "15 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo5,
      },
      {
        id: 6,
        title: "IGI IPO analysis",
        date: "15 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo6,
      },
      {
        id: 7,
        title: "IKS Health IPO analysis",
        date: "15 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo7,
      },
      {
        id: 8,
        title: "Mobikwik IPO analysis",
        date: "15 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo9,
      },
      {
        id: 9,
        title: "Vishal Mega Mart IPO analysis",
        date: "14 Dec 2024",
        author: "Chandresh Tripathi",
        image: ipo8,
      },
  ];

  const handleArticleClick = (id) => {
    if (id === 1) {
      navigate("/ipoDetails/1");
    }
  };


  return (
    <div>
    <div className="stockNewsContainer">
      <h2 className="stockNewsTitle">IPO Details</h2>
      <div className="stockNewsList">
        {newsArticles.map((article) => (
          <div
            key={article.id}
            className={`stockNewsItem ${article.highlight ? "highlightedNews" : ""}`}

            onClick={() => {
              if (article.id === 1) {
                handleArticleClick(article.id);
              } 
            }}
            style={{ cursor: "pointer" }}
          >
            <img src={article.image} alt={article.title} className="newsThumbnail" />
            <div className="newsContent">
              <h3 className="newsTitle">{article.title}</h3>
              <div className="datetimeipo">
              <p className="ipopara"><MdDateRange className="dateipo"/>Published Date: {article.date}<GoDotFill className="dotipo"/></p>
              <p className="ipopara"><CgProfile className="profileipo"/>Author: {article.author}<GoDotFill className="dotipo"/></p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Navbar />
      
    </div>
    <div className="foooterpagesaupdate">
     <FooterForAllPage />
   </div>
    </div>
  );
};

export default IpoComponent;
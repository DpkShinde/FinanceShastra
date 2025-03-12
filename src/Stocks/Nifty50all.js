import React from 'react'
import Nifty50topheader from './Nifty50topheader/Nifty50topheader'
import Nifty50page from './Nifty50pagescreener/Nifty50pagescreener'
import Nifty50screenerStockdatatable from './Nifty50screenerStockdata/Nifty50screenerStockdata';
import NiftySectorWeightage from './NiftysectorWeightage/NiftysectorWeightage';
import FooterForAllPage from "../FooterForAllPage/FooterForAllPage";
function Nifty50all() {
  return (
    <div>
      <Nifty50topheader/>
      <Nifty50page/>
      <Nifty50screenerStockdatatable/>
      <NiftySectorWeightage/>
      <div className="foooterpagesaupdate">
          <FooterForAllPage />
        </div>
       
   

    </div>
  )
}

export default Nifty50all;

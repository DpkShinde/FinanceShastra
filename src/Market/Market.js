import React from 'react'
import Marketable from '../Marketable/Marketable'


import './Market.css'
import Navbar from '../Navbar/Navbar'
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage'
function Market() {
  return (
    <div>
    <div className='headingmarkett'>
  
    <div className='markett'>
     <Navbar/>
    
      <Marketable/>
     
    </div>
    </div>
    <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  )
}

export default Market;
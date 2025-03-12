import React from 'react'

import Goldmarket from '../Goldmarket/Goldmarket'

import './GoldETF.css'
import Navbar from '../Navbar/Navbar'
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage'

function GoldETF() {
  return (
    <div>
    <div className='goldmarkett'>
     
    <div className='gold-markett'>
     <Navbar/>

      <Goldmarket/>
     
    </div>
  
    </div>
    <div className="foooterpagesaupdate">
        <FooterForAllPage />
      </div>
    </div>
  )
}

export default GoldETF;
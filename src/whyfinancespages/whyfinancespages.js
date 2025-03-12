import React from 'react'
import WhyFinanceSimpllyInvestted from './WhyFinanceSimpllyInvestted/WhyFinanceSimpllyInvestted'
import WhyFinPersonalReal from './WhyFinPersonalReal/WhyFinPersonalReal'
import WhyFinadvanceeducation from './WhyFinadvanceeducation/WhyFinadvanceeducation'
import WhyFinavisiontrusted from './WhyFinavisiontrusted/WhyFinavisiontrusted'
import Navbar from '../Navbar/Navbar'
import WhyFinChangMarket from './WhyFinChangMarket/WhyFinChangMarket'

import TestimonialSlider from './WhyFinCustomerReview/WhyFinCustomerReview'
import FooterForAllPage from '../FooterForAllPage/FooterForAllPage'


const WhyFinadvanceeducationnn = () => {
  return (
    <div>
        <WhyFinanceSimpllyInvestted/>
        <WhyFinPersonalReal/>
        <WhyFinadvanceeducation/>
        <WhyFinavisiontrusted/>
        <WhyFinChangMarket/>
        <TestimonialSlider/>
        
       
        <Navbar/>
        <div className="foooterpagesaupdate">
    <FooterForAllPage/>
  </div>
    </div>
  )
}

export default WhyFinadvanceeducationnn;
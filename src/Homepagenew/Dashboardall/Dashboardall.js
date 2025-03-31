import React from 'react'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import Dashboardchartmain from '../Dashboardgraph/Dashboardgraph'
import FooterForAllPage from '../../FooterForAllPage/FooterForAllPage'
import './Dashboardall.css';

function Dashboardall() {
  return (
    <div className="dashboard-containeryyy">
      {/* Header */}
      <header className="headeryyy">
        <Navbar/>
      </header>

      <div className="content-wrapperyyy">
        {/* Sidebar */}
        <aside className="sidebaryyy">
            <Sidebar/>
        </aside>

        {/* Main Content */}
        <main className="main-contentyyy">
            <Dashboardchartmain/>
        </main>
      </div>

      {/* Footer at the bottom, never overlapping */}
      <footer className="footeryyy">
        <FooterForAllPage/>
      </footer>
    </div>
  )
}

export default Dashboardall
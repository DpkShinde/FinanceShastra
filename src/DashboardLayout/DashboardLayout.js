import React from 'react';
import './DashboardLayout.css';

const DashboardLayout = () => {
  return (
    <div className="dashboard-containeryyy">
      {/* Header */}
      <header className="headeryyy">Header</header>

      <div className="content-wrapperyyy">
        {/* Sidebar */}
        <aside className="sidebaryyy">Sidebar</aside>

        {/* Main Content */}
        <main className="main-contentyyy">Main Content</main>
      </div>

      {/* Footer at the bottom, never overlapping */}
      <footer className="footeryyy">Footer</footer>
    </div>
  );
};

export default DashboardLayout;

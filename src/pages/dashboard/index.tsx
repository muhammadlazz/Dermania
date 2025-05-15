import React from 'react';
import '../../styles/dashboard.css'; // Pastikan file CSS terhubung dengan benar

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-item">Home</div>
        <div className="sidebar-item">Finance</div>
        <div className="sidebar-item">Analytics</div>
        <div className="sidebar-item">Settings</div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="user-info">
            <p>Hi James, Good Morning!</p>
            <div className="user-card">
              <span>James Smith</span>
              <span>1234</span>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="stats-row">
          <div className="stat-card">
            <h3>$597</h3>
            <p>Shopping Debt & Credit Card</p>
          </div>
          <div className="stat-card">
            <h3>$875</h3>
            <p>Transfer Other Country</p>
          </div>
          <div className="stat-card">
            <h3>$1380</h3>
            <p>Investment & Insurance</p>
          </div>
          <div className="stat-card">
            <h3>$1200</h3>
            <p>Kids Education & Hobbies</p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="transaction-history">
          <h3>Transaction History</h3>
          <div className="transaction-row">
            <p>James Smith</p>
            <p>Graphic Design</p>
            <p>$259.50</p>
            <p>Completed</p>
          </div>
          <div className="transaction-row">
            <p>Robert William</p>
            <p>Photo Editing</p>
            <p>$439.00</p>
            <p>Reviewed</p>
          </div>
          <div className="transaction-row">
            <p>Linda Brown</p>
            <p>Financial Planner</p>
            <p>$374.00</p>
            <p>Completed</p>
          </div>
          <div className="transaction-row">
            <p>Michael Brown</p>
            <p>Architect Services</p>
            <p>$842.00</p>
            <p>Completed</p>
          </div>
        </div>

        {/* Balance Graph */}
        <div className="balance-graph">
          <h3>Balance (Last 12 Months)</h3>
          <div className="bar-graph">
            {/* Grafik batang akan ditambahkan di sini */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

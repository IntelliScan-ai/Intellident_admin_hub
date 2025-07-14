"use client";

import React, { useState } from 'react';
import { FaUser, FaUserPlus, FaDollarSign, FaMicroscope, FaCheckCircle, FaUserMd, FaBell } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import '/src/app/styles/dashboard.css';
import Link from 'next/link';

// Dummy data based on schema
const kpiData = [
  { title: 'Active Users', value: 4320, icon: <FaUser />, link: '/dashboard/users' },
  { title: 'New Signups', value: 120, sub: '7 d', icon: <FaUserPlus />, link: '/dashboard/users?filter=new' },
  { title: 'MRR', value: '$3,200', sub: '/mo', icon: <FaDollarSign />, link: '/dashboard/subscriptions' },
  { title: 'AI Scans Today', value: 168, icon: <FaMicroscope />, link: '/dashboard/scans' },
];

const userGrowthData = [
  { date: 'Jun 1', users: 100 },
  { date: 'Jun 5', users: 200 },
  { date: 'Jun 10', users: 350 },
  { date: 'Jun 15', users: 600 },
  { date: 'Jun 20', users: 900 },
  { date: 'Jun 25', users: 1200 },
  { date: 'Jun 30', users: 1500 },
];

const aiScansPerDay = [
  { day: 'Mon', scans: 40 },
  { day: 'Tue', scans: 60 },
  { day: 'Wed', scans: 55 },
  { day: 'Thu', scans: 80 },
  { day: 'Fri', scans: 70 },
  { day: 'Sat', scans: 90 },
  { day: 'Sun', scans: 100 },
];

const latestUsers = [
  { name: 'John D.', email: 'john@email', date: '20-Jun' },
  { name: 'Sarah M.', email: 'sarah@email', date: '18-Jun' },
];

const latestDoctors = [
  { name: 'Dr. Smith', specialty: 'Ortho', status: 'Verified' },
  { name: 'Dr. Ali', specialty: 'General', status: 'Pending Review' },
];

const stats = [
  { label: 'Active Subscriptions', value: '1,230' },
  { label: 'Churn Rate', value: '4.3%' },
  { label: 'Pending Approvals', value: '5' },
];

const notifications = [
  'New user report on scan error',
  'Doctor request for profile update',
  'New feedback received',
];

// Quick actions
const quickActions = [
  { label: 'Add User', link: '/dashboard/users/add' },
  { label: 'Add Doctor', link: '/dashboard/doctors/add' },
  { label: 'Create Product', link: '/dashboard/products/add' },
  { label: 'Approve Pending', link: '/dashboard/appointments/pending' },
];

// Dummy pending approvals
const pendingApprovals = [
  { id: 1, type: 'Doctor', name: 'Dr. Ali', action: 'Approve Doctor' },
  { id: 2, type: 'Appointment', name: 'John D.', action: 'Approve Appointment' },
];

// Dummy anomaly/insight
const anomalyBanner = 'User signups are 50% higher than last week!';

function KPISection() {
  return (
    <div className="kpi-section">
      {kpiData.map((kpi, idx) => (
        <Link href={kpi.link} key={idx} className="kpi-card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="kpi-icon">{kpi.icon}</div>
          <div className="kpi-title">{kpi.title}</div>
          <div className="kpi-value">{kpi.value} <span className="kpi-sub">{kpi.sub}</span></div>
        </Link>
      ))}
    </div>
  );
}

function UserGrowthChart() {
  return (
    <div className="dashboard-widget">
      <div className="widget-title">User Growth</div>
      <ResponsiveContainer width="100%" height={120}>
        <LineChart data={userGrowthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid stroke="#e3eaf2" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#3498db" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function AIScansChart() {
  return (
    <div className="dashboard-widget">
      <div className="widget-title">AI Scans Per Day</div>
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={aiScansPerDay}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="scans" fill="#8884d8" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function LatestSignupsTable() {
  return (
    <div className="dashboard-widget">
      <div className="widget-title">Latest Signups (Users)</div>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date Joined</th>
          </tr>
        </thead>
        <tbody>
          {latestUsers.map((user, idx) => (
            <tr key={idx}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function LatestDoctorsTable() {
  return (
    <div className="dashboard-widget">
      <div className="widget-title">Latest Registered Doctors</div>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialty</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {latestDoctors.map((doc, idx) => (
            <tr key={idx}>
              <td>{doc.name}</td>
              <td>{doc.specialty}</td>
              <td>{doc.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StatsSection() {
  return (
    <div className="stats-section">
      {stats.map((stat, idx) => (
        <div className="stat-card" key={idx}>
          <div className="stat-label">{stat.label}</div>
          <div className="stat-value">{stat.value}</div>
        </div>
      ))}
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="dashboard-widget">
      <div className="widget-title">Notifications / Feedback Section</div>
      <ul className="notifications-list">
        {notifications.map((note, idx) => (
          <li key={idx}><FaBell className="notif-icon" /> {note}</li>
        ))}
      </ul>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="quick-links">
      <h2>Quick Actions</h2>
      <div className="quick-links-list">
        {quickActions.map((action, idx) => (
          <Link href={action.link} key={idx} className="quick-link-btn">{action.label}</Link>
        ))}
      </div>
    </div>
  );
}

function PendingApprovals() {
  const handleApprove = (id: number) => {
    alert(`Approved item ${id} (mock)`);
  };
  const handleReject = (id: number) => {
    alert(`Rejected item ${id} (mock)`);
  };
  return (
    <div className="dashboard-widget">
      <div className="widget-title">Pending Approvals</div>
      <ul className="pending-approvals-list">
        {pendingApprovals.map((item) => (
          <li key={item.id} className="pending-approvals-item">
            <span className="pending-approvals-label">{item.type}: {item.name}</span>
            <span>
              <button className="approval-btn" onClick={() => handleApprove(item.id)}>Approve</button>
              <button className="reject-btn" onClick={() => handleReject(item.id)}>Reject</button>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AnomalyBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{background:'#fffbe6',color:'#b26a00',borderRadius:90,padding:'1rem 1.5rem',marginBottom:'1.2rem',fontWeight:600,boxShadow:'0 2px 8px rgba(255,193,7,0.08)',position:'relative'}}>
      {anomalyBanner}
      <button
        aria-label="Dismiss"
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          top: 12,
          right: 16,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: '#b26a00',
          fontSize: '1.8rem'
        }}
      >
        <FaCheckCircle />
      </button>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="dashboard-grid">
      <h1 className="dashboard-title">IntelliDent Admin Dashboard</h1>
      <AnomalyBanner />
      <KPISection />
      <QuickActions />
      <div className="dashboard-row">
        <UserGrowthChart />
        <AIScansChart />
      </div>
      <div className="dashboard-row">
        <LatestSignupsTable />
        <LatestDoctorsTable />
        <NotificationsSection />
      </div>
      <PendingApprovals />
      <StatsSection />
    </div>
  );
} 
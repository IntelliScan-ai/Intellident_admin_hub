"use client";

import React, { useState, useEffect, ReactNode, JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaTachometerAlt, FaFileInvoice, FaShoppingCart, FaCloudUploadAlt, FaCog, FaBell, FaUserCircle, FaBars, FaMoon, FaSun, FaSearch, FaDumbbell } from 'react-icons/fa';
import '../styles/dashboard.css';

interface NavLinkItem {
  href: string;
  label: string;
  icon: JSX.Element;
}

const navLinks: NavLinkItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <FaTachometerAlt /> },
  { href: '/dashboard/purchase-orders', label: 'Purchase Orders', icon: <FaShoppingCart /> },
  { href: '/dashboard/invoices', label: 'Invoices', icon: <FaFileInvoice /> },
  { href: '/dashboard/file-upload', label: 'File Upload', icon: <FaCloudUploadAlt /> },
  { href: '/dashboard/settings', label: 'Settings', icon: <FaCog /> },
];

const Sidebar = ({ collapsed, showSidebar, onClose, darkMode }: { collapsed: boolean, showSidebar: boolean, onClose: () => void, darkMode: boolean }) => {
  const pathname = usePathname();

  return (
    <aside className={`dashboard-sidebar${collapsed ? ' collapsed' : ''}${showSidebar ? ' show' : ''}${darkMode ? ' dark' : ''}`}>
      <nav>
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? 'active' : ''}
            onClick={onClose}
          >
            <span className="icon">{link.icon}</span>
            <span className="label">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

const Header = ({ onSidebarToggle, darkMode, setDarkMode }: { onSidebarToggle: () => void, darkMode: boolean, setDarkMode: (mode: boolean | ((m: boolean) => boolean)) => void }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className={`dashboard-header${darkMode ? ' dark' : ''}`}>
      <div className="header-left">
        <button className="sidebar-toggle" onClick={onSidebarToggle} aria-label="Toggle sidebar">
          <FaBars />
        </button>
        <img src={darkMode ? '/assets/images/logo_w.png' : '/assets/images/logo_blue_new.png'} alt="Intellident.ai" className="brand" />
      </div>
      <div className="header-center">
        <div className="global-search">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="header-right">
        <button className="icon-btn" aria-label="Notifications">
          <FaBell />
        </button>
        <div className="user-menu" onClick={() => setShowDropdown(v => !v)}>
          <FaUserCircle className="avatar" />
          {showDropdown && (
            <div className="dropdown">
              <Link href="/dashboard/profile">Profile</Link>
              <Link href="/dashboard/settings">Settings</Link>
              <Link href="/login">Logout</Link>
            </div>
          )}
        </div>
        <button className="icon-btn" onClick={() => setDarkMode(m => !m)} aria-label="Toggle dark mode">
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </header>
  );
};

export default function Layout({ children }: { children: ReactNode }) {
  const [sidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('dashboard-dark') === 'true';
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('dashboard-dark', String(darkMode));
  }, [darkMode]);

  const handleSidebarClose = () => setShowSidebar(false);

  return (
    <div>
      <Header
        onSidebarToggle={() => setShowSidebar((v) => !v)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Sidebar
        collapsed={sidebarCollapsed}
        showSidebar={showSidebar}
        onClose={handleSidebarClose}
        darkMode={darkMode}
      />
      <main
        className={`dashboard-main${darkMode ? ' dark' : ''}${sidebarCollapsed ? ' collapsed' : ''}`}
        onClick={showSidebar ? handleSidebarClose : undefined}
      >
        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
} 
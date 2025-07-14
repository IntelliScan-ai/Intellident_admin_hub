"use client";

import { useState } from 'react';
import '/src/app/styles/dashboard.css';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <div className="settings-section">
        <label className="settings-label">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(dm => !dm)}
          />
          Enable Dark Mode
        </label>
      </div>
      <div className="settings-section">
        <label className="settings-label">
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(e => !e)}
          />
          Email Notifications
        </label>
      </div>
      <div className="settings-section">
        <button className="settings-save-btn" disabled>
          Save Changes
        </button>
      </div>
    </div>
  );
} 
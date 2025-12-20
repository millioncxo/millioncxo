'use client';

import { useEffect, useState } from 'react';

export type ViewMode = 'table' | 'timeline';

interface ViewToggleProps {
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  storageKey?: string;
}

export default function ViewToggle({ currentView, onViewChange, storageKey = 'sdr-updates-view' }: ViewToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load saved preference
    const saved = localStorage.getItem(storageKey);
    if (saved && (saved === 'table' || saved === 'timeline')) {
      onViewChange(saved as ViewMode);
    }
  }, [storageKey, onViewChange]);

  const handleViewChange = (view: ViewMode) => {
    onViewChange(view);
    if (mounted) {
      localStorage.setItem(storageKey, view);
    }
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div style={{
      display: 'inline-flex',
      border: '1px solid rgba(196, 183, 91, 0.3)',
      borderRadius: '0.375rem',
      overflow: 'hidden',
      background: 'white',
    }}>
      <button
        type="button"
        onClick={() => handleViewChange('table')}
        style={{
          padding: '0.5rem 1rem',
          border: 'none',
          background: currentView === 'table' ? 'var(--golden-opal)' : 'transparent',
          color: currentView === 'table' ? 'var(--onyx-black)' : 'var(--muted-jade)',
          fontWeight: currentView === 'table' ? '600' : '400',
          cursor: 'pointer',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease',
          borderRight: '1px solid rgba(196, 183, 91, 0.3)',
        }}
        onMouseEnter={(e) => {
          if (currentView !== 'table') {
            e.currentTarget.style.background = 'rgba(196, 183, 91, 0.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentView !== 'table') {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        📊 Table
      </button>
      <button
        type="button"
        onClick={() => handleViewChange('timeline')}
        style={{
          padding: '0.5rem 1rem',
          border: 'none',
          background: currentView === 'timeline' ? 'var(--golden-opal)' : 'transparent',
          color: currentView === 'timeline' ? 'var(--onyx-black)' : 'var(--muted-jade)',
          fontWeight: currentView === 'timeline' ? '600' : '400',
          cursor: 'pointer',
          fontSize: '0.875rem',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          if (currentView !== 'timeline') {
            e.currentTarget.style.background = 'rgba(196, 183, 91, 0.1)';
          }
        }}
        onMouseLeave={(e) => {
          if (currentView !== 'timeline') {
            e.currentTarget.style.background = 'transparent';
          }
        }}
      >
        📅 Timeline
      </button>
    </div>
  );
}


'use client';

// ─────────────────────────────────────────────────────────────────────────────
// Compare Phones — Work in Progress
//
// This page is reserved for a collaborating developer to implement the
// side-by-side smartphone specification comparison feature.
//
// Implementation guidance:
//  1. Import `phones` and `FEATURE_CONFIG` from '@/src/api/mobileData.js'
//  2. Render a multi-select dropdown or search field allowing the user to
//     choose between 2 and 3 devices for comparison
//  3. Build a comparison table where each row represents one of the 15
//     attributes and each column represents a selected device
//  4. Highlight the winning value in each row (highest or lowest depending
//     on the attribute — e.g. lower price is better, higher battery is better)
//  5. Use the existing CSS custom properties in app/globals.css for consistent
//     visual language across the platform
//  6. Consider adding a "Clear Selection" control to reset the comparison state
// ─────────────────────────────────────────────────────────────────────────────

export default function Compare() {
  return (
    <main
      style={{
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 24px',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '20px',
          padding: '56px 48px',
          maxWidth: '560px',
          width: '100%',
          boxShadow: '0 8px 40px rgba(37, 99, 235, 0.09), 0 0 0 1px rgba(37, 99, 235, 0.07)',
          border: '1px solid rgba(37, 99, 235, 0.1)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: '14px',
            background: 'rgba(37, 99, 235, 0.07)',
            border: '1px solid rgba(37, 99, 235, 0.15)',
            marginBottom: '24px',
          }}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2563eb"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6"  y1="20" x2="6"  y2="14" />
          </svg>
        </div>

        <h1
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1.9rem',
            fontWeight: 800,
            color: '#0a1628',
            letterSpacing: '-0.02em',
            margin: '0',
            lineHeight: 1.15,
            textTransform: 'uppercase',
          }}
        >
          Work in Progress
        </h1>
      </div>
    </main>
  );
}

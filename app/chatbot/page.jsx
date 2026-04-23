'use client';

import Script from 'next/script';

export default function Chatbot() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      background: 'var(--bg-deep)', 
      paddingTop: '100px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{
        width: '95%',
        maxWidth: '1200px',
        height: 'calc(100vh - 160px)',
        background: 'var(--bg-surface)',
        borderRadius: '32px',
        border: '1px solid var(--border)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-lg)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
          opacity: 0.5
        }} />
        
        <Script 
          type="module" 
          src="https://interfaces.zapier.com/assets/web-components/zapier-interfaces/zapier-interfaces.esm.js" 
          strategy="lazyOnload"
        />
        <zapier-interfaces-chatbot-embed 
          is-popup="false" 
          chatbot-id="cmngc0d6i002w3ncsli612e08"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </main>
  );
}

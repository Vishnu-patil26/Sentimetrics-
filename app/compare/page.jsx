'use client';

import { useState, useEffect, useMemo } from 'react';
import { FEATURE_CONFIG, ALL_FEATURES, phones as fallbackPhones } from '@/src/api/mobileData.js';
import styles from './page.module.css';

// ─── Comparison Logic Helpers ────────────────────────────────────────────────
function getBestValue(feature, phones) {
  if (!phones || phones.length === 0) return null;
  const values = phones.map(p => p[feature]);
  
  // Price: lower is better
  if (feature === 'price') return Math.min(...values);
  
  // Higher is better for everything else
  return Math.max(...values);
}

function formatValue(feature, value) {
  if (value === undefined || value === null) return '-';
  const { unit } = FEATURE_CONFIG[feature];
  if (unit === '₹')    return `₹${value.toLocaleString('en-IN')}`;
  if (unit === 'mAh')  return `${value.toLocaleString('en-IN')} mAh`;
  if (unit === '"')    return `${value}"`;
  if (unit === 'GB')   return `${value} GB`;
  if (unit === 'GHz')  return `${value} GHz`;
  if (unit === 'MP')   return `${value} MP`;
  if (unit === 'W')    return `${value} W`;
  if (unit === '/10')  return `${value}/10`;
  return String(value);
}

export default function Compare() {
  const [dataset, setDataset] = useState(fallbackPhones);
  const [selectedIds, setSelectedIds] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    async function fetchLivePhones() {
      try {
        const res = await fetch('http://localhost:3001/api/released-phones');
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        if (data && data.length > 0) setDataset(data);
      } catch (err) {
        console.error('Compare page fetch failed:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchLivePhones();
  }, []);

  // Filter phones by search
  const filteredPhones = useMemo(() => {
    if (!searchQuery.trim()) return dataset.slice(0, 10);
    const q = searchQuery.toLowerCase();
    return dataset.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.brand.toLowerCase().includes(q)
    ).slice(0, 20);
  }, [dataset, searchQuery]);

  const selectedPhones = useMemo(() => 
    selectedIds.map(id => dataset.find(p => p.id === id)).filter(Boolean),
    [dataset, selectedIds]
  );

  const togglePhone = (id) => {
    setSelectedIds(prev => {
      if (prev.includes(id)) return prev.filter(i => i !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const removePhone = (id) => {
    setSelectedIds(prev => prev.filter(i => i !== id));
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        
        <header className={styles.header}>
          <h1 className={styles.title}>Compare Devices</h1>
          <p className={styles.subtitle}>
            Analyze up to 3 smartphones side-by-side with industry-standard benchmarks.
          </p>
        </header>

        {/* Search & Selection Section */}
        <section className={styles.searchSection}>
          <div className={styles.searchGrid}>
            
            <div className={styles.searchBox}>
              <input 
                type="text"
                placeholder="Search phones (e.g. iPhone 14, Samsung S23)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={styles.input}
              />

              {searchQuery && (
                <div className={styles.dropdown}>
                  {filteredPhones.length > 0 ? filteredPhones.map(p => (
                    <div 
                      key={p.id}
                      onClick={() => { togglePhone(p.id); setSearchQuery(''); }}
                      className={styles.dropdownItem}
                    >
                      <span className={styles.itemName}>{p.name}</span>
                      <span className={styles.itemPrice}>₹{p.price.toLocaleString()}</span>
                    </div>
                  )) : (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#64748b' }}>
                      No matches found
                    </div>
                  )}
                </div>
              )}

              <div className={styles.popularRow}>
                <span className={styles.popularLabel}>POPULAR:</span>
                {dataset.slice(0, 5).map(p => (
                  <button 
                    key={p.id}
                    onClick={() => togglePhone(p.id)}
                    className={styles.chip}
                  >
                    + {p.name.split(' ')[0]}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.selectionArea}>
              <span className={styles.counterLabel}>Selection ({selectedIds.length}/3)</span>
              <div className={styles.selectedChips}>
                {selectedPhones.map(p => (
                  <div key={p.id} className={styles.selectedItem}>
                    <span className={styles.selectedName}>{p.brand} {p.name.split(' ')[0]}</span>
                    <button onClick={() => removePhone(p.id)} className={styles.removeBtn}>✕</button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* Comparison Table */}
        {selectedIds.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.attrCell}>Specifications</th>
                  {selectedPhones.map(p => (
                    <th key={p.id}>
                      <div className={styles.phoneHeader}>
                        <div className={styles.brandTag}>{p.brand}</div>
                        <div className={styles.phoneName}>{p.name}</div>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: 3 - selectedIds.length }).map((_, i) => (
                    <th key={`empty-${i}`}>
                      <div className={styles.emptySlot}>
                        <div className={styles.addIcon}>+</div>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700 }}>Add Device</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_FEATURES.map((feature) => {
                  const cfg = FEATURE_CONFIG[feature];
                  const bestValue = getBestValue(feature, selectedPhones);
                  
                  return (
                    <tr key={feature}>
                      <td className={styles.attrCell}>{cfg.label}</td>
                      {selectedPhones.map(p => {
                        const isBest = p[feature] === bestValue && selectedPhones.length > 1;
                        return (
                          <td key={p.id}>
                            <div className={isBest ? styles.bestValue : styles.valueCell}>
                              {formatValue(feature, p[feature])}
                              {isBest && <span className={styles.bestBadge}>WINNER</span>}
                            </div>
                          </td>
                        );
                      })}
                      {Array.from({ length: 3 - selectedIds.length }).map((_, i) => (
                        <td key={`empty-cell-${i}`}></td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <span className={styles.placeholderIcon}>📊</span>
            <h3 className={styles.placeholderTitle}>Ready to compare?</h3>
            <p className={styles.placeholderText}>
              Search and select devices above to generate a side-by-side technical breakdown.
            </p>
          </div>
        )}

      </div>
    </main>
  );
}

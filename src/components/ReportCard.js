'use client';

import { useState, useEffect } from 'react';
import styles from './ReportCard.module.css';

export default function ReportCard({ title, problemNumber, endpoint, columns }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        
        // Handle various API response formats
        let extractedData = [];
        
        // Try to extract data from common response keys
        if (result.data) {
          extractedData = result.data;
        } else if (result.students) {
          extractedData = result.students;
        } else if (result.centers) {
          extractedData = result.centers;
        } else if (result.subjects) {
          extractedData = result.subjects;
        } else if (result.exams) {
          extractedData = result.exams;
        } else if (result.results) {
          extractedData = result.results;
        } else if (result.distribution) {
          extractedData = result.distribution;
        } else if (Array.isArray(result)) {
          extractedData = result;
        } else if (result.student) {
          // Single item response, convert to array
          extractedData = [result.student].filter(item => item !== null);
        } else if (result.center) {
          extractedData = [result.center].filter(item => item !== null);
        } else if (result.subject) {
          extractedData = [result.subject].filter(item => item !== null);
        } else {
          // Try to find any array in the response
          for (const key in result) {
            if (Array.isArray(result[key])) {
              extractedData = result[key];
              break;
            }
          }
        }

        setData(extractedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <span className={styles.problemNumber}>{problemNumber}.</span>
          {title}
        </h3>
      </div>

      <div className={styles.content}>
        {loading && <p className={styles.loading}>Loading data...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        {!loading && !error && data.length === 0 && (
          <p className={styles.empty}>No data available</p>
        )}

        {!loading && !error && data.length > 0 && (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((row, idx) => (
                  <tr key={idx}>
                    {columns.map((col) => {
                      const value = row[col];

                      const formatCell = (v) => {
                        if (v === undefined || v === null) return '-';
                        // Arrays: join primitives or extract names from objects
                        if (Array.isArray(v)) {
                          if (v.length === 0) return '-';
                          const allPrimitives = v.every(
                            (item) => item === null || ['string', 'number', 'boolean'].includes(typeof item)
                          );
                          if (allPrimitives) return v.join(', ');

                          // If array of objects, prefer subjectName / name / subjectId / id
                          return v
                            .map((item) => {
                              if (item == null) return '-';
                              if (typeof item !== 'object') return String(item);
                              return item.subjectName || item.name || item.subjectId || item.id || JSON.stringify(item);
                            })
                            .join(', ');
                        }

                        if (typeof v === 'object') {
                          // Prefer friendly properties
                          return v.subjectName || v.name || v.subjectId || v.id || JSON.stringify(v);
                        }

                        return String(v);
                      };

                      return (
                        <td key={`${idx}-${col}`}>{formatCell(value)}</td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <span className={styles.count}>
          {data.length} {data.length === 1 ? 'record' : 'records'}
        </span>
      </div>
    </div>
  );
}

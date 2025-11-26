'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminCenters() {
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    city: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/center/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to insert center');
      setMessage('✅ Center added successfully!');
      setFormData({ name: '', state: '', city: '' });
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>🏢 Add Centers</h1>
          <p>Add new examination centers</p>
        </div>

        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Center Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter center name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="state">State *</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="city">City *</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                required
              />
            </div>

            {message && (
              <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
                {message}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Adding Center...' : 'Add Center'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

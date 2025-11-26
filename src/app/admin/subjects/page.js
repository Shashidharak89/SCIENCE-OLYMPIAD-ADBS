'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminSubjects() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
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
      const response = await fetch('/api/subject/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to insert subject');
      setMessage('✅ Subject added successfully!');
      setFormData({ name: '', code: '' });
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
          <h1>📚 Add Subjects</h1>
          <p>Add new subjects for Science Olympiad</p>
        </div>

        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Subject Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter subject name (e.g., Physics, Chemistry, Biology)"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="code">Subject Code *</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="Enter subject code (e.g., PHY, CHM, BIO)"
                required
              />
            </div>

            {message && (
              <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
                {message}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Adding Subject...' : 'Add Subject'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

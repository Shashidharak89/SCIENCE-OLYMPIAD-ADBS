'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminExams() {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    totalMarks: '',
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
      const response = await fetch('/api/exam/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          totalMarks: parseInt(formData.totalMarks),
        }),
      });

      if (!response.ok) throw new Error('Failed to insert exam');
      setMessage('✅ Exam added successfully!');
      setFormData({ name: '', date: '', totalMarks: '' });
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
          <h1>📝 Add Exams</h1>
          <p>Add examination details</p>
        </div>

        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Exam Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter exam name (e.g., Regional Science Olympiad 2025)"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="date">Exam Date *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="totalMarks">Total Marks *</label>
              <input
                type="number"
                id="totalMarks"
                name="totalMarks"
                value={formData.totalMarks}
                onChange={handleChange}
                placeholder="Enter total marks"
                min="1"
                required
              />
            </div>

            {message && (
              <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
                {message}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Adding Exam...' : 'Add Exam'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminStudents() {
  const [formData, setFormData] = useState({
    name: '',
    centerId: '',
    registrationNumber: '',
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
      const response = await fetch('/api/student/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to insert student');
      setMessage('✅ Student added successfully!');
      setFormData({ name: '', centerId: '', registrationNumber: '' });
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
          <h1>👥 Add Students</h1>
          <p>Add new students to the Science Olympiad</p>
        </div>

        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Student Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter student's full name"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="centerId">Center ID *</label>
              <input
                type="text"
                id="centerId"
                name="centerId"
                value={formData.centerId}
                onChange={handleChange}
                placeholder="Enter center ID"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="registrationNumber">Registration Number *</label>
              <input
                type="text"
                id="registrationNumber"
                name="registrationNumber"
                value={formData.registrationNumber}
                onChange={handleChange}
                placeholder="Enter registration number"
                required
              />
            </div>

            {message && (
              <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
                {message}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Adding Student...' : 'Add Student'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

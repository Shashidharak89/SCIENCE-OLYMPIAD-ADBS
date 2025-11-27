'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminStudents() {
  const [formData, setFormData] = useState({
    _id: '',
    regNo: '',
    name: '',
    gender: 'M',
    class: '',
    schoolOrCollege: '',
    region: '',
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
        body: JSON.stringify({
          _id: formData.regNo,
          regNo: formData.regNo,
          name: formData.name,
          gender: formData.gender,
          class: formData.class,
          schoolOrCollege: formData.schoolOrCollege,
          region: formData.region,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to insert student');
      }
      
      setMessage('✅ Student added successfully!');
      setFormData({ _id: '', regNo: '', name: '', gender: 'M', class: '', schoolOrCollege: '', region: '' });
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
          <h1>Add Students</h1>
        </div>

        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="_id">Student ID *</label>
              <input
                type="text"
                id="_id"
                name="_id"
                value={formData._id}
                onChange={handleChange}
                placeholder="e.g., NM200"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="regNo">Registration Number *</label>
              <input
                type="text"
                id="regNo"
                name="regNo"
                value={formData.regNo}
                onChange={handleChange}
                placeholder="e.g., NM200"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="name">Student Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Rohith Shetty"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="gender">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="class">Class/Grade</label>
              <input
                type="text"
                id="class"
                name="class"
                value={formData.class}
                onChange={handleChange}
                placeholder="e.g., BSc"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="schoolOrCollege">School/College</label>
              <input
                type="text"
                id="schoolOrCollege"
                name="schoolOrCollege"
                value={formData.schoolOrCollege}
                onChange={handleChange}
                placeholder="e.g., St Aloysius College, Mangaluru"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="region">Region</label>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                placeholder="e.g., Mangaluru"
              />
            </div>

            {message && (
              <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
                {message}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Adding...' : 'Add Student'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

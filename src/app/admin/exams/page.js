'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminExams() {
  const [formData, setFormData] = useState({
    examId: '',
    subjectId: '',
    centerId: '',
    level: 'SCHOOL',
    year: new Date().getFullYear(),
    round: '1',
    examDate: '',
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
          _id: formData.examId,
          subjectId: formData.subjectId,
          centerId: formData.centerId,
          level: formData.level,
          year: parseInt(formData.year),
          round: parseInt(formData.round),
          examDate: formData.examDate ? new Date(formData.examDate).toISOString() : undefined,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to insert exam');
      }
      
      setMessage('✅ Exam added successfully!');
      setFormData({ 
        examId: '', 
        subjectId: '', 
        centerId: '', 
        level: 'SCHOOL', 
        year: new Date().getFullYear(),
        round: '1',
        examDate: '', 
      });
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
              <label htmlFor="examId">Exam ID *</label>
              <input
                type="text"
                id="examId"
                name="examId"
                value={formData.examId}
                onChange={handleChange}
                placeholder="Enter exam ID (e.g., EXM10)"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="subjectId">Subject ID *</label>
              <input
                type="text"
                id="subjectId"
                name="subjectId"
                value={formData.subjectId}
                onChange={handleChange}
                placeholder="Enter subject ID (e.g., PHY)"
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
                placeholder="Enter center ID (e.g., MNG-C01)"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="level">Level *</label>
              <select
                id="level"
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
              >
                <option value="SCHOOL">School</option>
                <option value="REGIONAL">Regional</option>
                <option value="NATIONAL">National</option>
                <option value="INTERNATIONAL">International</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="year">Year *</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                min="2000"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="round">Round</label>
              <input
                type="number"
                id="round"
                name="round"
                value={formData.round}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="examDate">Exam Date & Time</label>
              <input
                type="datetime-local"
                id="examDate"
                name="examDate"
                value={formData.examDate}
                onChange={handleChange}
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

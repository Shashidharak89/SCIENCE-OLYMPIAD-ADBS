'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminResults() {
  const [formData, setFormData] = useState({
    studentId: '',
    examId: '',
    subjectId: '',
    marksObtained: '',
    rank: '',
    qualified: false,
    qualifiedRegional: false,
    qualifiedNational: false,
    medal: false,
    scholarship: false,
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/result/insert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          marksObtained: parseInt(formData.marksObtained),
          rank: formData.rank ? parseInt(formData.rank) : null,
        }),
      });

      if (!response.ok) throw new Error('Failed to insert result');
      setMessage('✅ Result added successfully!');
      setFormData({
        studentId: '',
        examId: '',
        subjectId: '',
        marksObtained: '',
        rank: '',
        qualified: false,
        qualifiedRegional: false,
        qualifiedNational: false,
        medal: false,
        scholarship: false,
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
          <h1>✅ Add Results</h1>
          <p>Record student examination results</p>
        </div>

        <div className={styles.container}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="studentId">Student ID *</label>
              <input
                type="text"
                id="studentId"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                placeholder="Enter student ID"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="examId">Exam ID *</label>
              <input
                type="text"
                id="examId"
                name="examId"
                value={formData.examId}
                onChange={handleChange}
                placeholder="Enter exam ID"
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
                placeholder="Enter subject ID"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="marksObtained">Marks Obtained *</label>
              <input
                type="number"
                id="marksObtained"
                name="marksObtained"
                value={formData.marksObtained}
                onChange={handleChange}
                placeholder="Enter marks obtained"
                min="0"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rank">Rank</label>
              <input
                type="number"
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                placeholder="Enter rank (optional)"
                min="1"
              />
            </div>

            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="qualified"
                  checked={formData.qualified}
                  onChange={handleChange}
                />
                <span>Qualified</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="qualifiedRegional"
                  checked={formData.qualifiedRegional}
                  onChange={handleChange}
                />
                <span>Qualified for Regional</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="qualifiedNational"
                  checked={formData.qualifiedNational}
                  onChange={handleChange}
                />
                <span>Qualified for National</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="medal"
                  checked={formData.medal}
                  onChange={handleChange}
                />
                <span>Medal</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="scholarship"
                  checked={formData.scholarship}
                  onChange={handleChange}
                />
                <span>Scholarship</span>
              </label>
            </div>

            {message && (
              <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
                {message}
              </div>
            )}

            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Adding Result...' : 'Add Result'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

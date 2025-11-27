'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import styles from './admin.module.css';

export default function AdminResults() {
  const [formData, setFormData] = useState({
    studentId: '',
    examId: '',
    subjectId: '',
    centerId: '',
    level: 'SCHOOL',
    year: new Date().getFullYear(),
    marks: '',
    rankInCenter: '',
    rankOverall: '',
    qualifiedForRegional: false,
    qualifiedForNational: false,
    qualifiedForInternational: false,
    medal: '',
    hasCertificate: true,
    passed: true,
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
          studentId: formData.studentId,
          examId: formData.examId,
          subjectId: formData.subjectId,
          centerId: formData.centerId,
          level: formData.level,
          year: parseInt(formData.year),
          marks: parseInt(formData.marks),
          rankInCenter: formData.rankInCenter ? parseInt(formData.rankInCenter) : undefined,
          rankOverall: formData.rankOverall ? parseInt(formData.rankOverall) : undefined,
          qualifiedForRegional: formData.qualifiedForRegional,
          qualifiedForNational: formData.qualifiedForNational,
          qualifiedForInternational: formData.qualifiedForInternational,
          medal: formData.medal || null,
          hasCertificate: formData.hasCertificate,
          passed: formData.passed,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to insert result');
      }
      
      setMessage('✅ Result added successfully!');
      setFormData({
        studentId: '',
        examId: '',
        subjectId: '',
        centerId: '',
        level: 'SCHOOL',
        year: new Date().getFullYear(),
        marks: '',
        rankInCenter: '',
        rankOverall: '',
        qualifiedForRegional: false,
        qualifiedForNational: false,
        qualifiedForInternational: false,
        medal: '',
        hasCertificate: true,
        passed: true,
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
                placeholder="Enter subject ID (e.g., SUB1)"
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
                placeholder="Enter center ID (e.g., CTR1)"
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
              <label htmlFor="marks">Marks *</label>
              <input
                type="number"
                id="marks"
                name="marks"
                value={formData.marks}
                onChange={handleChange}
                placeholder="Enter marks obtained"
                min="0"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rankInCenter">Rank In Center</label>
              <input
                type="number"
                id="rankInCenter"
                name="rankInCenter"
                value={formData.rankInCenter}
                onChange={handleChange}
                placeholder="Enter rank in center"
                min="1"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="rankOverall">Rank Overall</label>
              <input
                type="number"
                id="rankOverall"
                name="rankOverall"
                value={formData.rankOverall}
                onChange={handleChange}
                placeholder="Enter overall rank"
                min="1"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="medal">Medal</label>
              <select
                id="medal"
                name="medal"
                value={formData.medal || ''}
                onChange={handleChange}
              >
                <option value="">None</option>
                <option value="GOLD">Gold</option>
                <option value="SILVER">Silver</option>
                <option value="BRONZE">Bronze</option>
              </select>
            </div>

            <div className={styles.checkboxGroup}>
              <label>
                <input
                  type="checkbox"
                  name="qualifiedForRegional"
                  checked={formData.qualifiedForRegional}
                  onChange={handleChange}
                />
                <span>Qualified for Regional</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="qualifiedForNational"
                  checked={formData.qualifiedForNational}
                  onChange={handleChange}
                />
                <span>Qualified for National</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="qualifiedForInternational"
                  checked={formData.qualifiedForInternational}
                  onChange={handleChange}
                />
                <span>Qualified for International</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="hasCertificate"
                  checked={formData.hasCertificate}
                  onChange={handleChange}
                />
                <span>Has Certificate</span>
              </label>

              <label>
                <input
                  type="checkbox"
                  name="passed"
                  checked={formData.passed}
                  onChange={handleChange}
                />
                <span>Passed</span>
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

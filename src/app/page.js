import ReportCard from "@/components/ReportCard";
import styles from "./page.module.css";

const reports = [
  {
    problemNumber: 1,
    title: "List students who appeared in all three subjects",
    endpoint: "/api/reports/students-all-three-subjects",
    columns: ["studentId", "regNo", "name", "schoolOrCollege", "class", "region"],
  },
  {
    problemNumber: 2,
    title: "Find the student with the highest overall marks",
    endpoint: "/api/reports/highest-overall-marks",
    columns: ["studentId", "name", "schoolOrCollege", "region", "totalMarks"],
  },
  {
    problemNumber: 3,
    title: "Show centers where more than 100 students appeared",
    endpoint: "/api/reports/centers-more-than-100",
    columns: ["centerId", "centerName", "city", "state", "region", "participantCount"],
  },
  {
    problemNumber: 4,
    title: "Retrieve subjects with the highest average scores",
    endpoint: "/api/reports/subjects-highest-avg",
    columns: ["subjectId", "subjectName", "subjectCode", "averageMarks", "participantCount", "maxMarks"],
  },
  {
    problemNumber: 5,
    title: "Calculate the rank distribution in physics",
    endpoint: "/api/reports/physics-rank-distribution",
    columns: ["rank", "studentCount", "percentage"],
  },
  {
    problemNumber: 6,
    title: "Identify students who qualified for both regional and national levels",
    endpoint: "/api/reports/qualified-regional-national",
    columns: ["studentId", "name", "schoolOrCollege", "region", "class"],
  },
  {
    problemNumber: 7,
    title: "Find centers where no student qualified",
    endpoint: "/api/reports/centers-no-qualified",
    columns: ["centerId", "centerName", "city", "state", "region", "participantCount"],
  },
  {
    problemNumber: 8,
    title: "Show students who received both medals and scholarships",
    endpoint: "/api/reports/students-medal-scholarship",
    columns: ["studentId", "name", "schoolOrCollege", "region", "medalCount", "scholarshipAmount"],
  },
  {
    problemNumber: 9,
    title: "Retrieve the top 3 students per subject",
    endpoint: "/api/reports/top3-per-subject",
    columns: ["subjectName", "subjectCode", "rank", "studentName", "marks", "schoolOrCollege"],
  },
  {
    problemNumber: 10,
    title: "Find students who scored higher than average in all subjects",
    endpoint: "/api/reports/above-average-all-subjects",
    columns: ["studentId", "regNo", "name", "schoolOrCollege", "class", "region"],
  },
  {
    problemNumber: 11,
    title: "Show the subject with the most participants",
    endpoint: "/api/reports/subject-most-participants",
    columns: ["subjectId", "subjectName", "subjectCode", "participantCount", "maxMarks"],
  },
  {
    problemNumber: 12,
    title: "Identify students who failed in at least one subject",
    endpoint: "/api/reports/failed-at-least-one",
    columns: ["studentId", "name", "regNo", "schoolOrCollege", "subjectsFailed"],
  },
];

export default function Home() {
  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1>📊 Science Olympiad Analytics Dashboard</h1>
          <p>Comprehensive Reports and Analysis</p>
        </div>

        <div className={styles.container}>
          <div className={styles.reports}>
            {reports.map((report) => (
              <ReportCard
                key={report.problemNumber}
                title={report.title}
                problemNumber={report.problemNumber}
                endpoint={report.endpoint}
                columns={report.columns}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

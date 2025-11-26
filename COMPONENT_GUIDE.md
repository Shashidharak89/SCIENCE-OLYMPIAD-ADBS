# 🎭 Science Olympiad ADBS - Component Guide

## Overview
This guide documents all React components used in the Science Olympiad ADBS application.

---

## 📦 Components

### 1. Sidebar Component
**File**: `src/components/Sidebar.js`
**Styles**: `src/components/Sidebar.module.css`

#### Purpose
Main navigation component displayed on the left side of all pages.

#### Props
None (uses Next.js `usePathname` hook for active state detection)

#### Features
- Dark gradient background
- Logo/branding section
- Navigation links with active state
- Admin submenu with 5 admin options
- Footer with copyright
- Fixed positioning
- Responsive design

#### Usage
```jsx
import Sidebar from '@/components/Sidebar';

export default function Layout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <main>{/* content */}</main>
    </div>
  );
}
```

#### Navigation Items
```
- Home (/)
  - Admin Panel
    - Add Students (/admin/students)
    - Add Centers (/admin/centers)
    - Add Subjects (/admin/subjects)
    - Add Exams (/admin/exams)
    - Add Results (/admin/results)
```

#### Styling
- Background: Dark green gradient (#2f3020 to #3d3e2c)
- Width: 280px (fixed)
- Height: 100vh (full viewport height)
- Text Color: White with accent highlights
- Active Link: Orange background (#d96846)

---

### 2. ReportCard Component
**File**: `src/components/ReportCard.js`
**Styles**: `src/components/ReportCard.module.css`

#### Purpose
Displays analytical reports with data in table format.

#### Props
```typescript
interface ReportCardProps {
  title: string;              // Report title
  problemNumber: number;      // Report number (1-12)
  endpoint: string;           // API endpoint to fetch from
  columns: string[];          // Table column headers
}
```

#### Features
- Automatic data fetching on mount
- Loading state with spinner message
- Error handling with error message
- Empty state handling
- Responsive table display
- Record count footer
- Smooth transitions
- Hover effects

#### Usage
```jsx
import ReportCard from '@/components/ReportCard';

export default function Dashboard() {
  return (
    <ReportCard
      problemNumber={1}
      title="List students who appeared in all three subjects"
      endpoint="/api/reports/students-all-three-subjects"
      columns={["studentId", "name", "centerName"]}
    />
  );
}
```

#### States
1. **Loading**: Shows "Loading data..." message
2. **Error**: Shows error message in red
3. **Empty**: Shows "No data available" message
4. **Success**: Shows data in formatted table

#### Table Features
- Header with dark background
- Column names capitalized
- Data properly formatted
- Hover effects on rows
- Footer showing record count

---

### 3. Layout Component
**File**: `src/app/layout.js`

#### Purpose
Root layout wrapper for the entire application.

#### Features
- Global metadata configuration
- Font imports from Google Fonts
- Children rendering

#### Usage
```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
```

---

### 4. Home Page Component
**File**: `src/app/page.js`
**Styles**: `src/app/page.module.css`

#### Purpose
Main dashboard displaying all 12 reports.

#### Features
- Sidebar integration
- Header section
- Grid of report cards
- Dynamic report generation from array

#### Structure
```
Layout
├── Sidebar
└── Main Content
    ├── Header
    └── Report Cards Grid (12 cards)
```

#### Reports Array
Contains configuration for all 12 reports with:
- problemNumber
- title
- endpoint
- columns

---

### 5. Admin Form Components
**Files**: 
- `src/app/admin/students/page.js`
- `src/app/admin/centers/page.js`
- `src/app/admin/subjects/page.js`
- `src/app/admin/exams/page.js`
- `src/app/admin/results/page.js`

**Styles**: `src/app/admin/admin.module.css` (shared across all)

#### Purpose
Forms for data entry/management.

#### Common Features (All Admin Forms)
- Layout with Sidebar
- Header with icon and description
- Form with validation
- Success/Error message display
- Loading state on submit button
- Form reset on success

#### State Management
Each form uses React `useState` hook:
```jsx
const [formData, setFormData] = useState({ /* initial fields */ });
const [message, setMessage] = useState('');
const [loading, setLoading] = useState(false);
```

#### Form Submission Flow
```
1. User fills form
2. Click submit
3. Validation (HTML5)
4. POST request to API
5. Show loading state
6. Display success/error message
7. Reset form on success
```

---

## 🎨 CSS Modules Structure

### Global Styles
**File**: `src/app/globals.css`

Contains:
- CSS Custom Properties (color variables)
- Base element styles
- Typography rules
- Form element styles
- Button styles
- Table styles
- Scrollbar styling

### Component Styles

#### Sidebar.module.css
```css
.sidebar                    /* Main container */
.logo                       /* Branding section */
.nav                        /* Navigation list */
.navItem                    /* Navigation links */
.navItem.active             /* Active state */
.adminSection               /* Admin submenu */
.footer                     /* Footer section */
```

#### ReportCard.module.css
```css
.card                       /* Card container */
.header                     /* Card header */
.title                      /* Card title */
.problemNumber              /* Number badge */
.content                    /* Card content area */
.tableWrapper               /* Table container */
.table                      /* Table styles */
.footer                     /* Card footer */
.count                      /* Record count */
.loading                    /* Loading state */
.error                      /* Error state */
.empty                      /* Empty state */
```

#### page.module.css (Home)
```css
.layout                     /* Main layout container */
.main                       /* Main content area */
.header                     /* Page header */
.container                  /* Content container */
```

#### admin.module.css
```css
.layout                     /* Admin layout */
.main                       /* Main content */
.header                     /* Page header */
.container                  /* Form container */
.form                       /* Form element */
.formGroup                  /* Form group wrapper */
.message                    /* Success/Error message */
.message.success            /* Success state */
.message.error              /* Error state */
.submitBtn                  /* Submit button */
.checkboxGroup              /* Checkbox container */
```

---

## 🔄 Component Hierarchy

```
RootLayout
└── Page / AdminPage
    ├── Sidebar
    └── Main
        ├── Header
        └── Content
            ├── ReportCard (x12) [on home page]
            └── Form [on admin pages]
```

---

## 📊 Data Flow

### Report Cards
```
Component Mount
    ↓
useEffect triggered
    ↓
fetch from endpoint
    ↓
setState with data
    ↓
Component re-renders with data
    ↓
Display in table
```

### Admin Forms
```
User Input
    ↓
handleChange updates state
    ↓
Form Submit
    ↓
POST request with formData
    ↓
Response received
    ↓
Show success/error message
    ↓
Reset form
```

---

## 🎯 Best Practices Used

### React Patterns
✅ Functional components
✅ React Hooks (useState, useEffect, usePathname)
✅ Component composition
✅ Props passing
✅ Conditional rendering
✅ List rendering with keys

### Performance
✅ CSS Modules (scoped styles)
✅ Image optimization (Next.js Image component)
✅ Lazy loading
✅ Efficient re-renders

### Accessibility
✅ Semantic HTML
✅ Proper heading hierarchy
✅ Label associations
✅ Color contrast
✅ Keyboard navigation

### Code Quality
✅ Clear naming conventions
✅ Proper error handling
✅ Loading states
✅ User feedback messages
✅ Form validation

---

## 🔧 Customization Guide

### Change Color Scheme
Edit `globals.css`:
```css
:root {
  --color-primary: #YOUR_COLOR;
  --color-secondary: #YOUR_COLOR;
  /* ... etc */
}
```

### Add New Report
1. Add report configuration to `reports` array in `page.js`
2. Ensure API endpoint exists
3. Define `columns` array for table display

```jsx
{
  problemNumber: 13,
  title: "Your new report title",
  endpoint: "/api/reports/your-endpoint",
  columns: ["col1", "col2", "col3"],
}
```

### Add New Admin Form
1. Create new folder: `src/app/admin/new-form/`
2. Create `page.js` with form component
3. Copy `admin.module.css` to the folder
4. Add sidebar link in `Sidebar.js`
5. Create corresponding API endpoint

### Modify Form Fields
Edit the `formData` initial state and add corresponding form inputs:
```jsx
const [formData, setFormData] = useState({
  newField: '',
  // ... other fields
});
```

---

## 🐛 Common Issues & Solutions

### Report Data Not Loading
**Check**:
- API endpoint is accessible
- MongoDB has data
- Console for errors

**Fix**:
```jsx
// Add error logging
catch (err) {
  console.error('Error fetching data:', err);
  setError(err.message);
}
```

### Form Not Submitting
**Check**:
- Required fields filled
- API endpoint correct
- Console for errors

**Fix**:
```jsx
// Add validation
if (!formData.fieldName) {
  setMessage('Field is required');
  return;
}
```

### Styles Not Applied
**Check**:
- CSS file in correct location
- Import statement correct
- CSS Module naming

**Fix**:
```bash
rm -rf .next && npm run dev
```

---

## 📚 Resources

- [React Documentation](https://react.dev)
- [Next.js Guide](https://nextjs.org/docs)
- [CSS Modules](https://github.com/css-modules/css-modules)
- [Hooks Reference](https://react.dev/reference/react)

---

**Last Updated**: November 2025
**Version**: 1.0.0

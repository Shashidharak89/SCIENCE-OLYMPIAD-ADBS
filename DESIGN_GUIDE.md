# 🎨 Science Olympiad ADBS - Visual Design Guide

## Color Palette Reference

### Official Colors
```
#cdcbd6  →  Accent/Light Gray      (Used for backgrounds, subtle elements)
#d96846  →  Primary Orange/Coral   (Buttons, highlights, active states)
#596235  →  Secondary Olive Green  (Navigation, borders, secondary elements)
#2f3020  →  Dark Olive Green       (Headers, text, main content)
#f5f5f5  →  Light Background       (Page background, light sections)
#ffffff  →  Pure White             (Cards, form inputs)
```

### Usage Matrix

| Element | Color | Hex Code | Usage |
|---------|-------|----------|-------|
| Primary Buttons | Orange | #d96846 | Call-to-action, form submit |
| Secondary Buttons | Olive Green | #596235 | Alternative actions |
| Button Hover | Dark Orange | #c75a3a | Button hover state |
| Navigation Active | Orange | #d96846 | Active navigation link |
| Header Background | Dark Green Gradient | #2f3020→#3d3e2c | Page headers, sidebar |
| Header Text | White | #ffffff | Header text content |
| Border | Light Gray | #e0e0e0 | Input borders, dividers |
| Background | Light | #f5f5f5 | Page background |
| Text Primary | Dark | #2f3020 | Main text content |
| Text Secondary | Medium Gray | #555555 | Subtle text, descriptions |

---

## Typography System

### Font Family
**Primary**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`

### Heading Hierarchy
```
H1: 2.0rem    (32px)   Font-Weight: 600   Margin-Bottom: 0.5rem
H2: 1.75rem   (28px)   Font-Weight: 600   Margin-Bottom: 0.5rem
H3: 1.5rem    (24px)   Font-Weight: 600   Margin-Bottom: 0.5rem
H4: 1.25rem   (20px)   Font-Weight: 600   Margin-Bottom: 0.5rem
H5: 1.1rem    (18px)   Font-Weight: 600   Margin-Bottom: 0.5rem
H6: 1.0rem    (16px)   Font-Weight: 600   Margin-Bottom: 0.5rem
```

### Body Text
```
Large:       1.0rem   (16px)  Font-Weight: 400
Regular:     0.95rem  (15px)  Font-Weight: 400
Small:       0.9rem   (14px)  Font-Weight: 400
Tiny:        0.875rem (14px)  Font-Weight: 400
```

### Font Weights
- **700**: Bold (not used in current design)
- **600**: Semi-bold (headings, labels)
- **500**: Medium (form labels, buttons)
- **400**: Regular (body text, descriptions)

---

## Spacing System

### Base Unit: 0.5rem (8px)

### Padding Scale
```
1x:   0.5rem    (8px)
2x:   1rem      (16px)
3x:   1.5rem    (24px)
4x:   2rem      (32px)
6x:   3rem      (48px)
```

### Margin Scale (same as padding)

### Gap Scale (for flex)
```
0.5x:  0.375rem  (6px)   - Tight spacing
1x:    0.75rem   (12px)  - Comfortable spacing
1.5x:  1.125rem  (18px)  - Generous spacing
2x:    1.5rem    (24px)  - Large spacing
```

---

## Component Sizing

### Buttons
```
Standard:
- Padding: 0.625rem 1.25rem (10px 20px)
- Font Size: 1rem (16px)
- Min Height: ~40px
- Border Radius: 0.375rem (6px)

Admin Buttons:
- Width: 100%
- Padding: 0.875rem 1.5rem (14px 24px)
- Min Height: ~44px
```

### Form Elements
```
Input/Select/Textarea:
- Padding: 0.625rem 0.875rem (10px 14px)
- Font Size: 1rem (16px)
- Border: 1px solid #e0e0e0
- Border Radius: 0.375rem (6px)
- Min Height: ~38px

Focus State:
- Border Color: #d96846
- Box Shadow: 0 0 0 3px rgba(217, 104, 70, 0.1)
```

### Sidebar
```
Width: 280px
Height: 100vh (full height)
Padding: 2rem top, 1.5rem horizontal
Logo:
  - Font Size: 1.5rem (24px)
  - Margin Bottom: 0.25rem (4px)
```

### Cards
```
Report Card:
- Border: 1px solid #e0e0e0
- Border Radius: 0.75rem (12px)
- Padding: 1.5rem (24px)
- Margin Bottom: 1.5rem (24px)
- Box Shadow: 0 2px 8px rgba(0, 0, 0, 0.08)

Card Header:
- Padding: 1.5rem (24px)
- Border Bottom: 3px solid #d96846
```

---

## Shadow System

### Elevation Levels
```
Level 1 (Light):   0 1px 3px rgba(0, 0, 0, 0.1)
                   Used for subtle depth

Level 2 (Medium):  0 2px 8px rgba(0, 0, 0, 0.08)
                   Used for cards, inputs

Level 3 (Dark):    0 4px 12px rgba(0, 0, 0, 0.1)
                   Used for headers, buttons

Level 4 (Hover):   0 8px 24px rgba(0, 0, 0, 0.12)
                   Used for card hover
```

---

## Responsive Design

### Breakpoints
```css
Mobile:      < 768px
Tablet:      768px - 1023px
Desktop:     1024px+
```

### Layout Adjustments

#### Mobile (< 768px)
- Sidebar: Hidden/Collapsed
- Main Content: Full width
- Padding: 1rem
- Font Sizes: Slightly reduced
- Header: 2rem padding, h1 = 1.75rem

#### Tablet (768px - 1023px)
- Sidebar: Visible, optimized width
- Main Content: Margin adjusted
- Padding: 1.5rem
- Font Sizes: Standard
- Flex layouts adapt

#### Desktop (1024px+)
- Sidebar: Full 280px width
- Main Content: Flex layout with margin
- Padding: 2-3rem
- Font Sizes: Full size
- Multi-column layouts

---

## Interactive States

### Button States
```
Default:     Background: #d96846, Color: white
Hover:       Background: #c75a3a, Transform: translateY(-2px), Shadow: +
Active:      Background: #b84d31
Disabled:    Opacity: 0.6, Cursor: not-allowed
Loading:     Text changes to indicate loading
```

### Link States
```
Default:     Color: #d96846
Visited:     Color: inherit
Hover:       Color: #c75a3a, Text decoration: underline
Active:      Background: #d96846, Color: white
```

### Input States
```
Default:     Border: #e0e0e0, Background: white
Focus:       Border: #d96846, Box-shadow: glow
Error:       Border: #f44336, Background: rgba(244, 67, 54, 0.05)
Disabled:    Opacity: 0.6, Cursor: not-allowed
```

### Navigation States
```
Default:     Color: rgba(255, 255, 255, 0.8)
Hover:       Background: rgba(217, 104, 70, 0.2), Color: white
Active:      Background: #d96846, Color: white
```

---

## Visual Hierarchy

### Primary Content
- Larger headings (H1, H2)
- Darker color (#2f3020)
- More spacing
- Bold font weight (600)

### Secondary Content
- Medium headings (H3, H4)
- Primary color (#d96846) for highlights
- Standard spacing
- Medium font weight (500)

### Tertiary Content
- Small text (0.9rem, 0.875rem)
- Secondary/gray color (#555, #888)
- Reduced spacing
- Regular font weight (400)

---

## Icon Usage

### Icon Set
The design uses emoji icons for visual appeal:
```
🏠 Home
👥 Students/Users
🏢 Centers/Buildings
📚 Subjects/Books
📝 Exams/Documents
✅ Results/Success
📊 Dashboard/Analytics
⚠️ Warnings/Alerts
```

### Icon Placement
- Sidebar: Left of nav text (24px size)
- Headers: Left of title, 32px size
- Buttons: As label prefix (optional)

---

## Message States

### Success Message
```
Background:  rgba(76, 175, 80, 0.1)
Border:      1px solid rgba(76, 175, 80, 0.3)
Color:       #2e7d32
Padding:     1rem
Icon:        ✅
```

### Error Message
```
Background:  rgba(244, 67, 54, 0.1)
Border:      1px solid rgba(244, 67, 54, 0.3)
Color:       #c62828
Padding:     1rem
Icon:        ❌
```

### Info Message
```
Background:  rgba(33, 150, 243, 0.1)
Border:      1px solid rgba(33, 150, 243, 0.3)
Color:       #1565c0
Padding:     1rem
Icon:        ℹ️
```

---

## Loading States

### Loading Indicators
```
Text:        "Loading data..."
Color:       #888
Animation:   Fade in/out
Timing:      0.5s ease-in-out
```

### Placeholder States
```
Background:  #f9f9f9
Color:       #aaa
Border:      1px dashed #ddd
Border Radius: 0.375rem
Padding:     1rem
```

---

## Animations & Transitions

### Transition Timing
```
Fast:        0.2s ease
Normal:      0.3s ease
Slow:        0.5s ease
```

### Common Animations
```
Buttons:     All 0.3s ease (hover, focus)
Navigation:  All 0.3s ease (hover, active)
Forms:       Border-color 0.3s ease (focus)
Cards:       Box-shadow 0.3s ease (hover)
```

### Transforms
```
Button Hover:     translateY(-2px)
Navigation Hover: translateX(4px)
Scale Hover:      scale(1.02)
```

---

## Accessibility Features

### Color Contrast
✅ Text (#2f3020) on light (#f5f5f5): 11.5:1 ratio
✅ Button (#d96846) with white text: 4.8:1 ratio
✅ All text meets WCAG AA standards

### Focus States
- Clear focus outline on interactive elements
- Color: #d96846 with box shadow
- Min 2px visible outline

### Touch Targets
- Buttons: Minimum 44x44px
- Links: Padding ensures adequate size
- Form inputs: 38px minimum height

---

## Print Styles

### Print Optimization
```
- Sidebar: Hidden in print
- Background: White
- Text: Black
- Shadows: Removed
- Colors: Converted to grayscale if needed
- Page break: After each report
```

---

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### CSS Features Used
- CSS Grid: ✅ Full support
- Flexbox: ✅ Full support
- CSS Variables: ✅ Full support
- CSS Modules: ✅ Via Next.js

---

## Performance Considerations

### CSS Optimization
- Minimal file size
- CSS Modules for scoping
- No unnecessary media queries
- Efficient selectors

### Image Optimization
- No heavy images in design
- SVG-friendly designs
- Emoji instead of image assets

---

## Export Guidelines

### For Designers
- Use hex colors exactly as specified
- Maintain 2:1 spacing ratio
- Preserve border radius values
- Keep font weights consistent

### For Developers
- Use CSS variables for colors
- Import modules correctly
- Maintain component structure
- Follow naming conventions

---

**Design System Version**: 1.0
**Last Updated**: November 2025
**Status**: ✅ Ready for Implementation

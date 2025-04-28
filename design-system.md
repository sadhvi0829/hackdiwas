# RhythmConnect Design System

## 🎨 Brand Identity

### Typography
- **Display Font**: Playfair Display (Headings)
  - Weights: 600, 700
  - Use for: Hero headlines, section titles
- **Primary Font**: Inter (Body)
  - Weights: 400, 500, 600
  - Use for: Body text, buttons, navigation

### Color System
```css
:root {
  /* Primary Colors */
  --primary-purple: #6D28D9;
  --primary-blue: #1E40AF;
  --accent-gold: #D4A017;
  
  /* Gradients */
  --luxury-gradient: linear-gradient(135deg, #6D28D9 0%, #1E40AF 100%);
  --gold-accent: linear-gradient(45deg, #D4A017 0%, #FCD34D 100%);
  
  /* UI Colors */
  --background-light: #FFFFFF;
  --background-dark: #0F172A;
  --surface-light: rgba(255, 255, 255, 0.95);
  --surface-dark: rgba(15, 23, 42, 0.95);
  
  /* Glass Effects */
  --glass-light: rgba(255, 255, 255, 0.1);
  --glass-dark: rgba(15, 23, 42, 0.1);
  
  /* Shadows */
  --shadow-glow: 0 0 20px rgba(109, 40, 217, 0.2);
  --shadow-elevation: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
}
```

### Component Design

#### 1. Navigation & Layout
- **Glassmorphic Header**
  - Backdrop blur: 12px
  - Height: 72px
  - Border bottom: 1px solid var(--glass-light)
  
- **Sidebar**
  - Width: 280px (expanded), 72px (collapsed)
  - Transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)
  - Hover states: Soft glow effect

#### 2. Cards & Containers
- **Teacher Profile Card**
  ```css
  .teacher-card {
    border-radius: 16px;
    background: var(--surface-light);
    box-shadow: var(--shadow-elevation);
    transition: transform 0.3s ease;
  }
  
  .teacher-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-glow);
  }
  ```

- **Dashboard Widgets**
  - Border radius: 12px
  - Padding: 24px
  - Neumorphic shadows in light mode
  - Glassmorphic effect in dark mode

#### 3. Interactive Elements
- **Buttons**
  ```css
  .button-primary {
    background: var(--luxury-gradient);
    border-radius: 8px;
    padding: 12px 24px;
    transition: all 0.3s ease;
  }
  
  .button-primary:hover {
    transform: scale(1.02);
    box-shadow: var(--shadow-glow);
  }
  ```

- **Input Fields**
  - Floating labels
  - Border: 1px solid rgba(var(--primary-purple), 0.2)
  - Focus state: Glowing outline
  - Validation animations

### Page-Specific Components

#### Login Page
```css
.login-container {
  background: var(--luxury-gradient);
  min-height: 100vh;
}

.login-card {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 40px;
}

.role-tabs {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}
```

#### Student Dashboard
- **Search Bar**
  ```css
  .search-container {
    max-width: 600px;
    transition: max-width 0.3s ease;
  }
  
  .search-container.expanded {
    max-width: 800px;
  }
  ```

- **Class Calendar**
  - Grid layout with 7 columns
  - Time slots: 60px height
  - Available slots: Subtle green glow
  - Booked slots: Purple gradient

#### Teacher Dashboard
- **Content Upload**
  ```css
  .upload-zone {
    border: 2px dashed var(--primary-purple);
    border-radius: 16px;
    background: rgba(109, 40, 217, 0.05);
    min-height: 200px;
  }
  
  .upload-zone.dragging {
    background: rgba(109, 40, 217, 0.1);
    border-color: var(--accent-gold);
  }
  ```

### Animation Guidelines

#### Micro-interactions
```css
/* Button Press */
@keyframes buttonPress {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* Success Checkmark */
@keyframes checkmark {
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
}

/* Notification Bell */
@keyframes bellRing {
  0%, 100% { transform: rotate(0); }
  25% { transform: rotate(10deg); }
  75% { transform: rotate(-10deg); }
}
```

#### Page Transitions
```css
.page-transition {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
}
```

### Responsive Design
```css
/* Breakpoints */
@media (min-width: 640px) { /* Small devices */ }
@media (min-width: 768px) { /* Medium devices */ }
@media (min-width: 1024px) { /* Large devices */ }
@media (min-width: 1280px) { /* Extra large devices */ }

/* Mobile-first approach */
.container {
  width: 100%;
  padding: 16px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding: 24px;
  }
}
```

### Accessibility Guidelines
- Color contrast ratio: Minimum 4.5:1 for normal text
- Focus states: Visible outlines for keyboard navigation
- Motion reduction: Respect `prefers-reduced-motion`
- ARIA labels for interactive elements
- Screen reader friendly headings hierarchy

### Dark Mode Implementation
```css
[data-theme="dark"] {
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --background: #0F172A;
  --surface: #1E293B;
}

[data-theme="light"] {
  --text-primary: #0F172A;
  --text-secondary: #475569;
  --background: #FFFFFF;
  --surface: #F8FAFC;
}
```

## 🎬 Implementation Notes

1. Use Framer Motion for complex animations
2. Implement lazy loading for images and videos
3. Use skeleton loading states for async content
4. Optimize assets for performance
5. Implement proper error states and loading indicators
6. Ensure smooth dark/light mode transitions
7. Test across different devices and browsers
8. Maintain consistent spacing and alignment
9. Use proper semantic HTML elements
10. Follow WCAG 2.1 guidelines for accessibility 
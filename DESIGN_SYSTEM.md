# 🎨 Cash App Currency Coach - Design System

## 📋 Table of Contents
1. [Design Tokens](#design-tokens)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Spacing System](#spacing-system)
5. [Component Library](#component-library)
6. [Interaction Patterns](#interaction-patterns)
7. [Animation Guidelines](#animation-guidelines)
8. [Responsive Breakpoints](#responsive-breakpoints)
9. [Accessibility Guidelines](#accessibility-guidelines)
10. [Implementation Guide](#implementation-guide)

---

## 🎨 Design Tokens

### Core Design Principles
- **Cash App Brand Identity**: Maintain Cash App's signature green and clean aesthetic
- **Mobile-First**: Optimized for touch interactions and mobile screens
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Lightweight and fast rendering
- **Consistency**: Unified experience across all platforms

---

## 🌈 Color Palette

### Primary Colors
```css
/* Cash App Brand Colors */
--cash-green-primary: #00D4AA;        /* Primary brand color */
--cash-green-dark: #00B894;           /* Darker variant for hover states */
--cash-green-light: #55E0C4;          /* Lighter variant for backgrounds */
--cash-green-subtle: #E8F5E8;         /* Very light for cards/insights */

/* Neutral Colors */
--neutral-900: #1a1a1a;               /* Primary text */
--neutral-800: #2d2d2d;               /* Secondary text */
--neutral-700: #4a4a4a;               /* Tertiary text */
--neutral-600: #6c757d;               /* Placeholder text */
--neutral-500: #8e8e93;                /* Disabled text */
--neutral-400: #c7c7cc;                /* Borders */
--neutral-300: #e9ecef;                /* Light borders */
--neutral-200: #f8f9fa;                /* Background */
--neutral-100: #ffffff;               /* Card backgrounds */

/* Semantic Colors */
--success-green: #28a745;             /* Positive amounts, success states */
--error-red: #dc3545;                 /* Negative amounts, error states */
--warning-orange: #fd7e14;            /* Warnings, alerts */
--info-blue: #17a2b8;                 /* Information, links */
--info-blue-light: #e3f2fd;           /* Light info backgrounds */

/* Status Colors */
--rate-up: #28a745;                   /* Positive rate changes */
--rate-down: #dc3545;                  /* Negative rate changes */
--rate-stable: #6c757d;                /* Stable rates */
```

### Color Usage Guidelines
- **Primary Green**: Main CTAs, active states, brand elements
- **Neutral 900**: Primary text, headings
- **Neutral 600**: Secondary text, labels
- **Success Green**: Positive currency amounts, profitable conversions
- **Error Red**: Negative amounts, errors, losses
- **Info Blue**: Links, informational content

---

## 📝 Typography

### Font Stack
```css
/* Primary Font - SF Pro Display (iOS) / Roboto (Android) */
--font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
                'Helvetica Neue', Arial, sans-serif;

/* Monospace Font - For currency amounts */
--font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', 
             Consolas, 'Courier New', monospace;
```

### Type Scale
```css
/* Headings */
--text-4xl: 2.25rem;    /* 36px - Page titles */
--text-3xl: 1.875rem;   /* 30px - Section headers */
--text-2xl: 1.5rem;     /* 24px - Card titles */
--text-xl: 1.25rem;     /* 20px - Subsection headers */
--text-lg: 1.125rem;    /* 18px - Large body text */

/* Body Text */
--text-base: 1rem;      /* 16px - Default body text */
--text-sm: 0.875rem;    /* 14px - Small text, captions */
--text-xs: 0.75rem;     /* 12px - Very small text, labels */

/* Font Weights */
--font-light: 300;
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
--font-extrabold: 800;
```

### Typography Usage
- **Page Titles**: `text-4xl font-bold` - Main screen headers
- **Section Headers**: `text-2xl font-semibold` - Card titles
- **Body Text**: `text-base font-normal` - Default content
- **Currency Amounts**: `text-lg font-bold font-mono` - Monetary values
- **Captions**: `text-sm font-medium` - Secondary information
- **Labels**: `text-xs font-medium` - Form labels, metadata

---

## 📏 Spacing System

### Spacing Scale (8px base unit)
```css
--space-1: 0.25rem;    /* 4px */
--space-2: 0.5rem;     /* 8px */
--space-3: 0.75rem;    /* 12px */
--space-4: 1rem;       /* 16px */
--space-5: 1.25rem;     /* 20px */
--space-6: 1.5rem;      /* 24px */
--space-8: 2rem;       /* 32px */
--space-10: 2.5rem;     /* 40px */
--space-12: 3rem;       /* 48px */
--space-16: 4rem;       /* 64px */
--space-20: 5rem;       /* 80px */
```

### Layout Spacing
- **Screen Padding**: `--space-5` (20px) - Standard screen margins
- **Card Padding**: `--space-4` (16px) - Internal card spacing
- **Component Spacing**: `--space-3` (12px) - Between related elements
- **Section Spacing**: `--space-8` (32px) - Between major sections
- **Touch Targets**: Minimum `--space-10` (40px) - For interactive elements

---

## 🧩 Component Library

### 1. Buttons

#### Primary Button
```css
.btn-primary {
  background: var(--cash-green-primary);
  color: var(--neutral-100);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border: none;
  min-height: 44px; /* Touch target */
}

.btn-primary:hover {
  background: var(--cash-green-dark);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 212, 170, 0.3);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--cash-green-primary);
  border: 2px solid var(--cash-green-primary);
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  min-height: 44px;
}
```

#### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--neutral-700);
  border: none;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}
```

### 2. Cards

#### Standard Card
```css
.card {
  background: var(--neutral-100);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--neutral-300);
}

.card-elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}
```

#### Balance Card (Special)
```css
.card-balance {
  background: var(--cash-green-primary);
  color: var(--neutral-100);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: 0 4px 16px rgba(0, 212, 170, 0.3);
}
```

### 3. Input Fields

#### Text Input
```css
.input {
  background: var(--neutral-100);
  border: 2px solid var(--neutral-300);
  border-radius: var(--radius-lg);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  color: var(--neutral-900);
  min-height: 44px;
}

.input:focus {
  border-color: var(--cash-green-primary);
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 212, 170, 0.1);
}

.input::placeholder {
  color: var(--neutral-600);
}
```

#### Currency Input (Special)
```css
.input-currency {
  font-family: var(--font-mono);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  text-align: right;
}
```

### 4. Navigation

#### Tab Bar
```css
.tab-bar {
  background: var(--neutral-100);
  border-top: 1px solid var(--neutral-300);
  padding: var(--space-2) 0;
  display: flex;
  justify-content: space-around;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-2);
  color: var(--neutral-600);
  font-size: var(--text-xs);
}

.tab-item.active {
  color: var(--cash-green-primary);
}
```

### 5. Status Indicators

#### Rate Change Indicator
```css
.rate-indicator {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: var(--font-semibold);
}

.rate-indicator.up {
  background: rgba(40, 167, 69, 0.1);
  color: var(--rate-up);
}

.rate-indicator.down {
  background: rgba(220, 53, 69, 0.1);
  color: var(--rate-down);
}

.rate-indicator.stable {
  background: rgba(108, 117, 125, 0.1);
  color: var(--rate-stable);
}
```

---

## 🎭 Interaction Patterns

### Touch Interactions
- **Tap**: Scale down to 0.95 for 150ms
- **Long Press**: Scale down to 0.9 for 300ms + haptic feedback
- **Swipe**: Smooth 300ms transitions
- **Pull to Refresh**: Elastic animation with loading indicator

### Hover States (Web)
- **Cards**: Subtle shadow increase
- **Buttons**: Color darkening + slight lift
- **Links**: Underline animation

### Focus States
- **Inputs**: Green border + subtle glow
- **Buttons**: Outline ring
- **Cards**: Subtle border highlight

---

## ✨ Animation Guidelines

### Timing Functions
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
```

### Duration Scale
```css
--duration-fast: 150ms;      /* Micro interactions */
--duration-normal: 300ms;     /* Standard transitions */
--duration-slow: 500ms;       /* Complex animations */
--duration-slower: 750ms;     /* Page transitions */
```

### Common Animations
- **Fade In**: `opacity 0 → 1` with `--duration-normal`
- **Slide Up**: `transform: translateY(20px) → translateY(0)` with `--ease-out`
- **Scale**: `transform: scale(0.95) → scale(1)` with `--spring`
- **Loading Spinner**: Continuous rotation with `--duration-slow`

---

## 📱 Responsive Breakpoints

### Mobile-First Approach
```css
/* Mobile (default) */
@media (min-width: 0px) { }

/* Large Mobile / Small Tablet */
@media (min-width: 480px) { }

/* Tablet */
@media (min-width: 768px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large Desktop */
@media (min-width: 1440px) { }
```

### Layout Grid
- **Mobile**: Single column, full width
- **Tablet**: Two columns with sidebar
- **Desktop**: Three columns with navigation sidebar

---

## ♿ Accessibility Guidelines

### Color Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **Interactive Elements**: Minimum 3:1 contrast ratio

### Touch Targets
- **Minimum Size**: 44px × 44px
- **Spacing**: 8px minimum between targets
- **Focus Indicators**: Visible on all interactive elements

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive text for all images
- **ARIA Labels**: Clear labels for interactive elements
- **Focus Management**: Logical tab order

### Motion Preferences
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🛠️ Implementation Guide

### CSS Custom Properties Setup
```css
:root {
  /* Import all design tokens */
  /* Colors, spacing, typography, etc. */
}
```

### Component Implementation
1. **Start with base styles** using design tokens
2. **Add interactive states** (hover, focus, active)
3. **Implement animations** with proper timing
4. **Test accessibility** with screen readers
5. **Validate responsive behavior** across devices

### File Organization
```
styles/
├── tokens/
│   ├── colors.css
│   ├── typography.css
│   ├── spacing.css
│   └── animations.css
├── components/
│   ├── buttons.css
│   ├── cards.css
│   ├── inputs.css
│   └── navigation.css
└── utilities/
    ├── responsive.css
    └── accessibility.css
```

---

## 🎯 Component Specifications

### Required Components for Build

#### Core Components
1. **Button** (Primary, Secondary, Ghost)
2. **Card** (Standard, Elevated, Balance)
3. **Input** (Text, Currency, Search)
4. **Navigation** (Tab Bar, Stack Navigation)
5. **Status Indicator** (Rate Change, Loading)

#### Feature Components
1. **Currency Selector** (Modal with search)
2. **Conversion Result** (Amount display with breakdown)
3. **Market Trends** (Chart-like display)
4. **AI Coach Card** (Advice display with actions)
5. **Balance Card** (Special Cash App styling)

#### Layout Components
1. **Screen Container** (Safe area, padding)
2. **Section Header** (Title + optional action)
3. **Quick Actions Grid** (2-column layout)
4. **Recent Items List** (Scrollable list)
5. **Modal Container** (Overlay with backdrop)

This design system provides everything needed to build a consistent, accessible, and beautiful Cash App Currency Coach interface! 🚀

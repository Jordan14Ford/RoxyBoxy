# 🧩 Component Specifications - Cash App Currency Coach

## 📋 Component Inventory

### Core UI Components (Required for Build)

#### 1. **Button Components**
- **Primary Button** - Main CTAs, confirmations
- **Secondary Button** - Alternative actions
- **Ghost Button** - Subtle actions, links
- **Icon Button** - Compact actions
- **Floating Action Button** - Quick access actions
- **Button Groups** - Related actions

#### 2. **Card Components**
- **Standard Card** - General content containers
- **Balance Card** - Special Cash App green styling
- **Elevated Card** - Important content
- **Interactive Card** - Clickable content
- **Status Card** - Success/error/warning states

#### 3. **Input Components**
- **Text Input** - Standard text entry
- **Currency Input** - Monetary amounts (monospace font)
- **Search Input** - Search functionality
- **Select Dropdown** - Option selection
- **Checkbox/Radio** - Multiple/single selection
- **Switch** - Toggle states

#### 4. **Navigation Components**
- **Header** - Screen titles and actions
- **Tab Bar** - Bottom navigation
- **Breadcrumbs** - Navigation path
- **Sidebar** - Desktop navigation

#### 5. **Display Components**
- **Currency Display** - Amount formatting
- **Rate Indicator** - Market trend display
- **Status Badge** - Status indicators
- **Loading States** - Spinners and skeletons
- **Empty States** - No data scenarios

---

## 🎯 Feature-Specific Components

### Currency Conversion Features

#### **CurrencySelector Component**
```typescript
interface CurrencySelectorProps {
  currency: string;
  onCurrencyChange: (currency: string) => void;
  label: string;
  style?: ViewStyle;
}
```

**Visual Specs:**
- Modal presentation with search
- Flag emojis for visual identification
- Currency codes and full names
- Search functionality
- Smooth animations

**Implementation:**
- Touch-optimized touch targets (44px min)
- Accessibility labels for screen readers
- Keyboard navigation support
- Responsive design for different screen sizes

#### **ConversionResultCard Component**
```typescript
interface ConversionResultProps {
  result: ConversionResult;
  isLoading: boolean;
  onConfirm: () => void;
  onGetCoaching: () => void;
}
```

**Visual Specs:**
- Large currency amounts (monospace font)
- Rate display with trend indicators
- Fee breakdown section
- Action buttons (Confirm, Get AI Coaching)
- Loading states with skeleton

#### **FeeBreakdownCard Component**
```typescript
interface FeeBreakdownProps {
  result: ConversionResult;
}
```

**Visual Specs:**
- Table-like layout
- Clear fee categories
- Total calculation
- Color coding for different fee types

### AI Coaching Features

#### **CoachAdviceCard Component**
```typescript
interface CoachAdviceProps {
  advice: CoachAdvice;
  onGetMoreInfo: () => void;
  onApplyRecommendation: () => void;
}
```

**Visual Specs:**
- Card with urgency indicator (color coding)
- Advice title and message
- Bulleted tips list
- Action buttons for more info/apply
- Category-based styling

#### **MarketTrendsCard Component**
```typescript
interface MarketTrendsProps {
  trends: MarketTrend[];
  onRefresh: () => void;
}
```

**Visual Specs:**
- Real-time data display
- Trend indicators (up/down/stable)
- Refresh button with loading state
- AI insights section
- Responsive grid layout

#### **PersonalizedTipsCard Component**
```typescript
interface PersonalizedTipsProps {
  tips: string[];
  onTipPress: (tip: string) => void;
}
```

**Visual Specs:**
- User-specific recommendations
- Interactive tip items
- Personalized styling
- Tap-to-expand functionality

### Home Dashboard Features

#### **BalanceCard Component**
```typescript
interface BalanceCardProps {
  balance: number;
  onRefresh: () => void;
  isLoading: boolean;
}
```

**Visual Specs:**
- Cash App green gradient background
- Large balance amount
- Refresh button with loading state
- AI spending insights section
- Pull-to-refresh gesture support

#### **QuickActionCard Component**
```typescript
interface QuickActionProps {
  title: string;
  icon: string;
  onPress: () => void;
  style?: ViewStyle;
}
```

**Visual Specs:**
- Icon and title layout
- Touch feedback animations
- Consistent sizing
- Accessibility support

#### **RecentConversionCard Component**
```typescript
interface RecentConversionProps {
  conversion: ConversionResult;
  onPress: () => void;
}
```

**Visual Specs:**
- Currency pair display
- Amount conversion
- Rate and fee information
- AI analysis indicator
- Tap-to-expand functionality

---

## 🎨 Visual Design Specifications

### Component Sizing

#### **Touch Targets**
- Minimum: 44px × 44px
- Recommended: 48px × 48px
- Large actions: 56px × 56px

#### **Card Dimensions**
- Standard: Auto-width, min-height 120px
- Balance: Full-width, height 160px
- Compact: Auto-width, min-height 80px

#### **Spacing Standards**
- Card padding: 16px
- Component spacing: 12px
- Section spacing: 24px
- Screen margins: 20px

### Color Usage

#### **Primary Actions**
- Background: `--cash-green-primary` (#00D4AA)
- Text: `--neutral-100` (#ffffff)
- Hover: `--cash-green-dark` (#00B894)

#### **Success States**
- Background: `--success-green-10` (rgba(40, 167, 69, 0.1))
- Text: `--success-green` (#28a745)
- Border: `--success-green` (#28a745)

#### **Error States**
- Background: `--error-red-10` (rgba(220, 53, 69, 0.1))
- Text: `--error-red` (#dc3545)
- Border: `--error-red` (#dc3545)

#### **Neutral States**
- Background: `--neutral-100` (#ffffff)
- Text: `--neutral-900` (#1a1a1a)
- Border: `--neutral-300` (#e9ecef)

### Typography Hierarchy

#### **Headings**
- Page Title: `text-4xl font-bold` (36px)
- Section Header: `text-2xl font-semibold` (24px)
- Card Title: `text-xl font-semibold` (20px)
- Subsection: `text-lg font-medium` (18px)

#### **Body Text**
- Default: `text-base font-normal` (16px)
- Small: `text-sm font-normal` (14px)
- Caption: `text-xs font-medium` (12px)

#### **Currency Amounts**
- Large: `text-3xl font-bold font-mono` (30px)
- Medium: `text-xl font-bold font-mono` (20px)
- Small: `text-base font-bold font-mono` (16px)

---

## 🔄 Interaction Patterns

### Touch Interactions

#### **Tap Feedback**
- Scale down to 0.95 for 150ms
- Haptic feedback on supported devices
- Visual state changes

#### **Long Press**
- Scale down to 0.9 for 300ms
- Context menu or additional options
- Stronger haptic feedback

#### **Swipe Gestures**
- Horizontal: Navigation between screens
- Vertical: Pull-to-refresh, scroll
- Smooth 300ms transitions

### Animation Guidelines

#### **Page Transitions**
- Slide in from right: 300ms ease-out
- Fade in: 200ms ease-out
- Scale in: 250ms spring animation

#### **Component Animations**
- Card hover: translateY(-2px) + shadow increase
- Button press: scale(0.95) for 150ms
- Loading spinner: continuous rotation

#### **Micro-interactions**
- Icon changes: 200ms ease-in-out
- Color transitions: 150ms ease-in-out
- Text updates: fade transition

---

## 📱 Responsive Behavior

### Breakpoint Strategy

#### **Mobile (0-480px)**
- Single column layout
- Full-width cards
- Stack navigation
- Touch-optimized interactions

#### **Large Mobile (481-768px)**
- Slightly larger touch targets
- Two-column quick actions
- Enhanced spacing

#### **Tablet (769-1024px)**
- Two-column card grid
- Sidebar navigation option
- Larger typography
- Hover states

#### **Desktop (1025px+)**
- Three-column layout
- Persistent sidebar
- Mouse interactions
- Keyboard navigation

### Component Adaptations

#### **Cards**
- Mobile: Full-width, stacked
- Tablet: Two-column grid
- Desktop: Three-column grid

#### **Navigation**
- Mobile: Bottom tab bar
- Tablet: Bottom tabs + sidebar option
- Desktop: Sidebar + top navigation

#### **Inputs**
- Mobile: Full-width, large touch targets
- Desktop: Constrained width, smaller targets

---

## ♿ Accessibility Requirements

### WCAG 2.1 AA Compliance

#### **Color Contrast**
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

#### **Keyboard Navigation**
- Tab order follows logical flow
- Focus indicators visible
- Skip links for main content

#### **Screen Reader Support**
- Semantic HTML structure
- ARIA labels for complex components
- Alt text for images
- Descriptive link text

#### **Touch Accessibility**
- Minimum 44px touch targets
- Adequate spacing between targets
- Clear visual feedback

### Implementation Checklist

- [ ] All interactive elements have focus states
- [ ] Color is not the only indicator of state
- [ ] Text scales with system preferences
- [ ] Motion respects reduced motion preferences
- [ ] All images have alt text
- [ ] Form labels are properly associated
- [ ] Error messages are clearly identified

---

## 🛠️ Implementation Priority

### Phase 1: Core Components (Week 1)
1. Button components
2. Card components
3. Input components
4. Basic navigation

### Phase 2: Feature Components (Week 2)
1. CurrencySelector
2. ConversionResultCard
3. BalanceCard
4. QuickActionCard

### Phase 3: AI Components (Week 3)
1. CoachAdviceCard
2. MarketTrendsCard
3. PersonalizedTipsCard
4. RecentConversionCard

### Phase 4: Polish & Optimization (Week 4)
1. Animation refinements
2. Accessibility improvements
3. Performance optimization
4. Cross-platform testing

This comprehensive component specification provides everything needed to build a consistent, accessible, and beautiful Cash App Currency Coach interface! 🚀

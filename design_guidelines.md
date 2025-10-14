# Design Guidelines: Use Case Tracking & Documentation Platform

## Design Approach: Data-Driven Enterprise System

**Selected Framework**: Carbon Design System + Linear-inspired refinements
**Rationale**: Enterprise-focused, data-heavy application requiring clarity, efficiency, and professional polish. Carbon excels at complex information architecture while Linear provides modern, clean data presentation patterns.

**Core Principles**:
- Clarity over decoration - information hierarchy is paramount
- Scannable data layouts with strong visual grouping
- Professional, trustworthy aesthetic for executive stakeholders
- Efficiency-first interactions with minimal friction

---

## Color Palette

### Light Mode
- **Background**: 0 0% 100% (pure white)
- **Surface**: 220 15% 97% (subtle gray)
- **Border**: 220 13% 91%
- **Primary**: 211 100% 50% (professional blue)
- **Text Primary**: 220 20% 15%
- **Text Secondary**: 220 15% 45%
- **Success**: 142 76% 36% (for "Live" status)
- **Warning**: 38 92% 50% (for "Developing" status)
- **Muted**: 220 14% 60% (for "Scoping" status)

### Dark Mode
- **Background**: 222 47% 11%
- **Surface**: 217 33% 17%
- **Border**: 217 20% 25%
- **Primary**: 211 100% 60%
- **Text Primary**: 210 20% 98%
- **Text Secondary**: 215 20% 75%
- **Success**: 142 70% 45%
- **Warning**: 38 90% 60%
- **Muted**: 220 14% 55%

---

## Typography

**Font Stack**: 
- Primary: 'Inter' (Google Fonts) - for UI and data
- Monospace: 'JetBrains Mono' - for technical specs and code references

**Scale**:
- **Hero/Dashboard Title**: text-4xl (36px), font-semibold
- **Section Headers**: text-2xl (24px), font-semibold
- **Card Titles**: text-lg (18px), font-medium
- **Body/Table Text**: text-sm (14px), font-normal
- **Metadata/Labels**: text-xs (12px), font-medium, uppercase tracking-wide
- **Numerical Data**: text-base (16px), font-medium, tabular-nums

---

## Layout System

**Spacing Primitives**: Use Tailwind units of **4, 6, 8, 12** for consistent rhythm
- Component padding: p-6 or p-8
- Section spacing: space-y-8 or space-y-12
- Card gaps: gap-6
- Table cell padding: px-4 py-3

**Grid Structure**:
- Dashboard metrics: 3-4 column grid (grid-cols-1 md:grid-cols-3 lg:grid-cols-4)
- Phase cards: 3 column grid (grid-cols-1 md:grid-cols-3)
- Use case list: Full-width responsive table with sticky headers
- Detail view: 2-column layout (8-4 split) for main content + sidebar

**Container Widths**:
- Main content: max-w-7xl mx-auto
- Detail pages: max-w-6xl mx-auto
- Table containers: w-full with horizontal scroll on mobile

---

## Component Library

### A. Dashboard Cards
- **Metric Cards**: Bordered cards with large numerical displays, icon indicators, subtle shadows
- **Status Indicators**: Colored dots (8px) with status labels
- **Phase Cards**: Elevated cards with header section, stats grid, and status badge
- **Trend Indicators**: Small arrow icons with percentage changes

### B. Data Display
- **Tables**: Striped rows, sticky headers, hover states, sortable columns with arrow indicators
- **Filters**: Pill-style filter chips with remove buttons, dropdown select menus
- **Search**: Prominent search bar with icon, border on focus
- **Pagination**: Numbered buttons with prev/next, showing "X-Y of Z results"

### C. Navigation
- **Top Bar**: Fixed header with logo, navigation links, search, user menu
- **Breadcrumbs**: Text-based path with chevron separators
- **Tabs**: Underline-style active indicator for section switching

### D. Forms & Inputs
- **Text Inputs**: Border-based with focus ring, label above
- **Select Dropdowns**: Custom styled with chevron icon
- **Checkboxes/Radio**: Carbon-style custom controls
- **Buttons**: Primary (filled), Secondary (outline), Ghost (text-only)

### E. Status & Badges
- **Priority Badges**: Tier 1-5 with distinct colors (T1: green, T2: blue, T3: purple, T4: orange, T5: gray)
- **Status Pills**: Rounded-full badges (Live: green, Developing: amber, Scoping: gray)
- **Type Tags**: Outlined rectangular tags (AI Agent, AI Prompt, Automation)

### F. Detail Components
- **Info Sections**: Labeled field groups with dividers
- **Timeline**: Vertical line with milestone markers
- **Tech Stack Chips**: Inline technology badges with icons
- **Contact Cards**: Avatar, name, role in compact format

---

## Visual Hierarchy & Patterns

**Dashboard Page**:
- Hero metrics bar (4 key stats across top)
- Phase overview cards in 3-column grid
- Recent activity feed below
- Quick action buttons prominently placed

**Use Case List**:
- Filter bar fixed below header
- Table with alternating row colors
- Hover effect reveals action buttons
- Click entire row to navigate to detail

**Detail Page**:
- Title bar with edit/delete actions
- Tabbed or sectioned content areas
- Sidebar with quick facts and team contacts
- Related use cases section at bottom

---

## Micro-interactions

**Minimal, Purposeful Motion**:
- Hover states: Subtle background color shift (50-100ms)
- Card elevations: Slight shadow increase on hover
- Loading states: Skeleton screens with shimmer effect
- Transitions: 150-200ms ease-in-out for state changes
- No decorative animations - clarity and speed prioritized

---

## Images & Iconography

**Icons**: Heroicons (outline style) via CDN
- Consistent 20px or 24px sizing
- Use sparingly for wayfinding and actions
- Status icons: CheckCircle, Clock, Cog

**Images**: Not applicable for this data-centric application - focus on data visualization and clean information design

---

## Responsive Behavior

- **Mobile (< 768px)**: Single column, collapsible filters, horizontal scroll tables
- **Tablet (768-1024px)**: 2-column grids, side-by-side layouts
- **Desktop (> 1024px)**: Full 3-4 column grids, optimal data density
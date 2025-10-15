# Use Case Tracking & Documentation Platform

## Overview

This is an enterprise-grade web application for tracking and managing AI and automation use cases across an organization. The platform provides comprehensive portfolio visibility, analytics, and implementation tracking for AI agents, AI prompts, and automation initiatives. Built with a modern TypeScript stack, it offers a data-driven interface for stakeholders to view use case status, measure impact, and manage the automation roadmap.

The application serves as a centralized hub for tracking 70+ use cases across multiple divisions, with features for filtering, searching, detailed tracking, and phased rollout planning.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript using Vite as the build tool

The frontend follows a component-based architecture with clear separation of concerns:

- **UI Components**: Built on shadcn/ui (Radix UI primitives) with custom Carbon Design System-inspired styling
- **State Management**: React Query (@tanstack/react-query) for server state management with optimistic updates and caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management
- **Styling**: Tailwind CSS with custom design tokens for enterprise aesthetics

**Design Philosophy**: The UI prioritizes clarity and data density over decoration, using a professional color palette with distinct status indicators (Live/Developing/Scoping) and a scannable layout optimized for information-heavy enterprise dashboards.

**Key Pages**:
- Dashboard: Aggregated metrics and phase-based roadmap visualization
- Use Case List: Filterable table view with search and multi-criteria filtering
- Use Case Detail: Comprehensive view with all tracking fields
- Create/Edit Forms: Full CRUD operations with validation

### Backend Architecture

**Framework**: Express.js with TypeScript running on Node.js

The backend implements a RESTful API pattern with the following characteristics:

- **API Design**: Resource-based endpoints following REST conventions (`/api/use-cases`)
- **Data Layer**: Abstracted storage interface (`IStorage`) allowing for pluggable implementations
- **Current Implementation**: In-memory storage with seed data for development
- **Validation**: Zod schemas shared between client and server for consistent validation
- **Error Handling**: Centralized error middleware with structured error responses

**API Endpoints**:
- `GET /api/use-cases` - Retrieve all use cases
- `GET /api/use-cases/:id` - Retrieve single use case
- `POST /api/use-cases` - Create new use case
- `PUT /api/use-cases/:id` - Update use case
- `DELETE /api/use-cases/:id` - Delete use case

**Architecture Decision**: The storage layer uses an interface-based design to allow easy migration from in-memory storage to a persistent database without changing business logic.

### Data Storage Solutions

**Current State**: PostgreSQL database with persistent storage using Drizzle ORM:
- Replit-hosted PostgreSQL database (Neon-backed)
- Standard node-postgres (pg) driver for reliable connections
- Drizzle ORM for type-safe database operations
- Database seeded with 8 initial use cases via `tsx server/seed.ts`

**Database Schema** (prepared for PostgreSQL):
```typescript
- users table: id, username, password
- use_cases table: id, name, division, category, status, solution_type, 
  description, benefits, impact, weekly_savings, complexity,
  tech_stack (array), phase, team_contact, effort_estimate, dependencies,
  milestones, risk_assessment, success_criteria
```

**Dropdown Options** (enforced via exported constants in shared/schema.ts):
- **Division** (12 options): Compliance, Credit, Finance, Funds Mgmt, HR, Private Equity, Real Estate - Bris, Real Estate - Melb, Real Estate - Syd, Special Sits, Txn Mgmt, Other
- **Category** (7 options): Dashboards & Reporting, Data Management, Document Generation, Notification & Alerts, Research & Analysis, Review & Quality Assurance, Workflow Automation
- **Status** (4 options): New, Scoping, Developing, Live
- **Implementation Phase** (5 options): Not Allocated, Phase 1, Phase 2, Phase 3, Phase 4
- **Impact** (3 options): Low, Medium, High
- **Solution Type** (3 options): AI Agent, AI Prompt, Automation
- **Complexity** (3 options): Low, Medium, High

**Implementation Details**:
- Storage automatically switches between MemStorage (fallback) and PostgresStorage based on DATABASE_URL presence
- Database connection uses standard `pg` driver (node-postgres) with connection pooling
- React Query configured with `staleTime: 0` to ensure fresh data on page loads
- Initial data seeding: Run `tsx server/seed.ts` to populate 8 demo use cases (skips if data exists)
- Database schema synchronized via `npm run db:push` (no manual migrations needed)

### Authentication and Authorization

**Current State**: User schema is defined but authentication is not implemented. The application currently operates without login requirements.

**Prepared Infrastructure**: User model exists with username/password fields, ready for session-based authentication implementation.

### External Dependencies

**Third-Party UI Libraries**:
- Radix UI primitives (@radix-ui/*) - Accessible, unstyled component primitives
- shadcn/ui component patterns - Pre-built component implementations
- Lucide React - Icon system
- class-variance-authority & clsx - Dynamic className management

**Database & ORM**:
- Drizzle ORM - Type-safe SQL query builder
- @neondatabase/serverless - Neon PostgreSQL serverless driver
- drizzle-kit - Schema management and migrations

**Form & Validation**:
- React Hook Form - Performance-focused form library
- Zod - TypeScript-first schema validation
- @hookform/resolvers - Zod integration for React Hook Form

**Build & Development Tools**:
- Vite - Frontend build tool and dev server
- esbuild - Backend bundling for production
- TypeScript - Type safety across the stack
- Tailwind CSS - Utility-first styling

**Quality of Life**:
- @tanstack/react-query - Server state management with caching
- date-fns - Date manipulation utilities
- wouter - Lightweight routing

**Design System Foundation**:
The application uses Carbon Design System principles with Linear-inspired refinements, implemented through custom Tailwind configuration with semantic color tokens and a carefully crafted elevation system for interactive elements.
# Architecture Requirements Document

## 🧱 System Overview
Chameleon OS is a single-page interactive portfolio application that dynamically redesigns its UI in real-time based on user interaction with a Vibe Slider. The system consists of a React-based frontend with Tailwind CSS for styling, a Node.js backend serving portfolio content via REST API, and a PostgreSQL database storing projects, case studies, and configuration data for design system states.

## 🏗 Architecture Style
Client-Server with SPA (Single Page Application)

## 🎨 Frontend Architecture
- **Framework:** React
- **State Management:** React Context API + useState/useReducer hooks for vibe state management
- **Routing:** React Router (client-side routing, though primarily single-page)
- **Build Tooling:** Vite

## 🧠 Backend Architecture
- **Approach:** Monolithic REST API server
- **API Style:** REST
- **Services:**
- Portfolio Content Service (projects, case studies, about)
- Design State Service (vibe configurations, typography, color palettes)
- Static Asset Service

## 🗄 Data Layer
- **Primary Store:** PostgreSQL
- **Relationships:** One-to-many (designer has many projects/case studies), foreign key relationships
- **Migrations:** Node database migrations (db-migrate or similar)

## ☁️ Infrastructure
- **Hosting:** Vercel (frontend), Railway/Render (backend + PostgreSQL)
- **Scaling Strategy:** Vertical scaling for single-instance use, CDN for static assets
- **CI/CD:** GitHub Actions

## ⚖️ Key Trade-offs
- SPA architecture chosen over SSR for instant 60fps animations without page reloads
- Context API over Redux for simpler state management given limited state complexity
- Pre-computed vibe configurations stored in DB rather than generative AI for performance
- Single designer scope eliminates need for multi-tenancy complexity
- Client-side animation prioritizes CSS transitions over Web Animations API for simplicity

## 📐 Non-Functional Requirements
- Sub-100ms response time for slider interactions
- Smooth 60fps animations during state transitions
- Responsive design across desktop, tablet, and mobile
- WCAG 2.1 AA accessibility compliance
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Initial page load under 2 seconds

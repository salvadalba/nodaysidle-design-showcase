# Tasks Plan — Chameleon OS

## 📌 Global Assumptions
- PostgreSQL database is available for local development
- Node.js 18+ is installed
- Frontend and backend run on different ports in development
- Images are stored locally or via CDN
- No authentication required for public endpoints

## ⚠️ Risks
- Theme transitions may cause performance issues on low-end devices
- Browser compatibility for CSS custom properties
- Database query performance without proper indexing
- Memory usage from caching all vibe configurations

## 🧩 Epics
## Database Foundation
**Goal:** Set up PostgreSQL database with schema and seed data

### ✅ Create database schema migration (2)

Write SQL migration to create projects, case_studies, vibe_configs, and about_content tables

**Acceptance Criteria**
- All 4 tables created with correct columns
- Primary keys and foreign keys defined
- Indexes on frequently queried fields

**Dependencies**
_None_
### ✅ Create seed data script (3)

Write script to populate vibe_configs with 5 preset design states and sample project data

**Acceptance Criteria**
- 5 vibe configs covering slider positions 0, 25, 50, 75, 100
- At least 3 sample projects
- 1-2 case studies
- About content entry

**Dependencies**
- Create database schema migration
### ✅ Set up database connection module (2)

Create Node.js module for PostgreSQL connection pooling and query execution

**Acceptance Criteria**
- Connection pool configured
- Parameterized query helper function
- Error handling for connection failures

**Dependencies**
_None_

## Backend API
**Goal:** Implement REST API endpoints with validation and error handling

### ✅ Set up Express server skeleton (1)

Initialize Express app with CORS, JSON parsing, and basic middleware

**Acceptance Criteria**
- Express server listening on port
- CORS configured for frontend origin
- JSON body parser enabled

**Dependencies**
_None_
### ✅ Implement GET /api/projects endpoint (2)

Fetch all projects from database and return as JSON array

**Acceptance Criteria**
- Returns 200 with projects array
- Projects contain all required fields
- Empty array returns successfully

**Dependencies**
- Set up Express server skeleton
- Set up database connection module
### ✅ Implement GET /api/projects/:id endpoint (2)

Fetch single project by UUID with 404 error handling

**Acceptance Criteria**
- Returns 200 with project object for valid ID
- Returns 404 for invalid UUID
- UUID validation before query

**Dependencies**
- Implement GET /api/projects endpoint
### ✅ Implement GET /api/case-studies endpoint (2)

Fetch all case studies ordered by order_index

**Acceptance Criteria**
- Returns 200 with caseStudies array
- Results ordered by order_index ASC
- Includes project relation data

**Dependencies**
- Implement GET /api/projects endpoint
### ✅ Implement GET /api/about endpoint (2)

Fetch about content including skills, experience, and social links

**Acceptance Criteria**
- Returns 200 with about object
- JSONB fields properly parsed
- Returns empty object if no content

**Dependencies**
- Set up database connection module
### ✅ Implement GET /api/vibes endpoint (2)

Fetch all vibe configurations for slider mapping

**Acceptance Criteria**
- Returns 200 with vibes array
- JSONB config fields properly parsed
- Cached in-memory after first load

**Dependencies**
- Set up database connection module
### ✅ Implement static asset serving (2)

Serve project images and thumbnails from /api/assets/* path

**Acceptance Criteria**
- Images served with correct MIME types
- 404 for missing assets
- Cache headers set appropriately

**Dependencies**
- Set up Express server skeleton
### ✅ Add centralized error handling middleware (2)

Create error handler returning consistent JSON error format

**Acceptance Criteria**
- All errors return { error: { code, message, details } }
- Appropriate HTTP status codes
- Logs errors with request context

**Dependencies**
- Set up Express server skeleton
### ✅ Add rate limiting middleware (1)

Implement 100 req/min rate limit per IP address

**Acceptance Criteria**
- Rate limit enforced on all API routes
- Returns 429 with retry-after header
- Uses IP address as key

**Dependencies**
- Set up Express server skeleton

## Frontend Foundation
**Goal:** Set up React app with routing and base layout

### ✅ Initialize React + Vite project (1)

Create React app with Vite, Tailwind CSS, and basic folder structure

**Acceptance Criteria**
- Vite dev server running
- Tailwind CSS configured
- Folder structure: src/components, src/pages, src/lib, src/hooks

**Dependencies**
_None_
### ✅ Set up React Router (2)

Configure client-side routing for home, projects, project detail, about pages

**Acceptance Criteria**
- Routes: /, /projects, /projects/:id, /about
- Navigation works without page reload
- 404 route defined

**Dependencies**
- Initialize React + Vite project
### ✅ Create base layout component (2)

Build app shell with header, nav, and footer

**Acceptance Criteria**
- Responsive layout
- Navigation links to all routes
- Consistent padding/margins

**Dependencies**
- Set up React Router
### ✅ Create page components (1)

Build empty page components for Home, Projects, ProjectDetail, About

**Acceptance Criteria**
- All 4 page components created
- Export default from each file
- Basic structure with headings

**Dependencies**
- Create base layout component

## API Client Layer
**Goal:** Build frontend API client with caching and error handling

### ✅ Create API client base (2)

Build fetch wrapper with base URL and JSON handling

**Acceptance Criteria**
- Configurable base URL
- Automatic JSON parsing
- Throws on HTTP errors

**Dependencies**
- Initialize React + Vite project
### ✅ Implement fetchProjects function (1)

Get all projects from /api/projects

**Acceptance Criteria**
- Returns typed projects array
- Caches result in memory
- Handles errors gracefully

**Dependencies**
- Create API client base
### ✅ Implement fetchProjectById function (1)

Get single project by ID from /api/projects/:id

**Acceptance Criteria**
- Returns typed project object
- Validates UUID format
- Returns null on 404

**Dependencies**
- Implement fetchProjects function
### ✅ Implement fetchCaseStudies function (1)

Get case studies from /api/case-studies

**Acceptance Criteria**
- Returns typed case studies array
- Caches result in memory
- Orders by order_index

**Dependencies**
- Implement fetchProjects function
### ✅ Implement fetchAbout function (1)

Get about content from /api/about

**Acceptance Criteria**
- Returns typed about object
- Caches result in memory
- Handles empty response

**Dependencies**
- Implement fetchProjects function
### ✅ Implement fetchVibes function (2)

Get vibe configs from /api/vibes with client-side caching

**Acceptance Criteria**
- Returns typed vibes array
- Caches in localStorage
- Cache invalidation after 1 hour

**Dependencies**
- Implement fetchProjects function

## Design System Core
**Goal:** Implement dynamic theming based on vibe slider

### ✅ Create vibe config type definitions (1)

Define TypeScript interfaces for vibe configuration structure

**Acceptance Criteria**
- VibeConfig interface matches API response
- Typography, Colors, Spacing types defined
- Exported from central types file

**Dependencies**
- Initialize React + Vite project
### ✅ Create useVibeState hook (2)

React hook managing slider position and current vibe

**Acceptance Criteria**
- Manages sliderPosition state (0-100)
- Derives current vibe from position
- Provides setVibePosition function

**Dependencies**
- Create vibe config type definitions
### ✅ Create getVibeConfig utility (2)

Map slider position to nearest vibe configuration

**Acceptance Criteria**
- Finds closest vibe by slider_position
- Returns default vibe if none found
- Handles edge cases (0, 100)

**Dependencies**
- Create vibe config type definitions
### ✅ Create applyTheme utility (2)

Apply CSS variables for colors, typography, spacing to root

**Acceptance Criteria**
- Sets CSS custom properties on :root
- Maps all vibe config fields to variables
- Smooth transitions via CSS

**Dependencies**
- Create getVibeConfig utility
### ✅ Create VibeProvider component (3)

Context provider wrapping app with vibe state and theme application

**Acceptance Criteria**
- Provides vibe context to children
- Applies theme on vibe change
- Preloads adjacent vibe configs

**Dependencies**
- Create useVibeState hook
- Create applyTheme utility

## Vibe Slider
**Goal:** Build interactive slider controlling theme

### ✅ Create slider UI component (2)

Build range input with visual feedback for current position

**Acceptance Criteria**
- Range input 0-100
- Visual indicator of current value
- Responsive width
- Accessible labels

**Dependencies**
- Create VibeProvider component
### ✅ Add debounced slider handler (2)

Debounce slider input with 16ms threshold for 60fps

**Acceptance Criteria**
- 16ms debounce implemented
- Updates vibe state
- Triggers theme application

**Dependencies**
- Create slider UI component
### ✅ Add slider position indicator (1)

Display current vibe name and position value

**Acceptance Criteria**
- Shows vibe name
- Shows numeric position
- Updates in real-time

**Dependencies**
- Create slider UI component

## Portfolio Pages
**Goal:** Build content pages displaying projects and about info

### ✅ Build Home page (3)

Landing page with hero section and featured projects grid

**Acceptance Criteria**
- Hero section with name/title
- Featured projects grid
- Links to project detail pages

**Dependencies**
- Create page components
- Implement fetchProjects function
### ✅ Build Projects page (3)

Grid of all projects with filters by tags

**Acceptance Criteria**
- Responsive project grid
- Tag filter buttons
- Project cards with thumbnails
- Links to detail pages

**Dependencies**
- Build Home page
### ✅ Build ProjectDetail page (3)

Single project view with full content and case studies

**Acceptance Criteria**
- Project title and description
- Full content rendered
- Related case studies listed
- Back navigation

**Dependencies**
- Build Projects page
- Implement fetchProjectById function
- Implement fetchCaseStudies function
### ✅ Build About page (2)

Personal info, skills, experience, and contact links

**Acceptance Criteria**
- Name and bio displayed
- Skills list
- Experience timeline
- Social links

**Dependencies**
- Create page components
- Implement fetchAbout function

## Performance & Animation
**Goal:** Optimize for 60fps animations and sub-100ms API responses

### ✅ Implement GPU-accelerated transitions (2)

Use CSS transforms and opacity for theme changes

**Acceptance Criteria**
- Theme transitions use transform/opacity
- Will-change property applied strategically
- No layout thrashing

**Dependencies**
- Create applyTheme utility
### ✅ Add image lazy loading (2)

Implement intersection observer for project images

**Acceptance Criteria**
- Images load on scroll
- Loading placeholder shown
- Fade-in animation on load

**Dependencies**
- Build Projects page
### ✅ Preload adjacent vibe configs (2)

Cache vibe configs for positions near current slider value

**Acceptance Criteria**
- Preloads ±10 slider positions
- Stores in memory cache
- Invalidates on slider move

**Dependencies**
- Create VibeProvider component
### ✅ Add in-memory vibe caching on backend (2)

Cache vibe configs at server startup for fast responses

**Acceptance Criteria**
- Vibes loaded into memory on startup
- API reads from cache not DB
- Cache invalidation on config change

**Dependencies**
- Implement GET /api/vibes endpoint

## Security & Validation
**Goal:** Implement security measures and input validation

### ✅ Add UUID validation middleware (2)

Validate UUID format in :id route parameters

**Acceptance Criteria**
- Validates UUID before DB query
- Returns 400 for invalid format
- Reusable middleware function

**Dependencies**
- Implement GET /api/projects/:id endpoint
### ✅ Add input sanitization (2)

Sanitize all user inputs before database queries

**Acceptance Criteria**
- Parameterized queries used
- No string concatenation in queries
- Input length limits

**Dependencies**
- Implement GET /api/projects endpoint
### ✅ Add CSP headers (1)

Implement Content Security Policy for XSS prevention

**Acceptance Criteria**
- CSP header set on all responses
- Script sources restricted
- Style sources restricted

**Dependencies**
- Set up Express server skeleton
### ✅ Add slider position validation (1)

Validate slider position is within 0-100 range

**Acceptance Criteria**
- Frontend clamps to 0-100
- Backend validates if accepting position
- Error on out-of-range values

**Dependencies**
- Create slider UI component

## Observability
**Goal:** Add logging and metrics for monitoring

### ✅ Set up Winston logger (2)

Configure structured JSON logging for backend

**Acceptance Criteria**
- JSON format logs
- Log levels: error, warn, info, debug
- Request logging middleware

**Dependencies**
- Set up Express server skeleton
### ✅ Add request ID tracking (2)

Generate and track request IDs through API calls

**Acceptance Criteria**
- Unique ID per request
- Included in logs
- Returned in response header

**Dependencies**
- Set up Winston logger
### ✅ Add API response time logging (1)

Log duration of each API request

**Acceptance Criteria**
- Logs response time in ms
- Logs slow queries (>100ms)
- Aggregate metrics available

**Dependencies**
- Add request ID tracking
### ✅ Add slider event logging (2)

Log slider interactions for performance tracking

**Acceptance Criteria**
- Logs slider position changes
- Calculates interaction latency
- Flags laggy interactions

**Dependencies**
- Add debounced slider handler

## Testing
**Goal:** Implement unit, integration, and E2E tests

### ✅ Set up test framework (2)

Configure Vitest for unit tests and Playwright for E2E

**Acceptance Criteria**
- Vitest configured
- Playwright configured
- Test scripts in package.json

**Dependencies**
- Initialize React + Vite project
### ✅ Write vibe state hook tests (2)

Unit tests for useVibeState hook

**Acceptance Criteria**
- Tests state initialization
- Tests setVibePosition
- Tests vibe derivation

**Dependencies**
- Set up test framework
- Create useVibeState hook
### ✅ Write API client tests (2)

Unit tests for API client functions

**Acceptance Criteria**
- Mocks fetch responses
- Tests success paths
- Tests error handling

**Dependencies**
- Write vibe state hook tests
- Implement fetchVibes function
### ✅ Write API endpoint integration tests (3)

Integration tests for all API endpoints

**Acceptance Criteria**
- Tests with test database
- Covers all endpoints
- Tests error responses

**Dependencies**
- Write API client tests
### ✅ Write E2E slider flow test (2)

Playwright test for slider interaction and theme change

**Acceptance Criteria**
- Tests slider movement
- Verifies theme changes
- Checks smooth transitions

**Dependencies**
- Set up test framework
- Add debounced slider handler
### ✅ Write E2E navigation tests (2)

Playwright tests for routing between pages

**Acceptance Criteria**
- Tests all routes work
- Tests back/forward navigation
- Tests direct URL access

**Dependencies**
- Write E2E slider flow test
- Set up React Router

## Accessibility & Browser Support
**Goal:** Ensure accessibility and cross-browser compatibility

### ✅ Add ARIA labels to slider (1)

Make slider accessible with proper ARIA attributes

**Acceptance Criteria**
- aria-label on slider
- aria-valuenow updates
- Keyboard navigation works

**Dependencies**
- Create slider UI component
### ✅ Add focus indicators (1)

Visible focus states for all interactive elements

**Acceptance Criteria**
- Clear focus rings
- High contrast focus color
- Consistent across components

**Dependencies**
- Create base layout component
### ✅ Test keyboard navigation (2)

Ensure all features work without mouse

**Acceptance Criteria**
- Tab order logical
- Enter/Space activate controls
- Escape closes modals

**Dependencies**
- Build Projects page
### ✅ Cross-browser testing (3)

Test on Chrome, Firefox, Safari, Edge

**Acceptance Criteria**
- All features work on Chrome
- All features work on Firefox
- All features work on Safari
- All features work on Edge

**Dependencies**
- Write E2E navigation tests
### ✅ Responsive design testing (2)

Test on mobile, tablet, desktop viewports

**Acceptance Criteria**
- Mobile (375px) works
- Tablet (768px) works
- Desktop (1920px) works
- Touch interactions work

**Dependencies**
- Cross-browser testing

## ❓ Open Questions
_None_

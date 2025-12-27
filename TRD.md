# Technical Requirements Document

## 🧭 System Context
Chameleon OS is a single-page portfolio application with React frontend, Node.js REST API backend, and PostgreSQL database. The system dynamically redesigns UI based on a Vibe Slider interaction, with pre-computed design states stored in the database for sub-100ms response times and smooth 60fps animations.

## 🔌 API Contracts
### Get All Projects
- **Method:** GET
- **Path:** /api/projects
- **Auth:** none
- **Request:** 
- **Response:** { "projects": [{ "id": "uuid", "title": "string", "description": "string", "thumbnailUrl": "string", "tags": ["string"], "createdAt": "timestamp", "featured": "boolean" }] }
- **Errors:**
_None_

### Get Project by ID
- **Method:** GET
- **Path:** /api/projects/:id
- **Auth:** none
- **Request:** 
- **Response:** { "id": "uuid", "title": "string", "description": "string", "content": "string", "imageUrl": "string", "tags": ["string"], "caseStudyUrl": "string", "createdAt": "timestamp" }
- **Errors:**
- [object Object]

### Get Case Studies
- **Method:** GET
- **Path:** /api/case-studies
- **Auth:** none
- **Request:** 
- **Response:** { "caseStudies": [{ "id": "uuid", "projectId": "uuid", "title": "string", "summary": "string", "content": "string", "imageUrl": "string", "order": "integer" }] }
- **Errors:**
_None_

### Get About Content
- **Method:** GET
- **Path:** /api/about
- **Auth:** none
- **Request:** 
- **Response:** { "name": "string", "bio": "string", "skills": ["string"], "experience": [{ "title": "string", "company": "string", "period": "string" }], "contactEmail": "string", "socialLinks": { "github": "string", "linkedin": "string", "twitter": "string" } }
- **Errors:**
_None_

### Get Vibe Configurations
- **Method:** GET
- **Path:** /api/vibes
- **Auth:** none
- **Request:** 
- **Response:** { "vibes": [{ "id": "string", "name": "string", "sliderPosition": "integer", "typography": { "fontFamily": "string", "headingSize": "string", "bodySize": "string" }, "colors": { "primary": "string", "secondary": "string", "background": "string", "text": "string", "accent": "string" }, "spacing": { "container": "string", "section": "string" }, "borderRadius": "string" }] }
- **Errors:**
_None_

### Get Static Assets
- **Method:** GET
- **Path:** /api/assets/*
- **Auth:** none
- **Request:** 
- **Response:** [binary file data]
- **Errors:**
- [object Object]

## 🧱 Modules
### Frontend App Module
- **Responsibilities:**
- Render SPA with React
- Handle client-side routing
- Manage vibe slider state
- Apply design system transitions
- **Interfaces:**
- IVibeStateProvider
- IDesignSystemApplier
- ISliderEventHandler
- **Depends on:**
- API Client Module
- Design System Module

### API Client Module
- **Responsibilities:**
- Fetch projects from backend
- Fetch case studies from backend
- Fetch about content from backend
- Fetch vibe configurations
- **Interfaces:**
- IFetchProjects
- IFetchCaseStudies
- IFetchAbout
- IFetchVibes
- **Depends on:**
_None_

### Design System Module
- **Responsibilities:**
- Map vibe slider position to design config
- Apply CSS variables for theme
- Handle smooth transitions between vibes
- **Interfaces:**
- IGetVibeConfig
- IApplyTheme
- ITransitionThemes
- **Depends on:**
_None_

### Portfolio Content Service
- **Responsibilities:**
- Serve project data
- Serve case study data
- Serve about/bio information
- **Interfaces:**
- IGetProjects
- IGetProjectById
- IGetCaseStudies
- IGetAbout
- **Depends on:**
- Database Module

### Design State Service
- **Responsibilities:**
- Serve vibe configurations
- Manage design system presets
- Handle theme-related queries
- **Interfaces:**
- IGetVibeConfigs
- IGetVibeBySliderPosition
- **Depends on:**
- Database Module

### Static Asset Service
- **Responsibilities:**
- Serve project images
- Serve thumbnails
- Serve static files
- **Interfaces:**
- IServeAsset
- **Depends on:**
- Database Module
- File System

### Database Module
- **Responsibilities:**
- Store projects data
- Store case studies data
- Store vibe configurations
- Handle database connections and queries
- **Interfaces:**
- IQuery
- IConnect
- IMigrate
- **Depends on:**
_None_

## 🗃 Data Model Notes
- Table: projects (id UUID PRIMARY KEY, title VARCHAR, description TEXT, content TEXT, image_url VARCHAR, thumbnail_url VARCHAR, tags JSONB, featured BOOLEAN DEFAULT false, created_at TIMESTAMP)
- Table: case_studies (id UUID PRIMARY KEY, project_id UUID REFERENCES projects(id), title VARCHAR, summary TEXT, content TEXT, image_url VARCHAR, order_index INTEGER, created_at TIMESTAMP)
- Table: vibe_configs (id VARCHAR PRIMARY KEY, name VARCHAR, slider_position INTEGER UNIQUE, typography JSONB, colors JSONB, spacing JSONB, border_radius VARCHAR)
- Table: about_content (id INTEGER PRIMARY KEY, name VARCHAR, bio TEXT, skills JSONB, experience JSONB, contact_email VARCHAR, social_links JSONB)

## 🔐 Validation & Security
- Validate all UUID parameters in API routes
- Sanitize all user inputs before database queries
- Implement CORS headers for frontend origin only
- Rate limit API endpoints (100 req/min per IP)
- Validate slider position range (0-100)
- Content Security Policy headers for XSS prevention
- SQL injection prevention via parameterized queries
- File upload size limits (max 5MB for images)

## 🧯 Error Handling Strategy
Centralized error handling middleware in Express returning JSON error responses with consistent format: { error: { code, message, details } }. Frontend implements error boundaries for React component failures and retry logic for failed API requests.

## 🔭 Observability
- **Logging:** Structured JSON logging with winston in backend, console logging in frontend development
- **Tracing:** Request ID tracking for API calls, user interaction logging for slider events
- **Metrics:**
- API response times
- Slider interaction latency
- Animation frame rate
- Database query duration

## ⚡ Performance Notes
- Cache vibe configurations in-memory on backend startup
- Implement client-side caching for vibe configs after initial load
- Use CSS transforms and opacity for GPU-accelerated animations
- Lazy load project images with intersection observer
- Preload critical vibe configurations for adjacent slider positions
- Debounce slider events with 16ms threshold for 60fps
- Use HTTP/2 server push for critical CSS and JS bundles
- Implement static asset CDN caching

## 🧪 Testing Strategy
### Unit
- Vibe state management hooks tests
- API client function tests
- Database query builder tests
- Theme application utility tests
### Integration
- API endpoint integration tests
- Database migration and seeding tests
- Frontend-backend data flow tests
### E2E
- Slider interaction flow tests
- Navigation between sections tests
- Responsive design viewport tests
- Cross-browser compatibility tests

## 🚀 Rollout Plan
- Phase 1: Database schema setup and initial data seeding
- Phase 2: Backend API development and testing
- Phase 3: Frontend base UI and routing implementation
- Phase 4: Vibe slider and dynamic theming integration
- Phase 5: Performance optimization and animation smoothing
- Phase 6: Accessibility audit and cross-browser testing

## ❓ Open Questions
_None_

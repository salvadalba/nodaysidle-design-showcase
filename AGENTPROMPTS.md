ROLE: Expert Database Engineer

GOAL: Create SQL migration with 4 tables, proper indexes, primary keys, and foreign keys

CONTEXT: Create PostgreSQL migration file with tables for projects, case_studies, vibe_configs, and about_content

FILES TO CREATE:
- migrations/001_create_schema.sql

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create migrations directory at project root
2. Create projects table with columns: id (UUID primary key), title (text), description (text), thumbnail_url (text), images (jsonb), tags (text[]), content (text), created_at (timestamp), updated_at (timestamp)
3. Create case_studies table with columns: id (UUID primary key), project_id (UUID references projects), title (text), description (text), challenge (text), solution (text), results (text), order_index (integer)
4. Create vibe_configs table with columns: id (UUID primary key), name (text), slider_position (integer unique), config (jsonb with typography, colors, spacing), created_at (timestamp)
5. Create about_content table with columns: id (UUID primary key), content (jsonb with name, bio, skills, experience, social_links), updated_at (timestamp)
6. Add indexes on projects.tags, case_studies.order_index, case_studies.project_id, vibe_configs.slider_position
7. Add created_at and updated_at indexes on all relevant tables

VALIDATION:
npm run build

---

ROLE: Expert Database Engineer

GOAL: Create Node.js seed script with sample vibe configs, projects, case studies, and about content

CONTEXT: Populate database with 5 vibe configs (slider positions 0, 25, 50, 75, 100), 3 sample projects, 1-2 case studies, and about content

FILES TO CREATE:
- scripts/seed.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create scripts directory at project root
2. Create seed.js that connects to PostgreSQL using pg library
3. Insert 5 vibe_configs with slider_positions at 0, 25, 50, 75, 100
4. Each vibe config should have jsonb config with: typography (font_family, font_sizes), colors (primary, secondary, background, text, accent), spacing (units)
5. Insert at least 3 sample projects with realistic portfolio data
6. Insert 1-2 case studies linked to sample projects
7. Insert about_content with name, bio, skills array, experience array, social_links object

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create db module with connection pool and parameterized query helper

CONTEXT: Create Node.js module for PostgreSQL connection pooling with parameterized query helper

FILES TO CREATE:
- server/db/index.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create server/db directory
2. Create index.js with pg Pool configuration from DATABASE_URL env var
3. Export query function that takes text and params array
4. Add error handling for connection failures
5. Add connection pool configuration with reasonable defaults (max 20 clients, idle timeout 30s)
6. Export pool instance for direct access if needed

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create Express server with CORS, JSON parser, rate limiting, and CSP middleware

CONTEXT: Initialize Express app with CORS, JSON parsing, rate limiting, and CSP headers

FILES TO CREATE:
- server/index.js
- server/middleware/cors.js
- server/middleware/rateLimiter.js
- server/middleware/csp.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create server directory
2. Create package.json in server with express, cors, express-rate-limit, dotenv dependencies
3. Create index.js with Express app, listen on PORT env var (default 3001)
4. Enable JSON body parser with express.json()
5. Set up CORS for frontend origin (http://localhost:5173)
6. Create rate limiter middleware with 100 req/min per IP
7. Create CSP middleware with strict policy for scripts and styles
8. Apply all middleware to Express app
9. Create basic /health endpoint that returns { status: 'ok' }

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create /api/projects GET endpoint returning all projects from database

CONTEXT: Fetch all projects from database and return as JSON array with proper error handling

FILES TO CREATE:
- server/routes/projects.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. Create server/routes directory
2. Create projects.js with GET / route handler
3. Use db.query() with SELECT * FROM projects ORDER BY created_at DESC
4. Return 200 status with projects array
5. Handle database errors with 500 status and error message
6. Mount router at /api/projects in server/index.js
7. Use parameterized query (no parameters needed for this query)

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create /api/projects/:id GET endpoint with UUID validation and 404 handling

CONTEXT: Fetch single project by UUID with 404 error handling and UUID validation

FILES TO CREATE:
- server/middleware/validateUuid.js

FILES TO MODIFY:
- server/routes/projects.js

DETAILED STEPS:
1. Create validateUuid middleware that validates UUID v4 format using regex
2. Return 400 with error message if invalid format
3. Add GET /:id route in projects.js router
4. Use validateUuid middleware before route handler
5. Query SELECT * FROM projects WHERE id = $1 with parameterized query
6. Return 404 if no rows returned
7. Return 200 with project object if found

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create /api/case-studies GET endpoint returning case studies ordered by order_index

CONTEXT: Fetch all case studies ordered by order_index with project relation data

FILES TO CREATE:
- server/routes/case-studies.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. Create case-studies.js router file
2. Query with JOIN to projects table to get project data
3. SELECT cs.*, p.title as project_title, p.thumbnail_url as project_thumbnail FROM case_studies cs LEFT JOIN projects p ON cs.project_id = p.id ORDER BY cs.order_index ASC
4. Return 200 with caseStudies array
5. Handle database errors with 500 status
6. Mount router at /api/case-studies in server/index.js

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create /api/about GET endpoint returning about content or empty object

CONTEXT: Fetch about content including skills, experience, and social links from about_content table

FILES TO CREATE:
- server/routes/about.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. Create about.js router file
2. Query SELECT content FROM about_content ORDER BY updated_at DESC LIMIT 1
3. If no rows, return 200 with empty object {}
4. If row found, return 200 with content JSONB parsed
5. Mount router at /api/about in server/index.js

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create /api/vibes GET endpoint with server-side in-memory caching

CONTEXT: Fetch all vibe configurations with in-memory caching at server startup

FILES TO CREATE:
- server/routes/vibes.js
- server/cache/vibeCache.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. Create server/cache directory
2. Create vibeCache.js with in-memory cache variable and init/load functions
3. Create vibes.js router file
4. Load vibes from cache on request, query DB if cache empty
5. Query SELECT * FROM vibe_configs ORDER BY slider_position
6. Call cache.init() on server startup in server/index.js
7. Return 200 with vibes array
8. Mount router at /api/vibes in server/index.js

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Set up static file serving for images at /api/assets/*

CONTEXT: Serve project images and thumbnails from /api/assets/* path with proper MIME types

FILES TO CREATE:
- server/routes/assets.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. Create public/assets directory for images
2. Create assets.js router using express.static
3. Set MIME types for images (jpg, jpeg, png, webp, gif)
4. Set cache headers with max-age of 1 day
5. Mount at /api/assets in server/index.js
6. Handle 404 for missing assets with express static default behavior

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create error handling middleware with consistent JSON error format

CONTEXT: Create error handler returning consistent JSON error format with proper status codes

FILES TO CREATE:
- server/middleware/errorHandler.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. Create errorHandler.js with 4-parameter error middleware
2. Return JSON format: { error: { code, message, details } }
3. Map error types to HTTP status codes (400 for validation, 404 for not found, 500 for server errors)
4. Log errors with request context (method, path, query)
5. Set appropriate status code from error or default to 500
6. Apply as last middleware in server/index.js after all routes

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Set up Vite + React + Tailwind CSS with folder structure

CONTEXT: Create React app with Vite, Tailwind CSS, and folder structure

FILES TO CREATE:
- client/package.json
- client/vite.config.js
- client/tailwind.config.js
- client/postcss.config.js
- client/index.html
- client/src/main.jsx
- client/src/App.jsx
- client/src/index.css

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create client directory
2. Create package.json with dependencies: vite, react, react-dom, tailwindcss, postcss, autoprefixer, react-router-dom
3. Create vite.config.js with React plugin
4. Initialize Tailwind CSS with npx tailwindcss init -p (manually create config files)
5. Configure tailwind.config.js content paths for ./index.html and ./src/**/*.{js,ts,jsx,tsx}
6. Create index.html with #root div and script to main.jsx
7. Create main.jsx with React strict mode and root render
8. Create App.jsx component
9. Create index.css with Tailwind directives (@tailwind base; @tailwind components; @tailwind utilities;)
10. Create folder structure: src/components, src/pages, src/lib, src/hooks

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Set up React Router with routes for /, /projects, /projects/:id, /about, and 404

CONTEXT: Configure client-side routing for home, projects, project detail, about pages with 404

FILES TO CREATE:
- client/src/router.jsx
- client/src/pages/Home.jsx
- client/src/pages/Projects.jsx
- client/src/pages/ProjectDetail.jsx
- client/src/pages/About.jsx
- client/src/pages/NotFound.jsx

FILES TO MODIFY:
- client/src/main.jsx

DETAILED STEPS:
1. Create router.jsx with createBrowserRouter from react-router-dom
2. Define routes: / (Home), /projects (Projects), /projects/:id (ProjectDetail), /about (About)
3. Add 404 catch-all route for NotFound page
4. Create all 5 page components with basic structure
5. Update main.jsx to use RouterProvider with router
6. Each page component should have heading and basic structure

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create Layout component with header, navigation, footer

CONTEXT: Build app shell with header, nav, footer and responsive layout

FILES TO CREATE:
- client/src/components/Layout.jsx
- client/src/components/Header.jsx
- client/src/components/Footer.jsx

FILES TO MODIFY:
- client/src/router.jsx

DETAILED STEPS:
1. Create Layout component with header, main content outlet, footer
2. Create Header component with site title and navigation links
3. Create Footer component with copyright
4. Navigation links to: Home (/), Projects (/projects), About (/about)
5. Use Tailwind classes for responsive padding and margins
6. Use Outlet in Layout for child routes
7. Wrap all routes with Layout in router.jsx

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create API client base with configurable base URL and JSON parsing

CONTEXT: Build fetch wrapper with base URL, JSON handling, and error throwing

FILES TO CREATE:
- client/src/lib/api.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create client/src/lib directory
2. Create api.js with API_BASE_URL constant (default http://localhost:3001/api)
3. Create apiRequest function taking endpoint, options
4. Handle JSON serialization of body
5. Parse response JSON automatically
6. Throw on HTTP errors with status code and message
7. Return typed JSON data on success

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create fetchProjects function with caching and error handling

CONTEXT: Create typed API function to fetch all projects with in-memory caching

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/lib/api.js

DETAILED STEPS:
1. Add Projects TypeScript type/interface (inline JSDoc or in separate types.js)
2. Create fetchProjects function using apiRequest
3. Cache results in module-level variable
4. Return cached data if available
5. Handle errors gracefully with console.error and return empty array

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create fetchProjectById with UUID validation and null return on 404

CONTEXT: Create typed API function to fetch single project by ID with UUID validation

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/lib/api.js

DETAILED STEPS:
1. Create fetchProjectById function taking id string parameter
2. Validate UUID format before API call (return null if invalid)
3. Use apiRequest with /projects/${id} endpoint
4. Return null on 404 status
5. Throw on other errors
6. Return typed Project object on success

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create fetchCaseStudies with caching and ordering

CONTEXT: Create typed API function to fetch case studies ordered by order_index with caching

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/lib/api.js

DETAILED STEPS:
1. Add CaseStudy type/interface
2. Create fetchCaseStudies function using apiRequest
3. Cache results in module-level variable
4. API returns data pre-ordered by order_index
5. Handle errors with console.error and return empty array

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create fetchAbout with caching and empty object handling

CONTEXT: Create typed API function to fetch about content with caching and empty response handling

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/lib/api.js

DETAILED STEPS:
1. Add About type/interface with skills, experience, social_links
2. Create fetchAbout function using apiRequest
3. Cache results in module-level variable
4. Return empty object {} if no content
5. Handle errors gracefully

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create fetchVibes with localStorage caching and 1 hour TTL

CONTEXT: Create typed API function to fetch vibe configs with localStorage caching (1 hour TTL)

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/lib/api.js

DETAILED STEPS:
1. Add VibeConfig type/interface matching API response
2. Create fetchVibes function using apiRequest
3. Check localStorage cache with timestamp key
4. Return cached data if within 1 hour (3600000ms)
5. Store in localStorage on fresh fetch with current timestamp
6. Handle errors with console.error and return empty array

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create type definitions for VibeConfig, Typography, Colors, Spacing

CONTEXT: Define TypeScript interfaces for vibe configuration structure

FILES TO CREATE:
- client/src/types/vibe.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create client/src/types directory
2. Create vibe.js with JSDoc type definitions (or use TypeScript if configured)
3. Define Typography type: font_family, font_sizes (h1, h2, h3, body, small)
4. Define Colors type: primary, secondary, background, text, accent
5. Define Spacing type: unit scale (xs, sm, md, lg, xl)
6. Define VibeConfig type: id, name, slider_position, config (Typography, Colors, Spacing)
7. Export all types

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create useVibeState hook with sliderPosition state and vibe derivation

CONTEXT: React hook managing slider position (0-100) and current vibe derivation

FILES TO CREATE:
- client/src/hooks/useVibeState.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create client/src/hooks directory
2. Create useVibeState.js hook
3. Manage sliderPosition state (default 50)
4. Fetch vibes on mount using fetchVibes
5. Derive current vibe from sliderPosition (find nearest vibe.slider_position)
6. Return: { sliderPosition, setSliderPosition, currentVibe, vibes }
7. Use useMemo for vibe derivation optimization

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create getVibeConfig utility to find nearest vibe by slider position

CONTEXT: Map slider position to nearest vibe configuration with edge case handling

FILES TO CREATE:
- client/src/lib/vibeUtils.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create vibeUtils.js in client/src/lib
2. Create getVibeConfig function taking sliderPosition and vibes array
3. Handle edge cases: position <= 0 returns first vibe, position >= 100 returns last vibe
4. Find vibe with minimum absolute difference to slider_position
5. Return default vibe if vibes array empty
6. Return matched vibe object

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create applyTheme utility to set CSS custom properties from vibe config

CONTEXT: Apply CSS variables for colors, typography, spacing to root with smooth transitions

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/lib/vibeUtils.js

DETAILED STEPS:
1. Add applyTheme function to vibeUtils.js
2. Take config object with Typography, Colors, Spacing
3. Set CSS custom properties on document.documentElement (:root)
4. Map typography to --font-family, --font-size-h1, --font-size-h2, --font-size-h3, --font-size-body, --font-size-small
5. Map colors to --color-primary, --color-secondary, --color-bg, --color-text, --color-accent
6. Map spacing to --spacing-xs, --spacing-sm, --spacing-md, --spacing-lg, --spacing-xl
7. Add CSS transition property for smooth theme changes

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create VibeProvider with context, theme application, and adjacent config preloading

CONTEXT: Context provider wrapping app with vibe state, theme application, and preloading

FILES TO CREATE:
- client/src/contexts/VibeContext.jsx
- client/src/components/VibeProvider.jsx

FILES TO MODIFY:
- client/src/main.jsx

DETAILED STEPS:
1. Create client/src/contexts directory
2. Create VibeContext with createContext
3. Create VibeProvider component using useVibeState hook
4. Apply theme on vibe change using applyTheme utility
5. Preload adjacent vibe configs (±10 slider positions) into memory cache
6. Provide vibe context with { sliderPosition, setSliderPosition, currentVibe }
7. Wrap App with VibeProvider in main.jsx

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Create VibeSlider component with range input and visual feedback

CONTEXT: Build range input 0-100 with visual feedback, accessibility, and responsive design

FILES TO CREATE:
- client/src/components/VibeSlider.jsx

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create VibeSlider component
2. Use HTML input type='range' with min=0, max=100, step=1
3. Get sliderPosition and setSliderPosition from useVibeState or context
4. Display visual indicator of current value
5. Style with Tailwind for responsive width
6. Add accessible label: aria-label='Vibe slider', aria-valuenow={position}

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Add 16ms debounced handler to slider with vibe state update

CONTEXT: Debounce slider input with 16ms threshold for 60fps performance

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/components/VibeSlider.jsx

DETAILED STEPS:
1. Create useDebounce hook or utility function with 16ms delay
2. Wrap setSliderPosition call in debounce function
3. Update vibe state on debounced callback
4. Trigger theme application after state update
5. Ensure smooth 60fps updates with 16ms threshold (~60fps)

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Add position indicator showing vibe name and numeric value

CONTEXT: Display current vibe name and numeric position value in real-time

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/components/VibeSlider.jsx

DETAILED STEPS:
1. Display current vibe name from currentVibe.name
2. Display numeric position value (0-100)
3. Update in real-time as slider moves
4. Style with Tailwind for clear visibility
5. Position near slider input

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Build Home page with hero and featured projects grid

CONTEXT: Landing page with hero section and featured projects grid with links

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/pages/Home.jsx

DETAILED STEPS:
1. Use fetchProjects to get projects data
2. Display hero section with name/title
3. Show featured projects grid (first 3-6 projects or marked as featured)
4. Each project card shows thumbnail, title, description
5. Link to project detail pages using React Router's Link
6. Handle loading state
7. Handle empty state

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Build Projects page with responsive grid and tag filtering

CONTEXT: Grid of all projects with tag filter buttons and links to detail pages

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/pages/Projects.jsx

DETAILED STEPS:
1. Use fetchProjects to get all projects
2. Implement tag filter state (selected tags array)
3. Filter projects by selected tags
4. Display responsive project grid (1 col mobile, 2 tablet, 3 desktop)
5. Project cards show thumbnail, title, description, tags
6. Tag filter buttons at top, toggle selection
7. Link to project detail with Link component
8. Handle loading and empty states

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Build ProjectDetail page with content, images, case studies, and back navigation

CONTEXT: Single project view with full content, images, and related case studies

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/pages/ProjectDetail.jsx

DETAILED STEPS:
1. Get id from useParams
2. Use fetchProjectById to get project data
3. Use fetchCaseStudies to get related case studies
4. Display project title, description, full content
5. Show project images gallery
6. List related case studies (filtered by project_id)
7. Add back navigation button (useNavigate or Link)
8. Show 404 state if project not found
9. Handle loading state

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Build About page with bio, skills, experience, and social links

CONTEXT: Personal info, skills list, experience timeline, and social contact links

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/pages/About.jsx

DETAILED STEPS:
1. Use fetchAbout to get about content
2. Display name and bio
3. Show skills list (array of strings with labels)
4. Show experience timeline (array with role, company, dates, description)
5. Display social links (object with platform: url pairs)
6. Handle empty/about not found state
7. Handle loading state
8. Use Tailwind for timeline styling

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Add GPU-accelerated CSS transitions for theme changes

CONTEXT: Use CSS transforms and opacity for smooth theme changes without layout thrashing

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/index.css

DETAILED STEPS:
1. Add CSS transitions on :root for color and font-related properties
2. Use transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease
3. Use transform and opacity for animations (not width/height/top/left)
4. Add will-change property strategically on elements that change frequently
5. Avoid layout thrashing by batching DOM reads and writes
6. Ensure theme variable changes trigger smooth transitions

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Add lazy loading for project images with IntersectionObserver and fade-in animation

CONTEXT: Implement intersection observer for project images with loading placeholder and fade-in

FILES TO CREATE:
- client/src/hooks/useLazyImage.js

FILES TO MODIFY:
- client/src/components/ProjectCard.jsx

DETAILED STEPS:
1. Create useLazyImage hook using IntersectionObserver
2. Track image ref and isLoaded state
3. Create ProjectCard component if not exists
4. Show loading placeholder (skeleton or gray box) while loading
5. Add fade-in animation on image load (opacity 0 to 1)
6. Apply to project thumbnails in Home and Projects pages
7. Add timeout fallback if observer doesn't trigger

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Implement adjacent vibe preloading with ±10 position cache

CONTEXT: Cache vibe configs for positions ±10 from current slider value

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/components/VibeProvider.jsx

DETAILED STEPS:
1. Add preloadVibes function to VibeProvider
2. Calculate range: currentSliderPosition ± 10 (clamped 0-100)
3. Fetch and cache vibe configs in that range
4. Store in memory cache object
5. Invalidate cache when slider moves outside preloaded range
6. Call preloadVibes when vibe changes
7. Use useMemo or useEffect for efficient preloading

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Add server startup vibe cache initialization

CONTEXT: Cache vibe configs at server startup for fast API responses

FILES TO CREATE:
_None_

FILES TO MODIFY:
- server/index.js
- server/cache/vibeCache.js

DETAILED STEPS:
1. Update vibeCache.js with sync init() function
2. Load all vibes from database on init
3. Store in module-level cache variable
4. Add get() function to retrieve from cache
5. Call vibeCache.init() on server startup in index.js
6. Update /api/vibes route to use cache instead of direct query
7. Add cache refresh endpoint or mechanism for config changes

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Create reusable UUID validation middleware for route parameters

CONTEXT: Validate UUID format in route parameters before database queries

FILES TO CREATE:
- server/middleware/validateUuid.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. If not already created, make validateUuid.js middleware
2. Validate UUID v4 format using regex: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
3. Extract param name from middleware options or use 'id' by default
4. Return 400 status with { error: { code: 'INVALID_UUID', message: 'Invalid UUID format' } } if invalid
5. Call next() if valid
6. Apply to any route with UUID parameters

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Verify and enforce parameterized queries and input validation

CONTEXT: Ensure all database queries use parameterized queries and input validation

FILES TO CREATE:
_None_

FILES TO MODIFY:
- server/db/index.js
- server/routes/projects.js
- server/routes/case-studies.js

DETAILED STEPS:
1. Review db.query() to ensure it only accepts parameterized queries
2. Verify all database calls use $1, $2, etc. placeholders (no string concatenation)
3. Add input length limits on string parameters
4. Add whitelist validation for enum-like fields (order by directions, etc)
5. Audit all route files for SQL injection vulnerabilities
6. Ensure no direct template literals in SQL queries

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Add CSP middleware with strict script and style sources

CONTEXT: Implement Content Security Policy for XSS prevention

FILES TO CREATE:
- server/middleware/csp.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. If not already created, create csp.js middleware
2. Set Content-Security-Policy header with: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; connect-src 'self'
3. Use helmet-csp or manual header setting
4. Apply to all responses in server/index.js
5. Consider adding report-only mode for development
6. Include report-uri if CSP reporting is needed

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Add slider position clamping and validation

CONTEXT: Validate slider position within 0-100 range on frontend

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/components/VibeSlider.jsx
- client/src/hooks/useVibeState.js

DETAILED STEPS:
1. Clamp sliderPosition to 0-100 in useVibeState setter
2. Add validation in setSliderPosition function
3. Log warning if out-of-range value attempted
4. Ensure HTML input min=0, max=100 enforces bounds
5. Add defensive checks in applyTheme for valid config

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Set up Winston logger with JSON format and request logging middleware

CONTEXT: Configure structured JSON logging for backend with request middleware

FILES TO CREATE:
- server/logger.js
- server/middleware/requestLogger.js

FILES TO MODIFY:
- server/index.js

DETAILED STEPS:
1. Add winston dependency to server/package.json
2. Create logger.js with winston.createLogger
3. Configure JSON format for production, simple format for development
4. Log levels: error, warn, info, debug
5. Create requestLogger middleware to log all requests
6. Log method, path, query, params
7. Apply requestLogger middleware in server/index.js
8. Export logger for use in routes and error handlers

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Add request ID middleware with UUID generation and header/response

CONTEXT: Generate unique request IDs, track through API calls, include in logs and headers

FILES TO CREATE:
- server/middleware/requestId.js

FILES TO MODIFY:
- server/index.js
- server/logger.js
- server/middleware/requestLogger.js

DETAILED STEPS:
1. Create requestId.js middleware using crypto.randomUUID() or uuid package
2. Generate unique ID per request
3. Store in req.id
4. Return X-Request-ID header in response
5. Include request ID in all log entries
6. Update requestLogger to include req.id
7. Apply middleware early in request pipeline in index.js
8. OPTIONAL: add uuid dependency if crypto.randomUUID unavailable

VALIDATION:
npm run build

---

ROLE: Expert Backend Engineer

GOAL: Add response time logging with slow query detection (>100ms)

CONTEXT: Log duration of each API request with slow query flagging

FILES TO CREATE:
_None_

FILES TO MODIFY:
- server/middleware/requestLogger.js

DETAILED STEPS:
1. Add res.startTime = Date.now() at request start
2. Calculate duration in response handler or finish event
3. Log duration in milliseconds with each request
4. Flag slow requests (>100ms) with warn level log
5. Include request ID in timing logs
6. Add aggregate metrics tracking (optional: simple counter for slow requests)

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Add slider interaction logging with performance tracking

CONTEXT: Log slider position changes with interaction latency tracking

FILES TO CREATE:
- client/src/lib/logger.js

FILES TO MODIFY:
- client/src/components/VibeSlider.jsx

DETAILED STEPS:
1. Create simple logger.js for frontend logging
2. Add performance tracking to slider handler
3. Record timestamp when slider movement starts
4. Calculate latency when vibe is applied
5. Log slider position changes
6. Flag laggy interactions (>100ms latency)
7. Use console.debug for development, consider sending to backend in production
8. Include event name, position, latency in logs

VALIDATION:
npm run build

---

ROLE: Expert Test Engineer

GOAL: Set up Vitest and Playwright with test scripts

CONTEXT: Configure Vitest for unit tests and Playwright for E2E tests

FILES TO CREATE:
- client/vitest.config.js
- client/playwright.config.js
- client/src/__tests__/example.test.js

FILES TO MODIFY:
- client/package.json

DETAILED STEPS:
1. Add @vitest/ui, vitest, @playwright/test dependencies to client/package.json
2. Create vitest.config.js with test environment and coverage settings
3. Create playwright.config.js with browser settings and base URL
4. Add test scripts to package.json: test, test:ui, test:e2e
5. Create example.test.js with basic test case
6. Set up test directory structure: src/__tests__, e2e/
7. Configure coverage reporting if needed

VALIDATION:
npm run build

---

ROLE: Expert Test Engineer

GOAL: Write unit tests for useVibeState hook with React Testing Library

CONTEXT: Unit tests for useVibeState hook state initialization, setter, and derivation

FILES TO CREATE:
- client/src/__tests__/hooks/useVibeState.test.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Install @testing-library/react if not present
2. Create useVibeState.test.js
3. Test state initialization (sliderPosition defaults to 50)
4. Test setSliderPosition updates state
5. Test vibe derivation from slider position
6. Test edge cases (position 0, position 100)
7. Mock fetchVibes API call
8. Test loading state handling
9. Use describe, test, expect from Vitest

VALIDATION:
npm run test

---

ROLE: Expert Test Engineer

GOAL: Write unit tests for API client with fetch mocking

CONTEXT: Unit tests for API client functions with mocked fetch responses

FILES TO CREATE:
- client/src/__tests__/lib/api.test.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create api.test.js
2. Mock global.fetch using vi.stubGlobalFetch or similar
3. Test fetchProjects success path with mocked data
4. Test fetchProjectById with valid and invalid IDs
5. Test fetchCaseStudies success path
6. Test fetchAbout success and empty response
7. Test fetchVibes with caching logic
8. Test error handling for each function (500, 404, network errors)
9. Verify caching behavior for in-memory and localStorage
10. Clean up mocks after each test

VALIDATION:
npm run test

---

ROLE: Expert Test Engineer

GOAL: Write integration tests for API endpoints with test database

CONTEXT: Integration tests for all API endpoints with test database

FILES TO CREATE:
- server/tests/api.integration.test.js
- server/tests/setup.js

FILES TO MODIFY:
- server/package.json

DETAILED STEPS:
1. Add supertest, vitest dependencies to server/package.json
2. Create test setup file for database connection and seeding
3. Create api.integration.test.js
4. Test GET /api/projects returns array
5. Test GET /api/projects/:id with valid and invalid IDs
6. Test GET /api/case-studies ordering
7. Test GET /api/about with and without content
8. Test GET /api/vibes returns configs
9. Test static asset serving
10. Test error responses (404, 400, 500)
11. Clean up database after tests
12. Use test database URL environment variable

VALIDATION:
npm run test

---

ROLE: Expert Test Engineer

GOAL: Write E2E test for slider interaction and theme changes

CONTEXT: Playwright test for slider interaction and theme change verification

FILES TO CREATE:
- client/e2e/slider.spec.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create slider.spec.js in e2e directory
2. Navigate to home page
3. Locate slider element
4. Test slider movement to position 0, verify theme change
5. Test slider movement to position 50, verify theme change
6. Test slider movement to position 100, verify theme change
7. Verify CSS custom properties update
8. Verify smooth transitions (check transition CSS)
9. Test debounced behavior (rapid movements)
10. Take screenshots for visual regression (optional)

VALIDATION:
npm run test:e2e

---

ROLE: Expert Test Engineer

GOAL: Write E2E tests for all routes and navigation patterns

CONTEXT: Playwright tests for routing between pages, back/forward, direct URL access

FILES TO CREATE:
- client/e2e/navigation.spec.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create navigation.spec.js in e2e directory
2. Test / route loads home page
3. Test /projects route loads projects page
4. Test /about route loads about page
5. Test /projects/:id route with valid ID loads project detail
6. Test /projects/:id with invalid ID shows 404
7. Test navigation links work (click nav items)
8. Test browser back button
9. Test browser forward button
10. Test direct URL access to all routes
11. Test 404 route for invalid paths

VALIDATION:
npm run test:e2e

---

ROLE: React Frontend Specialist

GOAL: Add ARIA attributes and keyboard support to slider

CONTEXT: Make slider accessible with proper ARIA attributes and keyboard navigation

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/components/VibeSlider.jsx

DETAILED STEPS:
1. Add aria-label='Theme vibe slider' to input
2. Add aria-valuenow={sliderPosition} to input
3. Add aria-valuemin='0' to input
4. Add aria-valuemax='100' to input
5. Ensure keyboard navigation works (arrow keys, Page Up/Down, Home/End)
6. Test with screen reader (verify it announces value changes)
7. Add visual focus indicator

VALIDATION:
npm run build

---

ROLE: React Frontend Specialist

GOAL: Add consistent focus indicators across all interactive elements

CONTEXT: Visible focus states for all interactive elements with consistent styling

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/src/index.css

DETAILED STEPS:
1. Add global focus-visible styles in index.css
2. Use :focus-visible pseudo-class for keyboard focus only
3. Add outline/ring with high contrast color
4. Apply consistent focus style to: buttons, links, inputs, slider
5. Add focus states to navigation links
6. Add focus states to project cards (when keyboard navigable)
7. Test with Tab keyboard navigation
8. Consider using Tailwind's focus:ring utilities

VALIDATION:
npm run build

---

ROLE: Expert Test Engineer

GOAL: Verify keyboard navigation works for all features

CONTEXT: Ensure all features work without mouse including tab order, enter/space, escape

FILES TO CREATE:
- client/e2e/keyboard.spec.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create keyboard.spec.js in e2e directory
2. Test Tab order through page (nav, content, slider)
3. Test Enter/Space activates buttons and links
4. Test Arrow keys control slider
5. Test Home/End keys on slider
6. Test Page Up/Down keys on slider
7. Test Escape closes any modals (if added)
8. Verify logical tab order (visual top-left to bottom-right)
9. Test focus trap in any interactive components

VALIDATION:
npm run test:e2e

---

ROLE: Expert Test Engineer

GOAL: Configure and run Playwright tests on Chrome, Firefox, Safari, Edge

CONTEXT: Test all features work on Chrome, Firefox, Safari, Edge browsers

FILES TO CREATE:
_None_

FILES TO MODIFY:
- client/playwright.config.js

DETAILED STEPS:
1. Update playwright.config.js to include all browsers
2. Configure projects: chromium, firefox, webkit (Safari), edge (chromium channel)
3. Update existing E2E tests to run on all browsers
4. Test slider functionality on all browsers
5. Test navigation on all browsers
6. Test theme transitions on all browsers
7. Test responsive layouts on all browsers
8. Add browser-specific checks if needed (CSS custom properties support)
9. Run full test suite on all browsers

VALIDATION:
npm run test:e2e

---

ROLE: Expert Test Engineer

GOAL: Test responsive design across mobile, tablet, desktop viewports

CONTEXT: Test on mobile (375px), tablet (768px), desktop (1920px) viewports with touch

FILES TO CREATE:
- client/e2e/responsive.spec.js

FILES TO MODIFY:
_None_

DETAILED STEPS:
1. Create responsive.spec.js in e2e directory
2. Test mobile viewport (375x667)
3. Test tablet viewport (768x1024)
4. Test desktop viewport (1920x1080)
5. Verify project grid responsive columns (1/2/3)
6. Verify navigation responsive behavior (hamburger menu if added)
7. Test slider touch interactions on mobile viewport
8. Test all pages render correctly at each viewport
9. Test landscape and portrait orientations for mobile
10. Verify text is readable at all sizes

VALIDATION:
npm run test:e2e

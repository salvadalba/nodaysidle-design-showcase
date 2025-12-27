## 🧭 Global Rules

### ✅ Do
- Use the exact stack: React, Tailwind CSS, Node.js, REST API, PostgreSQL
- Keep solutions simple and focused
- Use parameterized queries for all database operations
- Implement proper error handling with consistent JSON responses
- Use CSS custom properties for dynamic theming
- Cache vibe configurations in-memory on backend
- Use localStorage for vibe caching on frontend
- Implement GPU-accelerated animations with transforms and opacity
- Add ARIA labels for accessibility
- Log all API requests with request IDs and response times

### ❌ Don’t
- Do not introduce alternative technologies (Next.js, Prisma, etc.)
- Do not create authentication (public endpoints only)
- Do not use string concatenation in database queries
- Do not add features beyond the acceptance criteria
- Do not invent ports (use defaults)
- Do not add unnecessary abstractions for one-time operations
- Do not create documentation files unless explicitly requested

## 🧩 Task Prompts
## Create database schema migration

**Context**
Create PostgreSQL migration file with tables for projects, case_studies, vibe_configs,
and about_content

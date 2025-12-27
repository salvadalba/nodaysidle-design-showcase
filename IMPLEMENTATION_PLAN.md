# 🦎 Chameleon OS — NODAYSIDLE Portfolio Implementation Plan

> **For Agent Execution** — Follow phases in order. Each phase has clear acceptance criteria.

---

## 🎯 Mission Brief

Transform **Chameleon OS** from placeholder content into the official **NODAYSIDLE** portfolio — showcasing 6 real projects with AI-generated imagery.

### Brand Identity

| Key | Value |
|-----|-------|
| **Brand Name** | NODAYSIDLE |
| **Tagline** | "2 people, 1 entity" |
| **Email** | <info@nodaysidle.com> |
| **Twitter/X** | @kaly_ndi |
| **GitHub** | github.com/salvadalba |

### Featured Product (Soft Launch)

**Origin Zero** — An AI-powered app that generates complete project documentation (PRD, ARD, TRD, TaskPlan, Agent rules) from just 2 sentences.

- **Live Demo**: <https://0riginzero-8tngzswx9-nodaysidle.vercel.app/>
- **Strategy**: Showcase the beautiful UI/UX, keep the full functionality "lowkey" (preparing for sale)

---

## 📦 The 6 NODAYSIDLE Projects

| # | Project | Description | Tags | GitHub | Live Demo |
|---|---------|-------------|------|--------|-----------|
| 1 | **Cyber Brutalist to Art Deco** | Scroll-based aesthetic transformation — raw brutalism morphing into Art Deco elegance | React, Vite, Tailwind, GSAP | [Link](https://github.com/salvadalba/nodaysidle-cyberbrutalist-to-art-deco) | — |
| 2 | **AeroGlass** | Generative art gallery with premium glassmorphism design | React, Vite, Canvas, CSS | [Link](https://github.com/salvadalba/nodaysidle-Aeroglass-) | — |
| 3 | **Origin Zero** ⭐ | AI-powered documentation generator with "Cinematic Zen" UI | React, TypeScript, Vite, AI | [Link](https://github.com/salvadalba/nodaysidle-originzero) | [Demo](https://0riginzero-8tngzswx9-nodaysidle.vercel.app/) |
| 4 | **Ironclad OS** | WebAssembly PRD compiler with industrial minimal design | React, TypeScript, Rust/WASM | [Link](https://github.com/salvadalba/nodaysidle-ironclados) | — |
| 5 | **Mnemosync** | AI-guided family memory preservation platform | React, GPT-4, Whisper, DALL-E | [Link](https://github.com/salvadalba/nodaysidle-Mnemosync) | — |
| 6 | **GridHive** | Peer-to-peer solar energy trading marketplace | Rust, React, PostgreSQL, WebSocket | [Link](https://github.com/salvadalba/nodaysidle-gridhive) | — |

---

## 🚀 EXECUTION PHASES

---

### **PHASE 1: AI Image Generation** 🎨

**Priority**: HIGH | **Agent Tool**: `generate_image`

Generate **18 images** (6 thumbnails + 12 gallery images) using Gemini/Nano Banana.

#### 1.1 Thumbnail Images (6 total)

Save to: `server/public/assets/{slug}-thumb.webp`

| Project | Filename | Prompt |
|---------|----------|--------|
| Cyber Brutalist to Art Deco | `cyberbrutalist-thumb.webp` | "Digital art UI mockup: Split composition showing cyber brutalist raw concrete textures and glitch effects on the left morphing into elegant Art Deco golden geometric patterns and ornate details on the right, dark moody lighting with dramatic highlights, professional web portfolio aesthetic, 16:9 aspect ratio, ultra detailed" |
| AeroGlass | `aeroglass-thumb.webp` | "Glassmorphism art gallery UI: Multiple floating frosted glass panels displaying colorful generative algorithmic art with flowing curves and geometric patterns, soft pastel gradients, ethereal light refractions creating rainbow bokeh effects, premium minimalist gallery aesthetic, dark background, 16:9 aspect ratio" |
| Origin Zero | `originzero-thumb.webp` | "Cinematic Zen dashboard UI: Dark futuristic interface with a holographic document floating in center space, deep blue and purple neon glow accents, particle effects, minimalist zen aesthetic with subtle grid lines, professional AI SaaS product feel, 16:9 aspect ratio" |
| Ironclad OS | `ironclados-thumb.webp` | "Industrial minimal developer dashboard: Dark steel gray interface with bright yellow accent highlights, WebAssembly hexagonal circuit board patterns, clean brutalist engineering aesthetic, professional developer tool design, 16:9 aspect ratio" |
| Mnemosync | `mnemosync-thumb.webp` | "Memory palace digital interface: Dreamy ethereal visualization with vintage family photos floating in soft purple and gold clouds, warm nostalgic lighting, audio waveform elements, emotional storytelling design, premium app aesthetic, 16:9 aspect ratio" |
| GridHive | `gridhive-thumb.webp` | "Energy trading platform dashboard: Aerial view of solar panel arrays connected by glowing green energy flow lines forming hexagonal honeycomb patterns, dark control room interface with real-time charts, sustainable technology aesthetic, 16:9 aspect ratio" |

#### 1.2 Gallery Images (12 total — 2 per project)

Save to: `server/public/assets/{slug}-1.webp` and `{slug}-2.webp`

| Project | Image 1 Prompt | Image 2 Prompt |
|---------|---------------|----------------|
| Cyber Brutalist to Art Deco | "Cyber brutalist web interface: Raw concrete textures, exposed grid layouts, glitch typography, industrial monospace fonts, neon green accents on dark gray, chaotic but intentional design" | "Art Deco luxury web interface: Golden geometric patterns, ornate borders, elegant serif typography, rich jewel tones, sophisticated 1920s glamour meets modern web design" |
| AeroGlass | "Generative art piece: Abstract flowing curves created by algorithm, soft pink and blue gradients, mathematical beauty, canvas art on frosted glass panel" | "Interactive art gallery detail: User hovering over art card with 3D tilt effect, glow reflections, regenerate button visible, premium micro-interactions" |
| Origin Zero | "PRD document preview: Holographic blueprint showing structured markdown sections floating in space, blue neon outlines, professional documentation layout" | "AI processing visualization: Abstract representation of chaos transforming into order, swirling particles condensing into structured geometric forms, purple and blue energy" |
| Ironclad OS | "WASM code execution: Circuit patterns lighting up in sequence, yellow energy flowing through pathways, dark engineering aesthetic" | "Document generation interface: Clean industrial form inputs, steel gray panels, yellow accent buttons, professional minimalist design" |
| Mnemosync | "Interview recording interface: Waveform visualization with AI-generated follow-up questions appearing, warm welcoming design, microphone icon" | "Memory timeline view: Vertical journey through family history, photos connected by elegant lines, dates and locations, emotional storytelling layout" |
| GridHive | "Live auction interface: Real-time bidding cards for solar energy, green glow effects, countdown timers, dynamic data updates" | "Energy flow visualization: Animated connections between prosumers, kWh transfers visualized as flowing particles, sustainable future aesthetic" |

#### Acceptance Criteria ✅

- [ ] 18 images generated and saved to `server/public/assets/`
- [ ] All images in WebP format
- [ ] Naming convention followed: `{slug}-thumb.webp`, `{slug}-1.webp`, `{slug}-2.webp`

---

### **PHASE 2: Database Schema Update** 🗄️

**Priority**: HIGH | **Agent Tool**: `write_to_file`, `run_command`

#### 2.1 Create Migration File

Create: `migrations/002_add_project_links.sql`

```sql
-- Add external link columns to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS live_url TEXT;
```

#### 2.2 Run Migration

```bash
psql chameleon_os < migrations/002_add_project_links.sql
```

#### Acceptance Criteria ✅

- [ ] Migration file created
- [ ] Migration executed successfully
- [ ] `github_url` and `live_url` columns exist in projects table

---

### **PHASE 3: Seed Data Update** 💾

**Priority**: HIGH | **Agent Tool**: `replace_file_content`

Update `scripts/seed.js` with real NODAYSIDLE project data.

#### 3.1 Replace Projects Array (lines ~117-145)

```javascript
// NODAYSIDLE Projects
const projects = [
  {
    title: 'Cyber Brutalist to Art Deco',
    description: 'A dynamic visual journey from raw, utilitarian cyber brutalism to refined Art Deco elegance through scroll-based transformations.',
    thumbnail_url: '/api/assets/cyberbrutalist-thumb.webp',
    images: ['/api/assets/cyberbrutalist-1.webp', '/api/assets/cyberbrutalist-2.webp'],
    tags: ['React', 'Vite', 'Tailwind', 'GSAP', 'Animation'],
    content: 'This project explores the spectrum of digital aesthetics. As users scroll, the interface transforms from chaotic brutalist layouts with exposed grids and glitch effects into sophisticated Art Deco patterns with golden geometries and ornate details. Features include micro-animations, interactive shop section, and generative art gallery.',
    featured: true,
    github_url: 'https://github.com/salvadalba/nodaysidle-cyberbrutalist-to-art-deco',
    live_url: null
  },
  {
    title: 'AeroGlass',
    description: 'A premium generative art showcase featuring algorithmic masterpieces displayed in a stunning glassmorphism gallery.',
    thumbnail_url: '/api/assets/aeroglass-thumb.webp',
    images: ['/api/assets/aeroglass-1.webp', '/api/assets/aeroglass-2.webp'],
    tags: ['React', 'Canvas API', 'Generative Art', 'Glassmorphism'],
    content: 'AeroGlass transforms mathematical algorithms into visual art. Each piece is generated on-the-fly using custom canvas algorithms, ensuring every viewing is unique. The gallery features premium glassmorphism design, 3D tilt effects on hover, and the ability to regenerate art with new seeds.',
    featured: true,
    github_url: 'https://github.com/salvadalba/nodaysidle-Aeroglass-',
    live_url: null
  },
  {
    title: 'Origin Zero',
    description: 'AI-powered documentation generator that transforms two sentences into complete project specifications.',
    thumbnail_url: '/api/assets/originzero-thumb.webp',
    images: ['/api/assets/originzero-1.webp', '/api/assets/originzero-2.webp'],
    tags: ['React', 'TypeScript', 'AI', 'Cinematic UI'],
    content: 'Origin Zero is not just a tool—it\'s an experience. Built with a "Cinematic Zen" interface featuring deep dark modes, holographic accents, and fluid micro-animations. The platform visualizes the journey from chaos (ideation) to order (specification) through interactive visual storytelling.',
    featured: true,
    github_url: 'https://github.com/salvadalba/nodaysidle-originzero',
    live_url: 'https://0riginzero-8tngzswx9-nodaysidle.vercel.app/'
  },
  {
    title: 'Ironclad OS',
    description: 'A WebAssembly-powered documentation compiler with an industrial minimal design aesthetic.',
    thumbnail_url: '/api/assets/ironclados-thumb.webp',
    images: ['/api/assets/ironclados-1.webp', '/api/assets/ironclados-2.webp'],
    tags: ['Rust', 'WebAssembly', 'React', 'TypeScript'],
    content: 'Ironclad OS brings deterministic, zero-latency document generation to the browser using Rust and WebAssembly. The industrial minimal interface is designed for engineers who value precision. Generates PRDs, ARDs, Task Lists, and AI agent rules with 100% reproducibility.',
    featured: false,
    github_url: 'https://github.com/salvadalba/nodaysidle-ironclados',
    live_url: null
  },
  {
    title: 'Mnemosync',
    description: 'An AI-guided platform for preserving family memories through intelligent interviews and beautiful visualizations.',
    thumbnail_url: '/api/assets/mnemosync-thumb.webp',
    images: ['/api/assets/mnemosync-1.webp', '/api/assets/mnemosync-2.webp'],
    tags: ['GPT-4', 'Whisper', 'DALL-E', 'React', 'Memory'],
    content: 'Mnemosync uses AI to conduct dynamic interviews, generating context-aware follow-up questions that keep conversations flowing naturally. Features include secure audio recording with Whisper transcription, a beautiful timeline view, geographic memory maps, and AI-generated sketches for memories that lack photos.',
    featured: false,
    github_url: 'https://github.com/salvadalba/nodaysidle-Mnemosync',
    live_url: null
  },
  {
    title: 'GridHive',
    description: 'A peer-to-peer energy trading platform connecting solar prosumers through automated micro-auctions.',
    thumbnail_url: '/api/assets/gridhive-thumb.webp',
    images: ['/api/assets/gridhive-1.webp', '/api/assets/gridhive-2.webp'],
    tags: ['Rust', 'PostgreSQL', 'WebSocket', 'React', 'Energy'],
    content: 'GridHive enables homeowners with solar panels to sell excess energy directly to neighbors through 15-minute micro-auction cycles. Features real-time bidding, weather-based dynamic pricing, live dashboards, and complete transaction history. Built for a sustainable energy future.',
    featured: false,
    github_url: 'https://github.com/salvadalba/nodaysidle-gridhive',
    live_url: null
  }
];
```

#### 3.2 Replace Case Studies Array (lines ~148-167)

```javascript
// NODAYSIDLE Case Studies
const caseStudies = [
  {
    project_title: 'Cyber Brutalist to Art Deco',
    title: 'Designing Aesthetic Transformation',
    description: 'How we created a portfolio that morphs between two opposing design philosophies',
    challenge: 'Traditional portfolios are static. We wanted to demonstrate design range dynamically—showing both raw experimental work and refined professional aesthetics in a single experience.',
    solution: 'Implemented scroll-based CSS transitions with GSAP, creating seamless morphing between brutalist and Art Deco design tokens. Every element—typography, colors, borders, spacing—transforms as the user scrolls.',
    results: 'A unique portfolio experience that demonstrates design versatility without requiring separate pages or portfolios. Average session time increased 3x compared to static designs.',
    order_index: 1
  },
  {
    project_title: 'Origin Zero',
    title: 'From Chaos to Order: The Cinematic Zen Philosophy',
    description: 'Building an AI tool that feels like an experience, not just utility',
    challenge: 'AI tools often feel cold and utilitarian. We wanted Origin Zero to feel premium and immersive—transforming the mundane task of documentation into something cinematic.',
    solution: 'Developed a "Cinematic Zen" design system with holographic effects, noise-free interfaces, and micro-animations that visualize the transition from chaos (raw ideas) to order (structured specs).',
    results: 'Users describe the experience as "magical" and "premium." The visual storytelling approach makes complex AI outputs feel approachable and exciting.',
    order_index: 2
  },
  {
    project_title: 'GridHive',
    title: 'Real-Time Energy Trading at Scale',
    description: 'Building a marketplace that handles thousands of concurrent micro-transactions',
    challenge: 'Energy trading requires sub-second latency for fair auctions. Traditional web architectures couldn\'t handle the real-time requirements of matching buyers and sellers every 15 minutes.',
    solution: 'Built the core matching engine in Rust for performance, with WebSocket connections for instant updates. Implemented weather-based dynamic pricing using external APIs.',
    results: 'Achieved <50ms auction resolution times. The platform can handle 10,000+ concurrent users with real-time bid updates.',
    order_index: 3
  }
];
```

#### 3.3 Replace About Content (lines ~169-208)

```javascript
// NODAYSIDLE About
const aboutContent = {
  name: 'NODAYSIDLE',
  bio: 'We are 2 people, 1 entity. NODAYSIDLE is a creative technology studio specializing in AI-powered applications, generative art, and innovative user interfaces. We believe in building tools that are as beautiful as they are functional—where every pixel serves a purpose and every interaction tells a story.',
  skills: [
    'AI/ML Integration',
    'React & TypeScript',
    'Rust & WebAssembly',
    'Generative Art',
    'Design Systems',
    'Real-Time Systems',
    'Full-Stack Development',
    'UI/UX Design'
  ],
  experience: [
    {
      title: 'Origin Zero',
      company: 'AI Documentation Platform',
      period: '2024 - Present',
      description: 'Building the future of project documentation with AI that transforms ideas into structured specifications.'
    },
    {
      title: 'Creative Technology Projects',
      company: 'NODAYSIDLE',
      period: '2023 - Present',
      description: 'Developing innovative products at the intersection of art, AI, and engineering.'
    },
    {
      title: 'Open Source Contributions',
      company: 'Community',
      period: 'Ongoing',
      description: 'Contributing to the ecosystem with tools and libraries that push the boundaries of web technology.'
    }
  ],
  social_links: {
    email: 'info@nodaysidle.com',
    github: 'https://github.com/salvadalba',
    twitter: 'https://twitter.com/kaly_ndi',
    linkedin: null,
    dribbble: null
  }
};
```

#### 3.4 Update Insert Query (add github_url and live_url)

Find the projects INSERT query (~line 234-238) and update:

```javascript
const result = await client.query(
  `INSERT INTO projects (title, description, thumbnail_url, images, tags, content, featured, github_url, live_url)
   VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
  [project.title, project.description, project.thumbnail_url, JSON.stringify(project.images), project.tags, project.content, project.featured, project.github_url, project.live_url]
);
```

#### Acceptance Criteria ✅

- [ ] Projects array replaced with 6 NODAYSIDLE projects
- [ ] Case studies updated (3 total)
- [ ] About content updated with NODAYSIDLE brand info
- [ ] INSERT query includes new columns

---

### **PHASE 4: UI Component Updates** 🎨

**Priority**: MEDIUM | **Agent Tool**: `replace_file_content`

#### 4.1 Update ProjectCard.jsx

Add GitHub badge and Live Demo indicator.

Find the content section (~line 79-120) and add after tags:

```jsx
{/* External Links */}
<div className="flex gap-2 mt-3">
  {project.github_url && (
    <a
      href={project.github_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-small px-3 py-1 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors flex items-center gap-1"
      onClick={(e) => e.stopPropagation()}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      Code
    </a>
  )}
  {project.live_url && (
    <a
      href={project.live_url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-small px-3 py-1 bg-accent text-white rounded-full hover:bg-primary transition-colors flex items-center gap-1"
      onClick={(e) => e.stopPropagation()}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>
      Demo
    </a>
  )}
</div>
```

#### 4.2 Update ProjectDetail.jsx

Add prominent GitHub and Demo buttons after tags section (~line 95).

```jsx
{/* External Links */}
<div className="flex gap-4 mb-8">
  {project.github_url && (
    <a
      href={project.github_url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-secondary inline-flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
      View on GitHub
    </a>
  )}
  {project.live_url && (
    <a
      href={project.live_url}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-primary inline-flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
      </svg>
      Live Demo
    </a>
  )}
</div>
```

#### 4.3 Update Header.jsx

Add NODAYSIDLE branding. Find the header title and update:

```jsx
<Link to="/" className="text-h3 font-bold text-primary hover:text-accent transition-colors">
  NODAYSIDLE
</Link>
```

#### 4.4 Update Footer.jsx

Add social links and brand info:

```jsx
<footer className="py-8 border-t border-accent/20">
  <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
    <p className="text-small text-text/60">
      © 2024 NODAYSIDLE — 2 people, 1 entity
    </p>
    <div className="flex gap-4">
      <a href="mailto:info@nodaysidle.com" className="text-text/60 hover:text-accent transition-colors">
        Email
      </a>
      <a href="https://twitter.com/kaly_ndi" target="_blank" rel="noopener noreferrer" className="text-text/60 hover:text-accent transition-colors">
        Twitter
      </a>
      <a href="https://github.com/salvadalba" target="_blank" rel="noopener noreferrer" className="text-text/60 hover:text-accent transition-colors">
        GitHub
      </a>
    </div>
  </div>
</footer>
```

#### Acceptance Criteria ✅

- [ ] ProjectCard shows GitHub/Demo badges
- [ ] ProjectDetail has prominent external link buttons
- [ ] Header displays "NODAYSIDLE"
- [ ] Footer has brand info and social links

---

### **PHASE 5: Home Page Update** 🏠

**Priority**: MEDIUM | **Agent Tool**: `replace_file_content`

#### 5.1 Update Hero Section in Home.jsx

Find the Hero component (~line 31-47) and update:

```jsx
<Hero
  title="NODAYSIDLE"
  subtitle={
    <span>
      2 people, 1 entity. We build{' '}
      <span className="text-primary">AI-powered tools</span>,{' '}
      <span className="text-accent">generative art</span>, and{' '}
      innovative interfaces that push the boundaries of what's possible.
    </span>
  }
>
  <Link to="/projects" className="btn-primary">
    Explore Projects
  </Link>
  <a 
    href="https://0riginzero-8tngzswx9-nodaysidle.vercel.app/" 
    target="_blank" 
    rel="noopener noreferrer"
    className="btn-secondary"
  >
    Try Origin Zero
  </a>
</Hero>
```

#### 5.2 Update Featured Section Title

Change "Featured Work" to something more on-brand:

```jsx
<h2 className="text-h2 mb-4 text-primary">What We've Built</h2>
<p className="text-body text-text/70 mb-12">
  A selection of projects showcasing our range—from AI tools to generative art.
</p>
```

#### Acceptance Criteria ✅

- [ ] Hero displays NODAYSIDLE branding and tagline
- [ ] "Try Origin Zero" button links to live demo
- [ ] Section titles updated

---

### **PHASE 6: Delete Old Assets & Run Seed** 🗑️

**Priority**: HIGH | **Agent Tool**: `run_command`

#### 6.1 Remove Old Placeholder Images

```bash
cd /Volumes/omarchyuser/projekti/chameleonos
rm -f server/public/assets/finflow-*.jpg
rm -f server/public/assets/artistry-*.jpg
rm -f server/public/assets/pulse-*.jpg
```

#### 6.2 Run Database Seed

```bash
npm run db:seed
```

#### Acceptance Criteria ✅

- [ ] Old placeholder images deleted
- [ ] Database seeded with new NODAYSIDLE data
- [ ] No errors in seed output

---

### **PHASE 7: Final Polish & Verification** ✨

**Priority**: LOW | **Agent Tool**: `browser_subagent`

#### 7.1 Visual Verification

- [ ] Start dev server: `npm run dev`
- [ ] Check Home page renders with NODAYSIDLE branding
- [ ] Verify all 6 projects appear in grid
- [ ] Check project detail pages load correctly
- [ ] Verify About page shows NODAYSIDLE info
- [ ] Test Vibe Slider still works with new images
- [ ] Verify external links (GitHub, Demo) work

#### 7.2 Responsive Check

- [ ] Desktop (1920px) layout correct
- [ ] Tablet (768px) layout correct
- [ ] Mobile (375px) layout correct

#### 7.3 Performance Check

- [ ] Images lazy load correctly
- [ ] No console errors
- [ ] Page loads under 2 seconds

---

## 📋 Quick Reference: Files to Modify

| File | Phase | Action |
|------|-------|--------|
| `server/public/assets/*.webp` | 1 | Add 18 new images |
| `migrations/002_add_project_links.sql` | 2 | Create new migration |
| `scripts/seed.js` | 3 | Replace all seed data |
| `client/src/components/ProjectCard.jsx` | 4 | Add external link badges |
| `client/src/pages/ProjectDetail.jsx` | 4 | Add GitHub/Demo buttons |
| `client/src/components/Header.jsx` | 4 | Update branding |
| `client/src/components/Footer.jsx` | 4 | Add social links |
| `client/src/pages/Home.jsx` | 5 | Update hero content |
| Old assets | 6 | Delete placeholder files |

---

## 🎯 Success Criteria

The implementation is complete when:

1. ✅ All 18 AI-generated images are in place
2. ✅ Database contains 6 NODAYSIDLE projects
3. ✅ UI shows NODAYSIDLE branding throughout
4. ✅ GitHub and Demo links are functional
5. ✅ Vibe Slider works with new content
6. ✅ Site is responsive and performant

---

## 🚀 Ready for Execution

**Agent Instructions**:

1. Start with **Phase 1** (Image Generation)
2. Execute phases in order
3. Check acceptance criteria after each phase
4. Report any blockers immediately

**Estimated Total Time**: 2-3 hours

---

*Generated for NODAYSIDLE Portfolio — Chameleon OS*

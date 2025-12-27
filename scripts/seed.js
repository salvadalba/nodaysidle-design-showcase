import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/chameleon_os',
});

// Vibe configs at positions 0, 25, 50, 75, 100
const vibeConfigs = [
  {
    name: 'Corporate Professional',
    slider_position: 0,
    config: {
      typography: {
        font_family: '"Inter", system-ui, -apple-system, sans-serif',
        font_sizes: { h1: '2.5rem', h2: '2rem', h3: '1.5rem', body: '1rem', small: '0.875rem' }
      },
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        background: '#ffffff',
        text: '#1f2937',
        accent: '#2563eb'
      },
      spacing: { xs: '0.5rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem' },
      border_radius: '0.25rem',
      grid_columns: 3
    }
  },
  {
    name: 'Clean Modern',
    slider_position: 25,
    config: {
      typography: {
        font_family: '"SF Pro Display", system-ui, sans-serif',
        font_sizes: { h1: '3rem', h2: '2.25rem', h3: '1.75rem', body: '1rem', small: '0.875rem' }
      },
      colors: {
        primary: '#0891b2',
        secondary: '#06b6d4',
        background: '#f8fafc',
        text: '#334155',
        accent: '#14b8a6'
      },
      spacing: { xs: '0.5rem', sm: '1rem', md: '2rem', lg: '2.5rem', xl: '4rem' },
      border_radius: '0.5rem',
      grid_columns: 3
    }
  },
  {
    name: 'Balanced Creative',
    slider_position: 50,
    config: {
      typography: {
        font_family: '"Space Grotesk", system-ui, sans-serif',
        font_sizes: { h1: '3.5rem', h2: '2.5rem', h3: '2rem', body: '1.125rem', small: '1rem' }
      },
      colors: {
        primary: '#7c3aed',
        secondary: '#a855f7',
        background: '#faf5ff',
        text: '#581c87',
        accent: '#c026d3'
      },
      spacing: { xs: '0.75rem', sm: '1.25rem', md: '2rem', lg: '3rem', xl: '4.5rem' },
      border_radius: '0.75rem',
      grid_columns: 3
    }
  },
  {
    name: 'Bold Expressive',
    slider_position: 75,
    config: {
      typography: {
        font_family: '"Syne", system-ui, sans-serif',
        font_sizes: { h1: '4rem', h2: '3rem', h3: '2.25rem', body: '1.125rem', small: '1rem' }
      },
      colors: {
        primary: '#be123c',
        secondary: '#f43f5e',
        background: '#1a1a1a',
        text: '#f5f5f5',
        accent: '#fb7185'
      },
      spacing: { xs: '1rem', sm: '1.5rem', md: '2.5rem', lg: '3.5rem', xl: '5rem' },
      border_radius: '1rem',
      grid_columns: 2
    }
  },
  {
    name: 'Wild Experimental',
    slider_position: 100,
    config: {
      typography: {
        font_family: '"Clash Display", system-ui, sans-serif',
        font_sizes: { h1: '5rem', h2: '4rem', h3: '3rem', body: '1.25rem', small: '1rem' }
      },
      colors: {
        primary: '#00ff9f',
        secondary: '#ff00ff',
        background: '#0a0a0a',
        text: '#ffffff',
        accent: '#ffff00'
      },
      spacing: { xs: '1rem', sm: '2rem', md: '3rem', lg: '4rem', xl: '6rem' },
      border_radius: '2rem',
      grid_columns: 1
    }
  }
];

// NODAYSIDLE Projects
const projects = [
  {
    title: 'Cyber Brutalist to Art Deco',
    description: 'A dynamic visual journey from raw, utilitarian cyber brutalism to refined Art Deco elegance through scroll-based transformations.',
    thumbnail_url: '/api/assets/cyberbrutalist-thumb.png',
    images: ['/api/assets/cyberbrutalist-1.png', '/api/assets/cyberbrutalist-2.png'],
    tags: ['React', 'Vite', 'Tailwind', 'GSAP', 'Animation'],
    content: 'This project explores the spectrum of digital aesthetics. As users scroll, the interface transforms from chaotic brutalist layouts with exposed grids and glitch effects into sophisticated Art Deco patterns with golden geometries and ornate details. Features include micro-animations, interactive shop section, and generative art gallery.',
    featured: true,
    github_url: 'https://github.com/salvadalba/nodaysidle-cyberbrutalist-to-art-deco',
    live_url: null
  },
  {
    title: 'AeroGlass',
    description: 'A premium generative art showcase featuring algorithmic masterpieces displayed in a stunning glassmorphism gallery.',
    thumbnail_url: '/api/assets/aeroglass-thumb.png',
    images: ['/api/assets/aeroglass-1.png', '/api/assets/aeroglass-2.png'],
    tags: ['React', 'Canvas API', 'Generative Art', 'Glassmorphism'],
    content: 'AeroGlass transforms mathematical algorithms into visual art. Each piece is generated on-the-fly using custom canvas algorithms, ensuring every viewing is unique. The gallery features premium glassmorphism design, 3D tilt effects on hover, and the ability to regenerate art with new seeds.',
    featured: true,
    github_url: 'https://github.com/salvadalba/nodaysidle-Aeroglass-',
    live_url: null
  },
  {
    title: 'Origin Zero',
    description: 'AI-powered documentation generator that transforms two sentences into complete project specifications.',
    thumbnail_url: '/api/assets/originzero-thumb.png',
    images: ['/api/assets/originzero-1.png', '/api/assets/originzero-2.png'],
    tags: ['React', 'TypeScript', 'AI', 'Cinematic UI'],
    content: 'Origin Zero is not just a tool—it\'s an experience. Built with a "Cinematic Zen" interface featuring deep dark modes, holographic accents, and fluid micro-animations. The platform visualizes the journey from chaos (ideation) to order (specification) through interactive visual storytelling.',
    featured: true,
    github_url: 'https://github.com/salvadalba/nodaysidle-originzero',
    live_url: 'https://0riginzero-8tngzswx9-nodaysidle.vercel.app/'
  },
  {
    title: 'Ironclad OS',
    description: 'A WebAssembly-powered documentation compiler with an industrial minimal design aesthetic.',
    thumbnail_url: '/api/assets/ironclados-thumb.png',
    images: ['/api/assets/ironclados-1.png', '/api/assets/ironclados-2.png'],
    tags: ['Rust', 'WebAssembly', 'React', 'TypeScript'],
    content: 'Ironclad OS brings deterministic, zero-latency document generation to the browser using Rust and WebAssembly. The industrial minimal interface is designed for engineers who value precision. Generates PRDs, ARDs, Task Lists, and AI agent rules with 100% reproducibility.',
    featured: false,
    github_url: 'https://github.com/salvadalba/nodaysidle-ironclados',
    live_url: null
  },
  {
    title: 'Mnemosync',
    description: 'An AI-guided platform for preserving family memories through intelligent interviews and beautiful visualizations.',
    thumbnail_url: '/api/assets/mnemosync-thumb.png',
    images: ['/api/assets/mnemosync-1.png', '/api/assets/mnemosync-2.png'],
    tags: ['GPT-4', 'Whisper', 'DALL-E', 'React', 'Memory'],
    content: 'Mnemosync uses AI to conduct dynamic interviews, generating context-aware follow-up questions that keep conversations flowing naturally. Features include secure audio recording with Whisper transcription, a beautiful timeline view, geographic memory maps, and AI-generated sketches for memories that lack photos.',
    featured: false,
    github_url: 'https://github.com/salvadalba/nodaysidle-Mnemosync',
    live_url: null
  },
  {
    title: 'GridHive',
    description: 'A peer-to-peer energy trading platform connecting solar prosumers through automated micro-auctions.',
    thumbnail_url: '/api/assets/gridhive-thumb.png',
    images: ['/api/assets/gridhive-1.png', '/api/assets/gridhive-2.png'],
    tags: ['Rust', 'PostgreSQL', 'WebSocket', 'React', 'Energy'],
    content: 'GridHive enables homeowners with solar panels to sell excess energy directly to neighbors through 15-minute micro-auction cycles. Features real-time bidding, weather-based dynamic pricing, live dashboards, and complete transaction history. Built for a sustainable energy future.',
    featured: false,
    github_url: 'https://github.com/salvadalba/nodaysidle-gridhive',
    live_url: null
  }
];

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
    linkedin: null,
    twitter: 'https://twitter.com/kaly_ndi',
    dribbble: null
  }
};

async function seed() {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Clear existing data
    await client.query('DELETE FROM case_studies');
    await client.query('DELETE FROM projects');
    await client.query('DELETE FROM vibe_configs');
    await client.query('DELETE FROM about_content');

    // Insert vibe configs
    for (const vibe of vibeConfigs) {
      await client.query(
        'INSERT INTO vibe_configs (name, slider_position, config) VALUES ($1, $2, $3)',
        [vibe.name, vibe.slider_position, JSON.stringify(vibe.config)]
      );
    }
    console.log('Seeded vibe configs');

    // Insert projects and get their IDs
    const projectIds = [];
    for (const project of projects) {
      const result = await client.query(
        `INSERT INTO projects (title, description, thumbnail_url, images, tags, content, featured, github_url, live_url)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
        [project.title, project.description, project.thumbnail_url, JSON.stringify(project.images), project.tags, project.content, project.featured, project.github_url, project.live_url]
      );
      projectIds.push({ title: project.title, id: result.rows[0].id });
    }
    console.log('Seeded projects');

    // Insert case studies with correct project IDs
    for (const cs of caseStudies) {
      const projectId = projectIds.find(p => p.title === cs.project_title)?.id;
      if (projectId) {
        await client.query(
          `INSERT INTO case_studies (project_id, title, description, challenge, solution, results, order_index)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [projectId, cs.title, cs.description, cs.challenge, cs.solution, cs.results, cs.order_index]
        );
      }
    }
    console.log('Seeded case studies');

    // Insert about content
    await client.query(
      'INSERT INTO about_content (content) VALUES ($1)',
      [JSON.stringify(aboutContent)]
    );
    console.log('Seeded about content');

    await client.query('COMMIT');
    console.log('Database seeded successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error seeding database:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(console.error);

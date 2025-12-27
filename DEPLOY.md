# 🚀 Deploying to Vercel

Since **NODAYSIDLE Design Showcase** is a full-stack application (React Frontend + Node/Express Backend + PostgreSQL Database), deployment requires a few specific steps.

## 1. Prerequisites

- A **GitHub account** with this repository pushed.
- A **Vercel account**.
- A **PostgreSQL Database** (We recommend [Neon](https://neon.tech) or Vercel Postgres).

## 2. Setup Database

1. Create a new project in [Neon](https://neon.tech) (or your preferred provider).
2. Copy the `Connection String` (e.g., `postgres://user:password@endpoint.neon.tech/neondb...`).
3. **Run Migrations & Seed**:
   You can run the migration scripts locally against your remote database to set it up:

   ```bash
   # In your local terminal, set the variable temporarily
   export DATABASE_URL="your_connection_string_here"
   
   # Run migration and seed
   npm run db:migrate
   npm run db:seed
   ```

## 3. Connect to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** -> **"Project"**.
2. Import your `nodaysidle-design-showcase` repository.
3. **Configure Project**:
   - **Framework Preset**: Vite
   - **Root Directory**: `.` (Leave as default)
   - **Build & Output Settings**:
     - **Build Command**: `cd client && npm run build`
     - **Output Directory**: `client/dist`
     - **Install Command**: `npm install`
4. **Environment Variables**:
   Expand the "Environment Variables" section and add:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `VITE_API_URL`: `/api` (This ensures the frontend talks to the backend function).

## 4. Deploy

Click **"Deploy"**. Vercel will:

1. Build your React frontend.
2. Create Serverless Functions for your API (`api/index.js`).
3. Deploy everything to a global edge network.

---

### Troubleshooting

- **Image 404s**: Ensure the `server/public/assets` folder is correctly referenced or moved. Vercel Serverless functions don't serve static files from `server/public` easily.
  - *Fix*: The build process should copy assets to `client/dist/assets`. The current setup might need adjustment for this.
  - *Quick Fix*: We can modify the build script to copy separate assets if needed, but Vite handles its own assets well. For dynamic assets from `server/public`, they might need to be moved to `client/public` for Vercel deployment.

Good luck! 🦎

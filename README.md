# 🦎 NODAYSIDLE Design Showcase

<div align="center">

[![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)](https://github.com/salvadalba/nodaysidle-design-showcase)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)
[![Vibe](https://img.shields.io/badge/Vibe-Adaptive-7c3aed?style=for-the-badge)](https://nodaysidle.com)

# **2 people, 1 entity**

*An adaptive portfolio that morphs its entire design based on your vibe.*

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsalvadalba%2Fnodaysidle-design-showcase)

[**Explore Live Demo**](https://0riginzero-8tngzswx9-nodaysidle.vercel.app/)

</div>

---

## ✨ The Magic: Vibe Slider

Drag the slider to transform the **entire website** in real-time. Experience 5 distinct design languages in one interface:

| Vibe State | Visual Identity | Characteristics |
|:---:|:---|:---|
| **0%** | 🏢 **Corporate** | Professional blues, clean typography, minimal borders, business-ready. |
| **25%** | 💧 **Minimal** | Soft palettes, reduced noise, focus on whitespace and clarity. |
| **50%** | 🎨 **Creative** | Playful purples, rounded elements, soft shadows, balanced aesthetic. |
| **75%** | 🎭 **Expressive** | Bold pinks/maroons, dramatic contrasts, stronger visual accents. |
| **100%** | 🔥 **Wild** | Neon cyberpunk, glowing effects, futuristic UI, dark mode intensity. |

> *"Where every pixel serves a purpose and every interaction tells a story."*

---

## 🚀 Featured Projects

<div align="center">

| **Project** | **Description** | **Tech Stack** |
|:---|:---|:---|
| 🎭 **Cyber Brutalist to Art Deco** | Scroll-based aesthetic transformation from raw brutalism to elegant Art Deco. | `React` `GSAP` `Tailwind` |
| 🖼️ **AeroGlass** | Generative art gallery with glassmorphism and algorithmic masterpieces. | `Canvas API` `React` `Generative Art` |
| ⚡ **Origin Zero** | AI-powered PRD generator with "Cinematic Zen" interface. | `React` `TypeScript` `AI` `Holographic UI` |
| 🔧 **Ironclad OS** | WebAssembly-powered documentation compiler with industrial minimal design. | `Rust` `WASM` `React` `TypeScript` |
| 💜 **Mnemosync** | AI-guided family memory preservation platform. | `GPT-4` `Whisper` `DALL-E` `React` |
| ⚡ **GridHive** | Peer-to-peer energy trading with real-time auctions. | `Rust` `PostgreSQL` `WebSocket` `React` |

</div>

---

## 🛠️ Architecture & Tech Stack

This project is built as a **full-stack application** designed for performance and adaptability.

```mermaid
graph TD
    A[Client (React + Vite)] -->|REST API| B[Server (Node.js + Express)]
    B -->|Query| C[PostgreSQL Database]
    A -->|State| D[Vibe Context]
    D -->|Updates| E[CSS Variables]
    E -->|Morphs| F[UI Components]
```

- **Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL
- **System**: Custom "Vibe Engine" for real-time CSS variable interpolation

---

## 📦 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/salvadalba/nodaysidle-design-showcase.git
cd nodaysidle-design-showcase

# 2. Install dependencies
npm install

# 3. Setup Database
# Make sure you have a .env file with DATABASE_URL
npm run db:init
npm run db:seed

# 4. Start Development Server
npm run dev
```

Visit `http://localhost:5173` and start morphing! 🎚️

---

## 📬 Connect

<div align="center">

| 📧 Email | 🐦 Twitter | 💻 GitHub |
|:---:|:---:|:---:|
| [info@nodaysidle.com](mailto:info@nodaysidle.com) | [@kaly_ndi](https://twitter.com/kaly_ndi) | [salvadalba](https://github.com/salvadalba) |

</div>

---

<div align="center">

**Built with 🦎 by NODAYSIDLE**

</div>

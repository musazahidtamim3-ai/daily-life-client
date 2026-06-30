# Daily Life Lessons

A full-stack platform where users can create, share, and discover real-life lessons and personal experiences. Built to help people preserve their wisdom, reflect on personal growth, and inspire others through shared stories.

## Purpose

Daily Life Lessons gives users a space to document the lessons they've learned from life experiences and share them with a community. Users can browse lessons by category and emotional tone, save and like content from others, follow top contributors, and unlock premium features through a one-time payment. The platform also includes a full admin dashboard for monitoring users, content, and platform growth.

## Live URL

- **Frontend (Client):** https://daily-life-client.vercel.app
- **Backend (API Server):** https://daily-life-server.vercel.app

## Key Features

- **User Authentication** — Email/password and Google OAuth sign-in powered by Better Auth, with session-based access control.
- **Lesson Creation & Management** — Users can create, edit, and delete lessons with categories, emotional tone tags, and visibility/access level controls.
- **Discovery & Search** — Paginated lesson feed with keyword search, category filtering, and emotional tone filtering.
- **Engagement System** — Like, save (bookmark), and comment on lessons.
- **Featured & Trending Content** — Curated "Featured Lessons" section and a "Most Saved Lessons" leaderboard.
- **Top Contributors** — Highlights the most active creators on the platform based on lesson count.
- **Reporting System** — Users can report inappropriate lessons; admins can review and remove reported content.
- **Premium Subscription** — One-time payment upgrade via Stripe Checkout for unlimited lesson creation and premium-only features.
- **Admin Dashboard** — Real-time analytics including user growth, lesson growth, daily activity charts, today's published lessons, and platform-wide statistics.
- **Role-Based Access** — User and admin roles with protected admin-only routes and actions.
- **Responsive, Modern UI** — Built with a polished dark-themed design, smooth Framer Motion animations, and accessible component patterns.

## Tech Stack

### Frontend
- **Next.js 16** — React framework with App Router and server components
- **React 19**
- **Tailwind CSS 4**
- **HeroUI** — UI component library
- **Framer Motion** — Animations
- **Recharts** — Admin dashboard charts
- **Embla Carousel** — Carousels/sliders
- **Better Auth** — Authentication
- **Stripe** — Payment processing
- **React Toastify / React Hot Toast** — Notifications
- **Gravity UI Icons** — Icon set

### Backend
- **Express 5** — REST API server
- **MongoDB** (native driver) — Database
- **Better Auth** — Authentication with MongoDB adapter
- **CORS** — Cross-origin request handling
- **Dotenv** — Environment variable management

## NPM Packages Used

### Frontend (`package.json`)

```json
"dependencies": {
  "@better-auth/mongo-adapter": "^1.6.19",
  "@gravity-ui/icons": "^2.18.0",
  "@heroui/react": "^3.2.1",
  "@heroui/styles": "^3.2.1",
  "better-auth": "^1.6.19",
  "embla-carousel-autoplay": "^8.6.0",
  "embla-carousel-react": "^8.6.0",
  "framer-motion": "^12.42.0",
  "mongodb": "^7.3.0",
  "next": "16.2.9",
  "react": "19.2.4",
  "react-dom": "19.2.4",
  "react-hot-toast": "^2.6.0",
  "react-toastify": "^11.1.0",
  "recharts": "^3.8.1",
  "stripe": "^22.2.3"
},
"devDependencies": {
  "@tailwindcss/postcss": "^4",
  "babel-plugin-react-compiler": "1.0.0",
  "eslint": "^9",
  "eslint-config-next": "16.2.9",
  "tailwindcss": "^4"
}
```

### Backend (`package.json`)

```json
"dependencies": {
  "better-auth": "^1.6.19",
  "cors": "^2.8.6",
  "dotenv": "^17.4.2",
  "express": "^5.2.1",
  "mongodb": "^7.3.0"
}

This project is private and intended for personal/educational use.

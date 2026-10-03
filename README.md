# DevMetrics Hub — US Niche Blog & Interactive Web Tools Platform with Secure Admin Portal

DevMetrics Hub is a production-ready, full-stack MERN application (MongoDB, Express.js, React.js, Node.js) combining a niche content platform targeting the **US Tech, SaaS & Developer Economy** with dynamic client-side web tools and a fully secure Admin Portal powered by JWT authentication and bcrypt password hashing.

---

## 🌟 Key Features

### 1. US Market-Targeted Content & Interactive Web Tools
- **US SaaS MRR & Churn Calculator**: Real-time USD revenue calculations ($ MRR, ARR, Net Churn %, Customer LTV, CAC Payback period).
- **US Freelance & Consultant Rate Estimator**: Calculates target billable hourly rates considering US self-employment tax (15.3% FICA), healthcare overhead, and working weeks.
- **SEO & OpenGraph Meta Tag Generator**: Real-time tool to generate HTML meta tags with live previews for Google US SERP search results and Twitter Cards.
- **Copy & Reset Functions**: Every tool includes 1-click clipboard copy and reset actions.
- **Usage Logging**: Tracks tool executions to MongoDB analytics.

### 2. Comprehensive Technical SEO Optimization
- **Semantic HTML5 Markup**: `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`, single `<h1>` per page hierarchy, `<time>` publication tags, and explicit `alt` text on images.
- **Dynamic Head Management**: `SeoHead` component manages document `<title>`, meta description, keywords, canonical URLs, and OpenGraph/Twitter card meta tags per route.
- **Schema.org JSON-LD Structured Data**: Injects dynamic `BlogPosting`, `WebApplication`, and `Organization` structured data into `<head>`.
- **Dynamic XML Sitemap & Robots.txt**: Backend routes `/sitemap.xml` and `/robots.txt` dynamically list published blog posts and tools for search engine crawlers.

### 3. Secure Admin Portal & Full CRUD Operations
- **JWT & bcrypt Authentication**: Secure login endpoint using JSON Web Tokens and bcrypt hashed passwords.
- **Admin Dashboard**:
  - **Analytics Overview**: Real-time metric cards for total articles, article views, registered web tools, total tool executions, and recent activity logs.
  - **Articles CRUD Management**: Full Create, Read (with search & category filters), Update, and Delete capabilities.
  - **Custom SEO Meta Fields**: Custom SEO Title, Meta Description, Target Keywords, Custom Slug, and Associated Tool selector when creating or editing posts.

---

## 📁 Project Architecture & Folder Structure

```
articalweb/
├── backend/
│   ├── config/
│   │   └── db.js                 # Mongoose MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Admin JWT login logic
│   │   ├── postController.js     # Article CRUD logic & view counter
│   │   ├── toolController.js     # Tool execution tracking & analytics
│   │   └── seoController.js      # Dynamic sitemap.xml & robots.txt
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT Bearer token verification
│   │   └── errorMiddleware.js    # Global error & 404 handlers
│   ├── models/
│   │   ├── User.js               # Admin schema with bcrypt hashing
│   │   ├── Post.js               # Article schema with SEO fields
│   │   ├── ToolData.js           # Interactive tool registry
│   │   └── UsageLog.js           # Analytics log entry schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── toolRoutes.js
│   │   └── seoRoutes.js
│   ├── seed.js                   # Database seeder (Admin + SEO posts)
│   ├── server.js                 # Express server entry point
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx        # Glassmorphic header & menu
    │   │   ├── Footer.jsx        # Footer with sitemap links & newsletter
    │   │   ├── ArticleCard.jsx   # Article card with thumbnail & views
    │   │   ├── ToolCard.jsx      # Utility feature card
    │   │   ├── SeoHead.jsx       # Dynamic SEO head & JSON-LD manager
    │   │   ├── ProtectedRoute.jsx# Auth guard for admin routes
    │   │   └── tools/
    │   │       ├── SaasCalculator.jsx
    │   │       ├── HourlyRateCalculator.jsx
    │   │       └── SeoMetaGenerator.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx   # Admin authentication context
    │   ├── pages/
    │   │   ├── Home.jsx          # Hero, category filter, articles, tools
    │   │   ├── ArticleDetail.jsx # Article view with embedded tools
    │   │   ├── ToolsPage.jsx     # Standalone tools hub
    │   │   ├── Login.jsx         # Admin login route
    │   │   └── AdminDashboard.jsx# Admin panel & CRUD modals
    │   ├── services/
    │   │   └── api.js            # Axios client with JWT interceptor
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css             # Tailwind CSS tokens & glassmorphism
    ├── index.html                # Semantic HTML5 template
    ├── vite.config.js            # Vite setup with API proxy
    ├── tailwind.config.js
    ├── .env.example
    └── package.json
```

---

## 🛠️ Environment Configuration Setup

### Backend Environment Setup (`/backend/.env`)
Create a `.env` file inside the `backend` folder (or copy `.env.example`):
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/devmetrics
JWT_SECRET=devmetrics_super_secret_jwt_key_2026_us_target
CLIENT_URL=http://localhost:5173
```

### Frontend Environment Setup (`/frontend/.env`)
Create a `.env` file inside the `frontend` folder (or copy `.env.example`):
```env
VITE_API_URL=http://localhost:5000/api
VITE_SITE_URL=http://localhost:5173
```

---

## 🚀 How to Run Locally

### Step 1: Install Dependencies
Open two terminal windows:

**Backend Terminal:**
```bash
cd backend
npm install
```

**Frontend Terminal:**
```bash
cd frontend
npm install
```

### Step 2: Seed the Database
Run the seed script in the backend terminal to create the default Admin account, registered interactive tools, and sample US tech SEO articles:
```bash
cd backend
npm run seed
```

**Default Admin Credentials:**
- **Email**: `admin@devmetrics.io`
- **Password**: `Admin@123456`

### Step 3: Start Backend & Frontend Servers

**In Backend Terminal:**
```bash
cd backend
npm run dev   # or npm start
```
*Backend API will run at `http://localhost:5000`*

**In Frontend Terminal:**
```bash
cd frontend
npm run dev
```
*Frontend React App will run at `http://localhost:5173`*

---

## 🧪 Verification & Testing Endpoints

- **Public Website**: `http://localhost:5173`
- **Interactive Tools Hub**: `http://localhost:5173/tools`
- **Admin Login Portal**: `http://localhost:5173/admin/login`
- **Admin Dashboard**: `http://localhost:5173/admin/dashboard`
- **XML Sitemap**: `http://localhost:5000/sitemap.xml`
- **Robots.txt**: `http://localhost:5000/robots.txt`
- **API Health Check**: `http://localhost:5000/api/health`

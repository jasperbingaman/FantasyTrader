# FantasyTrader - Repository Structure

Clean, organized repository for the FantasyTrader platform.

## Directory Layout

```
FantasyTrader/
├── / (root)           # 🌐 Website source files (GitHub Pages serves from here)
│   ├── index.html      # Landing page
│   ├── app.html        # Main application
│   ├── education.html  # Learning content
│   ├── profile.html    # User profiles
│   ├── your-league.html # League management
│   ├── create-league.html
│   ├── features.html
│   ├── how-it-works.html
│   ├── tutorial.html
│   ├── beginner-path.html
│   ├── beginner-course.html
│   ├── career-education.html
│   └── js/             # JavaScript modules
│       └── supabase.js # Backend integration
│
├── docs/               # 📚 Documentation
│   ├── BACKEND_SETUP.md
│   ├── BACKEND_SUMMARY.md
│   ├── SUPABASE_SETUP.md
│   ├── SETUP_GOOGLE_SHEETS.md
│   └── README.md
│
├── archive/            # 📦 Historical code versions
│   ├── 12.28.25 CODE/
│   ├── 12.30.25 CODE/
│   └── 1.26.26 GAME HTML CODE/
│
├── images/             # 🖼️ Original image assets (shared)
│
├── CNAME              # GitHub Pages custom domain
├── README.md          # Project overview
└── .gitignore         # Git ignore rules
```

## Deployment Configuration

**Hosting:** GitHub Pages  
**DNS Provider:** Cloudflare  
**Custom Domain:** www.fantasy-trader.com

**GitHub Pages Settings:**
- Branch: `main`
- Folder: `/` (root)
- GitHub Pages only supports serving from `/` (root) or `/docs`

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript
- **Backend:** Supabase (cloud database & auth)
- **Data:** Yahoo Finance API via CORS proxy
- **Deployment:** Cloudflare Pages
- **Domain:** www.fantasy-trader.com

## Development

All active development should be in the `pages/` directory. The `archive/` directory is for reference only and should not be modified.

Documentation for setup, architecture, and APIs lives in `docs/`.

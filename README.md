# EcoNirvana - E-Waste Recycling Platform

A modern, responsive web application for e-waste recycling with user rewards program, built with Next.js and TailwindCSS.

## Key Features

- **Comprehensive Recycling Solutions**: Multiple recycling options (drop-off, pickup, mail-in)
- **Rewards Program**: Earn points for recycling electronics (30-100 points based on device size)
- **Secure Data Destruction**: DoD 5220.22-M standard wiping and physical destruction services
- **Interactive Location Finder**: Find nearby drop-off centers with filtering options
- **User Dashboard**: Track recycling history, points, and environmental impact
- **Business Solutions**: Custom recycling programs for corporate clients
- **Community Events**: Information about local e-waste collection events
- **Authentication**: Secure user accounts with Google/email login

## Recycling Services

- **Residential Recycling**: For individual households
- **Business Solutions**: For companies of all sizes
- **Data Destruction**: Secure data wiping with certification
- **Pickup Services**: Doorstep collection for convenient recycling
- **Community Events**: E-waste collection drives
- **Zero Landfill Policy**: Environmental commitment

## Tech Stack

- Next.js 15 (React framework)
- TypeScript
- TailwindCSS
- Firebase (Authentication, Database)
- Google Generative AI (EcoBot assistant)
- Framer Motion (Animations)

## Code Structure

```
e-waste-recycling/
├── public/                  # Static assets and images
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── about/           # About page
│   │   ├── blog/            # Blog page and posts
│   │   ├── contact/         # Contact page
│   │   ├── dashboard/       # User dashboard
│   │   ├── events/          # Community events
│   │   ├── locations/       # Drop-off locations finder
│   │   ├── login/           # Authentication
│   │   ├── quiz/            # E-waste education quiz
│   │   ├── recycle/         # Recycling options
│   │   │   ├── business/    # Business recycling
│   │   │   ├── drop-off/    # Drop-off guide
│   │   │   ├── mail-in/     # Mail-in recycling
│   │   │   └── schedule-pickup/ # Schedule pickup
│   │   ├── rewards/         # User rewards program
│   │   ├── services/        # Services overview
│   │   │   ├── data-destruction/ # Data destruction service
│   │   ├── signup/          # User registration
│   │   ├── layout.tsx       # Root layout with navigation
│   │   └── page.tsx         # Home page
│   ├── components/          # Reusable components
│   │   ├── chat/            # EcoBot chat components
│   │   ├── layout/          # Layout components (Navbar, Footer)
│   │   ├── ui/              # UI components (Buttons, Cards, etc.)
│   ├── context/             # React context providers
│   │   ├── AuthContext.tsx  # Authentication context
│   ├── lib/                 # Utility functions and libraries
│   │   ├── gemini.ts        # EcoBot AI integration
├── .env.local               # Environment variables (not in repo)
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
└── tailwind.config.ts       # TailwindCSS configuration
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

## Deployment

Deploy to Vercel, Netlify, or any platform supporting Next.js applications.

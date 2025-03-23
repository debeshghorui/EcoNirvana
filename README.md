# EcoNirvana - E-Waste Recycling Website

A modern, responsive website for an e-waste recycling company built with Next.js 15 and TailwindCSS.

## Features

- **Modern UI Design**: Clean, professional design with responsive layouts for all device sizes
- **Interactive Elements**: Animations and transitions using Framer Motion
- **Multiple Pages**: Home, Services, Locations, Blog, About, and Contact pages
- **Responsive Navigation**: Mobile-friendly navigation with hamburger menu
- **Blog with Filtering**: Search and filter blog posts by category
- **Contact Form**: Interactive contact form with validation
- **Location Finder**: Find recycling drop-off locations
- **SEO Optimized**: Meta tags and semantic HTML for better search engine visibility

## Technologies Used

- **Next.js 15**: React framework with server-side rendering and routing
- **React 19**: JavaScript library for building user interfaces
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library for React
- **React Icons**: Icon library for React applications

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/e-waste-recycling.git
   cd e-waste-recycling
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

```
e-waste-recycling/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js app directory
│   │   ├── about/      # About page
│   │   ├── blog/       # Blog page
│   │   ├── contact/    # Contact page
│   │   ├── locations/  # Locations page
│   │   ├── services/   # Services page
│   │   ├── layout.tsx  # Root layout
│   │   ├── page.tsx    # Home page
│   │   ├── components/ # Reusable components
│   │   │   ├── layout/ # Layout components (Navbar, Footer)
│   │   │   ├── ui/     # UI components
│   │   │   ├── home/   # Home page components
│   │   ├── package.json # Project dependencies
│   │   ├── tsconfig.json # TypeScript configuration
│   │   └── next.config.ts # Next.js configuration
│   └── README.md       # Project documentation
```

## Deployment

This website can be deployed to any hosting platform that supports Next.js applications, such as Vercel, Netlify, or AWS Amplify.

### Deploying to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a GitHub repository.
2. Import your repository to Vercel.
3. Vercel will detect that you're using Next.js and set up the build configuration for you.

## UI Consistency Plan

### Overview
This document outlines the plan for creating a consistent UI experience across all pages of the EcoNirvana website. We've created reusable UI components and established design patterns that should be implemented across all pages.

### Shared UI Components
We've created the following reusable components to ensure consistency:

1. **PageHeader** - For consistent page headers with background images and text overlay
2. **Container/Section** - For consistent page layout and spacing
3. **Card** - For consistent content blocks and information display
4. **Button** - For consistent action elements with variants
5. **Input/Select/Textarea** - For consistent form controls

### Color Scheme
Use the following color palette consistently:
- Primary: Green-600 (#059669)
- Secondary: White (#FFFFFF)
- Backgrounds: White, gray-50 (#F9FAFB), gradient backgrounds
- Text: gray-900 (#111827), gray-600 (#4B5563), white

### Typography
- Headings: Font-bold, text-3xl/text-4xl for page titles, text-2xl for section headings
- Body text: text-gray-600, text-lg for featured text, regular size for standard content
- Font weights: Bold (700) for headings, Medium (500) for buttons, Regular (400) for body

### Implementation Priority

#### Phase 1: Core Pages
1. **Homepage** - Already updated
2. **About** - Completed
3. **Blog** - Completed
4. **Quiz** - Needs update

#### Phase 2: Service Pages
1. **Recycle**
2. **Services**
3. **Locations**
4. **Doorstep**

#### Phase 3: User Account Pages
1. **Login**
2. **Signup**
3. **Dashboard**
4. **Activity**

### Implementation Process
For each page:
1. Replace custom headers with `<PageHeader>` component
2. Replace section wrappers with `<Section>` component
3. Replace custom cards with `<Card>` component 
4. Replace buttons with consistent `<Button>` component
5. Replace forms with consistent form components
6. Update color scheme to match the design system

### Example Implementation
See the About page (`src/app/about/page.tsx`) for an example of how to implement these components:

```jsx
<PageHeader
  title="Who We Are"
  description="We're on a mission to create a sustainable future through..."
  backgroundImage="/about-hero.jpg"
/>

<Section background="white">
  {/* Content */}
</Section>

<Card>
  <CardBody>
    {/* Card content */}
  </CardBody>
</Card>

<Button href="/contact" variant="primary" size="lg">Contact Us</Button>
```

### Testing Checklist
For each page update:
- Verify responsive behavior on mobile, tablet, and desktop
- Ensure consistent spacing and alignment
- Validate accessibility (color contrast, focus states)
- Check for hydration warnings and add suppressHydrationWarning as needed

### Resources
All shared UI components can be found in:
- `src/components/layout/PageHeader.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/Input.tsx`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Images used in this project are for demonstration purposes only.
- Icons provided by [React Icons](https://react-icons.github.io/react-icons/).

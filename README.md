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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Images used in this project are for demonstration purposes only.
- Icons provided by [React Icons](https://react-icons.github.io/react-icons/).

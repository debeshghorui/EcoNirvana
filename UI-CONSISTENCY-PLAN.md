# EcoNirvana UI Consistency Plan

## Overview
This document outlines the plan for creating a consistent UI experience across all pages of the EcoNirvana website. We've created reusable UI components and established design patterns that should be implemented across all pages.

## Shared UI Components
We've created the following reusable components to ensure consistency:

1. **PageHeader** - For consistent page headers with background images and text overlay
2. **Container/Section** - For consistent page layout and spacing
3. **Card** - For consistent content blocks and information display
4. **Button** - For consistent action elements with variants
5. **Input/Select/Textarea** - For consistent form controls

## Color Scheme
Use the following color palette consistently:
- Primary: Green-600 (#059669)
- Secondary: White (#FFFFFF)
- Backgrounds: White, gray-50 (#F9FAFB), gradient backgrounds
- Text: gray-900 (#111827), gray-600 (#4B5563), white

## Typography
- Headings: Font-bold, text-3xl/text-4xl for page titles, text-2xl for section headings
- Body text: text-gray-600, text-lg for featured text, regular size for standard content
- Font weights: Bold (700) for headings, Medium (500) for buttons, Regular (400) for body

## Implementation Priority

### Phase 1: Core Pages
1. **Homepage** - Already updated
2. **About** - Completed
3. **Blog** - Completed
4. **Quiz** - Needs update

### Phase 2: Service Pages
1. **Recycle**
2. **Services**
3. **Locations**
4. **Doorstep**

### Phase 3: User Account Pages
1. **Login**
2. **Signup**
3. **Dashboard**
4. **Activity**

## Implementation Process
For each page:
1. Replace custom headers with `<PageHeader>` component
2. Replace section wrappers with `<Section>` component
3. Replace custom cards with `<Card>` component 
4. Replace buttons with consistent `<Button>` component
5. Replace forms with consistent form components
6. Update color scheme to match the design system

## Example Implementation
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

## Testing Checklist
For each page update:
- Verify responsive behavior on mobile, tablet, and desktop
- Ensure consistent spacing and alignment
- Validate accessibility (color contrast, focus states)
- Check for hydration warnings and add suppressHydrationWarning as needed

## Resources
All shared UI components can be found in:
- `src/components/layout/PageHeader.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Card.tsx`
- `src/components/ui/Container.tsx`
- `src/components/ui/Input.tsx` 
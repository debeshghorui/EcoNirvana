import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Who We Are | EcoNirvana - E-Waste Recycling Solutions",
  description: "Learn about EcoNirvana's mission, values, and commitment to responsible e-waste recycling and environmental sustainability.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 
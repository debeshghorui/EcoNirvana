"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRecycle, FaAward, FaHandshake, FaLeaf } from 'react-icons/fa';
import PageHeader from '@/components/layout/PageHeader';
import { Section } from '@/components/ui/Container';
import Card, { CardBody } from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <PageHeader
        title="Who We Are"
        description="We're on a mission to create a sustainable future through responsible e-waste recycling and innovative environmental solutions."
        backgroundImage="/about-hero.jpg"
        showBackButton={true}
      />

      {/* Our Story Section */}
      <Section background="white">
        <div className="md:flex md:items-center md:gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2010, EcoNirvana began with a simple mission: to address the growing problem of electronic waste in our communities. What started as a small operation has grown into a leading e-waste recycling company serving individuals and businesses across the country.
            </p>
            <p className="text-lg text-gray-600">
              Our team of environmental experts and technology specialists work together to ensure that electronic waste is processed in an environmentally responsible manner, while recovering valuable materials and protecting sensitive data.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="md:w-1/2"
          >
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
              <Image 
                src="/blog3.jpg" 
                alt="EcoNirvana team working" 
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Our Values Section */}
      <Section background="light">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At EcoNirvana, we're guided by core values that shape every aspect of our business and our impact on the environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaLeaf className="text-green-500 w-10 h-10" />,
              title: "Environmental Responsibility",
              description: "We're committed to minimizing the environmental impact of electronic waste through proper recycling and disposal methods."
            },
            {
              icon: <FaHandshake className="text-green-500 w-10 h-10" />,
              title: "Community Partnership",
              description: "We believe in working together with communities, businesses, and governments to create effective e-waste solutions."
            },
            {
              icon: <FaAward className="text-green-500 w-10 h-10" />,
              title: "Excellence & Integrity",
              description: "We maintain the highest standards of excellence and integrity in all our operations and customer interactions."
            },
            {
              icon: <FaRecycle className="text-green-500 w-10 h-10" />,
              title: "Innovation",
              description: "We continuously explore new technologies and methods to improve our recycling processes and reduce waste."
            }
          ].map((value, index) => (
            <Card key={index} delay={index * 0.1}>
              <CardBody className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </Section>

      {/* Call to Action */}
      <Section background="gradient">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-green-50 mb-8 max-w-3xl mx-auto">
            Join us in our mission to reduce electronic waste and create a more sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/services" variant="secondary" size="lg">
              Our Services
            </Button>
            <Button href="/contact" variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}
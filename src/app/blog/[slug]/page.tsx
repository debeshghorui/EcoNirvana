"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaShare } from 'react-icons/fa';

// Import the blog posts data (in a real app, this would come from an API)
const blogPosts = [
  {
    id: 1,
    title: "The Environmental Impact of E-Waste",
    excerpt: "Electronic waste is one of the fastest-growing waste streams globally. Learn about its environmental impact and why proper recycling is crucial.",
    content: `
      <p>Electronic waste, or e-waste, is one of the fastest-growing waste streams in the world, with an estimated 50 million tons generated annually. This growing mountain of discarded electronics poses significant environmental challenges that cannot be ignored.</p>
      
      <h2>What Makes E-Waste Harmful?</h2>
      
      <p>Electronic devices contain a complex mixture of materials including hazardous substances like lead, mercury, cadmium, and flame retardants. When improperly disposed of, these toxins can leach into soil and groundwater, contaminating ecosystems and potentially entering the food chain.</p>
      
      <p>Additionally, the informal recycling of e-waste, which often involves open burning or acid baths to extract valuable metals, releases harmful substances into the air, soil, and water, posing serious health risks to surrounding communities.</p>
      
      <h2>The Resource Challenge</h2>
      
      <p>Beyond the pollution aspect, discarded electronics represent a significant waste of valuable resources. Devices contain precious metals like gold, silver, and palladium, as well as rare earth elements that are energy-intensive to mine and process.</p>
      
      <p>Mining these materials causes significant environmental degradation, including deforestation, soil erosion, and water pollution. By failing to recycle electronics properly, we're essentially throwing away these finite resources and perpetuating the destructive cycle of extraction.</p>
      
      <h2>The Carbon Footprint of Electronics</h2>
      
      <p>The environmental impact of electronics extends beyond their disposal. The production of new devices is incredibly carbon-intensive. Manufacturing a single smartphone generates approximately 60 kg of CO2 emissions, while a laptop can generate over 300 kg.</p>
      
      <p>By extending the life of our devices through proper maintenance and then ensuring they're recycled correctly, we can significantly reduce the carbon footprint associated with our digital lifestyle.</p>
      
      <h2>Why Proper E-Waste Recycling Is Crucial</h2>
      
      <p>Proper e-waste recycling addresses these environmental challenges in several ways:</p>
      
      <ul>
        <li>It prevents toxic materials from entering the environment</li>
        <li>It recovers valuable resources, reducing the need for destructive mining</li>
        <li>It reduces carbon emissions associated with manufacturing new devices</li>
        <li>It conserves energy, as recycling materials typically requires less energy than processing raw materials</li>
      </ul>
      
      <h2>What You Can Do</h2>
      
      <p>As individuals, we can make a significant difference by:</p>
      
      <ul>
        <li>Extending the lifetime of our devices through proper maintenance and repair</li>
        <li>Donating or selling working electronics for reuse</li>
        <li>Using certified e-waste recyclers when disposing of electronics</li>
        <li>Supporting regulations that mandate responsible e-waste management</li>
      </ul>
      
      <p>At EcoNirvana, we're committed to providing safe, responsible recycling solutions for all types of electronic waste. By choosing to recycle your devices properly, you're taking a crucial step toward mitigating the environmental impact of e-waste and building a more sustainable future.</p>
    `,
    date: "May 15, 2023",
    author: "Jane Smith",
    authorTitle: "Environmental Specialist",
    authorBio: "Jane has over 10 years of experience in environmental sustainability and waste management.",
    category: "Environmental",
    image: "/blog-ewaste-impact.jpg",
    slug: "environmental-impact-of-ewaste",
    readTime: "6 min read"
  },
  {
    id: 2,
    title: "How to Prepare Your Devices for Recycling",
    excerpt: "Before recycling your electronic devices, it's important to properly prepare them. Follow these steps to ensure your data is secure and your devices are ready for recycling.",
    content: `
      <p>When it comes time to recycle your old electronic devices, proper preparation is essential to protect your personal information and ensure the recycling process goes smoothly. Here's a comprehensive guide to preparing your devices for recycling.</p>
      
      <h2>Back Up Your Data</h2>
      
      <p>Before you do anything else, make sure to back up any important data from your device. This might include:</p>
      
      <ul>
        <li>Photos and videos</li>
        <li>Documents and spreadsheets</li>
        <li>Contacts and calendar events</li>
        <li>Messages and emails</li>
        <li>Music and other media files</li>
      </ul>
      
      <p>You can back up your data to an external hard drive, a cloud storage service, or a new device. Having multiple backups is always a good idea for extra security.</p>
      
      <h2>Perform a Factory Reset</h2>
      
      <p>Once your data is safely backed up, you should perform a factory reset on your device. This process will erase your personal data and restore the device to its original settings. Here's how to do it on common devices:</p>
      
      <h3>For Smartphones and Tablets:</h3>
      
      <p><strong>Android:</strong> Go to Settings > System > Reset options > Erase all data (factory reset)</p>
      
      <p><strong>iOS:</strong> Go to Settings > General > Reset > Erase All Content and Settings</p>
      
      <h3>For Computers:</h3>
      
      <p><strong>Windows:</strong> Settings > Update & Security > Recovery > Reset this PC</p>
      
      <p><strong>Mac:</strong> Restart your Mac and hold Command + R to enter Recovery Mode, then select Disk Utility to erase your disk, and then reinstall macOS</p>
      
      <h2>Additional Data Security Measures</h2>
      
      <p>For devices containing particularly sensitive information, a factory reset might not be enough, as sophisticated recovery software can sometimes retrieve data. Consider these additional steps:</p>
      
      <ul>
        <li>Use disk-wiping software that overwrites your data multiple times</li>
        <li>For hard drives, consider physical destruction if you're extremely concerned about data security</li>
        <li>Remove and keep storage components like SSDs or memory cards if possible</li>
      </ul>
      
      <h2>Remove External Accessories</h2>
      
      <p>Before recycling, remove any external accessories or peripherals such as:</p>
      
      <ul>
        <li>Memory cards</li>
        <li>SIM cards</li>
        <li>External batteries</li>
        <li>Cases and covers</li>
        <li>Cables and chargers</li>
      </ul>
      
      <p>Some of these items might be recyclable separately or reusable with other devices.</p>
      
      <h2>Gather Necessary Information</h2>
      
      <p>If you're recycling devices with activation locks or accounts tied to them:</p>
      
      <ul>
        <li>Deactivate "Find My" features on Apple devices</li>
        <li>Remove Google Account from Android devices</li>
        <li>Deregister the device from any online services</li>
        <li>Note down serial numbers in case you need them later</li>
      </ul>
      
      <h2>Choose the Right Recycling Method</h2>
      
      <p>With your devices properly prepared, you're ready to recycle. Consider these options:</p>
      
      <ul>
        <li>Use EcoNirvana's certified e-waste recycling services</li>
        <li>Check if the manufacturer offers a take-back program</li>
        <li>Visit local electronics retailers that offer recycling programs</li>
        <li>Participate in community e-waste collection events</li>
      </ul>
      
      <p>By taking these steps to prepare your devices properly, you're not only protecting your personal information but also ensuring that your electronics can be recycled efficiently and effectively, maximizing their environmental benefit. At EcoNirvana, we're committed to responsible recycling practices that protect both your data and our planet.</p>
    `,
    date: "April 22, 2023",
    author: "Michael Johnson",
    authorTitle: "Cybersecurity Expert",
    authorBio: "Michael specializes in data security and has advised numerous companies on safe device retirement practices.",
    category: "Tips & Guides",
    image: "/blog-prepare-devices.jpg",
    slug: "prepare-devices-for-recycling",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Business Benefits of Corporate E-Waste Recycling Programs",
    excerpt: "Implementing a corporate e-waste recycling program isn't just good for the environment—it's good for business too. Discover the many benefits for your company.",
    content: `
      <p>In today's environmentally conscious business landscape, corporate sustainability initiatives are no longer optional—they're essential. Among these initiatives, e-waste recycling programs stand out as particularly valuable, offering businesses a wide range of benefits that extend far beyond environmental responsibility.</p>
      
      <h2>Enhanced Brand Reputation</h2>
      
      <p>Modern consumers and business partners increasingly favor companies with strong environmental credentials. Implementing a comprehensive e-waste recycling program demonstrates your company's commitment to sustainability and responsible business practices.</p>
      
      <p>According to recent studies, 85% of consumers have shifted their purchasing behavior towards more environmentally friendly options in the past five years. By publicly showcasing your e-waste recycling efforts, you position your brand favorably in the minds of these environmentally conscious customers.</p>
      
      <h2>Regulatory Compliance</h2>
      
      <p>E-waste regulations are becoming increasingly stringent worldwide. Many jurisdictions now have specific requirements for the disposal and recycling of electronic equipment. By establishing a formal e-waste recycling program, your business can:</p>
      
      <ul>
        <li>Ensure compliance with current regulations</li>
        <li>Stay ahead of upcoming regulatory changes</li>
        <li>Avoid potential fines and penalties</li>
        <li>Simplify regulatory reporting and documentation</li>
      </ul>
      
      <h2>Cost Savings</h2>
      
      <p>While implementing an e-waste recycling program requires initial investment, it can lead to significant cost savings over time through:</p>
      
      <ul>
        <li>Tax incentives and rebates for environmentally responsible practices</li>
        <li>Reduced waste disposal costs</li>
        <li>Recovery of valuable materials from old equipment</li>
        <li>Potential revenue from resale of refurbished equipment</li>
      </ul>
      
      <p>Many businesses report recovering significant value from their end-of-life IT assets when working with certified e-waste recyclers who can properly extract and refine valuable materials.</p>
      
      <h2>Data Security Benefits</h2>
      
      <p>Proper e-waste recycling includes secure data destruction, which helps protect your company and customers from data breaches. According to cybersecurity experts, improper disposal of electronic devices is a significant factor in corporate data breaches.</p>
      
      <p>Professional e-waste recycling services like those offered by EcoNirvana provide certified data destruction that complies with standards such as NIST 800-88 and DoD 5220.22-M, giving you peace of mind and documentation for compliance purposes.</p>
      
      <h2>Improved Employee Morale and Recruitment</h2>
      
      <p>Today's workforce, particularly millennials and Gen Z employees, prioritize working for companies with strong environmental values. A robust e-waste recycling program can:</p>
      
      <ul>
        <li>Boost employee morale and pride in the company</li>
        <li>Serve as a recruitment tool for environmentally conscious talent</li>
        <li>Demonstrate corporate values in action</li>
        <li>Engage employees in meaningful sustainability initiatives</li>
      </ul>
      
      <h2>Supply Chain Advantages</h2>
      
      <p>As businesses increasingly evaluate their suppliers' environmental practices, having a formal e-waste recycling program can give you a competitive edge. Many large corporations now include sustainability criteria in their vendor selection process, making your e-waste initiatives a potential door-opener to valuable contracts.</p>
      
      <h2>Implementing a Successful Corporate E-Waste Program</h2>
      
      <p>To maximize these benefits, consider these key steps when establishing your program:</p>
      
      <ol>
        <li>Partner with a certified e-waste recycling provider like EcoNirvana</li>
        <li>Develop clear policies and procedures for equipment retirement</li>
        <li>Create employee education and awareness campaigns</li>
        <li>Set measurable goals and track progress</li>
        <li>Communicate your achievements to stakeholders</li>
      </ol>
      
      <p>At EcoNirvana, we specialize in helping businesses of all sizes implement effective e-waste recycling programs. Our services include assessment of your current practices, customized program development, secure data destruction, and detailed reporting for compliance and sustainability initiatives.</p>
      
      <p>By embracing corporate e-waste recycling, your business doesn't just help the environment—it gains tangible benefits that positively impact your bottom line and organizational culture.</p>
    `,
    date: "March 10, 2023",
    author: "Sarah Chen",
    authorTitle: "Corporate Sustainability Director",
    authorBio: "Sarah has helped implement sustainability programs for several Fortune 500 companies.",
    category: "Business",
    image: "/blog-business-benefits.jpg",
    slug: "business-benefits-of-ewaste-recycling",
    readTime: "7 min read"
  },
  {
    id: 4,
    title: "E-Waste Recycling Laws and Regulations: What You Need to Know",
    excerpt: "Electronic waste disposal is regulated by various laws at the federal, state, and local levels. Learn about the key regulations that affect how you should dispose of your e-waste.",
    content: `
      <p>Navigating the complex landscape of e-waste regulations can be challenging for both individuals and businesses. These laws vary widely by location but understanding them is crucial for legal compliance and environmental responsibility. This guide breaks down the key aspects of e-waste regulations you should know about.</p>
      
      <h2>Federal E-Waste Regulations in the United States</h2>
      
      <p>Unlike many other countries, the United States lacks comprehensive federal legislation specifically addressing e-waste recycling. However, several federal regulations do impact how certain electronic waste must be handled:</p>
      
      <h3>Resource Conservation and Recovery Act (RCRA)</h3>
      
      <p>While not specifically targeting e-waste, the RCRA regulates the disposal of hazardous waste, which can include certain electronic components containing materials like lead, mercury, and cadmium. Under this act, generators of hazardous waste must follow specific handling and disposal procedures.</p>
      
      <h3>Export Regulations</h3>
      
      <p>The export of hazardous e-waste is regulated under international agreements like the Basel Convention, which the U.S. has signed but not fully ratified. Nevertheless, the EPA does impose certain restrictions on e-waste exports.</p>
      
      <h2>State-Level E-Waste Legislation</h2>
      
      <p>Due to limited federal oversight, many states have implemented their own e-waste recycling laws. Currently, 25 states plus the District of Columbia have enacted e-waste legislation. These laws generally fall into several categories:</p>
      
      <h3>Extended Producer Responsibility (EPR) Laws</h3>
      
      <p>Many state programs require manufacturers to fund or manage recycling programs for the electronic products they sell. These programs may require manufacturers to:</p>
      
      <ul>
        <li>Register with the state and pay annual fees</li>
        <li>Meet collection and recycling targets based on sales volumes</li>
        <li>Provide free or subsidized recycling for consumers</li>
        <li>Report annually on collection and recycling activities</li>
      </ul>
      
      <h3>Landfill Bans</h3>
      
      <p>Several states, including California, Connecticut, Illinois, and Massachusetts, have implemented outright bans on disposing of certain electronic devices in landfills. These bans typically cover items like:</p>
      
      <ul>
        <li>Televisions and computer monitors</li>
        <li>Desktop and laptop computers</li>
        <li>Tablets and e-readers</li>
        <li>Printers and peripherals</li>
        <li>In some cases, small household electronics</li>
      </ul>
      
      <h3>Consumer Fee Programs</h3>
      
      <p>Some states impose an upfront fee on the sale of certain electronic devices. These fees fund state-managed recycling programs. California's Electronic Waste Recycling Act is a prominent example, adding fees to purchases of devices with viewable screens.</p>
      
      <h2>International E-Waste Regulations</h2>
      
      <p>If your business operates globally or sells products internationally, you should be aware of international e-waste frameworks:</p>
      
      <h3>European Union: WEEE Directive</h3>
      
      <p>The Waste Electrical and Electronic Equipment (WEEE) Directive requires EU member states to establish collection systems where consumers can return their e-waste free of charge. It also sets collection, recycling, and recovery targets for all types of electrical goods.</p>
      
      <h3>China's Regulations</h3>
      
      <p>China has implemented restrictions on e-waste imports and has its own regulatory framework for domestic e-waste management, including Extended Producer Responsibility requirements.</p>
      
      <h2>Compliance Tips for Businesses</h2>
      
      <p>To ensure compliance with applicable e-waste regulations:</p>
      
      <ol>
        <li>Identify all jurisdictions where your business operates or sells products</li>
        <li>Research specific e-waste requirements in each location</li>
        <li>Develop a tracking system for your electronic assets</li>
        <li>Partner with certified e-waste recyclers who can ensure compliance</li>
        <li>Maintain proper documentation of all e-waste disposal activities</li>
        <li>Stay informed about changing regulations</li>
      </ol>
      
      <h2>Compliance Tips for Individuals</h2>
      
      <p>For individual consumers, following these guidelines will help ensure you're disposing of e-waste legally:</p>
      
      <ul>
        <li>Never throw electronics in regular trash bins in states with landfill bans</li>
        <li>Utilize manufacturer take-back programs when available</li>
        <li>Take advantage of retailer recycling initiatives (Best Buy, Staples, etc.)</li>
        <li>Use certified e-waste recycling services like EcoNirvana</li>
        <li>Participate in community e-waste collection events</li>
      </ul>
      
      <p>At EcoNirvana, we stay current with all applicable regulations and ensure that all e-waste we process is handled in full compliance with local, state, and federal laws. Our certified processes give you peace of mind that your electronic waste is being recycled responsibly and legally.</p>
      
      <p>Remember that regulations continue to evolve as governments worldwide recognize the growing importance of properly managing electronic waste. Staying informed and working with knowledgeable partners is key to navigating this complex regulatory landscape.</p>
    `,
    date: "February 28, 2023",
    author: "David Wilson",
    authorTitle: "Environmental Compliance Attorney",
    authorBio: "David specializes in environmental law and helps companies navigate complex regulatory requirements.",
    category: "Regulations",
    image: "/blog-ewaste-laws.jpg",
    slug: "ewaste-recycling-laws-regulations",
    readTime: "9 min read"
  }
];

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the blog post with the matching slug
    const foundPost = blogPosts.find(p => p.slug === slug);
    
    if (foundPost) {
      setPost(foundPost);
    }
    
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-lg">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
          >
            <FaArrowLeft className="mr-2" /> Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-green-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image 
            src={post.image} 
            alt={post.title} 
            fill
            style={{ objectFit: "cover" }}
            className="mix-blend-overlay opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 to-green-900/90"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 py-20 md:py-24">
          <Link 
            href="/blog" 
            className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Back to all articles
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center mb-5 space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white shadow-sm">
                <FaTag className="mr-1 h-3 w-3" />
                {post.category}
              </span>
              <span className="text-green-100">{post.readTime}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            
            <div className="flex items-center text-green-100">
              <div className="mr-2 h-10 w-10 rounded-full bg-green-700 flex items-center justify-center">
                <FaUser className="h-5 w-5" />
              </div>
              <div>
                <span className="font-medium">{post.author}</span>
                <div className="flex items-center text-sm">
                  <FaCalendarAlt className="mr-1 h-3 w-3" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Wave divider */}
        <div className="absolute -bottom-1 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#F9FAFB" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white shadow-md rounded-2xl overflow-hidden">
          {/* Content */}
          <div className="p-6 md:p-10">
            <div 
              className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-green-600 prose-a:no-underline hover:prose-a:text-green-700 prose-strong:text-gray-800"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
          
          {/* Author Bio */}
          <div className="border-t border-gray-100 bg-gray-50 p-6 md:p-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <div className="mr-6 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mb-4 sm:mb-0">
                <FaUser className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{post.author}</h3>
                <p className="text-green-600 font-medium mb-2">{post.authorTitle}</p>
                <p className="text-gray-700">{post.authorBio}</p>
              </div>
            </div>
          </div>
          
          {/* Share and Navigation */}
          <div className="border-t border-gray-100 p-6 flex justify-between items-center">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-green-600 font-medium hover:text-green-700"
            >
              <FaArrowLeft className="mr-2" /> Back to all articles
            </Link>
            
            <button className="inline-flex items-center text-gray-700 hover:text-gray-800">
              <FaShare className="mr-2" /> Share
            </button>
          </div>
        </div>
        
        {/* Related Articles */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Articles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts
              .filter(relatedPost => relatedPost.id !== post.id && relatedPost.category === post.category)
              .slice(0, 2)
              .map((relatedPost) => (
                <motion.article 
                  key={relatedPost.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className="h-48 relative">
                    <Image 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500 text-white shadow-sm">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <FaCalendarAlt className="mr-2 h-3 w-3" />
                      <span>{relatedPost.date}</span>
                    </div>
                    <Link href={`/blog/${relatedPost.slug}`} className="block">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">{relatedPost.title}</h3>
                    </Link>
                    <p className="text-gray-700 mb-4 line-clamp-3">{relatedPost.excerpt}</p>
                    <Link 
                      href={`/blog/${relatedPost.slug}`} 
                      className="text-green-600 hover:text-green-700 font-medium inline-flex items-center group"
                    >
                      Read more
                      <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </motion.article>
              ))}
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-green-50 to-green-100 p-8 md:p-10 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to take action?</h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Put your knowledge into practice. Recycle your e-waste responsibly with EcoNirvana's services.
          </p>
          <Link 
            href="/recycle" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition-colors duration-300"
          >
            Recycle Now
          </Link>
        </div>
      </div>
    </div>
  );
} 
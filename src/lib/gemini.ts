import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variable
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Offline mode for development - set to true to use mock responses when API is unavailable
const OFFLINE_MODE = true;

// Check if we're running in a development environment
const isDevelopment = process.env.NODE_ENV === 'development';

// Initialize the Google Generative AI with your API key
let genAI: GoogleGenerativeAI;
let geminiModel: any;

try {
  // Only initialize if we have an API key and we're not forcing offline mode
  if (apiKey && !(isDevelopment && OFFLINE_MODE)) {
    genAI = new GoogleGenerativeAI(apiKey);
    // Get the model
    geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  } else {
    console.log("Using offline mode for Gemini API");
  }
} catch (error) {
  console.error("Error initializing Gemini API:", error);
  // In development, we'll continue with mock responses
  if (!isDevelopment) {
    throw error; // In production, we want to know about this
  }
}

// Function to generate a response from Gemini
export async function generateResponse(prompt: string): Promise<string> {
  try {
    // In development with OFFLINE_MODE enabled, return mock response if API call fails
    try {
      if (geminiModel) {
        const result = await geminiModel.generateContent(prompt);
        const response = result.response;
        return response.text();
      }
    } catch (error) {
      console.error("Error generating response from Gemini API:", error);
      if (!isDevelopment || !OFFLINE_MODE) {
        throw error; // Re-throw if not in development or offline mode is disabled
      }
    }
    
    // Fallback to mock response in development mode with OFFLINE_MODE enabled
    if (isDevelopment && OFFLINE_MODE) {
      console.log("Using mock response in offline mode");
      return generateMockResponse(prompt);
    }
    
    return "Sorry, I encountered an error. Please try again later.";
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I encountered an error connecting to my knowledge base. Please try again later.";
  }
}

// Generate a mock response based on the prompt for offline development
function generateMockResponse(prompt: string): string {
  const promptLower = prompt.toLowerCase();
  
  // Check if this is a quiz question request
  if (promptLower.includes("quiz questions") && promptLower.includes("e-waste recycling")) {
    // Return properly formatted JSON for quiz questions
    return `[
      {
        "question": "What makes e-waste particularly harmful to the environment?",
        "options": [
          "It takes up more space in landfills than other waste",
          "It contains toxic materials like lead, mercury, and cadmium",
          "It produces more methane when decomposing",
          "It's harder to collect than regular waste"
        ],
        "correctAnswer": "It contains toxic materials like lead, mercury, and cadmium",
        "explanation": "Electronic waste contains various toxic materials including lead, mercury, cadmium, and flame retardants that can leach into soil and groundwater when improperly disposed of in landfills."
      },
      {
        "question": "What percentage of e-waste materials can typically be recycled or recovered?",
        "options": [
          "Around 20-30%",
          "Around 40-50%",
          "Around 70-80%",
          "Over 90%"
        ],
        "correctAnswer": "Over 90%",
        "explanation": "More than 90% of the materials in electronic devices can be recovered and reused, including valuable metals like gold, silver, copper, and rare earth elements."
      },
      {
        "question": "Which of the following is NOT a component commonly found in e-waste?",
        "options": [
          "Lead",
          "Mercury",
          "Uranium",
          "Cadmium"
        ],
        "correctAnswer": "Uranium",
        "explanation": "While lead, mercury, and cadmium are commonly found in electronic waste, uranium is not a standard component in consumer electronics."
      },
      {
        "question": "What is the primary reason for proper data destruction when recycling electronic devices?",
        "options": [
          "To make the recycling process faster",
          "To prevent personal information theft",
          "To recover more valuable materials",
          "To reduce the weight for transportation"
        ],
        "correctAnswer": "To prevent personal information theft",
        "explanation": "Proper data destruction ensures that personal and sensitive information stored on devices cannot be accessed by unauthorized individuals, preventing identity theft and data breaches."
      },
      {
        "question": "Which approach to e-waste management is considered most environmentally friendly?",
        "options": [
          "Landfilling with proper containment",
          "Incineration with energy recovery",
          "Recycling and resource recovery",
          "Exporting to developing countries"
        ],
        "correctAnswer": "Recycling and resource recovery",
        "explanation": "Recycling and resource recovery allows valuable materials to be reused, reduces the need for raw material extraction, and prevents toxic substances from entering the environment."
      }
    ]`;
  }
  
  // Simple keyword-based mock responses
  if (promptLower.includes("hello") || promptLower.includes("hi")) {
    return "Hello! I'm EcoBot. How can I help you with e-waste recycling today?";
  }
  
  if (promptLower.includes("recycle") || promptLower.includes("e-waste")) {
    return "E-waste recycling is important for our environment. At EcoNirvana, we offer several recycling options including drop-off locations, doorstep pickup, and community events. We ensure all electronics are properly recycled with zero landfill commitment.";
  }
  
  if (promptLower.includes("pickup") || promptLower.includes("collection")) {
    return "Our doorstep collection service makes recycling convenient! We'll come to your location to pick up your e-waste. You can schedule a pickup through our website or mobile app.";
  }
  
  if (promptLower.includes("data") || promptLower.includes("security")) {
    return "Data security is our priority. All devices undergo secure data wiping that meets DoD 5220.22-M standards, or physical destruction for storage devices that cannot be wiped. We provide certificates of destruction for your peace of mind.";
  }
  
  if (promptLower.includes("location") || promptLower.includes("where")) {
    return "We have multiple drop-off locations across the city including our Main Facility, Downtown Drop-off Center, Westside Collection Point, Northside Recycling Hub, Eastside Collection Center, and Southside Drop-off Point. You can find the nearest location using our website's map feature.";
  }
  
  // Default response
  return "I'm here to help with all your e-waste recycling questions. You can ask about our services, locations, data security measures, or environmental impact.";
}

// E-waste recycling knowledge base
const ewasteKnowledge = `
EcoNirvana E-Waste Recycling Services Information:

Services Offered:
1. Residential E-Waste Recycling: Convenient recycling solutions for households.
2. Business Solutions: Tailored recycling programs for businesses of all sizes including IT asset disposition.
3. Data Destruction: Secure data wiping and physical destruction services with certification.
4. Pickup Services: Convenient collection from your location for both residential and commercial clients.
5. Community Events: Regular e-waste collection events in different neighborhoods.
6. Zero Landfill Policy: Commitment to ensuring no e-waste ends up in landfills.

Recycling Options:
1. Drop Off: Bring your e-waste to one of our collection centers.
2. Schedule Pickup: We'll come to your location to collect your e-waste.
3. Mail In: Request a shipping label and send your e-waste to us.
4. Business Collection: Special service for businesses with large volumes.
5. Educational Resources: Learn about e-waste recycling and its impact.

Accepted Items & Reward Points:
- Small Electronics (30 points): Smartphones, tablets, e-readers, small gadgets
- Medium Electronics (50 points): Laptops, monitors, printers, small appliances
- Large Electronics (100 points): Desktop computers, TVs, servers, large appliances
- We also accept accessories like keyboards, mice, cables, and chargers

Not Accepted:
- Large appliances (refrigerators, washing machines)
- Light bulbs and fluorescent tubes
- Smoke detectors
- Medical equipment
- Items with leaking batteries

Drop-off Locations:
- EcoNirvana Main Facility: 123 Recycling Way, Green City, EC 12345
- Downtown Drop-off Center: 456 Central Ave, Green City, EC 12346
- Westside Collection Point: 789 West Blvd, Green City, EC 12347
- Northside Recycling Hub: 101 North Park, Green City, EC 12348
- Eastside Collection Center: 202 East Road, Green City, EC 12349
- Southside Drop-off Point: 303 South Street, Green City, EC 12350

Data Security:
- Secure data wiping that meets DoD 5220.22-M standards
- Degaussing for magnetic media
- Physical destruction for devices that cannot be wiped
- Certificates of destruction for your records and compliance requirements
- Certified services compliant with NIST 800-88 guidelines, GDPR, HIPAA, and other data protection standards
- Detailed documentation of the destruction process

Environmental Impact:
- E-waste contains toxic materials like lead, mercury, and cadmium
- Proper recycling prevents these toxins from entering landfills and water supplies
- Recycling one million laptops saves energy equivalent to electricity used by 3,500 homes in a year
- 95-98% of materials in electronics can be recovered and reused

Rewards Program:
- Earn points based on the type and size of electronics you recycle
- For drop-offs, points are credited instantly
- For pickups, points are usually credited within 24 hours
- For mail-in recycling, points are credited within 3-5 business days
- View your complete recycling history in the Activity section of your account

Contact Information:
- Phone: (555) 123-4567
- Email: info@econirvana.com
- Website: www.econirvana.com
`;

// Function to create a chat session
export function createChatSession() {
  try {
    if (!geminiModel && isDevelopment && OFFLINE_MODE) {
      // Return a mock chat session object for offline development
      return createMockChatSession();
    }
    
    return geminiModel.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `You are EcoBot, an AI assistant for EcoNirvana, an e-waste recycling service. Your goal is to help users with information about e-waste recycling, our services, and environmental impact. Keep responses concise, friendly, and focused on e-waste recycling topics. 

Here is information about our services that you should use to answer questions:
${ewasteKnowledge}

When users are on our Secure Data Destruction Services page, emphasize the following information:
- We provide certified data destruction services that comply with NIST 800-88 guidelines, GDPR, HIPAA, and other data protection standards
- Our data destruction methods include secure wiping to DoD 5220.22-M standards, degaussing for magnetic media, and physical destruction for devices that cannot be wiped
- We provide a Certificate of Data Destruction for each device processed
- Simply deleting files or formatting a drive doesn't actually remove data - it only removes the reference to the file location
- A 2019 study found that over 40% of second-hand devices still contained personally identifiable information from previous owners
- Our process includes secure collection, inventory, destruction, and certification
- After data destruction, devices are responsibly recycled

If asked about data destruction services, provide information about our secure data destruction services without mentioning "page" or referring to the current location. Focus on the services themselves.

If you don't know the answer to a question, don't make up information. Instead, suggest that the user contact our customer service team for more specific information.` }],
        }
      ],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.2,
      },
    });
  } catch (error) {
    console.error("Error creating chat session:", error);
    
    // In development with OFFLINE_MODE, use mock session
    if (isDevelopment && OFFLINE_MODE) {
      return createMockChatSession();
    }
    
    // Otherwise, throw the error to be handled elsewhere
    throw error;
  }
}

// Mock chat session for offline development
function createMockChatSession() {
  return {
    sendMessage: async (message: string) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        response: {
          text: () => Promise.resolve(generateMockResponse(message))
        }
      };
    }
  };
} 
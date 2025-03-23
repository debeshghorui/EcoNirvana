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
  // Only initialize if we have an API key or are in development mode
  if (apiKey || isDevelopment) {
    genAI = new GoogleGenerativeAI(apiKey);
    // Get the model
    geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
  } else {
    console.error("Missing Gemini API key");
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
    return "Data security is our priority. All devices undergo secure data wiping that meets DoD standards, or physical destruction for storage devices that cannot be wiped. We provide certificates of destruction for your peace of mind.";
  }
  
  if (promptLower.includes("location") || promptLower.includes("where")) {
    return "We have multiple drop-off locations across the city. You can find the nearest location by using the map feature on our website or mobile app.";
  }
  
  // Default response
  return "I'm here to help with all your e-waste recycling questions. You can ask about our services, locations, data security measures, or environmental impact.";
}

// E-waste recycling knowledge base
const ewasteKnowledge = `
EcoRecycle E-Waste Recycling Services Information:

Services Offered:
1. Residential E-Waste Collection: Free pickup service for households with electronic waste.
2. Business IT Asset Disposition: Secure data destruction and recycling for businesses.
3. E-Waste Drop-off Centers: Convenient locations for dropping off electronic waste.
4. Community Collection Events: Regular events in different neighborhoods.
5. Educational Programs: Workshops and resources about responsible e-waste management.

Accepted Items:
- Computers, laptops, and servers
- Monitors, TVs, and displays
- Printers, scanners, and fax machines
- Mobile phones and tablets
- Keyboards, mice, and peripherals
- Cables and wires
- Batteries (must be removed from devices)
- Small household electronics

Not Accepted:
- Large appliances (refrigerators, washing machines)
- Light bulbs and fluorescent tubes
- Smoke detectors
- Medical equipment
- Items with leaking batteries

Environmental Impact:
- E-waste contains toxic materials like lead, mercury, and cadmium
- Proper recycling prevents these toxins from entering landfills and water supplies
- Recycling one million laptops saves energy equivalent to electricity used by 3,500 homes in a year
- 95-98% of materials in electronics can be recovered and reused

Data Security:
- All data storage devices undergo secure data wiping or physical destruction
- Certificates of destruction available for businesses
- Compliant with all relevant data protection regulations

Locations:
- Main Recycling Center: 123 Green Street, Eco City
- Downtown Drop-off: 456 Recycle Avenue
- Westside Collection Point: 789 Sustainability Boulevard

Hours of Operation:
- Monday to Friday: 9am - 6pm
- Saturday: 10am - 4pm
- Sunday: Closed

Contact Information:
- Phone: (555) 123-4567
- Email: info@ecorecycle.com
- Website: www.ecorecycle.com
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
          parts: [{ text: `You are EcoBot, an AI assistant for EcoRecycle, an e-waste recycling service. Your goal is to help users with information about e-waste recycling, our services, and environmental impact. Keep responses concise, friendly, and focused on e-waste recycling topics. 

Here is information about our services that you should use to answer questions:
${ewasteKnowledge}

When users are on our Secure Data Destruction Services page, emphasize the following information:
- We provide certified data destruction services that comply with NIST 800-88 guidelines, GDPR, HIPAA, and other data protection standards
- Our data destruction methods include secure wiping to DoD 5220.22-M standards, degaussing for magnetic media, and physical destruction for devices that cannot be wiped
- We provide a Certificate of Data Destruction for each device processed
- Simply deleting files or formatting a drive doesn't actually remove data - it only removes the reference to the file location
- A 2019 study found that over 40% of second-hand devices still contained personally identifiable information from previous owners
- Our process includes secure collection, data destruction, and certification
- After data destruction, devices are responsibly recycled

If asked about data destruction services, provide information about our secure data destruction services without mentioning "page" or referring to the current location. Focus on the services themselves.

If you don't know the answer to a question, don't make up information. Instead, suggest that the user contact our customer service team for more specific information.` }],
        },
        {
          role: "model",
          parts: [{ text: "I'm EcoBot, your friendly e-waste recycling assistant at EcoRecycle! I'm here to help with any questions about our recycling services, environmental impact of e-waste, or how to properly dispose of your electronic devices. How can I assist you today?" }],
        },
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
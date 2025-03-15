import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variable
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "AIzaSyAgpew0EviXju6CUFPIPzzhBcNKaZKkulQ";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(apiKey);

// Get the model
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

// Function to generate a response from Gemini
export async function generateResponse(prompt: string): Promise<string> {
  try {
    const result = await geminiModel.generateContent(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating response:", error);
    return "Sorry, I encountered an error. Please try again later.";
  }
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
} 
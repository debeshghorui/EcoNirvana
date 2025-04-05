import { motion } from 'framer-motion';
import { FaLeaf } from 'react-icons/fa';

interface RecyclingMeterProps {
  itemsRecycled: number;
}

export default function RecyclingMeter({ itemsRecycled }: RecyclingMeterProps) {
  // Calculate level based on items recycled (starts at 1, increases every 5 items)
  const level = Math.max(1, Math.floor(itemsRecycled / 5) + 1);
  
  // Calculate progress to next level (0-100%)
  const progress = ((itemsRecycled % 5) / 5) * 100;
  
  // Determine next level threshold
  const nextLevelItems = level * 5;
  
  // Determine level title based on level number
  const getLevelTitle = (level: number) => {
    if (level <= 2) return "Beginner";
    if (level <= 5) return "Enthusiast";
    if (level <= 10) return "Expert";
    if (level <= 15) return "Master";
    return "Champion";
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/20 shadow-lg"
    >
      <div className="flex items-center mb-2">
        <div className="bg-green-500 rounded-full p-1.5 mr-2 shadow-sm">
          <FaLeaf className="h-4 w-4 text-white" />
        </div>
        <span className="text-green-50 font-medium">Your Impact Level: </span>
        <span className="font-bold ml-1 text-white">Level {level} Recycler</span>
      </div>
      
      <div className="relative h-2 bg-white/20 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-green-400 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="flex justify-between mt-1 text-xs text-green-100">
        <span>Level {level}</span>
        <span>{itemsRecycled}/{nextLevelItems} items</span>
        <span>Level {level + 1}</span>
      </div>
      
      <div className="mt-2 text-center text-xs text-green-100">
        {getLevelTitle(level)} Recycler
      </div>
    </motion.div>
  );
} 
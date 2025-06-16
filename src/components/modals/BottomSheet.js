import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

export const BottomSheet = ({ 
    isOpen, 
    onClose,
    children
}) => {
    const y = useMotionValue(0);
    
    const handleDrag = (event, info) => {
        // Create progressive resistance - the more you drag, the harder it gets
        const dragDistance = info.offset.y;
        const maxDrag = 300;
        const resistanceFactor = Math.min(dragDistance / maxDrag, 1);
        
        // Apply resistance curve - starts easy, gets progressively harder
        const resistance = dragDistance * (1 - resistanceFactor * 0.7);
        y.set(Math.max(0, resistance));
    };
    
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;
        
        // Only consider it a real drag if moved more than 10px (prevents accidental taps)
        if (Math.abs(offset.y) < 10) {
            animate(y, 0, { type: "spring", damping: 25, stiffness: 300 });
            return;
        }
        
        // Thresholds for closing
        const DISTANCE_THRESHOLD = 100; // 100px drag distance
        const VELOCITY_THRESHOLD = 400;  // 400px/s velocity
        
        // If dragged down far enough or with enough momentum, close
        if (offset.y > DISTANCE_THRESHOLD || velocity.y > VELOCITY_THRESHOLD) {
            onClose();
        } else {
            // Spring back to original position with smooth animation
            animate(y, 0, { type: "spring", damping: 25, stiffness: 300 });
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end z-[110]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="w-full bg-white rounded-t-3xl overflow-hidden"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        drag="y"
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        onTap={(e) => e.stopPropagation()}
                        style={{ y }}
                        dragConstraints={{ top: 0 }}
                        dragElastic={0}
                    >
                        {/* Drag handle */}
                        <div className="w-full flex justify-center pt-4 pb-2 cursor-grab active:cursor-grabbing touch-none">
                            <div className="w-12 h-1 bg-gray-300 rounded-full transition-colors hover:bg-gray-400"></div>
                        </div>
                        
                        {/* Content */}
                        <div className="px-6 pb-8">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
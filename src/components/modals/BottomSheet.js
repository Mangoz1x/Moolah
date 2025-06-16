import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion';

export const BottomSheet = ({ 
    isOpen, 
    onClose = () => {},
    children
}) => {
    // Initialize to match the closed state (100% down)
    const y = useMotionValue('100%');

    const handleDrag = (event, info) => {
        const dragDistance = info.offset.y;
        const maxDrag = 300;
        const resistanceFactor = Math.min(dragDistance / maxDrag, 0.99);
        
        const resistance = dragDistance * (1 - resistanceFactor * 0.7);
        y.set(Math.max(0, resistance));
    };
    
    const handleDragEnd = (event, info) => {
        const { offset, velocity } = info;

        if (Math.abs(offset.y) < 10) {
            animate(y, 0, { type: "spring", damping: 30, stiffness: 300 });
            return;
        }
        
        const DISTANCE_THRESHOLD = 75;
        const VELOCITY_THRESHOLD = 300;
        
        if (offset.y > DISTANCE_THRESHOLD || velocity.y > VELOCITY_THRESHOLD) {
            onClose();
        } else {
            animate(y, 0, { type: "spring", damping: 30, stiffness: 300 });
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
                        className="w-full bg-white max-w-xl mx-auto rounded-t-3xl overflow-hidden"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
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
                        
                        <div className="px-6 pb-8">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
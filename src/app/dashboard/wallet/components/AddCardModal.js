import { BottomSheet } from '@/components/modals/BottomSheet';
import { motion } from 'framer-motion';


export const AddCardModal = ({ isOpen, onClose, supportedTypes }) => {
    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Card</h2>

            <div className="space-y-4">
                {supportedTypes.map((type) => (
                    <motion.button
                        key={type.id}
                        className="w-full p-4 bg-gray-50 rounded-2xl flex items-center space-x-4 text-left"
                        whileTap={{ scale: 0.98 }}
                        whileHover={{ backgroundColor: '#f3f4f6' }}
                    >
                        <div className="w-16 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-xl">
                            {type.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{type.name}</h3>
                            <p className="text-sm text-gray-600">Add a {type.name.toLowerCase()}</p>
                        </div>
                        <div className="text-gray-400">→</div>
                    </motion.button>
                ))}
            </div>
        </BottomSheet>
    );
};

'use client';

import React from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CreditCard, Wifi, Radio, Trash2, Edit3 } from 'lucide-react';

export const WalletCard = ({ card, index, totalCards, selectedIndex = null, onSelect, onDrag }) => {
    const isSelected = selectedIndex === index;
    const isAboveSelected = selectedIndex !== null && index > selectedIndex;
    const isBelowSelected = selectedIndex !== null && index < selectedIndex;

    const getCardOffset = () => {
        const cardInactiveSpacing = 50;

        if (selectedIndex === null) {
            return index * 50; // Default stacking
        }

        if (isSelected) {
            return 0; // Selected card stays at top
        }

        // All other cards go below the selected card with consistent spacing
        const cardsToShow = totalCards - 1; // All cards except selected
        const baseOffset = 200; // Space below selected card

        if (index < selectedIndex) {
            // Cards that were above selected card
            return baseOffset + (index * cardInactiveSpacing);
        } else {
            // Cards that were below selected card  
            return baseOffset + ((index - 1) * cardInactiveSpacing);
        }
    };

    return (
        <motion.div
            className="absolute w-full"
            style={{ zIndex: isSelected ? totalCards + 1 : totalCards + index }}
            initial={false}
            animate={{
                y: getCardOffset(),
                scale: isSelected ? 1 : 0.96
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                mass: 0.5
            }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.1}
            onDragEnd={(event, info) => {
                onDrag(info);
            }}
            whileTap={{ scale: isSelected ? 0.99 : 0.96 }}
            onTap={() => onSelect(index)}
        >
            <motion.div
                className={`relative h-48 mx-4 rounded-2xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-xl overflow-hidden`}
                whileHover={{ scale: isSelected ? 1.01 : 0.99 }}
                transition={{ duration: 0.2 }}
            >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-4 right-4 text-6xl">{card.logo}</div>
                    <div className="absolute bottom-4 left-4">
                        <Radio className="w-8 h-8" />
                    </div>
                </div>

                {/* Card content */}
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold">{card.name}</h3>
                            <p className="text-sm opacity-90 mt-1">{card.number}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Wifi className="w-5 h-5 opacity-80" />
                            <div className="text-2xl">{card.logo}</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-sm opacity-80">Balance</p>
                            <p className="text-xl font-bold">{card.balance}</p>
                        </div>
                        <motion.div
                            className="bg-white/20 backdrop-blur-sm rounded-full p-2"
                            whileTap={{ scale: 0.9 }}
                        >
                            <CreditCard className="w-5 h-5" />
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Action buttons for selected card */}
            <AnimatePresence>
                {isSelected && (
                    <motion.div
                        className="absolute left-full top-1/2 -translate-y-1/2 ml-4 z-50"
                        initial={{ opacity: 0, x: -20, scale: 0.8 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.8 }}
                        transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 300 }}
                    >
                        <div className="bg-white rounded-2xl p-3 shadow-lg border border-gray-100 flex flex-col space-y-3">
                            <motion.button
                                className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Edit functionality
                                }}
                            >
                                <Edit3 className="w-5 h-5" />
                            </motion.button>
                            <motion.button
                                className="p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                whileTap={{ scale: 0.9 }}
                                whileHover={{ scale: 1.05 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    // Delete functionality
                                }}
                            >
                                <Trash2 className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
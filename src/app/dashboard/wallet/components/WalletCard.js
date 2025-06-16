'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { CreditCard, Wifi, Radio, Trash2, Edit3, Settings, Eye, Copy } from 'lucide-react';
import { BottomSheet } from '@/components/modals/BottomSheet';

export const WalletCard = ({ card, index, totalCards, selectedIndex = null, onSelect, onDrag }) => {
    const [showActions, setShowActions] = useState(false);
    const longPressTimer = useRef(null);
    const isLongPressing = useRef(false);
    
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

    const handleCardTap = () => {
        // Only handle tap if it's not a long press
        if (!isLongPressing.current) {
            if (!isSelected) {
                // Select the card if not already selected
                onSelect(index);
            }
            // If already selected, do nothing (long press will handle actions)
        }
    };

    const handleLongPressStart = () => {
        // Only start long press timer if the card is selected
        if (isSelected) {
            isLongPressing.current = false;
            longPressTimer.current = setTimeout(() => {
                isLongPressing.current = true;
                setShowActions(true);
                
                // Optional: Add haptic feedback for mobile devices
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 500); // 500ms for long press
        }
    };

    const handleLongPressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
            longPressTimer.current = null;
        }
        // Reset the long press flag after a short delay to prevent tap from firing
        setTimeout(() => {
            isLongPressing.current = false;
        }, 100);
    };

    const handleEditCard = () => {
        setShowActions(false);
        // Edit functionality
        console.log('Edit card:', card.name);
    };

    const handleDeleteCard = () => {
        setShowActions(false);
        // Delete functionality  
        console.log('Delete card:', card.name);
    };

    const handleViewDetails = () => {
        setShowActions(false);
        // View details functionality
        console.log('View details for:', card.name);
    };

    const handleCopyNumber = () => {
        setShowActions(false);
        // Copy card number functionality
        navigator.clipboard.writeText(card.number);
        console.log('Copied card number');
    };

    const actionItems = [
        {
            icon: Eye,
            label: "View Details",
            action: handleViewDetails,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: Copy,
            label: "Copy Number",
            action: handleCopyNumber,
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            icon: Edit3,
            label: "Edit Card",
            action: handleEditCard,
            color: "text-orange-600",
            bgColor: "bg-orange-50"
        },
        {
            icon: Trash2,
            label: "Delete Card",
            action: handleDeleteCard,
            color: "text-red-600",
            bgColor: "bg-red-50"
        }
    ];

    return (
        <>
            <motion.div
                className="absolute w-full"
                style={{ zIndex: isSelected ? totalCards + 1 : totalCards + index }}
                initial={false}
                animate={{
                    // Temporary solution to prevent jumping when clicking and dragging and stuff
                    transform: `translateY(${getCardOffset()}px)`,
                    // y: getCardOffset(),
                    scale: isSelected ? 1 : 0.96
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 40,
                    mass: 0.5
                }}
                drag="y"
                dragConstraints={{ top: 0, bottom: 0 }}
                dragElastic={0.1}
                onDragEnd={(event, info) => {
                    onDrag(info);
                }}
                whileTap={{ scale: isSelected ? 0.99 : 0.96 }}
                onTap={handleCardTap}
                onPointerDown={handleLongPressStart}
                onPointerUp={handleLongPressEnd}
                onPointerLeave={handleLongPressEnd} // Cancel long press if pointer leaves
            >
                <motion.div
                    className={`relative h-48 mx-4 rounded-2xl bg-gradient-to-br ${card.gradient} p-6 text-white shadow-xl overflow-hidden ${
                        isSelected ? 'cursor-pointer' : 'cursor-pointer'
                    }`}
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

                    {/* Long press indicator for selected card */}
                    {isSelected && (
                        <motion.div
                            className="absolute bottom-2 right-2 text-white/60 text-xs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        >
                            Hold for options
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>

            {/* Bottom Sheet for Actions */}
            <BottomSheet
                isOpen={showActions}
                onClose={() => setShowActions(false)}
            >
                <div className="space-y-6">
                    {/* Card Header in Bottom Sheet */}
                    <div className="text-center pb-4 border-b border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 mb-1">
                            {card.name}
                        </h2>
                        <p className="text-sm text-gray-500">{card.number}</p>
                        <p className="text-lg font-bold text-gray-900 mt-2">{card.balance}</p>
                    </div>

                    {/* Action Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {actionItems.map((item, actionIndex) => (
                            <motion.button
                                key={actionIndex}
                                className={`flex flex-col items-center justify-center p-6 rounded-2xl border border-gray-100 ${item.bgColor} transition-all duration-200 active:scale-95`}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.02 }}
                                onClick={item.action}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ 
                                    opacity: 1, 
                                    y: 0,
                                    transition: { delay: actionIndex * 0.05 }
                                }}
                            >
                                <motion.div
                                    className={`w-12 h-12 rounded-full ${item.bgColor} flex items-center justify-center mb-3`}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <item.icon className={`w-6 h-6 ${item.color}`} />
                                </motion.div>
                                <span className={`text-sm font-medium ${item.color}`}>
                                    {item.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* Cancel Button */}
                    <motion.button
                        className="w-full py-4 text-center text-gray-600 font-medium border border-gray-200 rounded-2xl bg-gray-50 active:bg-gray-100 transition-colors"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowActions(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { delay: 0.2 }
                        }}
                    >
                        Cancel
                    </motion.button>
                </div>
            </BottomSheet>
        </>
    );
};
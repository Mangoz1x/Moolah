'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Plus, CreditCard, Wifi, Radio, Trash2, Edit3 } from 'lucide-react';
import PageTransition from '@/components/transitions/PageTransition';
import { WalletCard } from './components/WalletCard';
import { AddCardModal } from './components/AddCardModal';

// Sample card data (would come from your API)
const sampleCards = [
    {
        id: '1',
        type: 'credit',
        name: 'Chase Sapphire',
        number: '**** 4532',
        gradient: 'from-blue-600 to-purple-600',
        logo: '💳',
        balance: '$2,847.23'
    },
    {
        id: '2',
        type: 'debit',
        name: 'Bank of America',
        number: '**** 8901',
        gradient: 'from-red-500 to-pink-500',
        logo: '🏦',
        balance: '$5,432.10'
    },
    {
        id: '3',
        type: 'loyalty',
        name: 'Starbucks Card',
        number: '**** 2468',
        gradient: 'from-green-600 to-emerald-500',
        logo: '☕',
        balance: '$47.50'
    },
    {
        id: '4',
        type: 'gift',
        name: 'Amazon Gift Card',
        number: '**** 1357',
        gradient: 'from-orange-500 to-yellow-500',
        logo: '🎁',
        balance: '$125.00'
    }
];

// Sample supported card types (would come from api/v1/cards/types)
const supportedCardTypes = [
    { id: 'credit', name: 'Credit Card', icon: '💳', thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=60&fit=crop' },
    { id: 'debit', name: 'Debit Card', icon: '🏦', thumbnail: 'https://images.unsplash.com/photo-1551598045-3642d7b5a1b0?w=100&h=60&fit=crop' },
    { id: 'loyalty', name: 'Loyalty Card', icon: '⭐', thumbnail: 'https://images.unsplash.com/photo-1607798748738-b15c40d33d57?w=100&h=60&fit=crop' },
    { id: 'gift', name: 'Gift Card', icon: '🎁', thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=100&h=60&fit=crop' }
];

const WalletPWA = () => {
    const [cards, setCards] = useState(sampleCards);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [supportedTypes, setSupportedTypes] = useState(supportedCardTypes);

    // Simulate API call for supported card types
    useEffect(() => {
        const fetchSupportedTypes = async () => {
            try {
                // const response = await fetch('/api/v1/cards/types');
                // const types = await response.json();
                // setSupportedTypes(types);

                // Using sample data for now
                setSupportedTypes(supportedCardTypes);
            } catch (error) {
                console.error('Failed to fetch supported card types:', error);
            }
        };

        fetchSupportedTypes();
    }, []);

    const handleCardSelect = (index) => {
        if (selectedCardIndex === index) {
            // Do nothing when clicking the already selected card
            return;
        } else {
            // Select the new card
            setSelectedCardIndex(index);
        }
    };

    const handleCardDrag = (info) => {
        // Handle drag gestures - could implement swipe to delete, etc.
        if (Math.abs(info.offset.y) > 100) {
            // Reset selection on significant drag
            setSelectedCardIndex(null);
        }
    };

    const stackHeight = selectedCardIndex !== null
        ? 60 + ((cards.length - 1) * 16) + 192 // Space for selected card + other cards below
        : cards.length * 12 + 192; // Compressed height when no selection

    return (
        <PageTransition>
            <div className="min-h-screen">
                {/* Header */}
                <div className="p-4">
                    <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
                    <p className="text-gray-600 mt-1">{cards.length} cards</p>
                </div>

                {/* Cards Stack */}
                <div className="px-0 py-8" onClick={() => setSelectedCardIndex(null)}>
                    <motion.div
                        className="relative mx-auto max-w-sm pr-20"
                        style={{ height: stackHeight }}
                        layout
                        onClick={(e) => e.stopPropagation()}
                    >
                        {cards.map((card, index) => (
                            <WalletCard
                                key={card.id}
                                card={card}
                                index={index}
                                totalCards={cards.length}
                                selectedIndex={selectedCardIndex}
                                onSelect={handleCardSelect}
                                onDrag={handleCardDrag}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* Add Card Button */}
                <motion.div
                    className="z-[100] fixed bottom-8 left-1/2 transform -translate-x-1/2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="bg-blue-600 text-white p-4 rounded-full shadow-lg flex items-center space-x-3 px-6"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="font-semibold">Add Card</span>
                    </button>
                </motion.div>

                {/* Add Card Modal */}
                <AddCardModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    supportedTypes={supportedTypes}
                />
            </div>
        </PageTransition>
    );
};

export default WalletPWA;
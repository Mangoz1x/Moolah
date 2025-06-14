'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { SIDENAV_WIDTH } from '../layout';

/**
 * Renders both the **desktop static** sidebar and the **mobile sliding** drawer,
 * using `offset` (-SIDENAV_WIDTH → 0) for the mobile version.
 */
export function SideNavigation({ offset, onClose }) {
    const pathname = usePathname();
    const items = [
        { href: '/dashboard', label: 'Dashboard', icon: '📊' },
        { href: '/dashboard/transactions', label: 'Transactions', icon: '💳' },
        { href: '/dashboard/budgets', label: 'Budgets', icon: '🎯' },
        { href: '/dashboard/analytics', label: 'Analytics', icon: '📈' },
        { href: '/dashboard/goals', label: 'Goals', icon: '🏆' },
        { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
    ];

    const backdropOpacity = 1 + offset / SIDENAV_WIDTH;

    return (
        <>
            {/* Desktop Sidebar - always visible on lg+ */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-slate-200">
                <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            💰 Moolah
                        </div>
                    </div>
                    <nav className="mt-5 flex-1 px-2 space-y-1">
                        {items.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${active
                                            ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                        }`}
                                >
                                    <span className="mr-3 text-lg">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {offset > -SIDENAV_WIDTH && (
                    <motion.div
                        key="backdrop"
                        className="lg:hidden fixed inset-0 bg-slate-600 z-40"
                        style={{ opacity: backdropOpacity }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: backdropOpacity }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                )}
            </AnimatePresence>

            {/* Mobile Sliding Drawer */}
            <motion.div
                className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 z-50 flex flex-col"
                style={{ x: offset }}
                animate={{ x: offset }}
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
                <div className="flex items-center justify-between px-4 pt-5 pb-4">
                    <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        💰 Moolah
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors duration-200"
                    >
                        ✕
                    </button>
                </div>

                <nav className="mt-4 flex-1 px-2 space-y-1 overflow-y-auto">
                    {items.map((item) => {
                        const active = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${active
                                        ? 'bg-emerald-50 text-emerald-700 border-r-2 border-emerald-600'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </motion.div>
        </>
    );
}

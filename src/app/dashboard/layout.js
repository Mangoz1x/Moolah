'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SideNavigation } from './components/SideNav';
import { MobileHeader } from './components/MobileHeader';

/** Drawer width in px */
export const SIDENAV_WIDTH = 256;

/**
 * Hook that blocks native back/forward swipes and also
 * streams a live `offset` for our drawer to follow the finger.
 */
function useSwipeGesture({ onSwipeRight, onSwipeLeft, onDrag, isDrawerOpen }) {
    const touchStartRef = useRef(null);
    const elementRef = useRef(null);
    const isSwipingRef = useRef(false);
    const velocityThreshold = 0.3; // px per ms

    const onTouchStart = useCallback(
        (e) => {
            const t = e.touches[0];

            // If closed, only start if near left edge
            if (!isDrawerOpen && t.clientX > 50) return;

            touchStartRef.current = {
                x: t.clientX,
                y: t.clientY,
                time: Date.now(),
                initialOffset: isDrawerOpen ? 0 : -SIDENAV_WIDTH,
            };

            if (t.clientX < 50) {
                e.preventDefault();
            }
        },
        [isDrawerOpen]
    );

    const onTouchMove = useCallback(
        (e) => {
            const start = touchStartRef.current;
            if (!start) return;

            const t = e.touches[0];
            const deltaX = t.clientX - start.x;
            const deltaY = t.clientY - start.y;
            const absX = Math.abs(deltaX);
            const absY = Math.abs(deltaY);

            // Only treat as horizontal once it’s clearly horizontal
            if (absX > 10 && absX > absY * 0.5) {
                isSwipingRef.current = true;
                e.preventDefault();
            }

            if (isSwipingRef.current) {
                let nextOffset = start.initialOffset + deltaX;
                nextOffset = Math.min(0, Math.max(-SIDENAV_WIDTH, nextOffset));
                onDrag(nextOffset);
            }
        },
        [onDrag]
    );

    const onTouchEnd = useCallback(
        (e) => {
            const start = touchStartRef.current;
            if (!start) return;

            const deltaX = e.changedTouches[0].clientX - start.x;
            const duration = Date.now() - start.time;
            const velocity = Math.abs(deltaX) / duration;

            if (velocity > velocityThreshold) {
                if (deltaX > 0) onSwipeRight();
                else onSwipeLeft();
            } else {
                const finalOffset = start.initialOffset + deltaX;
                if (finalOffset > -SIDENAV_WIDTH / 2) onSwipeRight();
                else onSwipeLeft();
            }

            touchStartRef.current = null;
            isSwipingRef.current = false;
        },
        [onSwipeLeft, onSwipeRight]
    );

    // Attach global prevention + element listeners
    useEffect(() => {
        const preventEdgeNav = (e) => {
            if (!e.touches) return;
            const t = e.touches[0];
            if (t.clientX < 50 || t.clientX > window.innerWidth - 50) {
                e.preventDefault();
            }
        };
        document.addEventListener('touchmove', preventEdgeNav, { passive: false });
        document.addEventListener('touchstart', preventEdgeNav, { passive: false });

        const el = elementRef.current;
        if (el) {
            el.addEventListener('touchstart', onTouchStart, { passive: false });
            el.addEventListener('touchmove', onTouchMove, { passive: false });
            el.addEventListener('touchend', onTouchEnd, { passive: false });
            el.addEventListener('touchcancel', onTouchEnd, { passive: false });
        }

        return () => {
            document.removeEventListener('touchmove', preventEdgeNav);
            document.removeEventListener('touchstart', preventEdgeNav);
            if (el) {
                el.removeEventListener('touchstart', onTouchStart);
                el.removeEventListener('touchmove', onTouchMove);
                el.removeEventListener('touchend', onTouchEnd);
                el.removeEventListener('touchcancel', onTouchEnd);
            }
        };
    }, [onTouchStart, onTouchMove, onTouchEnd]);

    // Lock overscroll
    useEffect(() => {
        const body = document.body;
        const html = document.documentElement;
        const prev = {
            bodyOS: body.style.overscrollBehavior,
            bodyTA: body.style.touchAction,
            htmlOS: html.style.overscrollBehavior,
            htmlTA: html.style.touchAction,
        };

        body.style.overscrollBehavior = 'none';
        body.style.touchAction = 'pan-y';
        html.style.overscrollBehavior = 'none';
        html.style.touchAction = 'pan-y';

        return () => {
            body.style.overscrollBehavior = prev.bodyOS;
            body.style.touchAction = prev.bodyTA;
            html.style.overscrollBehavior = prev.htmlOS;
            html.style.touchAction = prev.htmlTA;
        };
    }, []);

    return elementRef;
}

export default function DashboardLayout({ children }) {
    const [drawerOffset, setDrawerOffset] = useState(-SIDENAV_WIDTH);
    const isOpen = drawerOffset === 0;

    const snapOpen = useCallback(() => setDrawerOffset(0), []);
    const snapClosed = useCallback(() => setDrawerOffset(-SIDENAV_WIDTH), []);

    const swipeRef = useSwipeGesture({
        onSwipeRight: snapOpen,
        onSwipeLeft: snapClosed,
        onDrag: setDrawerOffset,
        isDrawerOpen: isOpen,
    });

    return (
        <div
            ref={swipeRef}
            className="h-screen flex overflow-hidden bg-slate-50"
            style={{ overscrollBehaviorX: 'none', touchAction: 'pan-y' }}
        >
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:bg-white lg:border-r lg:border-slate-200">
                <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                        <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                            💰 Moolah
                        </div>
                    </div>
                    {/* ...desktop nav... */}
                </div>
            </div>

            {/* Mobile Drawer */}
            <SideNavigation offset={drawerOffset} onClose={snapClosed} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:pl-64">
                <MobileHeader onMenuClick={snapOpen} />
                <main className="flex-1 overflow-y-auto">
                    <div className="py-6 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

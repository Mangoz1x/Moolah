'use client';

import { SessionProvider } from 'next-auth/react';

export function AuthProvider({ children }) {
    return (
        <SessionProvider
            // optional: persistSession makes use of localStorage
            persistSession={true}
            refetchOnWindowFocus={false}
        >
            {children}
        </SessionProvider>
    );
}

'use client';

import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {

    const { data: session, status } = useSession();

    return (
        <div>
            <button
                onClick={() => signOut({ callbackUrl: process.env.NEXT_PUBLIC_SERVER_URL })}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
                Sign out
            </button>
            {console.log(session, status)}
        </div>
    )
}
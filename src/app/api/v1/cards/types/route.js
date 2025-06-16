import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { SUPPORTED_CARDS } from '@/vars/cards';

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return NextResponse.json(
        SUPPORTED_CARDS,
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    )
}
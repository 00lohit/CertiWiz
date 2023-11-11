import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: Request,
    { params }: { params: { id: string } }) {
    let { id } = params;

    try {
        const data = await prisma.event.findUnique({
            where: {
                id
            }
        });

        return NextResponse.json({ data }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the event' }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}
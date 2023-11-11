import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {

    const searchParams = req.nextUrl.searchParams
    const my = JSON.parse(searchParams.get('my') ?? "false")
    const creatorId = req.headers.get('Authorization') ?? "";


    try {
        const data = await prisma.event.findMany(my ? {
            where: {
                creatorId
            }
        } : undefined)


        return NextResponse.json(data, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the event' }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}
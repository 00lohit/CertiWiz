import { useServerSession } from '@/lib/useServerSession';
import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

    const session: any = await useServerSession()
    const creatorId = session?.user?.id ?? ""

    try {
        let body = await req.json()



        const data = await prisma.event.create({
            data: {
                ...body, creatorId
            }
        });

        return NextResponse.json({ data }, { status: 201 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the event' }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }

}

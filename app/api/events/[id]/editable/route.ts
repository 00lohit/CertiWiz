import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { useServerSession } from '@/lib/useServerSession';

const prisma = new PrismaClient();

export async function GET(request: NextRequest,
    { params }: { params: { id: string } }) {
    let { id } = params;

    const session: any = await useServerSession()
    const creatorId = session?.user?.id ?? ""

    try {
        const data: any = await prisma.event.findUnique({
            where: {
                id
            },
        });

        let editable = creatorId == data.creatorId

        let obj = editable ? {
            ...data,
            editable
        } : { editable }

        return NextResponse.json({ data: obj }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the event' }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}
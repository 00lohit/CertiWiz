import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { useServerSession } from '@/lib/useServerSession';

const prisma = new PrismaClient();

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    let { id } = params;
    const session: any = await useServerSession()
    const creatorId = session?.user?.id ?? "";

    try {
        let data = await req.json();


        const existingEvent = await prisma.event.findUnique({
            where: { id },
        });


        if (!existingEvent || existingEvent.creatorId !== creatorId) {
            return NextResponse.json({ error: 'You do not have permission to update this event' }, { status: 403 });
        }

        const updatedEvent = await prisma.event.update({
            where: { id },
            data: { ...existingEvent, ...data },
        });

        return NextResponse.json({ data: updatedEvent }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while updating the event' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}








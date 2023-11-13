import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';


const prisma = new PrismaClient();

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    let { id } = params;

    const session: any = await getServerSession(authOptions)
    const creatorId = session?.user?.id ?? ""

    try {
        const event = await prisma.event.findUnique({
            where: {
                id,
            },
            select: {
                creatorId: true,
            },
        });

        if (!event || event.creatorId !== creatorId) {
            return NextResponse.json({ error: 'You do not have permission to delete this event' }, { status: 403 });
        }


        const result = await prisma.$transaction([
            prisma.certificate.deleteMany({
                where: {
                    eventId: id,
                },
            }),
            prisma.event.delete({
                where: {
                    id,
                },
            }),
        ]);

        return NextResponse.json({ result }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while deleting the event and certificates' }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
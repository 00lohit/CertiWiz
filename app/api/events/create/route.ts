import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {

    const session: any = await getServerSession(authOptions)
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

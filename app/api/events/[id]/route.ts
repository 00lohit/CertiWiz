import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';

const prisma = new PrismaClient();

export async function GET(request: Request,
    { params }: { params: { id: string } }) {
    let { id } = params;

    const session: any = await getServerSession(authOptions)
    const creatorId = session?.user?.id ?? ""

    try {
        const data: any = await prisma.event.findUnique({
            where: {
                id
            },
            include: {
                creator: {
                    select: {
                        name: true
                    }
                }
            }
        });

        let obj = {
            ...data,
            creator: data.creator.name,
            editable: creatorId == data.creatorId
        }

        delete obj.password
        delete obj.creatorId

        return NextResponse.json({ data: obj }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'An error occurred while creating the event' }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
}
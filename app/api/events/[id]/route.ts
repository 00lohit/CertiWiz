import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest,
    { params }: { params: { id: string } }) {
    let { id } = params;

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
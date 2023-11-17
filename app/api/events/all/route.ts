import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { useServerSession } from "@/lib/useServerSession";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const my = JSON.parse(searchParams.get("my") ?? "false");
    const search = searchParams.get("search") ?? "";
    const session: any = await useServerSession()
    const creatorId = session?.user?.id ?? ""
    const page = parseInt(searchParams.get("page") ?? "");
    const size = parseInt(searchParams.get("size") ?? "");

    const take = isNaN(size) ? 10 : size;
    const skip = isNaN(page) ? 0 : (page - 1) * take;


    try {

        const query: Prisma.EventFindManyArgs = {
            ...({
                take,
                skip
            }),
            where: {
                ...(my
                    ? { creatorId: creatorId, ...(search.length > 0 ? { name: { contains: search } } : {}) }
                    : { ...(search.length > 0 ? { name: { contains: search } } : {}) })
            },
            include: {
                creator: {
                    select: {
                        name: true
                    }
                }
            }
        }

        const [data, count] = await prisma.$transaction([
            prisma.event.findMany(query),
            prisma.event.count({ where: query.where })
        ]);


        const modifiedData = data.map((event: any) => {
            let obj = {
                ...event,
                creator: event.creator.name
            }

            delete obj.password
            delete obj.creatorId

            return obj
        });




        return NextResponse.json({ data: modifiedData, count }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "An error occurred while creating the event" },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

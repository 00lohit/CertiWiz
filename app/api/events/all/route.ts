import { Prisma, PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const my = JSON.parse(searchParams.get("my") ?? "false");
    const search = searchParams.get("search") ?? "";
    const session: any = await getServerSession(authOptions);
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
            }
        }

        const [data, count] = await prisma.$transaction([
            prisma.event.findMany(query),
            prisma.event.count({ where: query.where })
        ]);



        return NextResponse.json({ data, count }, { status: 200 });
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

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
    const searchParams = req.nextUrl.searchParams;
    const my = JSON.parse(searchParams.get("my") ?? "false");
    const search = searchParams.get("search") ?? "";
    // const creatorId = req.headers.get("Authorization") ?? "";
    const session: any = await getServerSession(authOptions);
    const creatorId = session?.user?.id ?? ""




    let query = {
        where: {
            ...(my
                ? { creatorId: creatorId, ...(search.length > 0 ? { name: { contains: search } } : {}) }
                : { ...(search.length > 0 ? { name: { contains: search } } : {}) })
        }
    }

    try {
        const data = await prisma.event.findMany(query)



        return NextResponse.json({ data }, { status: 200 });
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

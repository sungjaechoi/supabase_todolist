import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const res = await prisma.todoList.create({
    data: {
      title: "aaa",
    },
  });
  return Response.json("ok!");
}

import { PrismaClient, todo } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceGetTodos(userId: string, categoryNames: string[]) {
  const response = await prisma.todo.findMany({
    where: {
      userId: userId,
      ...(categoryNames.length > 0 && {
        category: {
          in: categoryNames,
        },
      }),
    },
  })
  return response
}

export async function serviceCreateTodo(
  userId: string,
  text: string,
  category: string,
) {
  const response = await prisma.todo.create({
    data: {
      userId: userId,
      text: text,
      category: category,
    },
  })

  return response
}

export async function serviceDeleteTodo(id: string) {
  const response = await prisma.todo.delete({
    where: { id },
  })

  return response
}

export async function serviceUpdateTodo(todo: todo) {
  const response = await prisma.todo.update({
    where: { id: todo.id },
    data: todo,
  })

  return response
}

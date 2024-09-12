import { PrismaClient, todo } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceGetTodos(userId: string) {
  const response = await prisma.todo.findMany({
    where: {
      userld: userId,
    },
  })

  return response
}

export async function serviceCreateTood(userId: string, text: string) {
  const response = await prisma.todo.create({
    data: {
      userld: userId,
      text: text,
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

export async function serviceUpdataTodo(todo: todo) {
  const response = await prisma.todo.update({
    where: { id: todo.id },
    data: todo,
  })

  return response
}

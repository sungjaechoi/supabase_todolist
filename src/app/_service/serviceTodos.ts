import { Todo } from '@/model/todos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceGetTodos(userId: string) {
  const response = await prisma.todos.findMany({
    where: {
      userId: userId,
    },
  })

  return response
}

export async function serviceCreateTood(userId: string, text: string) {
  const response = await prisma.todos.create({
    data: {
      userId: userId,
      text: text,
    },
  })

  return response
}

export async function serviceDeleteTodo(id: string) {
  const response = await prisma.todos.delete({
    where: { id },
  })

  return response
}

export async function serviceUpdataTodo(todo: Todo) {
  const response = await prisma.todos.update({
    where: { id: todo.id },
    data: todo,
  })

  return response
}

import { Todo } from '@/model/todos'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function serviceGetTodos() {
  const response = await prisma.todos.findMany()

  return response
}

export async function serviceCreateTood(text: string) {
  const response = await prisma.todos.create({
    data: { text },
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

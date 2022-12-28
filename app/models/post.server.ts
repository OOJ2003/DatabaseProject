import { prisma } from "~/db.server"
import { Book } from "@prisma/client"
import invariant from "tiny-invariant"

export async function postPost(
  content: string,
  rate: number,

  isbn: string,
  userId: number
) {
  return prisma.post.create({
    data: {
      content,
      rate,
      isbn,
      userId,
    },
  })
}

export async function deletePost(id: number) {
  return prisma.post.delete({
    where: {
      id: id,
    },
  })
}

export async function updatePost(id: number, content: string, rate: number) {
  return prisma.post.update({
    where: { id },
    data: {
      content,
      rate,
    },
  })
}

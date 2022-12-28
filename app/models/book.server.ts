import { prisma } from "~/db.server"
import { Book } from "@prisma/client"
import invariant from "tiny-invariant"

export async function createBook(
  isbn: string,
  name: string,
  author: string,
  description: string,
  price: number,
  type: number
) {
  await prisma.inventory.create({
    data: {
      isbn,
    },
  })

  return prisma.book.create({
    data: {
      isbn,
      name,
      author,
      description,
      price,
      type,
      inventory: {
        connect: {
          isbn: isbn,
        },
      },
    },
  })
}

export async function deleteBook(isbn: string) {
  await prisma.inventory.delete({
    where: {
      isbn,
    },
  })

  await prisma.bookLib.deleteMany({
    where: {
      isbn,
    },
  })

  return prisma.book.delete({
    where: {
      isbn,
    },
  })
}

export async function updateBook(isbn: string, book: Book) {
  return prisma.book.update({
    where: {
      isbn,
    },
    data: book,
  })
}

export async function getBook(isbn: string) {
  return prisma.book.findUnique({
    where: {
      isbn,
    },
  })
}

export async function getBooks() {
  return prisma.book.findMany()
}

export async function addBookToBookLib(isbn: string, location: string) {
  const temp = await prisma.bookLib.create({
    data: {
      location,
      isbn,
      status: true,
    },
  })
  await prisma.inventory.update({
    where: {
      isbn,
    },
    data: {
      sums: {
        increment: 1,
      },
      rest: {
        increment: 1,
      },
    },
  })
  return prisma.bookLib.update({
    where: {
      id: temp.id,
    },
    data: {
      book: {
        connect: {
          isbn,
        },
      },
    },
  })
}

export async function removeBookFromBookLib(id: number) {
  const temp = (await prisma.bookLib.findUnique({
    where: {
      id,
    },
    select: {
      isbn: true,
      status: true,
    },
  }))

  invariant(temp, "图书不存在！")
  await prisma.inventory.update({
    where: {
      isbn: temp.isbn,
    },
    data: {
      sums: {
        decrement: 1,
      },
      rest: {
        decrement: temp.status ? 1 : 0,
      },
    },
  })
}

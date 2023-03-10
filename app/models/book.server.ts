import { prisma } from "~/db.server"
import { Book } from "@prisma/client"
import invariant from "tiny-invariant"

export enum BookTypes {
  马克思主义 = 1,
  哲学,
  社会科学总论,
  政治法律,
  军事,
  经济,
  文化,
  语言,
  文学,
  艺术,
  历史地理,
  自然科学总论,
  数理科学和化学,
  天文学地球科学,
  生物科学,
  医药卫生,
  农业科学,
  工业技术,
  交通运输,
  航空航天,
  环境科学,
  综合
}

export async function createBook(
  isbn: string,
  name: string,
  author: string,
  description: string,
  price: number,
  type: number
) {

  return prisma.book.create({
    data: {
      isbn,
      name,
      author,
      description,
      price,
      type,
      inventory: {
        connectOrCreate: {
          where: {
            isbn
          },
          create: {
            
          }
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

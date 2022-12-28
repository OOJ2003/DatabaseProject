import { prisma } from "~/db.server"
import { User } from "@prisma/client"
import bcrypt from "bcryptjs"


export async function createUser(
  username: string,
  password: string,
  email: string,
) {
  const user = await prisma.user.create({
    data: {
      username: username,
      hash: await bcrypt.hash(password, 10),
      type: "normal",
      email: email,
    },
  })

  return prisma.user.update({
    where: {
      id: user.id
    },
    data: {
      credit: {
        create: {
          userId: user.id,
          credit: 100
        }
      }
    }
  })
}

export async function updateUserType(id: number, type: "admin" | "normal") {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      type,
    },
  })
}

export async function updateUserInfo(
  id: number,
  password: string,
  sex: string
) {
  return prisma.user.update({
    where: {
      id: id,
    },
    data: {
      hash: await bcrypt.hash(password, 10),
      sex: sex,
    },
  })
}

export async function deleteUser(
  id: number
) {
  return prisma.user.delete({
    where: {
      id
    }
  })
}

export async function getUsers() {
  return prisma.user.findMany()
}

export async function getUsersByName(name: string) {
  return prisma.user.findMany({
    where: {
      username: {
        contains: name
      }
    }
  })
}
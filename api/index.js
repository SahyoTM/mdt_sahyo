import express from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

app.get('/drafts', async (req, res) => {
  const arrests = await prisma.arrest.findMany({
    where: { published: false },
    include: { author: true }
  })
  res.json(arrests)
})

app.post('/arrest', async (req, res) => {
  const { title, content, authorEmail } = req.body

  const arrest = await prisma.arrest.create({
    data: {
      title,
      content,
      author: {
        connect: {
          email: authorEmail
        }
      }
    }
  })

  res.status(200).json(arrest)
})

app.post(`/user`, async (req, res) => {
  const result = await prisma.user.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
})

app.put('/publish/:id', async (req, res) => {
  const { id } = req.params
  const arrest = await prisma.arrest.update({
    where: {
      id: parseInt(id),
    },
    data: { published: true },
  })
  res.json(arrest)
})

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params
  const arrest = await prisma.arrest.delete({
    where: {
      id: parseInt(id),
    },
  })
  res.json(arrest)
})

app.get(`/arrest/:id`, async (req, res) => {
  const { id } = req.params
  const arrest = await prisma.arrest.findUnique({
    where: {
      id: parseInt(id),
    },
    include: { author: true }
  })
  res.json(arrest)
})

app.get('/feed', async (req, res) => {
  const arrests = await prisma.arrest.findMany({
    where: { published: true },
    include: { author: true },
  })
  res.json(arrests)
})

app.get('/filterArrests', async (req, res) => {
  const { searchString } = req.query
  const draftArrests = await prisma.arrest.findMany({
    where: {
      OR: [
        {
          title: {
            contains: searchString,
          },
        },
        {
          content: {
            contains: searchString,
          },
        },
      ],
    },
  })
  res.json(draftArrests)
})

export default {
  path: '/api',
  handler: app
}

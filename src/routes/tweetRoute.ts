import { PrismaClient } from '@prisma/client';
import { Router } from 'express';

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { content, userId } = req.body;
  try {
    const result = await prisma.tweet.create({
      data: {
        content,
        userId //TODO: manage based on the auth user
      }
    })
    res.status(201).json({result})
  } catch(error) {
    res.status(400).json({error: "UserId does not exist"})
  }
})

router.get("/", async (req, res) => {
  const allTweets = await prisma.tweet.findMany();
  res.status(200).json({tweets: allTweets})
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const tweet = await prisma.tweet.findUnique({
    where: {id: Number(id)}
  })
  res.status(200).json({tweet})
})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {content} = req.body;

  try {
    const result = await prisma.tweet.update({
      where: {id: Number(id)},
      data: {content}
    })
    res.status(204).json({result})
  } catch(e) {
    res.status(400).json({error: "Tweet doesn't exist'"})
  }

})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.tweet.delete({
    where: {id: Number(id)}
  })
  res.status(200).json({message: 'Tweet deleted'})
})

export default router;
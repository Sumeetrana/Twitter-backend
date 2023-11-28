import { PrismaClient } from '@prisma/client';
import {Router} from 'express';

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { email, name, username } = req.body;
  try {
    const result = await prisma.user.create({
      data: {
        email,
        name,
        username,
        bio: "hello, I'm new on Twitter"
      }
    })
    res.status(201).json({result})
  } catch(error) {
    res.status(400).json({error: "Username and name should be unique"})
  }
  
  
})

router.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany();
  res.status(200).json({users: allUsers})
})

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: {id: Number(id)}
  })
  res.status(200).json({user})
})

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {bio, name, image} = req.body;

  try {
    const result = await prisma.user.update({
      where: {id: Number(id)},
      data: {bio, name, image}
    })
    res.status(204).json({result})
  } catch(e) {
    res.status(400).json({error: "User doesn't exist'"})
  }

})

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: {id: Number(id)}
  })
  res.status(200).json({message: 'User deleted'})
})

export default router;
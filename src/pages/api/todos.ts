import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await prisma.todo.findMany();
        res.status(200).json(todos);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
      }
      break;
    case 'POST':
      try {
        const { title } = req.body;
        const newTodo = await prisma.todo.create({
          data: { title, completed: false },
        });
        res.status(201).json(newTodo);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create todo' });
      }
      break;
    case 'PUT':
      try {
        const { id, title, completed } = req.body;
        const updatedTodo = await prisma.todo.update({
          where: { id },
          data: { title, completed },
        });
        res.status(200).json(updatedTodo);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
      }
      break;
    case 'DELETE':
      try {
        const { id } = req.body;
        await prisma.todo.delete({
          where: { id },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

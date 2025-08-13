import express from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 8080;
const prisma = new PrismaClient();


app.use(express.json());



app.post('/postTodos', async (req, res) => {
  try {
    const { title, isComplete } = req.body;

    const newTodo = await prisma.todo.create({
      data: {
        title,
        isComplete,
      },
    });

    res.status(201).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong creating the todo.' });
  }
});



app.get('/getTodos', async (req, res) => {
  try {
    const todos = await prisma.todo.findMany();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong fetching todos.' });
  }
});



app.get('/getTodo/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    const todo = await prisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong fetching the todo.' });
  }
});

app.put('/updateTodo/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { isComplete } = req.body;

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: { isComplete },
    });
    res.json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

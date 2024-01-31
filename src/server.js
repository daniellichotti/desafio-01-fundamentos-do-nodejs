import { randomUUID } from 'node:crypto';
import http from 'node:http';
import { Database } from './database.js';
import { json } from './middlewares/json.js';

const database = new Database(); //criamos um obj database

const server = http.createServer(async (req, res) => {
  const { method, url } = req; //aqui pega o metodo(get/post/etc) e a url(/users ou /tasks)

  await json(req, res);

  if (method === 'GET' && url === '/tasks') {
    const tasks = database.select('tasks');
    return res.end(JSON.stringify(tasks)); //retornamos a lista tasks como string pois nao eh aceito array
  }

  if (method === 'POST' && url === '/tasks') {
    const task = {
      //adicionamos uma task as tasks
      id: randomUUID(),
      title: 'Compras',
      description: 'Comprar banana e arroz',
      completed_at: '11/12/22',
      created_at: new Date(),
      updated_at: '10/12/22',
    };

    database.insert('tasks', task);

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);

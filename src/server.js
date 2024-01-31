import http from 'node:http';
import { json } from './middlewares/json.js';

const tasks = [];

const server = http.createServer(async (req, res) => {
  const { method, url } = req; //aqui pega o metodo(get/post/etc) e a url(/users ou /tasks)

  await json(req, res);

  if (method === 'GET' && url === '/tasks') {
    return res.end(JSON.stringify(tasks)); //retornamos a lista tasks como string pois nao eh aceito array
  }

  if (method === 'POST' && url === '/tasks') {
    tasks.push({
      //adicionamos uma task as tasks
      id: 1,
      title: 'Compras',
      description: 'Comprar banana e arroz',
      completed_at: '11/12/22',
      created_at: '09/12/22',
      updated_at: '10/12/22',
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(3333);

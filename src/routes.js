import { randomUUID } from 'node:crypto';
import { Database } from './database.js';

const database = new Database(); //criamos um obj database

export const routes = [
  {
    method: 'GET', //metodo
    path: '/tasks', //caminho
    handler: (req, res) => {
      const tasks = database.select('tasks');
      return res.end(JSON.stringify(tasks)); //retornamos a lista tasks como string pois nao eh aceito array
    }, //oque vai acontecert quando esta rota for chamada
  },
  {
    method: 'POST', //metodo
    path: '/tasks', //caminho
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = {
        //adicionamos uma task as tasks
        id: randomUUID(),
        title,
        description,
        completed_at: '',
        created_at: new Date(),
        updated_at: '',
      };

      database.insert('tasks', task);

      return res.writeHead(201).end();
    }, //oque vai acontecert quando esta rota for chamada
  },
];

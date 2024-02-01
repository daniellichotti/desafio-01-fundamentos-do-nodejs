import { randomUUID } from 'node:crypto';
import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database(); //criamos um obj database

export const routes = [
  {
    method: 'GET', //metodo
    path: buildRoutePath('/tasks'), //caminho
    handler: (req, res) => {
      const tasks = database.select('tasks');
      return res.end(JSON.stringify(tasks)); //retornamos a lista tasks como string pois nao eh aceito array
    }, //oque vai acontecert quando esta rota for chamada
  },
  {
    method: 'POST', //metodo
    path: buildRoutePath('/tasks'), //caminho
    handler: (req, res) => {
      const { title, description } = req.body;
      const task = {
        //adicionamos uma task as tasks
        id: randomUUID(),
        created_at: new Date(),
        title,
        description,
        completed_at: null,
        updated_at: null,
      };

      database.insert('tasks', task);

      return res.writeHead(201).end();
    }, //oque vai acontecert quando esta rota for chamada
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      database.delete('tasks', id);
      return res.writeHead(204).end();
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const { title, description } = req.body;
      if (title) {
        //trocar titulo
        database.update('tasks', id, {
          title,
          updated_at: new Date(),
        });
      }
      if (description) {
        database.update('tasks', id, {
          description,
          updated_at: new Date(),
        });
      }

      return res.writeHead(204).end();
    },
  },
];

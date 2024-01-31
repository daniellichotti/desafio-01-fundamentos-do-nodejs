import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req; //aqui pega o metodo(get/post/etc) e a url(/users ou /tasks)

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);

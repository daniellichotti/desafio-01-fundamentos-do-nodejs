export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  res.setHeader('Content-type', 'application/json');
  //aqui temos um arquiavo que converte o corpo de uma requisicao em JSON  e devolve estes dados em JSON
}

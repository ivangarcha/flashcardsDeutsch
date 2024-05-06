import express, { json } from 'express';
import { readFile, writeFile } from 'fs';

const app = express();
const PORT = 3001;

app.use(json());

app.use(express.static('public'))

const JSON_FILE_PATH = './data.json';

app.get('/palabras', (req, res) => {
  readFile(JSON_FILE_PATH, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo JSON');
      return;
    }
    const palabras = JSON.parse(data);
    res.json(palabras);
  });
});

app.post('/palabras', (req, res) => {
  const nuevaPalabra = req.body;

  readFile(JSON_FILE_PATH, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error al leer el archivo JSON');
      return;
    }

    const palabras = JSON.parse(data);
    palabras.push(nuevaPalabra);

    writeFile(JSON_FILE_PATH, JSON.stringify(palabras, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error al escribir en el archivo JSON');
        return;
      }
      res.status(201).send('Palabra agregada exitosamente');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

const express = require('express');
const cors = require('cors');
require('dotenv').config();

/*
  Este projeto fiz com o auxílio de Antenor Zapata e Lucas Martins. Ambos da turma 10B
*/

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const { PORT } = process.env;

const hereIsTheUpsideDown = process.env.UPSIDEDOWN_MODE.toLowerCase() === 'true' || false;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log('Escutando na porta 3000');
});

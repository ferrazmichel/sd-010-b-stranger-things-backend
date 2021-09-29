const express = require('express');
const cors = require('cors');

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

const hereIsTheUpsideDown = true;
const UPSIDEDOWN_MODE = process.env.UPSIDEDOWN_MODE === hereIsTheUpsideDown;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});
// mudando
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const instance = require('./api/instance');
const waActions = require('./api/wa_actions');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api', (req, res) => {
  const action = req.body.action;
  switch(action) {
    case 'getSettings':
      instance.getSettings(req, res);
      break;
    case 'getStateInstance':
      instance.getStateInstance(req, res);
      break;
    case 'sendMessage':
      waActions.sendMessage(req, res);
      break;
    case 'sendFileByUrl':
      waActions.sendFileByUrl(req, res);
      break;
    default:
      res.status(400).json({ error: 'Invalid action' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
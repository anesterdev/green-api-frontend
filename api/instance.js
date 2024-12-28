const fetch = require('node-fetch');

exports.getSettings = async (req, res) => {
  const { idInstance, apiTokenInstance } = req.body.data;
  const apiUrl = 'https://7105.api.greenapi.com';
  const url = `${apiUrl}/waInstance${idInstance}/getSettings/${apiTokenInstance}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error while fetching settings' });
  }
};

exports.getStateInstance = async (req, res) => {
  const { idInstance, apiTokenInstance } = req.body.data;
  const apiUrl = 'https://7105.api.greenapi.com';
  const url = `${apiUrl}/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`;
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching state instance' });
  }
};
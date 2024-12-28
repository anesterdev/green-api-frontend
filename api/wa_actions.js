const fetch = require('node-fetch');

exports.sendMessage = async (req, res) => {
    const { idInstance, apiTokenInstance, chatIdSendMessage, message } = req.body.data;
    const apiUrl = 'https://7105.api.greenapi.com';
    const url = `${apiUrl}/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const data = {
        chatId: chatIdSendMessage,
        message: message
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error sending message' });
    }
};

exports.sendFileByUrl = async (req, res) => {
    const { idInstance, apiTokenInstance, chatId, urlFile, fileName } = req.body.data;
    const apiUrl = 'https://7105.api.greenapi.com';
    const url = `${apiUrl}/waInstance${idInstance}/sendFileByUrl/${apiTokenInstance}`;
    const data = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: fileName || "test_image.jpg",
    };
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error sending file by URL' });
    }
};
const express = require('express');
const bodyParser = require('body-parser');
const {OAuth2Client} = require('google-auth-library');

const CLIENT_ID = '79566223665-reqmqlnjlqk893ck5asut9in040o8eff.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    const token = req.body.credential;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];

        // Aqui você pode criar uma sessão para o usuário, armazenar informações no banco de dados, etc.
        res.status(200).json({message: 'Login bem-sucedido', user: payload});
    } catch (error) {
        res.status(401).json({message: 'Token inválido', error: error.message});
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

require('dotenv').config();

const app = require('./servidor');

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});
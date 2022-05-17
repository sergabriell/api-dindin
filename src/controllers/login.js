const knex = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const loginSchema = require('../validations/loginSchema');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        await loginSchema.validate(req.body);

        const correctData = await knex('usuarios').where({ email }).first();
        if (!correctData) {
            return res.status(400).json('Email ou senha incorretos.');
        }

        const correctPassword = await bcrypt.compare(senha, correctData.senha);
        if (!correctPassword) {
            return res.status(400).json('Email ou senha incorretos.');
        }

        const token = jwt.sign({ id: correctData.id }, jwtSecret, { expiresIn: '3h' });

        const { senha: _, ...user } = correctData;

        return res.status(200).json({ usuario: user, token })
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
}

module.exports = login;
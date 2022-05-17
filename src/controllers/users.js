const knex = require('../db/connection');
const bcrypt = require('bcrypt');

const { registerUserSchema } = require('../validations/usersSchema');

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await registerUserSchema.validate(req.body);

        const emailExists = await knex('usuarios').where({ email }).first();
        if (emailExists) {
            return res.status(400).json('Email já existe.');
        }

        const saltHash = 10;
        const encryptedPassword = await bcrypt.hash(senha, saltHash);

        const registeredUser = await knex('usuarios').insert({
            nome,
            email,
            encryptedPassword
        }).returning('*');

        if (!registerUser) {
            return res.status(400).json('Não foi possível cadastrar o usuário.');
        }

        return res.status(201).json(registeredUser);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    registerUser
}
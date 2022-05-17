const knex = require('../db/connection');
const bcrypt = require('bcrypt');

const { registerUserSchema, updateUserSchema } = require('../validations/usersSchema');

const registerUser = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        await registerUserSchema.validate(req.body);

        const emailExists = await knex('usuarios')
            .where({ email })
            .first();

        if (emailExists) {
            return res.status(400).json('Email já existe.');
        }

        const saltHash = 10;
        const encryptedPassword = await bcrypt.hash(senha, saltHash);

        const registeredUser = await knex('usuarios')
            .insert({
                nome,
                email,
                senha: encryptedPassword
            }).returning('*');

        if (!registerUser) {
            return res.status(400).json('Não foi possível cadastrar o usuário.');
        }

        return res.status(201).json(registeredUser[0]);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const detailUser = (req, res) => {
    const user = req.user;

    return res.status(200).json(user);
}

const updateUser = async (req, res) => {
    let { nome, email, senha } = req.body;
    const { id } = req.user;

    if (!nome && !email && !senha) {
        return res.status(400).json('É obrigatório informar ao menos um campo para atualização');
    }

    try {
        await updateUserSchema.validate(req.body);


        const userExists = await knex('usuarios')
            .where({ id })
            .first();

        if (!userExists) {
            return res.status(404).json('Usuário não encontrado.');
        }

        if (senha) {
            const saltHash = 10;
            senha = await bcrypt.hash(senha, saltHash);
        }

        if (email !== req.user.email) {
            const emailExists = await knex('usuarios')
                .where({ email })
                .first();

            if (emailExists) {
                return res.status(400).json('Email já existe.');
            }
        }

        const updateCurrentUser = await knex('usuarios')
            .where({ id })
            .update({
                nome,
                email,
                senha
            })

        if (!updateCurrentUser) {
            return res.status(400).json('Não foi possível atualizar o usuário')
        }

        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ erro: error.message });
    }
}

module.exports = {
    registerUser,
    detailUser,
    updateUser
}
const knex = require('../db/connection');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const verifyUserLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization || authorization === 'Bearer undefined') {
        return res.status(401).json('O usuário precisa estar logado.');
    }

    try {
        const token = authorization.replace('Bearer', '').trim();

        if (!token) {
            return res.status(401).json('Logue e forneça um token válido para ter acesso.');
        }

        const { id } = await jwt.verify(token, jwtSecret);

        const loggedInUser = await knex('usuarios').where({ id }).first();

        if (!loggedInUser) {
            return res.status(404).json('Usuário não encontrado.');
        }

        const { senha: _, ...user } = loggedInUser;

        req.user = user;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json('Logue e forneça um token válido para ter acesso.');
        }
        return res.status(500).json(error.message);
    }
}

module.exports = verifyUserLogin;
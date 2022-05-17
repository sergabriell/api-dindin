const knex = require('../db/connection');
const { registerTransactionSchema } = require('../validations/transactionsSchema');

const registerTransaction = async (req, res) => {
    const user = req.user;

    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (tipo !== 'entrada' && tipo !== 'saida') {
        return res.status(400).json('O tipo deverá receber (entrada) ou (saida)!');
    }

    try {
        await registerTransactionSchema.validate(req.body);

        const registerCurrentTransaction = await knex('transacoes')
            .insert({
                descricao,
                valor,
                data,
                usuario_id: user.id,
                categoria_id,
                tipo
            })
            .returning('*');

        if (!registerCurrentTransaction) {
            return res.status(400).json('Não foi possível realizar a transação.')
        }

        return res.status(201).json(registerCurrentTransaction[0]);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listAllTransactions = async (req, res) => {
    const user = req.user;

    try {
        const transactions = await knex('transacoes')
            .select({
                id: 'transacoes.id', tipo: 'transacoes.tipo', descricao: 'transacoes.descricao', valor: 'transacoes.valor',
                usuario_id: 'transacoes.usuario_id', categoria_id: 'categoria_id', categoria_nome: 'categorias.descricao'
            })
            .leftJoin('categorias', 'categorias.id', 'transacoes.categoria_id')
            .where({ usuario_id: user.id })

        return res.status(200).json(transactions);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const listATransaction = async (req, res) => {
    const user = req.user;
    const idTransaction = req.params.id;

    if (isNaN(idTransaction)) {
        return res.status(400).json('Infome um id válido de transação.');
    }

    try {
        const transaction = await knex('transacoes')
            .select({
                id: 'transacoes.id', tipo: 'transacoes.tipo', descricao: 'transacoes.descricao', valor: 'transacoes.valor',
                usuario_id: 'transacoes.usuario_id', categoria_id: 'categoria_id', categoria_nome: 'categorias.descricao'
            })
            .leftJoin('categorias', 'categorias.id', 'transacoes.categoria_id')
            .where({ 'transacoes.id': idTransaction, 'transacoes.usuario_id': user.id })
            .first()

        if (!transaction) {
            return res.status(404).json('Transação não encontrada.');
        }

        return res.status(200).json(transaction);
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

module.exports = {
    registerTransaction,
    listAllTransactions,
    listATransaction
}